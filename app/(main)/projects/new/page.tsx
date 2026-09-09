import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProjectForm } from "@/components/projects/project-form/project-form";
import { ROUTES } from "@/shared/constants/routes";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function NewProjectPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect(ROUTES.LOGIN);
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <Link
        href={ROUTES.DASHBOARD}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={16} />
        Back to my projects
      </Link>
      <ProjectForm />
    </div>
  );
}
