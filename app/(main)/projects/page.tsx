import Projects from "@/components/projects/projects";
import { getAllProjects } from "@/lib/projects";

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <Projects
      title="All Projects"
      description="Browse all available projects"
      projects={projects}
    />
  );
}
