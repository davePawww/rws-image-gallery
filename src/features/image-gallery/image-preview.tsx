import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useImageGalleryStore } from '@/store/image-gallery.store';
import { formatDate, formatFileSize } from '@/utils/format';

export function ImagePreview() {
  const pendingImages = useImageGalleryStore((state) => state.pendingImages);
  const clearPendingImages = useImageGalleryStore((state) => state.clearPendingImages);
  const addImage = useImageGalleryStore((state) => state.addImage);
  const previewOpen = useImageGalleryStore((state) => state.previewOpen);
  const setPreviewOpen = useImageGalleryStore((state) => state.setPreviewOpen);
  const addPendingImageTag = useImageGalleryStore((state) => state.addPendingImageTag);
  const removePendingImageTag = useImageGalleryStore((state) => state.removePendingImageTag);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentImage = pendingImages[currentIndex];

  const handleConfirm = () => {
    addImage(currentImage);
    const nextIndex = currentIndex + 1;

    if (nextIndex >= pendingImages.length) {
      setCurrentIndex(0);
      clearPendingImages();
      setPreviewOpen(false);
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  const handleReject = () => {
    const nextIndex = currentIndex + 1;

    if (nextIndex >= pendingImages.length) {
      setCurrentIndex(0);
      clearPendingImages();
      setPreviewOpen(false);
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
      addPendingImageTag(currentImage.id, e.currentTarget.value.trim());
      e.currentTarget.value = '';
    }
  };

  if (!currentImage) return null;

  return (
    <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
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
              <DialogTitle className="line-clamp-1 w-5/6">{currentImage.name}</DialogTitle>
              <DialogDescription>
                Size: {formatFileSize(currentImage.size)} | Date: {formatDate(currentImage.date)}
              </DialogDescription>
            </DialogHeader>
            <div>
              <img
                src={currentImage.src}
                alt={currentImage.name}
                className="h-96 w-full rounded-md object-cover"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="tags">Tags:</Label>
              <div className="focus-within:border-ring focus-within:ring-ring/50 border-input flex w-full flex-wrap items-center gap-1.5 rounded-lg border bg-transparent px-2.5 py-1 focus-within:ring-3">
                {currentImage.tags.map((tag, i) => (
                  <Badge key={i} data-icon="inline-end" variant="outline">
                    {tag}
                    <Separator orientation="vertical" />
                    <Button
                      variant="ghost"
                      className="px-0"
                      onClick={() => removePendingImageTag(currentImage.id, tag)}
                    >
                      ×
                    </Button>
                  </Badge>
                ))}
                <Input
                  type="text"
                  id="tags"
                  className="h-auto w-auto flex-1 border-none bg-transparent px-0 py-0 focus-visible:border-transparent focus-visible:ring-0 dark:bg-transparent"
                  placeholder={currentImage.tags.length === 0 ? 'Add a tag…' : ''}
                  onKeyDown={handleKeyDown}
                />
              </div>
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
