"use client";

import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ProjectMaterialsFieldProps {
  materials: string[];
  onChange: (materials: string[]) => void;
}

export function ProjectMaterialsField({
  materials,
  onChange,
}: ProjectMaterialsFieldProps) {
  const addMaterial = () => {
    onChange([...materials, ""]);
  };

  const updateMaterial = (index: number, value: string) => {
    const updatedMaterials = [...materials];
    updatedMaterials[index] = value;
    onChange(updatedMaterials);
  };

  const removeMaterial = (index: number) => {
    onChange(materials.filter((_, materialIndex) => materialIndex !== index));
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium">Materials</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Add everything needed to make this project.
        </p>
      </div>

      <div className="space-y-3">
        {materials.map((material, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="w-6 shrink-0 text-center text-sm text-muted-foreground">
              {index + 1}.
            </span>

            <Input
              value={material}
              onChange={(event) => updateMaterial(index, event.target.value)}
              placeholder="e.g. Cotton yarn — 50 g"
            />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeMaterial(index)}
              aria-label="Remove material"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={addMaterial}
        className="gap-2"
      >
        <Plus className="size-4" />
        Add material
      </Button>
    </div>
  );
}
