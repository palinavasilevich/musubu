"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { ROUTES } from "@/shared/constants/routes";
import { redirect } from "next/navigation";
import { ProjectStatus } from "@/prisma/generated/client";
import { z } from "zod";

export async function deleteProject(projectId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "You must be logged in to delete a project.",
    };
  }

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    select: {
      authorId: true,
    },
  });

  if (!project) {
    return {
      error: "Project not found.",
    };
  }

  if (project.authorId !== session.user.id) {
    return {
      error: "You are not allowed to delete this project.",
    };
  }

  try {
    await prisma.project.delete({
      where: {
        id: projectId,
      },
    });
  } catch (error) {
    console.error("Delete project error:", error);

    return {
      error: "Something went wrong. Please try again.",
    };
  }

  redirect(ROUTES.PROJECTS);
}

const projectStatusSchema = z.enum(ProjectStatus);

export async function updateProjectStatus(
  projectId: string,
  status: ProjectStatus,
) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "You must be logged in.",
    };
  }

  const parsedStatus = projectStatusSchema.safeParse(status);

  if (!parsedStatus.success) {
    return {
      error: "Invalid project status.",
    };
  }

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    select: {
      authorId: true,
    },
  });

  if (!project) {
    return {
      error: "Project not found.",
    };
  }

  if (project.authorId !== session.user.id) {
    return {
      error: "You are not allowed to update this project.",
    };
  }

  await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      status: parsedStatus.data,
    },
  });

  redirect(ROUTES.PROJECT(projectId));
}
