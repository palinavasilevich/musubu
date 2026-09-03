"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";

import { Difficulty, ProjectStatus } from "@/prisma/generated/client";
import { ROUTES } from "@/shared/constants/routes";
import { redirect } from "next/navigation";

import { z } from "zod";

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

  image: z.string().optional(),

  status: z.enum(ProjectStatus),

  isPublic: z.boolean(),
});

export type CreateProjectActionState = {
  errors?: {
    title?: string;
    description?: string;
    difficulty?: string;
    image?: string;
    status?: string;
    isPublic?: string;
  };
  apiError?: string;
};

export async function createProject(
  _prevState: CreateProjectActionState | null,
  formData: FormData,
): Promise<CreateProjectActionState> {
  {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        apiError: "You must be logged in to create a project.",
      };
    }

    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      difficulty: formData.get("difficulty"),
      image: formData.get("image") || undefined,
      status: formData.get("status"),
      isPublic: formData.get("isPublic") === "true",
    };

    const result = createProjectSchema.safeParse(data);

    if (!result.success) {
      return {
        errors: Object.fromEntries(
          result.error.issues
            .filter((issue) => issue.path[0])
            .map((issue) => [issue.path[0], issue.message]),
        ) as CreateProjectActionState["errors"],
      };
    }

    let project;

    try {
      project = await prisma.project.create({
        data: {
          title: result.data.title,
          description: result.data.description,
          difficulty: result.data.difficulty,
          image: result.data.image ?? null,
          status: result.data.status,
          isPublic: result.data.isPublic,
          authorId: session.user.id,
        },
      });
    } catch (error) {
      console.error("Create project error:", error);

      return {
        apiError: "Something went wrong. Please try again.",
      };
    }

    redirect(ROUTES.PROJECT(project.id));
  }
}
