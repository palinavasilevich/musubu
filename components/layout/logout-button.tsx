"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { ROUTES } from "@/shared/constants/routes";

export function LogoutButton() {
  return (
    <button
      type="button"
      aria-label="Logout"
      onClick={() => signOut({ callbackUrl: ROUTES.HOME })}
      className="hidden rounded-2xl p-2 text-foreground/60 transition-all hover:text-destructive btn-squish sm:flex"
    >
      <LogOut size={18} />
    </button>
  );
}
