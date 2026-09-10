import Image from "next/image";
import Link from "next/link";

import { Clock3, Heart } from "lucide-react";

import { formatExpectedTime } from "@/lib/formatTime";
import { ROUTES } from "@/shared/constants/routes";
import { Project } from "@/shared/types/project";

import { ProjectLikeButton } from "./project-like-button";

export function ProjectCard({
  id,
  title,
  image,
  author,
  likes,
  liked,
  canLike,
  expectedTime,
}: Project) {
  return (
    <article className="group overflow-hidden rounded-3xl bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={ROUTES.PROJECT(id)}>
        <div className="relative aspect-4/3 overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-muted text-muted-foreground">
              No image
            </div>
          )}
          {/* 
          {canLike && (
            <div className="absolute right-3 top-3">
              <ProjectLikeButton projectId={id} liked={liked} />
            </div>
          )} */}
        </div>

        <div className="space-y-3 p-4">
          <h3 className="line-clamp-1 font-display text-lg font-semibold">
            {title}
          </h3>

          <div className="flex items-center justify-between gap-3">
            <span className="truncate text-sm text-muted-foreground">
              @{author.username ?? "Unknown"}
            </span>

            <div className="flex shrink-0 items-center gap-3">
              {expectedTime && (
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock3 className="size-4" />
                  {formatExpectedTime(expectedTime)}
                </span>
              )}

              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Heart
                  className={`size-4 ${
                    liked ? "fill-current text-primary" : ""
                  }`}
                />
                {likes}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
