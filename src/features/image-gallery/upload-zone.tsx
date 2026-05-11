import { useState } from 'react';
import { FaUpload } from 'react-icons/fa6';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImagePreview } from '@/features/image-gallery/image-preview';
import { cn } from '@/lib/utils';
import { processInputFiles } from '@/utils/process-input-files';

export function UploadZone() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

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
    processInputFiles(Array.from(e.dataTransfer.files));
    setPreviewOpen(true);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    processInputFiles(Array.from(e.target.files || []));
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

      <ImagePreview open={previewOpen} onOpenChange={setPreviewOpen} />
    </>
  );
}
