import type { Prisma } from "@/prisma/generated/client";
import { ProjectStatus } from "@/prisma/generated/client";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { Project } from "@/shared/types/project";

export type ProjectWithRelations = Prisma.ProjectGetPayload<{
  include: {
    author: {
      select: {
        id: true;
        username: true;
        avatar: true;
      };
    };
    _count: {
      select: {
        likes: true;
      };
    };
  };
}>;

const projectInclude = {
  author: {
    select: {
      id: true,
      username: true,
      avatar: true,
    },
  },
  _count: {
    select: {
      likes: true,
    },
  },
} satisfies Prisma.ProjectInclude;

export function toProjectCard(
  project: ProjectWithRelations,
  currentUserId: string | null = null,
  likedProjectIds: Set<string> = new Set(),
): Project {
  const isOwner = project.author.id === currentUserId;

  return {
    id: project.id,
    title: project.title,
    description: project.description,
    image: project.image,
    views: project.views,
    difficulty: project.difficulty,
    expectedTime: project.expectedTime ?? undefined,
    createdAt: project.createdAt,
    author: {
      username: project.author.username ?? "unknown",
      avatar: project.author.avatar ?? null,
    },
    likes: project._count.likes,
    liked: likedProjectIds.has(project.id),
    canLike: Boolean(currentUserId) && !isOwner,
  };
}

async function addLikeState(
  projects: ProjectWithRelations[],
  currentUserId: string | null,
) {
  if (!currentUserId) {
    return projects.map((project) => toProjectCard(project, null, new Set()));
  }

  const likes = await prisma.like.findMany({
    where: {
      userId: currentUserId,
      projectId: {
        in: projects.map((project) => project.id),
      },
    },
    select: {
      projectId: true,
    },
  });

  const likedProjectIds = new Set(likes.map((like) => like.projectId));

  return projects.map((project) =>
    toProjectCard(project, currentUserId, likedProjectIds),
  );
}

export async function getAllProjects() {
  const session = await auth();
  const currentUserId = session?.user?.id ?? null;

  const projects = await prisma.project.findMany({
    where: {
      status: ProjectStatus.PUBLISHED,
    },
    include: projectInclude,
  });

  return addLikeState(projects, currentUserId);
}

export async function getTrendingProjects() {
  const session = await auth();
  const currentUserId = session?.user?.id ?? null;

  const projects = await prisma.project.findMany({
    where: {
      status: ProjectStatus.PUBLISHED,
    },
    include: projectInclude,
    orderBy: {
      likes: {
        _count: "desc",
      },
    },
    take: 3,
  });

  return addLikeState(projects, currentUserId);
}

export async function getLatestProjects() {
  const session = await auth();
  const currentUserId = session?.user?.id ?? null;

  const projects = await prisma.project.findMany({
    where: {
      status: ProjectStatus.PUBLISHED,
    },
    include: projectInclude,
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  return addLikeState(projects, currentUserId);
}
