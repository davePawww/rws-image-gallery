import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useImageGalleryStore } from '@/store/image-gallery.store';

export function Search() {
  const images = useImageGalleryStore((state) => state.images);
  const searchQuery = useImageGalleryStore((state) => state.searchQuery);
  const setSearchQuery = useImageGalleryStore((state) => state.setSearchQuery);

  if (images.length === 0) return null;

  return (
    <div className="mt-4 flex items-center gap-2">
      <Label htmlFor="search-bar" className="text-xs">
        Search:
      </Label>
      <Input
        id="search-bar"
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}
