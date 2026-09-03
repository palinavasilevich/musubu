import { ROUTES } from "@/shared/constants/routes";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Projects from "@/components/projects/projects";
import { toProjectCard } from "@/lib/projects";

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

  const projectCards = projects.map(toProjectCard);

  return (
    <Projects
      title="My projects"
      description="Create, manage and share your projects."
      projects={projectCards}
      isDashboard
    />
  );
}
