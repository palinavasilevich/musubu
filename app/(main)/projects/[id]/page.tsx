import { notFound } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";

import { ProjectDetails } from "@/components/projects/project-details/project-details";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;

  const session = await auth();

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      author: true,
      instructions: {
        orderBy: {
          order: "asc",
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  if (!project) {
    notFound();
  }

  const isOwner = project.authorId === session?.user?.id;

  if (project.status === "DRAFT" && !isOwner) {
    notFound();
  }

  return (
    <ProjectDetails
      project={project}
      likes={project._count.likes}
      currentUserId={session?.user?.id ?? null}
    />
  );
}
