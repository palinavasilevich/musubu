"use client";

import { Heart } from "lucide-react";
import { useState, useTransition } from "react";

import { toggleProjectLike } from "@/app/(main)/projects/[id]/actions";
import { Button } from "@/components/ui/button";

interface ProjectLikeButtonProps {
  projectId: string;
  liked: boolean;
}

export function ProjectLikeButton({
  projectId,
  liked,
}: ProjectLikeButtonProps) {
  const [isLiked, setIsLiked] = useState(liked);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      const result = await toggleProjectLike(projectId);

      if (result.success) {
        setIsLiked((current) => !current);
      }
    });
  };

  return (
    <Button
      type="button"
      disabled={isPending}
      onClick={handleClick}
      className="mt-8 flex w-fit items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft"
    >
      <Heart className={`size-4 ${isLiked ? "fill-current" : ""}`} />
      {isLiked ? "Liked" : "Like"}
    </Button>
  );
}
