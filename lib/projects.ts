import { Prisma } from "@/prisma/generated/client";

import { prisma } from "@/lib/db";
import { ProjectStatus } from "@/prisma/generated/client";

export type ProjectWithRelations = Prisma.ProjectGetPayload<{
  include: {
    author: {
      select: {
        name: true;
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
      name: true,
      avatar: true,
    },
  },
  _count: {
    select: {
      likes: true,
    },
  },
} satisfies Prisma.ProjectInclude;

export function toProjectCard(project: ProjectWithRelations) {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    image: project.image,
    views: project.views,
    difficulty: project.difficulty,
    createdAt: project.createdAt,
    author: {
      name: project.author.name ?? "unknown",
      avatar: project.author.avatar,
    },
    likes: project._count.likes,
  };
}

export async function getAllProjects() {
  const projects = await prisma.project.findMany({
    where: {
      isPublic: true,
      status: ProjectStatus.PUBLISHED,
    },
    include: projectInclude,
  });

  return projects.map(toProjectCard);
}

export async function getTrendingProjects() {
  const projects = await prisma.project.findMany({
    where: {
      isPublic: true,
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

  return projects.map(toProjectCard);
}

export async function getLatestProjects() {
  const projects = await prisma.project.findMany({
    where: {
      isPublic: true,
      status: ProjectStatus.PUBLISHED,
    },
    include: projectInclude,
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  return projects.map(toProjectCard);
}
