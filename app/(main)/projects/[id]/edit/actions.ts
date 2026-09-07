"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { Difficulty, ProjectStatus } from "@/prisma/generated/client";
import { ROUTES } from "@/shared/constants/routes";
import { ProjectActionState } from "@/shared/types/project-form";
import { redirect } from "next/navigation";
import { z } from "zod";

const materialSchema = z.object({
  materialId: z.string().min(1, "Material is required"),
  quantity: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.coerce.number().positive().optional(),
  ),
  unit: z.string().trim().optional(),
});

const instructionSchema = z.object({
  title: z.string().trim().min(1, "Step title is required"),
  content: z.string().trim().min(1, "Step content is required"),
  image: z.url().optional().or(z.literal("")),
});

const updateProjectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title is too long"),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(2000, "Description is too long"),
  difficulty: z.enum(Difficulty),
  expectedTime: z
    .number()
    .int()
    .positive()
    .max(100000, "Expected time is too large")
    .optional(),
  image: z.url().optional().or(z.literal("")),
  isPublic: z.boolean(),
  materials: z.array(materialSchema),
  instructions: z.array(instructionSchema),
});

export async function updateProject(
  projectId: string,
  _prevState: ProjectActionState | null,
  formData: FormData,
): Promise<ProjectActionState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      apiError: "You must be logged in to edit a project.",
    };
  }

  const materialsValue = formData.get("materials");
  const instructionsValue = formData.get("instructions");

  let materials: unknown;
  let instructions: unknown;

  try {
    materials = JSON.parse(
      typeof materialsValue === "string" ? materialsValue : "[]",
    );

    instructions = JSON.parse(
      typeof instructionsValue === "string" ? instructionsValue : "[]",
    );
  } catch {
    return {
      apiError: "Invalid materials or instructions data.",
    };
  }

  const expectedTimeValue = formData.get("expectedTime");

  const data = {
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    difficulty: formData.get("difficulty"),
    expectedTime:
      expectedTimeValue && String(expectedTimeValue).trim() !== ""
        ? Number(expectedTimeValue)
        : undefined,
    image: String(formData.get("image") ?? ""),
    isPublic: formData.get("isPublic") === "true",
    materials,
    instructions,
  };

  const parsedData = updateProjectSchema.safeParse(data);

  if (!parsedData.success) {
    const errors: Record<string, string> = {};

    for (const issue of parsedData.error.issues) {
      const field = issue.path[0];

      if (typeof field === "string" && !errors[field]) {
        errors[field] = issue.message;
      }
    }

    return {
      errors: errors as ProjectActionState["errors"],
    };
  }

  try {
    const materialIds = parsedData.data.materials.map(
      (material) => material.materialId,
    );

    const uniqueMaterialIds = [...new Set(materialIds)];

    if (uniqueMaterialIds.length !== materialIds.length) {
      return {
        errors: {
          materials: "A material can only be added once.",
        },
      };
    }

    const existingProject = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      select: {
        authorId: true,
      },
    });

    if (!existingProject) {
      return {
        apiError: "Project not found.",
      };
    }

    if (existingProject.authorId !== session.user.id) {
      return {
        apiError: "You are not allowed to edit this project.",
      };
    }

    const existingMaterials = await prisma.material.findMany({
      where: {
        id: {
          in: uniqueMaterialIds,
        },
      },
      select: {
        id: true,
      },
    });

    if (existingMaterials.length !== uniqueMaterialIds.length) {
      return {
        errors: {
          materials: "One or more selected materials do not exist.",
        },
      };
    }

    await prisma.$transaction(async (tx) => {
      await tx.project.update({
        where: {
          id: projectId,
        },
        data: {
          title: parsedData.data.title,
          description: parsedData.data.description,
          difficulty: parsedData.data.difficulty,
          expectedTime: parsedData.data.expectedTime ?? null,
          image: parsedData.data.image || null,
          status: ProjectStatus.PUBLISHED,
          isPublic: parsedData.data.isPublic,
        },
      });

      await tx.projectMaterial.deleteMany({
        where: {
          projectId,
        },
      });

      await tx.instruction.deleteMany({
        where: {
          projectId,
        },
      });

      for (const material of parsedData.data.materials) {
        await tx.projectMaterial.create({
          data: {
            projectId,
            materialId: material.materialId,
            quantity: material.quantity ?? null,
            unit: material.unit || null,
          },
        });
      }

      for (const [
        index,
        instruction,
      ] of parsedData.data.instructions.entries()) {
        await tx.instruction.create({
          data: {
            title: instruction.title,
            content: instruction.content,
            image: instruction.image || null,
            order: index + 1,
            projectId,
          },
        });
      }
    });

    redirect(ROUTES.PROJECT(projectId));
  } catch (error) {
    if (
      error instanceof Error &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }

    console.error("Update project error:", error);

    return {
      apiError: "Something went wrong. Please try again.",
    };
  }
}
