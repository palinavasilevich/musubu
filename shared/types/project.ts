import { Difficulty } from "@/prisma/generated/client";

export interface Project {
  id: string;
  title: string;
  image: string | null;
  author: {
    username: string;
    avatar?: string | null;
  };
  likes: number;
  liked: boolean;
  canLike: boolean;
  description: string;
  views: number;
  difficulty: Difficulty;
  expectedTime?: number;
  createdAt: Date;
}
