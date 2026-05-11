import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useImageGalleryStore } from '@/store/image-gallery.store';
import type { ImagePreviewProps } from '@/types/image-gallery.types';

export function ImagePreview({ open, onOpenChange }: ImagePreviewProps) {
  const pendingImages = useImageGalleryStore((state) => state.pendingImages);
  const addImage = useImageGalleryStore((state) => state.addImage);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentImage = pendingImages[currentIndex];

  const handleConfirm = () => {
    addImage(currentImage);
    const nextIndex = currentIndex + 1;

    if (nextIndex >= pendingImages.length) {
      setCurrentIndex(0);
      onOpenChange(false);
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  const handleReject = () => {
    const nextIndex = currentIndex + 1;

    if (nextIndex >= pendingImages.length) {
      setCurrentIndex(0);
      onOpenChange(false);
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  if (!currentImage) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        <motion.div
          key={currentImage.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ type: 'tween', ease: 'circOut', duration: 0.6 }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentImage.name}</DialogTitle>
              <DialogDescription>
                Size: {(currentImage.size / 1024).toFixed(2)} KB | Date:{' '}
                {new Date(currentImage.date).toLocaleString()}
              </DialogDescription>
            </DialogHeader>
            <div>
              <img
                src={currentImage.src}
                alt={currentImage.name}
                className="h-96 w-full rounded-md object-cover"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleConfirm}>
                Confirm
              </Button>
              <Button variant="destructive" onClick={handleReject}>
                Reject
              </Button>
            </DialogFooter>
          </DialogContent>
        </motion.div>
      </AnimatePresence>
    </Dialog>
  );
}
