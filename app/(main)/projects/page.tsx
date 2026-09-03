import { ProjectCard } from "@/components/projects/project-card";
import { getAllProjects } from "@/lib/projects";

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div>
      <h1>Projects Page</h1>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
}
