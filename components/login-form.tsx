"use client";

import Image from "next/image";
import Link from "next/link";
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
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";
import { ROUTES } from "@/shared/constants/routes";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="shadow-soft ring-0">
        <CardHeader>
          <CardTitle className="font-display text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <span>Welcome Back!</span>
            <Image
              src="/images/cat.svg"
              alt="Yarn Icon"
              width={25}
              height={25}
            />
          </CardTitle>
          <CardDescription className="font-normal text-center">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup className="text-base">
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
                <Button
                  type="submit"
                  className="w-full rounded-2xl h-12 btn-squish"
                >
                  Sign In
                </Button>

                <FieldDescription className="px-6 text-center">
                  Don&apos;t have an account?{" "}
                  <Link
                    href={ROUTES.SIGNUP}
                    className="text-primary font-medium no-underline! hover:underline!"
                  >
                    Sign Up
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
