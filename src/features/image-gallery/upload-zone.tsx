import { FaUpload } from 'react-icons/fa6';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useImageUpload } from '@/hooks/use-image-upload';
import { cn } from '@/lib/utils';

export function UploadZone() {
  const { isDragging, handleDragOver, handleDragLeave, handleDrop, handleFileInput } =
    useImageUpload();

  return (
    <Label
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        'text-foreground/70 bg-muted/50 hover:bg-muted/70 flex h-auto cursor-pointer flex-col rounded-md border border-dashed py-4',
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
  );
}
