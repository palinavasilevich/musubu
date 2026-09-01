"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  ShieldCheckIcon,
  UserIcon,
} from "lucide-react";
import { ROUTES } from "@/shared/constants/routes";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
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
          <form>
            <FieldGroup className="text-base">
              <Field>
                <InputGroup className="px-1 rounded-2xl h-12 border-border/50 text-base">
                  <InputGroupInput id="name" placeholder="Your name" required />
                  <InputGroupAddon align="inline-start">
                    <UserIcon className="text-muted-foreground" size={18} />
                  </InputGroupAddon>
                </InputGroup>
              </Field>
              <Field>
                <InputGroup className="px-1 rounded-2xl h-12 border-border/50 text-base">
                  <InputGroupInput
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                  <InputGroupAddon align="inline-start">
                    <MailIcon className="text-muted-foreground" size={18} />
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              <Field>
                <InputGroup className="px-1 rounded-2xl h-12 border-border/50 text-base">
                  <InputGroupInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                  />

                  <InputGroupAddon align="inline-start">
                    <LockIcon className="text-muted-foreground" size={18} />
                  </InputGroupAddon>

                  <InputGroupAddon align="inline-end">
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
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
              </Field>
              <Field>
                <InputGroup className="px-1 rounded-2xl h-12 border-border/50 text-base">
                  <InputGroupInput
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    required
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
                      className="text-muted-foreground hover:text-foreground transition-colors"
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
              </Field>

              <Field>
                <Button
                  type="submit"
                  className="w-full rounded-2xl h-12 btn-squish"
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
