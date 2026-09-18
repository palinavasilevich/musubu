"use client";

import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { ImageUpload } from "@/components/ui/image-upload";
import { ProjectInstructionInput } from "@/shared/types/project-form";

interface ProjectInstructionsFieldProps {
  instructions: ProjectInstructionInput[];
  onChange: (instructions: ProjectInstructionInput[]) => void;
}

export function ProjectInstructionsField({
  instructions,
  onChange,
}: ProjectInstructionsFieldProps) {
  const addInstruction = () => {
    onChange([
      ...instructions,
      {
        title: "",
        content: "",
        image: "",
      },
    ]);
  };

  const removeInstruction = (index: number) => {
    onChange(instructions.filter((_, i) => i !== index));
  };

  const updateInstruction = (
    index: number,
    field: keyof ProjectInstructionInput,
    value: string,
  ) => {
    onChange(
      instructions.map((instruction, i) =>
        i === index
          ? {
              ...instruction,
              [field]: value,
            }
          : instruction,
      ),
    );
  };

  return (
    <Field>
      <div>
        <FieldLabel>Instructions</FieldLabel>
        <FieldDescription>
          Add step-by-step instructions for your project.
        </FieldDescription>
      </div>

      <FieldGroup>
        <div className="space-y-4">
          {instructions.map((instruction, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border/50 bg-card p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display font-semibold">Step {index + 1}</h3>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeInstruction(index)}
                  aria-label="Remove step"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <Input
                  type="text"
                  value={instruction.title}
                  onChange={(event) =>
                    updateInstruction(index, "title", event.target.value)
                  }
                  placeholder="Step title"
                  className="w-full rounded-xl"
                />

                <Textarea
                  value={instruction.content}
                  onChange={(event) =>
                    updateInstruction(index, "content", event.target.value)
                  }
                  placeholder="Describe this step..."
                  rows={5}
                  className="w-full resize-none rounded-xl"
                />

                <ImageUpload
                  value={instruction.image}
                  onChange={(url) => updateInstruction(index, "image", url)}
                  onRemove={() => updateInstruction(index, "image", "")}
                />
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={addInstruction}
            className="inline-flex items-center gap-2 rounded-xl border border-dashed border-border bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Plus className="size-4" />
            Add step
          </Button>
        </div>
      </FieldGroup>
    </Field>
  );
}
