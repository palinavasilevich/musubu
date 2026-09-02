import { ReactNode } from "react";

import { auth } from "@/auth";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

type MainLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default async function MainLayout({ children }: MainLayoutProps) {
  const session = await auth();

  return (
    <div className="min-h-svh bg-background">
      <Header user={session?.user} />

      <main className="mx-auto w-full max-w-7xl px-6 pt-28 pb-12 md:px-8">
        {children}
      </main>

      <Footer />
    </div>
  );
}
