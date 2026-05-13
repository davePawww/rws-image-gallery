import { EyeIcon, Trash2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
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
import { Label } from '@/components/ui/label';
import { useImageGalleryStore } from '@/store/image-gallery.store';
import { formatDate, formatFileSize } from '@/utils/format';

export function Gallery() {
  const images = useImageGalleryStore((state) => state.images);
  const filter = useImageGalleryStore((state) => state.filter);
  const removeImage = useImageGalleryStore((state) => state.removeImage);
  const filteredImages = images.filter((img) =>
    filter !== null ? img.tags.includes(filter) : img,
  );

  return (
    <div>
      {filteredImages.length > 0 && (
        <ItemGroup className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {filteredImages.map((image) => (
            <Item key={image.id} variant="outline">
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
                  className="aspect-square w-full rounded-sm object-cover"
                />
              </ItemHeader>
              <ItemContent>
                {image.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1">
                    <Label className="text-xs">Tags: </Label>
                    {image.tags.map((tag, i) => (
                      <Badge key={i} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
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
