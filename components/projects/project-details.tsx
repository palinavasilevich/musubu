import Image from "next/image";
import Link from "next/link";

import { ArrowLeft, Eye, Heart } from "lucide-react";

import { ROUTES } from "@/shared/constants/routes";
import type { Project } from "@/shared/types/project";

interface ProjectDetailsProps {
  project: Project;
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <div className="space-y-8">
      <Link
        href={ROUTES.PROJECTS}
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to projects
      </Link>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl bg-card shadow-soft">
          <div className="relative aspect-4/3">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority
                className="object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center bg-muted text-muted-foreground">
                No image
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex items-center justify-between gap-4">
            <span className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
              {project.difficulty}
            </span>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Heart className="size-4" />
                {project.likes}
              </span>

              <span className="flex items-center gap-1.5">
                <Eye className="size-4" />
                {project.views}
              </span>
            </div>
          </div>

          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {project.title}
          </h1>

          <Link
            href={`${ROUTES.PROFILE}/${project.author.username}`}
            className="mt-3 w-fit text-muted-foreground transition-colors hover:text-foreground"
          >
            by @{project.author.username}
          </Link>

          <p className="mt-6 leading-7 text-foreground/80">
            {project.description}
          </p>

          <button
            type="button"
            className="mt-8 flex w-fit items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:shadow-lg btn-squish"
          >
            <Heart className="size-4" />
            Like project
          </button>
        </div>
      </section>
    </div>
  );
}
