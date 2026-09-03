import Image from "next/image";
import Link from "next/link";

import { ArrowLeft, Eye, Heart } from "lucide-react";

import { Difficulty } from "@/prisma/generated/client";

import { ROUTES } from "@/shared/constants/routes";

import type { Project, Prisma } from "@/prisma/generated/client";

type ProjectWithDetails = Prisma.ProjectGetPayload<{
  include: {
    author: true;
    projectMaterials: {
      include: {
        material: true;
      };
    };
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
}

const difficultyLabels: Record<Difficulty, string> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
};

export function ProjectDetails({
  project,
  likes,
  currentUserId,
}: ProjectDetailsProps) {
  return (
    <article className="space-y-8">
      <Link
        href={ROUTES.PROJECTS}
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to projects
      </Link>
      <section className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-muted">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No image
            </div>
          )}
        </div>

        <div className="flex flex-col justify-start">
          <div className="flex items-center justify-between gap-4">
            <span className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
              {difficultyLabels[project.difficulty]}
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
            </div>
          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {project.title}
          </h1>

          <Link
            href={`${ROUTES.PROFILE}/${project.author.name}`}
            className="mt-5 flex w-fit items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            {/* {project.author.avatar ? (
              <Image
                src={project.author.avatar}
                alt={project.author.name ?? "User avatar"}
                width={32}
                height={32}
                className="size-8 rounded-full object-cover"
              />
            ) : (
              <span className="flex size-8 items-center justify-center rounded-full bg-secondary">
                <UserIcon size={16} />
              </span>
            )} */}
            <span className="font-medium">by @{project.author.name}</span>
          </Link>

          <p className="mt-6 leading-7 text-muted-foreground">
            {project.description}
          </p>

          {currentUserId !== project.author.id && (
            <button
              type="button"
              className="mt-8 flex w-fit items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:shadow-lg btn-squish"
            >
              <Heart className="size-4" />
              Like
            </button>
          )}
        </div>
      </section>

      {project.projectMaterials.length > 0 && (
        <section className="space-y-5">
          <div>
            <h2 className="font-display text-2xl font-semibold">Materials</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Everything you need for this project.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.projectMaterials.map(
              ({ id, material, quantity, unit }) => (
                <div
                  key={id}
                  className="overflow-hidden rounded-2xl border border-border/50 bg-card shadow-soft"
                >
                  {material.image && (
                    <div className="relative aspect-video">
                      <Image
                        src={material.image}
                        alt={material.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="p-4">
                    <h3 className="font-medium">{material.name}</h3>

                    {quantity !== null && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {quantity} {unit ?? ""}
                      </p>
                    )}

                    <p className="mt-2 text-sm text-muted-foreground">
                      {material.description}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
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

          <div className="space-y-6">
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

                    <p className="mt-2 whitespace-pre-line text-muted-foreground">
                      {instruction.content}
                    </p>

                    {instruction.image && (
                      <div className="relative mt-5 aspect-video overflow-hidden rounded-2xl">
                        <Image
                          src={instruction.image}
                          alt={instruction.title}
                          fill
                          className="object-cover"
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
