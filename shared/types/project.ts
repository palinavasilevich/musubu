import { Prisma } from "@/prisma/generated/client";
import { Difficulty } from "@/prisma/generated/client";

export interface Project {
  id: string;
  title: string;
  image: string | null;
  author: {
    name: string;
    avatar?: string | null;
  };
  likes: number;
  description: string;
  views: number;
  difficulty: Difficulty;
  expectedTime?: number;
  createdAt: Date;
}

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
