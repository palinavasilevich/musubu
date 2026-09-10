import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth";
import { ProjectForm } from "@/components/projects/project-form/project-form";
import { prisma } from "@/lib/db";
import { ROUTES } from "@/shared/constants/routes";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ProjectEditPageProps {
  params: Promise<{ id: string }>;
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
    where: { id },
    include: {
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

  const materials = Array.isArray(project.materials)
    ? project.materials.filter(
        (material): material is string => typeof material === "string",
      )
    : [];

  const initialData = {
    title: project.title,
    description: project.description,
    image: project.image ?? "",
    difficulty: project.difficulty,
    expectedTime: project.expectedTime,
    materials,
    videoUrl: project.videoUrl ?? "",
    instructions: project.instructions.map((instruction) => ({
      title: instruction.title,
      content: instruction.content,
      image: instruction.image ?? "",
    })),
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <Link
        href={ROUTES.DASHBOARD}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={16} />
        Back to my projects
      </Link>
      <ProjectForm projectId={project.id} initialData={initialData} />
    </div>
  );
}
