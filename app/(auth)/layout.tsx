import { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "@/shared/constants/routes";

type AuthLayoutProps = {
  children: ReactNode;
};

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const session = await auth();

  if (session?.user) {
    redirect(ROUTES.DASHBOARD);
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
