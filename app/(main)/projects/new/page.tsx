import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProjectForm } from "@/components/projects/project-form";
import { ROUTES } from "@/shared/constants/routes";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export default async function NewProjectPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect(ROUTES.LOGIN);
  }

  const availableMaterials = await prisma.material.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <Link
        href={ROUTES.DASHBOARD}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={16} />
        Back to my projects
      </Link>
      <ProjectForm availableMaterials={availableMaterials} />
    </div>
  );
}
