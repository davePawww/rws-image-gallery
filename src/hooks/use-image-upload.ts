import { useCallback, useState } from 'react';

import { useImageGalleryStore } from '@/store/image-gallery.store';
import { processInputFiles } from '@/utils/process-input-files';

export function useImageUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const setPreviewOpen = useImageGalleryStore((state) => state.setPreviewOpen);
  const addPendingImage = useImageGalleryStore((state) => state.addPendingImage);

  const handleFiles = useCallback(
    async (files: File[]) => {
      const images = await processInputFiles(files);
      images.forEach((img) => addPendingImage(img));
      if (images.length > 0) setPreviewOpen(true);
    },
    [addPendingImage, setPreviewOpen],
  );

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
    handleFiles(Array.from(e.dataTransfer.files)).catch(console.error);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(Array.from(e.target.files || [])).catch(console.error);
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
