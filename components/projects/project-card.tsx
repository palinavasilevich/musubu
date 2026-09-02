import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { ROUTES } from "@/shared/constants/routes";

export interface ProjectCardProps {
  id: string;
  title: string;
  image: string | null;
  author: {
    username: string;
    avatar?: string | null;
  };
  likes: number;
}

export function ProjectCard({
  id,
  title,
  image,
  author,
  likes,
}: ProjectCardProps) {
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
          <div className="absolute right-3 top-3 rounded-2xl bg-background/80 p-2 backdrop-blur-sm">
            <Heart className="size-5 text-foreground/70" />
          </div>
        </div>

        <div className="space-y-3 p-4">
          <h3 className="line-clamp-1 font-display text-lg font-semibold">
            {title}
          </h3>

          <div className="flex items-center justify-between gap-3">
            <span className="truncate text-sm text-muted-foreground">
              @{author.username}
            </span>

            <span className="flex shrink-0 items-center gap-1 text-sm text-muted-foreground">
              <Heart className="size-4" />
              {likes}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
