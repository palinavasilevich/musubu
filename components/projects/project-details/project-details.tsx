import Image from "next/image";
import Link from "next/link";

import { ArrowLeft, Clock3, Eye, Heart, Pencil, Play } from "lucide-react";

import type { Prisma } from "@/prisma/generated/client";

import { formatExpectedTime } from "@/lib/formatTime";
import {
  PROJECT_DIFFICULTY_CLASSES,
  PROJECT_DIFFICULTY_LABELS,
} from "@/shared/constants/project";
import { ROUTES } from "@/shared/constants/routes";

import { DeleteProjectButton } from "./delete-project-button";
import { ProjectStatusButton } from "./project-status-button";
import { ProjectLikeButton } from "./project-like-button";

type ProjectWithDetails = Prisma.ProjectGetPayload<{
  include: {
    author: true;
    instructions: true;
    _count: {
      select: {
        likes: true;
      };
    };
  };
}>;

interface ProjectDetailsProps {
  project: ProjectWithDetails;
  likes: number;
  currentUserId: string | null;
  hasLiked: boolean;
}

export function ProjectDetails({
  project,
  likes,
  currentUserId,
  hasLiked,
}: ProjectDetailsProps) {
  const materials = Array.isArray(project.materials)
    ? project.materials.filter(
        (material): material is string => typeof material === "string",
      )
    : [];

  const isOwner = currentUserId === project.author.id;

  return (
    <article className="space-y-8">
      <Link
        href={ROUTES.PROJECTS}
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to projects
      </Link>

      <section className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-muted">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-sm text-muted-foreground">No image</span>
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-col">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span
              className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                PROJECT_DIFFICULTY_CLASSES[project.difficulty]
              }`}
            >
              {PROJECT_DIFFICULTY_LABELS[project.difficulty]}
            </span>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Heart className="size-4" />
                {likes}
              </span>

              <span className="flex items-center gap-1.5">
                <Eye className="size-4" />
                {project.views}
              </span>

              {project.expectedTime && (
                <span className="flex items-center gap-1.5">
                  <Clock3 className="size-4" />
                  {formatExpectedTime(project.expectedTime)}
                </span>
              )}
            </div>
          </div>

          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {project.title}
          </h1>

          {project.author.username && (
            <Link
              href={`${ROUTES.PROFILE}/${project.author.username}`}
              className="mt-4 w-fit text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              by @{project.author.username}
            </Link>
          )}

          <p className="mt-6 max-w-2xl leading-7 text-muted-foreground">
            {project.description}
          </p>

          {isOwner && (
            <div className="mt-8 flex flex-wrap gap-3">
              <ProjectStatusButton
                projectId={project.id}
                status={project.status}
              />

              <Link
                href={ROUTES.EDIT_PROJECT(project.id)}
                className="flex h-12 w-fit items-center gap-2 rounded-2xl bg-secondary px-6 text-sm font-medium text-secondary-foreground shadow-soft transition-all hover:bg-secondary/80"
              >
                <Pencil className="size-4" />
                Edit
              </Link>

              <DeleteProjectButton projectId={project.id} />
            </div>
          )}

          {!isOwner && currentUserId && (
            <ProjectLikeButton projectId={project.id} liked={hasLiked} />
          )}
        </div>
      </section>

      {materials.length > 0 && (
        <section className="space-y-5">
          <div>
            <h2 className="font-display text-2xl font-semibold">Materials</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Everything you need to make this project.
            </p>
          </div>

          <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-soft">
            <ol className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {materials.map((material, index) => (
                <li key={`${material}-${index}`} className="flex gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
                    {index + 1}
                  </span>

                  <span className="pt-0.5 text-sm text-muted-foreground">
                    {material}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {project.videoUrl && (
        <section className="space-y-5">
          <div>
            <h2 className="font-display text-2xl font-semibold">
              Video Tutorial
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Watch the video tutorial for this project.
            </p>
          </div>

          <a
            href={project.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:shadow-lg btn-squish"
          >
            <Play className="size-4" />
            Watch tutorial
          </a>
        </section>
      )}

      {project.instructions.length > 0 && (
        <section className="space-y-6">
          <div>
            <h2 className="font-display text-2xl font-semibold">
              Instructions
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Follow the steps to create this project.
            </p>
          </div>

          <div className="space-y-5">
            {project.instructions.map((instruction, index) => (
              <div
                key={instruction.id}
                className="rounded-3xl border border-border/50 bg-card p-6 shadow-soft"
              >
                <div className="flex gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {index + 1}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-xl font-semibold">
                      {instruction.title}
                    </h3>

                    <p className="mt-2 whitespace-pre-line leading-7 text-muted-foreground">
                      {instruction.content}
                    </p>

                    {instruction.image && (
                      <div className="relative mt-5 aspect-video overflow-hidden rounded-2xl">
                        <Image
                          src={instruction.image}
                          alt={instruction.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 768px"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
