"use client";

import { useActionState } from "react";

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

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  createProject,
  CreateProjectActionState,
} from "@/app/(main)/projects/new/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function ProjectForm() {
  const [state, formAction, isPending] = useActionState<
    CreateProjectActionState | null,
    FormData
  >(createProject, null);

  return (
    <Card className="shadow-soft ring-0">
      <CardHeader>
        <CardTitle className="font-display text-3xl font-bold">
          Create a project
        </CardTitle>

        <CardDescription>
          Share your creative project with the MUSUBU community.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form action={formAction} noValidate>
          <FieldGroup className="text-base">
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>

              <Input
                id="title"
                name="title"
                placeholder="Cozy Autumn Sweater"
                className="h-12 rounded-2xl border-border/50"
                aria-invalid={!!state?.errors?.title}
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
                placeholder="Tell the community about your project..."
                className="min-h-32 resize-none rounded-2xl border-border/50"
                aria-invalid={!!state?.errors?.description}
              />

              {state?.errors?.description && (
                <FieldError>{state.errors.description}</FieldError>
              )}

              <FieldDescription>
                Describe what you are creating and what makes this project
                special.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="difficulty">Difficulty</FieldLabel>

              <Select name="difficulty" defaultValue="BEGINNER">
                <SelectTrigger
                  id="difficulty"
                  className="h-12 rounded-2xl border-border/50"
                >
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="BEGINNER">BEGINNER</SelectItem>
                  <SelectItem value="INTERMEDIATE">INTERMEDIATE</SelectItem>
                  <SelectItem value="ADVANCED">ADVANCED</SelectItem>
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
                placeholder="e.g. 180"
                className="h-12 rounded-2xl border-border/50"
                aria-invalid={!!state?.errors?.expectedTime}
              />

              <FieldDescription>
                Estimated time needed to complete the project, in minutes.
              </FieldDescription>

              {state?.errors?.expectedTime && (
                <FieldError>{state.errors.expectedTime}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="image">Image</FieldLabel>

              <Input
                id="image"
                name="image"
                type="url"
                placeholder="https://example.com/project-image.jpg"
                className="h-12 rounded-2xl border-border/50"
                aria-invalid={!!state?.errors?.image}
              />

              {state?.errors?.image && (
                <FieldError>{state.errors.image}</FieldError>
              )}

              <FieldDescription>
                Add a URL to an image of your project.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="status">Status</FieldLabel>

              <Select name="status" defaultValue="DRAFT">
                <SelectTrigger
                  id="status"
                  className="h-12 rounded-2xl border-border/50"
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="DRAFT">DRAFT</SelectItem>
                  <SelectItem value="PUBLISHED">PUBLISHED</SelectItem>
                </SelectContent>
              </Select>

              {state?.errors?.status && (
                <FieldError>{state.errors.status}</FieldError>
              )}
            </Field>

            <Field orientation="horizontal">
              <input
                id="isPublic"
                name="isPublic"
                type="checkbox"
                value="true"
                className="size-4 accent-primary"
              />

              <div className="space-y-1">
                <FieldLabel htmlFor="isPublic">
                  Make this project public
                </FieldLabel>

                <FieldDescription>
                  Public projects can be discovered by other members of the
                  community.
                </FieldDescription>
              </div>
            </Field>

            {state?.apiError && (
              <FieldError className="text-center">{state.apiError}</FieldError>
            )}

            <Button
              type="submit"
              disabled={isPending}
              className="h-12 w-full rounded-2xl btn-squish"
            >
              {isPending ? "Creating..." : "Create project"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
