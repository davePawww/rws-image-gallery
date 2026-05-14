import { Label } from '@/components/ui/label';
import { useFilteredImages } from '@/hooks/use-filtered-images';

export function Count() {
  const filteredImages = useFilteredImages();

  if (filteredImages.length === 0) return null;

  return (
    <div className="mt-2 ml-auto flex items-center gap-2">
      <Label className="text-xs" htmlFor="count">
        Count:
      </Label>
      <p id="count" className="text-xs">
        {filteredImages.length}
      </p>
    </div>
  );
}
