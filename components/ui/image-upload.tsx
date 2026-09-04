"use client";

import Image from "next/image";
import { ImagePlus, Loader2, X } from "lucide-react";
import { useRef, useState } from "react";

import { useUploadThing } from "@/lib/uploadthing";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string) => void;
  onRemove: () => void;
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [localPreview, setLocalPreview] = useState<string | null>(null);

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      const url = res[0]?.url;

      if (!url) return;

      setLocalPreview(null);
      onChange(url);
    },

    onUploadError: (error) => {
      console.error("Image upload failed:", error);
      setLocalPreview(null);
    },
  });

  const preview = localPreview ?? value ?? null;

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      console.error("Only image files are allowed");
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      console.error("Image must be smaller than 4 MB");
      return;
    }

    const objectUrl = URL.createObjectURL(file);

    setLocalPreview(objectUrl);

    await startUpload([file]);

    URL.revokeObjectURL(objectUrl);
  };

  const handleRemove = () => {
    setLocalPreview(null);
    onRemove();

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {preview ? (
        <div className="relative overflow-hidden rounded-2xl border border-border/50">
          <div className="relative aspect-video w-full">
            <Image
              src={preview}
              alt="Image preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </div>

          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
              <Loader2 className="size-6 animate-spin" />
            </div>
          )}

          {!isUploading && (
            <div className="absolute right-3 top-3 flex gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="rounded-xl bg-background/90 px-3 py-2 text-sm font-medium shadow"
              >
                Change
              </button>

              <button
                type="button"
                onClick={handleRemove}
                className="flex size-9 items-center justify-center rounded-xl bg-background/90 shadow"
                aria-label="Remove image"
              >
                <X className="size-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/70 bg-muted/30 text-muted-foreground transition-colors hover:bg-muted/50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isUploading ? (
            <Loader2 className="size-6 animate-spin" />
          ) : (
            <ImagePlus className="size-6" />
          )}

          <div className="text-center">
            <p className="font-medium text-foreground">
              {isUploading ? "Uploading..." : "Upload image"}
            </p>

            <p className="mt-1 text-xs">JPG, PNG or WebP · max. 4 MB</p>
          </div>
        </button>
      )}
    </div>
  );
}
