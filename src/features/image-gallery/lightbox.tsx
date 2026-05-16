import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useFilteredImages } from '@/hooks/use-filtered-images';
import { useImageGalleryStore } from '@/store/image-gallery.store';
import { formatDate, formatFileSize } from '@/utils/format';

export function Lightbox() {
  const filteredImages = useFilteredImages();
  const lightboxOpen = useImageGalleryStore((state) => state.lightboxOpen);
  const setLightboxOpen = useImageGalleryStore((state) => state.setLightboxOpen);
  const selectedImageIdx = useImageGalleryStore((state) => state.selectedImageIdx);
  const setSelectedImageIdx = useImageGalleryStore((state) => state.setSelectedImageIdx);

  const handleNext = () => {
    if (selectedImageIdx !== null && selectedImageIdx < filteredImages.length - 1) {
      setSelectedImageIdx(selectedImageIdx + 1);
    }
  };

  const handlePrev = () => {
    if (selectedImageIdx !== null && selectedImageIdx > 0) {
      setSelectedImageIdx(selectedImageIdx - 1);
    }
  };

  if (selectedImageIdx === null) return null;

  return (
    <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ type: 'tween', ease: 'circOut', duration: 0.6 }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="line-clamp-1 w-5/6">
                {filteredImages[selectedImageIdx].name}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-xs">
                <span className="block">
                  Date: {formatDate(filteredImages[selectedImageIdx].date)}
                </span>
                <span>Size: {formatFileSize(filteredImages[selectedImageIdx].size)}</span>
              </DialogDescription>
            </DialogHeader>
            <div className="py-2">
              <img
                src={filteredImages[selectedImageIdx].src}
                alt={filteredImages[selectedImageIdx].name}
                className="h-96 w-full rounded-md object-cover"
              />
              <div className="flex flex-wrap gap-1 pt-2">
                {filteredImages[selectedImageIdx].tags.map((tag, i) => (
                  <Badge key={i} data-icon="inline-end" variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" disabled={selectedImageIdx === 0} onClick={handlePrev}>
                <ArrowLeft />
              </Button>
              <Button
                disabled={selectedImageIdx === filteredImages.length - 1}
                onClick={handleNext}
              >
                <ArrowRight />
              </Button>
            </DialogFooter>
          </DialogContent>
        </motion.div>
      </AnimatePresence>
    </Dialog>
  );
}
