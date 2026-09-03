import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ProjectForm } from "@/components/projects/project-form";
import { ROUTES } from "@/shared/constants/routes";

export default function NewProjectPage() {
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
