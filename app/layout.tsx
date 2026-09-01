import type { Metadata } from "next";
import { Fredoka, Geist_Mono } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header/header";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MUSUBU",
    template: "%s | MUSUBU",
  },
  description: "Connect. Create. Share.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        fredoka.variable,
        geistMono.variable,
      )}
    >
      <body className="min-h-screen font-fredoka">
        <Header />

        <main className="flex min-h-screen items-start justify-center px-4 pt-20 pb-10">
          {children}
        </main>
      </body>
    </html>
  );
}
