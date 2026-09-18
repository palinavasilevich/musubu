"use client";

import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { toggleProjectLike } from "@/app/(main)/projects/[id]/actions";

interface ProjectLikeButtonProps {
  projectId: string;
  liked: boolean;
}

export function ProjectLikeButton({
  projectId,
  liked,
}: ProjectLikeButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    startTransition(async () => {
      const result = await toggleProjectLike(projectId);

      if (result.success) {
        router.refresh();
      }
    });
  };

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={handleClick}
      aria-label={liked ? "Unlike project" : "Like project"}
      className="flex size-8 items-center justify-center rounded-2xl bg-background/80 backdrop-blur-sm transition-colors hover:bg-background disabled:opacity-50"
    >
      <Heart
        className={`size-4 ${
          liked ? "fill-current text-pink-400" : "text-foreground/80"
        }`}
      />
    </button>
  );
}
