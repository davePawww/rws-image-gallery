import { useState } from 'react';
import { FaUpload } from 'react-icons/fa6';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImagePreview } from '@/features/image-gallery/image-preview';
import { cn } from '@/lib/utils';
import type { Image } from '@/types/image-gallery.types';

export function UploadZone() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [images, setImages] = useState<Image[]>([]);
  const [pendingImages, setPendingImages] = useState<Image[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const processFiles = (files: File[]) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
    const images = Array.from(files).filter((file) => allowedTypes.includes(file.type));

    images.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPendingImages((prevImages) => [
          ...prevImages,
          {
            id: Date.now() + Math.random(),
            src: e.target?.result as string,
            name: file.name,
            size: file.size,
            date: new Date().toISOString(),
            tags: [],
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(Array.from(e.dataTransfer.files));
    setPreviewOpen(true);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(Array.from(e.target.files || []));
    setPreviewOpen(true);
    e.target.value = '';
  };

  return (
    <>
      <Label
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'text-muted-foreground bg-muted/50 hover:bg-muted/70 flex h-auto cursor-pointer flex-col rounded-md border border-dashed py-4',
          isDragging && 'border-primary',
        )}
      >
        <p> {isDragging ? 'Drop your images here' : 'Drag and drop your images here'}</p>
        <p>or</p>
        <p className="flex items-center gap-2">
          <FaUpload />
          Click to browse files
        </p>
        <Input type="file" accept=".jpg,.jpeg,.png" multiple hidden onChange={handleFileInput} />
      </Label>
      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {images.map((image) => (
            <div key={image.id} className="relative h-80 w-full overflow-hidden rounded-md">
              <img
                src={image.src}
                alt={image.name}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      )}
      <ImagePreview
        images={pendingImages}
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        onConfirmImages={setImages}
      />
    </>
  );
}
