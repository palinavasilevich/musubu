"use client";

import { useActionState, useState } from "react";

import { createProject } from "@/app/(main)/projects/new/actions";
import { updateProject } from "@/app/(main)/projects/[id]/edit/actions";
import { ProjectInstructionsField } from "@/components/projects/project-form/project-instructions-field";
import { ProjectMaterialsField } from "@/components/projects/project-form/project-materials-field";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { ImageUpload } from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ProjectActionState,
  ProjectFormInitialData,
  ProjectInstructionInput,
} from "@/shared/types/project-form";
import {
  PROJECT_DIFFICULTIES,
  PROJECT_DIFFICULTY_LABELS,
} from "@/shared/constants/project";

interface ProjectFormProps {
  projectId?: string;
  initialData?: ProjectFormInitialData;
}

export function ProjectForm({ projectId, initialData }: ProjectFormProps) {
  const isEditMode = Boolean(projectId && initialData);

  const action = projectId
    ? updateProject.bind(null, projectId)
    : createProject;

  const [state, formAction, isPending] = useActionState<
    ProjectActionState | null,
    FormData
  >(action, null);

  const [image, setImage] = useState(initialData?.image ?? "");
  const [materials, setMaterials] = useState<string[]>(
    initialData?.materials ?? [],
  );
  const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl ?? "");
  const [instructions, setInstructions] = useState<ProjectInstructionInput[]>(
    initialData?.instructions ?? [],
  );

  return (
    <Card className="shadow-soft ring-0">
      <CardHeader>
        <CardTitle>{isEditMode ? "Edit project" : "Create project"}</CardTitle>

        <CardDescription>
          {isEditMode
            ? "Update your crochet project."
            : "Add a new crochet project to your collection."}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form action={formAction} noValidate>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>

              <Input
                id="title"
                name="title"
                defaultValue={initialData?.title}
                placeholder="e.g. Little Crochet Bunny"
                aria-invalid={Boolean(state?.errors?.title)}
              />

              {state?.errors?.title && (
                <FieldError>{state.errors.title}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>

              <Textarea
                id="description"
                name="description"
                defaultValue={initialData?.description}
                placeholder="Describe your project..."
                rows={5}
                aria-invalid={Boolean(state?.errors?.description)}
              />

              {state?.errors?.description && (
                <FieldError>{state.errors.description}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel>Project image</FieldLabel>

              <ImageUpload
                value={image}
                onChange={setImage}
                onRemove={() => setImage("")}
              />

              <input type="hidden" name="image" value={image} />

              {state?.errors?.image && (
                <FieldError>{state.errors.image}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="difficulty">Difficulty</FieldLabel>

              <Select
                name="difficulty"
                defaultValue={
                  initialData?.difficulty ?? PROJECT_DIFFICULTIES[0]
                }
              >
                <SelectTrigger id="difficulty">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>

                <SelectContent>
                  {PROJECT_DIFFICULTIES.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {PROJECT_DIFFICULTY_LABELS[difficulty]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {state?.errors?.difficulty && (
                <FieldError>{state.errors.difficulty}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="expectedTime">Expected time</FieldLabel>

              <Input
                id="expectedTime"
                name="expectedTime"
                type="number"
                min="1"
                max="100000"
                defaultValue={initialData?.expectedTime ?? ""}
                placeholder="e.g. 120"
                aria-invalid={Boolean(state?.errors?.expectedTime)}
              />

              <FieldDescription>Estimated time in minutes.</FieldDescription>

              {state?.errors?.expectedTime && (
                <FieldError>{state.errors.expectedTime}</FieldError>
              )}
            </Field>

            <Field>
              <ProjectMaterialsField
                materials={materials}
                onChange={setMaterials}
              />

              <input
                type="hidden"
                name="materials"
                value={JSON.stringify(materials)}
              />

              {state?.errors?.materials && (
                <FieldError>{state.errors.materials}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="videoUrl">Video tutorial</FieldLabel>

              <Input
                id="videoUrl"
                name="videoUrl"
                type="url"
                value={videoUrl}
                onChange={(event) => setVideoUrl(event.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                aria-invalid={Boolean(state?.errors?.videoUrl)}
              />

              <FieldDescription>Add a video tutorial link.</FieldDescription>

              {state?.errors?.videoUrl && (
                <FieldError>{state.errors.videoUrl}</FieldError>
              )}
            </Field>

            <Field>
              <ProjectInstructionsField
                instructions={instructions}
                onChange={setInstructions}
              />

              <input
                type="hidden"
                name="instructions"
                value={JSON.stringify(instructions)}
              />

              {state?.errors?.instructions && (
                <FieldError>{state.errors.instructions}</FieldError>
              )}
            </Field>

            {state?.apiError && <FieldError>{state.apiError}</FieldError>}

            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-12 rounded-2xl btn-squish"
            >
              {isPending
                ? isEditMode
                  ? "Saving..."
                  : "Creating..."
                : isEditMode
                  ? "Save changes"
                  : "Create project"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
