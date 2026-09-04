"use client";

import { Plus, Trash2 } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";

export interface ProjectMaterialForm {
  materialId: string | null;
  quantity: string;
  unit: string;
}

interface ProjectMaterialsFieldProps {
  materials: ProjectMaterialForm[];
  availableMaterials: {
    id: string;
    name: string;
  }[];
  onChange: (materials: ProjectMaterialForm[]) => void;
}

export function ProjectMaterialsField({
  materials,
  availableMaterials,
  onChange,
}: ProjectMaterialsFieldProps) {
  const addMaterial = () => {
    onChange([
      ...materials,
      {
        materialId: null,
        quantity: "",
        unit: "",
      },
    ]);
  };

  const removeMaterial = (index: number) => {
    onChange(materials.filter((_, i) => i !== index));
  };

  const updateMaterial = (
    index: number,
    field: keyof ProjectMaterialForm,
    value: string,
  ) => {
    onChange(
      materials.map((material, i) =>
        i === index
          ? {
              ...material,
              [field]: value,
            }
          : material,
      ),
    );
  };

  const selectItems = availableMaterials.map((material) => ({
    value: material.id,
    label: material.name,
  }));

  return (
    <Field>
      <div>
        <FieldLabel>Materials</FieldLabel>

        <FieldDescription>
          Add everything needed to make this project.
        </FieldDescription>
      </div>

      <FieldGroup>
        <div className="space-y-4">
          {materials.map((material, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border/50 bg-card p-4"
            >
              <div className="grid gap-4 sm:grid-cols-[1fr_120px_120px_auto]">
                <Select
                  items={selectItems}
                  value={material.materialId}
                  onValueChange={(value) => {
                    if (typeof value !== "string") return;

                    updateMaterial(index, "materialId", value);
                  }}
                >
                  <SelectTrigger className="h-10 w-full rounded-xl border-border">
                    <SelectValue placeholder="Select material" />
                  </SelectTrigger>

                  <SelectContent>
                    {availableMaterials.map((availableMaterial) => (
                      <SelectItem
                        key={availableMaterial.id}
                        value={availableMaterial.id}
                      >
                        {availableMaterial.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  type="number"
                  min="0"
                  step="0.1"
                  value={material.quantity}
                  onChange={(event) =>
                    updateMaterial(index, "quantity", event.target.value)
                  }
                  placeholder="Quantity"
                  className="rounded-xl border border-border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                />

                <Input
                  type="text"
                  value={material.unit}
                  onChange={(event) =>
                    updateMaterial(index, "unit", event.target.value)
                  }
                  placeholder="Unit"
                  className="rounded-xl border border-border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
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
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={addMaterial}
            className="inline-flex items-center gap-2 rounded-xl bg-transparent border border-dashed border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Plus className="size-4" />
            Add material
          </Button>
        </div>
      </FieldGroup>
    </Field>
  );
}
