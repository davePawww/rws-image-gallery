import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { useImageGalleryStore } from '@/store/image-gallery.store';

export function Filter() {
  const filter = useImageGalleryStore((state) => state.filter);
  const images = useImageGalleryStore((state) => state.images);
  const updateFilter = useImageGalleryStore((state) => state.updateFilter);
  const filters = new Set(
    images.flatMap((img) => {
      return img.tags;
    }),
  );

  if (filters.size === 0) return null;

  return (
    <div className="mt-2 flex flex-wrap gap-2">
      <Label className="text-xs">Filter by tags: </Label>
      {[...filters].map((fltr, idx) => (
        <Badge
          key={idx}
          variant={filter === fltr ? 'secondary' : 'outline'}
          className="cursor-pointer"
          onClick={() => updateFilter(fltr)}
        >
          {fltr}
        </Badge>
      ))}
    </div>
  );
}
