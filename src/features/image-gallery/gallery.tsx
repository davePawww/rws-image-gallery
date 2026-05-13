import { EyeIcon, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from '@/components/ui/item';
import { useImageGalleryStore } from '@/store/image-gallery.store';
import { formatDate, formatFileSize } from '@/utils/format';

export function Gallery() {
  const images = useImageGalleryStore((state) => state.images);
  const removeImage = useImageGalleryStore((state) => state.removeImage);

  return (
    <div>
      {images.length > 0 && (
        <ItemGroup className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {images.map((image) => (
            <Item key={image.id} variant="outline">
              <ItemHeader>
                <img
                  src={image.src}
                  alt={image.name}
                  width={128}
                  height={128}
                  className="aspect-square w-full rounded-sm object-cover"
                />
              </ItemHeader>
              <ItemContent>
                <ItemTitle>{image.name}</ItemTitle>
                <ItemDescription className="text-xs">
                  {formatDate(image.date)} - {formatFileSize(image.size)}
                </ItemDescription>
              </ItemContent>
              <ItemFooter className="flex justify-end">
                <Button variant="outline" size="icon" aria-label={`Preview ${image.name}`}>
                  <EyeIcon />
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
          ))}
        </ItemGroup>
      )}
    </div>
  );
}
