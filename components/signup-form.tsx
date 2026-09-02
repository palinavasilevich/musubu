"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  ShieldCheckIcon,
  UserIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
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
} from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

import { ROUTES } from "@/shared/constants/routes";
import { signupAction, SignupActionState } from "@/app/(auth)/signup/actions";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, formAction] = useActionState<
    SignupActionState | null,
    FormData
  >(signupAction, null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="shadow-soft ring-0">
        <CardHeader className="text-center">
          <CardTitle className="font-display text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <span>Join the MUSUBU!</span>

            <Image
              src="/images/yarn.svg"
              alt="Yarn Icon"
              width={25}
              height={25}
            />
          </CardTitle>

          <CardDescription className="font-normal text-center">
            Create an account to connect and share
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form action={formAction} noValidate>
            <FieldGroup className="text-base">
              <Field>
                <InputGroup
                  className={cn(
                    "px-1 h-12 rounded-2xl border-border/50 text-base",
                    state?.errors?.name &&
                      "border-destructive ring-1 ring-destructive/20",
                  )}
                  aria-invalid={!!state?.errors?.name}
                >
                  <InputGroupInput
                    id="name"
                    name="name"
                    placeholder="Your name"
                  />

                  <InputGroupAddon align="inline-start">
                    <UserIcon className="text-muted-foreground" size={18} />
                  </InputGroupAddon>
                </InputGroup>

                {state?.errors?.name && (
                  <FieldError className="text-center">
                    {state.errors.name}
                  </FieldError>
                )}
              </Field>

              <Field>
                <InputGroup
                  className={cn(
                    "px-1 h-12 rounded-2xl border-border/50 text-base",
                    state?.errors?.email &&
                      "border-destructive ring-1 ring-destructive/20",
                  )}
                  aria-invalid={!!state?.errors?.email}
                >
                  <InputGroupInput
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                  />

                  <InputGroupAddon align="inline-start">
                    <MailIcon className="text-muted-foreground" size={18} />
                  </InputGroupAddon>
                </InputGroup>

                {state?.errors?.email && (
                  <FieldError className="text-center">
                    {state.errors.email}
                  </FieldError>
                )}
              </Field>

              <Field>
                <InputGroup
                  className={cn(
                    "px-1 h-12 rounded-2xl border-border/50 text-base",
                    state?.errors?.password &&
                      "border-destructive ring-1 ring-destructive/20",
                  )}
                  aria-invalid={!!state?.errors?.password}
                >
                  <InputGroupInput
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                  />

                  <InputGroupAddon align="inline-start">
                    <LockIcon className="text-muted-foreground" size={18} />
                  </InputGroupAddon>

                  <InputGroupAddon align="inline-end">
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOffIcon size={18} />
                      ) : (
                        <EyeIcon size={18} />
                      )}
                    </button>
                  </InputGroupAddon>
                </InputGroup>

                {state?.errors?.password && (
                  <FieldError className="text-center">
                    {state.errors.password}
                  </FieldError>
                )}
              </Field>

              <Field>
                <InputGroup
                  className={cn(
                    "px-1 h-12 rounded-2xl border-border/50 text-base",
                    state?.errors?.confirmPassword &&
                      "border-destructive ring-1 ring-destructive/20",
                  )}
                  aria-invalid={!!state?.errors?.confirmPassword}
                >
                  <InputGroupInput
                    id="confirm-password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                  />

                  <InputGroupAddon align="inline-start">
                    <ShieldCheckIcon
                      className="text-muted-foreground"
                      size={18}
                    />
                  </InputGroupAddon>

                  <InputGroupAddon align="inline-end">
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOffIcon size={18} />
                      ) : (
                        <EyeIcon size={18} />
                      )}
                    </button>
                  </InputGroupAddon>
                </InputGroup>

                {state?.errors?.confirmPassword && (
                  <FieldError className="text-center">
                    {state.errors.confirmPassword}
                  </FieldError>
                )}
              </Field>

              <Field>
                {state?.apiError && (
                  <FieldError className="text-center">
                    {state.apiError}
                  </FieldError>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 rounded-2xl btn-squish"
                >
                  Create Account
                </Button>

                <FieldDescription className="px-6 text-center">
                  Already have an account?{" "}
                  <Link
                    href={ROUTES.LOGIN}
                    className="text-primary font-medium no-underline! hover:underline!"
                  >
                    Sign In
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
