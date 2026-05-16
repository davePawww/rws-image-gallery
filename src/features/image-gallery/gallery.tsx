import { ItemGroup } from '@/components/ui/item';
import { GalleryItem } from '@/features/image-gallery/gallery-item';
import { useFilteredImages } from '@/hooks/use-filtered-images';

export function Gallery() {
  const filteredImages = useFilteredImages();

  return (
    <div>
      {filteredImages.length > 0 && (
        <ItemGroup className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {filteredImages.map((image, idx) => (
            <GalleryItem key={image.id} image={image} idx={idx} />
          ))}
        </ItemGroup>
      )}
    </div>
  );
}
