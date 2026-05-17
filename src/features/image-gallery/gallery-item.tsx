import { EditIcon, EyeIcon, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemTitle,
} from '@/components/ui/item';
import { Label } from '@/components/ui/label';
import { EditImageDialog } from '@/features/image-gallery/edit-image-dialog';
import { GalleryItemSkeleton } from '@/features/image-gallery/skeleton';
import { useLazyLoad } from '@/hooks/use-lazy-load';
import { useImageGalleryStore } from '@/store/image-gallery.store';
import type { GalleryItemProps } from '@/types/image-gallery.types';
import { formatDate, formatFileSize } from '@/utils/format';

export function GalleryItem({ image, idx }: GalleryItemProps) {
  const { isVisible, elementRef } = useLazyLoad<HTMLDivElement>();
  const removeImage = useImageGalleryStore((state) => state.removeImage);
  const setLightboxOpen = useImageGalleryStore((state) => state.setLightboxOpen);
  const setSelectedImageIdx = useImageGalleryStore((state) => state.setSelectedImageIdx);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  if (!isVisible) {
    return (
      <div ref={elementRef}>
        <GalleryItemSkeleton />
      </div>
    );
  }

  return (
    <>
      <Item ref={elementRef} variant="outline">
        <ItemHeader className="flex flex-col items-start">
          <ItemTitle className="line-clamp-1">{image.name}</ItemTitle>
          <ItemDescription className="line-clamp-none text-xs">
            <span className="block">Date: {formatDate(image.date)}</span>
            <span>Size: {formatFileSize(image.size)}</span>
          </ItemDescription>
          <img
            src={image.src}
            alt={image.name}
            width={128}
            height={128}
            loading="lazy"
            className="aspect-square w-full rounded-sm object-cover"
          />
        </ItemHeader>
        <ItemContent>
          {image.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1">
              <Label className="text-xs">Tags: </Label>
              {image.tags.map((tag, tagIdx) => (
                <Badge key={tagIdx} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </ItemContent>
        <ItemFooter className="flex justify-end">
          <Button
            variant="outline"
            size="icon"
            aria-label={`Preview ${image.name}`}
            onClick={() => {
              setSelectedImageIdx(idx);
              setLightboxOpen(true);
            }}
          >
            <EyeIcon />
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label={`Edit ${image.name}`}
            onClick={() => setEditDialogOpen(true)}
          >
            <EditIcon />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            aria-label={`Delete ${image.name}`}
            onClick={() => removeImage(image.id)}
          >
            <Trash2 />
          </Button>
        </ItemFooter>
      </Item>
      <EditImageDialog image={image} open={editDialogOpen} onOpenChange={setEditDialogOpen} />
    </>
  );
}
