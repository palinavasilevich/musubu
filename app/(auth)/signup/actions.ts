"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { prisma } from "@/lib/db";
import { ROUTES } from "@/shared/constants/routes";
import { AuthError } from "next-auth";

const signupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { error: "Name is required" })
      .max(100, { error: "Name must be at most 100 characters" }),

    email: z
      .string()
      .trim()
      .min(1, { error: "Email is required" })
      .email({ error: "Please enter a valid email address" }),

    password: z
      .string()
      .min(1, { error: "Password is required" })
      .min(6, { error: "Password must be at least 6 characters" }),

    confirmPassword: z
      .string()
      .min(1, { error: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    error: "The passwords do not match",
  });

export type SignupActionState = {
  apiError?: string;
  errors?: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
};

export async function signupAction(
  _prevState: SignupActionState | null,
  formData: FormData,
): Promise<SignupActionState> {
  const parsedFields = signupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsedFields.success) {
    return {
      errors: Object.fromEntries(
        parsedFields.error.issues.map((issue) => [
          issue.path[0],
          issue.message,
        ]),
      ) as SignupActionState["errors"],
    };
  }

  const { name, email, password } = parsedFields.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        apiError: "User with this email already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    redirect(ROUTES.LOGIN);
  } catch (error) {
    console.error("Signup error:", error);
    if (error instanceof AuthError) {
      return {
        apiError: "Account created but login failed. Please try again later.",
      };
    }
    throw error;
  }
}
