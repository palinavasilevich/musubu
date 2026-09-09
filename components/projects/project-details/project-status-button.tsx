"use client";

import { useTransition } from "react";

import { updateProjectStatus } from "@/app/(main)/projects/[id]/actions";
import type { ProjectStatus } from "@/shared/constants/project";

import { Button } from "@/components/ui/button";

interface ProjectStatusButtonProps {
  projectId: string;
  status: ProjectStatus;
}

export function ProjectStatusButton({
  projectId,
  status,
}: ProjectStatusButtonProps) {
  const [isPending, startTransition] = useTransition();

  const nextStatus: ProjectStatus = status === "DRAFT" ? "PUBLISHED" : "DRAFT";

  const label = nextStatus === "PUBLISHED" ? "Publish" : "Unpublish";

  const handleClick = () => {
    startTransition(() => {
      updateProjectStatus(projectId, nextStatus);
    });
  };

  return (
    <Button
      type="button"
      disabled={isPending}
      onClick={handleClick}
      className="h-12 rounded-2xl px-6 shadow-soft transition-all hover:shadow-lg btn-squish"
    >
      {isPending ? "Updating..." : label}
    </Button>
  );
}
