import { Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-border/50 py-3 text-center text-sm text-muted-foreground">
      <p className="flex items-center justify-center gap-1">
        Made with
        <Heart size={14} className="fill-pink text-pink" aria-hidden="true" />
        by pvslvch
      </p>

      <p className="mt-1 text-xs">© {currentYear} MUSUBU</p>
    </footer>
  );
}
