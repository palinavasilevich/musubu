export interface ProjectMaterialInput {
  name: string;
  description: string;
  image: string;
  quantity: string;
  unit: string;
}

export interface InstructionInput {
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
