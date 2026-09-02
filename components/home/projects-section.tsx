import Link from "next/link";

import { ProjectCard } from "@/components/projects/project-card";
import { ROUTES } from "@/shared/constants/routes";
import { ProjectCardProps } from "@/shared/types/project";

interface ProjectsSectionProps {
  title: string;
  description: string;
  projects: ProjectCardProps[];
  showViewAll?: boolean;
}

export function ProjectsSection({
  title,
  description,
  projects,
  showViewAll = false,
}: ProjectsSectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-semibold">{title}</h2>

          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>

        {showViewAll && (
          <Link
            href={ROUTES.PROJECTS}
            className="shrink-0 text-sm font-medium text-primary hover:underline"
          >
            View all →
          </Link>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
}
