import { useState } from 'react';

import { useImageGalleryStore } from '@/store/image-gallery.store';
import { processInputFiles } from '@/utils/process-input-files';

export function useImageUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const setPreviewOpen = useImageGalleryStore((state) => state.setPreviewOpen);

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
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

  return {
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInput,
  };
}
