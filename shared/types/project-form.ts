import { ProjectDifficulty } from "@/shared/constants/project";

export interface ProjectInstructionInput {
  title: string;
  content: string;
  image: string;
}

export interface ProjectFormInitialData {
  title: string;
  description: string;
  image: string;
  difficulty: ProjectDifficulty;
  expectedTime: number | null;
  materials: string[];
  videoUrl: string;
  instructions: ProjectInstructionInput[];
}

export interface ProjectActionState {
  errors?: {
    title?: string;
    description?: string;
    difficulty?: string;
    expectedTime?: string;
    image?: string;
    materials?: string;
    videoUrl?: string;
    instructions?: string;
  };
  apiError?: string;
}
