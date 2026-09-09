"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { PROJECT_DIFFICULTIES } from "@/shared/constants/project";
import { ROUTES } from "@/shared/constants/routes";
import { ProjectActionState } from "@/shared/types/project-form";
import { redirect } from "next/navigation";
import { z } from "zod";

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
  difficulty: z.enum(PROJECT_DIFFICULTIES),
  expectedTime: z
    .number()
    .int()
    .positive()
    .max(100000, "Expected time is too large")
    .optional(),
  image: z.url().optional().or(z.literal("")),
  materials: z
    .array(z.string().trim().min(1, "Material is required"))
    .max(50, "Too many materials"),
  videoUrl: z.url().optional().or(z.literal("")),
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
      apiError: "You must be logged in to update a project.",
    };
  }

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: {
      authorId: true,
    },
  });

  if (!project) {
    return {
      apiError: "Project not found.",
    };
  }

  if (project.authorId !== session.user.id) {
    return {
      apiError: "You are not allowed to update this project.",
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
    materials,
    videoUrl: String(formData.get("videoUrl") ?? ""),
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
          materials: parsedData.data.materials,
          videoUrl: parsedData.data.videoUrl || null,
        },
      });

      await tx.instruction.deleteMany({
        where: {
          projectId,
        },
      });

      await tx.instruction.createMany({
        data: parsedData.data.instructions.map((instruction, index) => ({
          title: instruction.title,
          content: instruction.content,
          image: instruction.image || null,
          order: index + 1,
          projectId,
        })),
      });
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
