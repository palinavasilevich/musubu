import { Difficulty } from "@/prisma/generated/client";

export interface ProjectCardProps {
  id: string;
  title: string;
  image: string | null;
  author: {
    username: string;
    avatar?: string | null;
  };
  likes: number;
}

export interface Project extends ProjectCardProps {
  description: string;
  views: number;
  difficulty: Difficulty;
  createdAt: Date;
}
