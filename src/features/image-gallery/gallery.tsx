import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from '@/components/ui/item';
import { useImageGalleryStore } from '@/store/image-gallery.store';
import { formatDate, formatFileSize } from '@/utils/format';

export function Gallery() {
  const images = useImageGalleryStore((state) => state.images);

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
                <ItemDescription>
                  <p>{formatDate(image.date)}</p>
                  <p>{formatFileSize(image.size)}</p>
                </ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      )}
    </div>
  );
}
