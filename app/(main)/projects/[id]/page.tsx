import { notFound } from "next/navigation";

import { prisma } from "@/lib/db";

import { ProjectDetails } from "@/components/projects/project-details";
import { auth } from "@/auth";

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const session = await auth();

  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
      _count: {
        select: {
          likes: true,
        },
      },
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

  return (
    <ProjectDetails
      project={project}
      likes={project._count.likes}
      currentUserId={session?.user?.id ?? null}
    />
  );
}
