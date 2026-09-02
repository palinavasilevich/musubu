import Link from "next/link";
import { ROUTES } from "@/shared/constants/routes";
import { Heart, Search, UserIcon } from "lucide-react";

import Image from "next/image";
import { User as AuthUser } from "next-auth";
import { LogoutButton } from "./logout-button";

interface HeaderProps {
  user?: AuthUser | null;
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-4 mt-4">
        <nav className="glass-panel mx-auto max-w-7xl rounded-3xl px-6 py-3 shadow-soft">
          <div className="flex items-center justify-between">
            <Link href={ROUTES.HOME} className="group flex items-center gap-2">
              <Image
                src="/images/knitting-logo.png"
                alt="Logo"
                width={48}
                height={48}
                className="w-10 h-10 md:w-12 md:h-12"
              />
              <span className="font-display text-xl font-bold text-gradient-pink">
                MUSUBU
              </span>
            </Link>

            <div className="flex items-center gap-2">
              <Link
                href={ROUTES.SEARCH}
                aria-label="Search"
                className="hidden rounded-2xl p-2 text-foreground/60 transition-all hover:bg-primary/30 hover:text-foreground btn-squish sm:flex"
              >
                <Search size={20} />
              </Link>

              {user && (
                <Link
                  href={ROUTES.LIKES}
                  aria-label="Liked projects"
                  className="relative hidden rounded-2xl p-2 text-foreground/60 transition-all hover:bg-primary/30 hover:text-foreground btn-squish sm:flex"
                >
                  <Heart size={20} />
                </Link>
              )}

              {user ? (
                <>
                  <Link
                    href={ROUTES.DASHBOARD}
                    className="hidden items-center gap-1.5 rounded-2xl bg-secondary px-4 py-2 text-sm text-secondary-foreground transition-all hover:shadow-soft btn-squish sm:flex"
                  >
                    <UserIcon size={16} />

                    {user.name ?? user.email}
                  </Link>

                  <LogoutButton />
                </>
              ) : (
                <Link
                  href={ROUTES.LOGIN}
                  className="hidden items-center gap-1.5 rounded-2xl bg-secondary px-4 py-2 text-sm text-secondary-foreground transition-all hover:shadow-soft btn-squish sm:flex"
                >
                  <UserIcon size={16} />
                  Login
                </Link>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
