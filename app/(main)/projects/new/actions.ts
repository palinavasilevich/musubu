"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { Difficulty, ProjectStatus } from "@/prisma/generated/client";
import { ROUTES } from "@/shared/constants/routes";
import { redirect } from "next/navigation";
import { z } from "zod";

const materialSchema = z.object({
  materialId: z.string().min(1, "Material is required"),
  quantity: z.coerce.number().positive().optional(),
  unit: z.string().trim().optional(),
});

const instructionSchema = z.object({
  title: z.string().trim().min(1, "Step title is required"),
  content: z.string().trim().min(1, "Step content is required"),
  image: z.url().optional().or(z.literal("")),
});

const createProjectSchema = z.object({
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
  // status: z.enum(ProjectStatus).optional(),
  isPublic: z.boolean(),
  materials: z.array(materialSchema),
  instructions: z.array(instructionSchema),
});

export type CreateProjectActionState = {
  errors?: {
    title?: string;
    description?: string;
    difficulty?: string;
    expectedTime?: string;
    image?: string;
    // status?: string;
    isPublic?: string;
    materials?: string;
    instructions?: string;
  };
  apiError?: string;
};

export async function createProject(
  _prevState: CreateProjectActionState | null,
  formData: FormData,
): Promise<CreateProjectActionState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      apiError: "You must be logged in to create a project.",
    };
  }

  let materials: unknown;
  let instructions: unknown;

  const materialsValue = formData.get("materials");
  const instructionsValue = formData.get("instructions");

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
    // status: formData.get("status") ?? ProjectStatus.PUBLISHED,
    isPublic: formData.get("isPublic") === "true",

    materials,
    instructions,
  };

  const parsedData = createProjectSchema.safeParse(data);

  if (!parsedData.success) {
    const errors: Record<string, string> = {};

    for (const issue of parsedData.error.issues) {
      const field = issue.path[0];

      if (typeof field === "string" && !errors[field]) {
        errors[field] = issue.message;
      }
    }

    return {
      errors: errors as CreateProjectActionState["errors"],
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

    const project = await prisma.$transaction(async (tx) => {
      const project = await tx.project.create({
        data: {
          title: parsedData.data.title,
          description: parsedData.data.description,
          difficulty: parsedData.data.difficulty,
          expectedTime: parsedData.data.expectedTime ?? null,
          image: parsedData.data.image || null,
          status: ProjectStatus.PUBLISHED,
          isPublic: parsedData.data.isPublic,
          authorId: session.user.id,
        },
      });

      for (const material of parsedData.data.materials) {
        await tx.projectMaterial.create({
          data: {
            projectId: project.id,
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
            projectId: project.id,
          },
        });
      }

      return project;
    });

    redirect(ROUTES.PROJECT(project.id));
  } catch (error) {
    if (
      error instanceof Error &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }

    console.error("Create project error:", error);

    return {
      apiError: "Something went wrong. Please try again.",
    };
  }
}
