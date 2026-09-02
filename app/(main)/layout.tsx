import { ReactNode } from "react";

import { auth } from "@/auth";
import { Header } from "@/components/layout/header";

type MainLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default async function MainLayout({ children }: MainLayoutProps) {
  const session = await auth();

  return (
    <div className="min-h-svh bg-background">
      <Header user={session?.user} />

      <div className="mx-auto flex w-full max-w-7xl pt-28">
        <aside className="hidden w-60 shrink-0 md:block">{/* Sidebar */}</aside>

        <main className="min-w-0 flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
