import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { ROUTES } from "@/shared/constants/routes";

import { ProjectForm } from "@/components/projects/project-form";

interface ProjectEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectEditPage({
  params,
}: ProjectEditPageProps) {
  const { id } = await params;

  const session = await auth();

  if (!session?.user?.id) {
    redirect(ROUTES.LOGIN);
  }

  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      projectMaterials: {
        include: {
          material: true,
        },
      },
      instructions: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  if (!project) {
    notFound();
  }

  if (project.authorId !== session.user.id) {
    redirect(ROUTES.PROJECT(project.id));
  }

  const availableMaterials = await prisma.material.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const initialData = {
    title: project.title,
    description: project.description,
    image: project.image ?? "",
    difficulty: project.difficulty,
    expectedTime: project.expectedTime,
    isPublic: project.isPublic,
    materials: project.projectMaterials.map((item) => ({
      materialId: item.materialId,
      quantity: item.quantity?.toString() ?? "",
      unit: item.unit ?? "",
    })),
    instructions: project.instructions.map((instruction) => ({
      title: instruction.title,
      content: instruction.content,
      image: instruction.image ?? "",
    })),
  };

  return (
    <ProjectForm
      projectId={project.id}
      initialData={initialData}
      availableMaterials={availableMaterials}
    />
  );
}
