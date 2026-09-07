export interface ProjectMaterialForm {
  materialId: string | null;
  quantity: string;
  unit: string;
}

export interface ProjectInstructionForm {
  title: string;
  content: string;
  image: string;
}

export interface AvailableMaterial {
  id: string;
  name: string;
  description: string;
  image: string | null;
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
