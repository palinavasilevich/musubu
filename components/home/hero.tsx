import Link from "next/link";

import { auth } from "@/auth";
import { ROUTES } from "@/shared/constants/routes";
import { ArrowRight, Sparkles } from "lucide-react";

export async function Hero() {
  const session = await auth();

  return (
    <section className="flex flex-col items-center px-4 py-4 text-center">
      <p className="mb-4 text-2xl font-medium text-primary">
        Welcome to MUSUBU ✨
      </p>

      <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        Connect. <span className="text-gradient-pink">Create.</span> Share.
      </h1>

      <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
        Discover creative projects, get inspired by makers, and share what you
        create with the community.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href={ROUTES.PROJECTS}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-3xl bg-primary text-primary-foreground font-display font-semibold text-base shadow-glow hover:shadow-float transition-all btn-squish"
        >
          Explore projects <ArrowRight size={18} />
        </Link>

        <Link
          href={session?.user ? ROUTES.NEW_PROJECT : ROUTES.SIGNUP}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-3xl bg-secondary text-foreground font-display font-semibold text-base shadow-soft hover:shadow-float transition-all btn-squish border border-border/50"
        >
          <Sparkles size={18} />
          {session?.user ? "Create a project" : "Join MUSUBU"}
        </Link>
      </div>
    </section>
  );
}
