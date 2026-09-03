import Link from "next/link";
import { Plus } from "lucide-react";
import { ProjectCard } from "@/components/projects/project-card";
import { ROUTES } from "@/shared/constants/routes";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect(ROUTES.LOGIN);
  }

  const projects = await prisma.project.findMany({
    where: {
      authorId: session.user.id,
    },
    include: {
      author: {
        select: {
          name: true,
          avatar: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">My projects</h1>

          <p className="mt-1 text-muted-foreground">
            Create, manage and share your projects.
          </p>
        </div>

        <Link
          href={ROUTES.NEW_PROJECT}
          className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:shadow-lg btn-squish"
        >
          <Plus className="size-4" />
          New project
        </Link>
      </div>

      {projects && projects.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              {...project}
              likes={project._count.likes}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-border p-12 text-center">
          <h2 className="font-display text-xl font-semibold">
            No projects yet
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Create your first project and share it with the community.
          </p>

          <Link
            href={ROUTES.NEW_PROJECT}
            className="mt-6 inline-flex rounded-2xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
          >
            Create a project
          </Link>
        </div>
      )}
    </div>
  );
}
