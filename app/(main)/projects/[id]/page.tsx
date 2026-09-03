import { notFound } from "next/navigation";

import { ProjectDetails } from "@/components/projects/project-details";
import { projects } from "@/shared/mocks/projects";
import { prisma } from "@/lib/db";

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
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

  return <ProjectDetails project={project} />;
}
