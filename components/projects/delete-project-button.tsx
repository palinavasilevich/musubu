"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";

import { deleteProject } from "@/app/(main)/projects/[id]/actions";
import { Button } from "@/components/ui/button";

interface DeleteProjectButtonProps {
  projectId: string;
}

export function DeleteProjectButton({ projectId }: DeleteProjectButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmed) return;

    startTransition(async () => {
      const result = await deleteProject(projectId);

      if (result?.error) {
        window.alert(result.error);
      }
    });
  };

  return (
    <Button
      type="button"
      variant="destructive"
      disabled={isPending}
      className="h-12 w-fit gap-2 rounded-2xl px-6 py-3 text-sm font-medium shadow-soft transition-all btn-squish"
      onClick={handleDelete}
    >
      <Trash2 />
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}
