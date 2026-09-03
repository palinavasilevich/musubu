import Link from "next/link";
import { Plus } from "lucide-react";
import { ProjectCard } from "@/components/projects/project-card";
import { ROUTES } from "@/shared/constants/routes";

import { ProjectCardProps } from "@/shared/types/project";

interface ProjectsProps {
  title: string;
  description: string;
  projects: ProjectCardProps[];
  isDashboard?: boolean;
}

export default function Projects({
  title,
  description,
  projects,
  isDashboard,
}: ProjectsProps) {
  return (
    <section className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">{title}</h1>
          <p className="mt-1 text-muted-foreground">{description}</p>
        </div>

        {isDashboard && projects && projects.length > 0 && (
          <Link
            href={ROUTES.NEW_PROJECT}
            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:shadow-lg btn-squish"
          >
            <Plus className="size-4" />
            New project
          </Link>
        )}
      </div>

      {projects && projects.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-border p-12 text-center">
          <h2 className="font-display text-xl font-semibold">
            No projects yet
          </h2>

          {isDashboard && (
            <>
              <p className="mt-2 text-sm text-muted-foreground">
                Create your first project and share it with the community.
              </p>
              <Link
                href={ROUTES.NEW_PROJECT}
                className="mt-6 inline-flex rounded-2xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
              >
                Create a project
              </Link>
            </>
          )}
        </div>
      )}
    </section>
  );
}
