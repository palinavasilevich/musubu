import { notFound } from "next/navigation";

import { ProjectDetails } from "@/components/projects/project-details";
import { projects } from "@/shared/mocks/projects";

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;

  const project = projects.find((project) => project.id === id);

  console.log(project);

  if (!project) {
    notFound();
  }

  return <ProjectDetails project={project} />;
}
