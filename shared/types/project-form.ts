export interface ProjectInstructionForm {
  title: string;
  content: string;
  image: string;
}

export interface ProjectActionState {
  errors?: {
    title?: string;
    description?: string;
    difficulty?: string;
    expectedTime?: string;
    image?: string;
    isPublic?: string;
    materials?: string;
    instructions?: string;
  };
  apiError?: string;
}
