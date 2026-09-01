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
import { LockIcon, MailIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/shared/constants/routes";
import Image from "next/image";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
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
          <CardDescription className="font-normal text-base">
            Create an account to connect and share
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup className="text-base">
              <Field>
                <InputGroup className="rounded-2xl h-12 border-border/50 text-base">
                  <InputGroupInput id="name" placeholder="Your name" required />
                  <InputGroupAddon align="inline-start">
                    <UserIcon className="text-muted-foreground" size={18} />
                  </InputGroupAddon>
                </InputGroup>
              </Field>
              <Field>
                <InputGroup className="rounded-2xl h-12 border-border/50 text-base">
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
                <InputGroup className="rounded-2xl h-12 border-border/50 text-base">
                  <InputGroupInput
                    id="password"
                    type="password"
                    placeholder="Password"
                    required
                  />
                  <InputGroupAddon align="inline-start">
                    <LockIcon className="text-muted-foreground" />
                  </InputGroupAddon>
                </InputGroup>
              </Field>
              <Field>
                <InputGroup className="rounded-2xl h-12 border-border/50 text-base">
                  <InputGroupInput
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm your password"
                    required
                  />
                  <InputGroupAddon align="inline-start">
                    <LockIcon className="text-muted-foreground" />
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
                    Sign in
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
