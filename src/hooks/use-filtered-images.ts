import { useMemo } from 'react';

import { useDebounce } from '@/hooks/use-debounce';
import { useImageGalleryStore } from '@/store/image-gallery.store';

export function useFilteredImages() {
  const images = useImageGalleryStore((state) => state.images);
  const filter = useImageGalleryStore((state) => state.filter);
  const searchQuery = useImageGalleryStore((state) => state.searchQuery);
  const debouncedValue = useDebounce(searchQuery, 500);

  return useMemo(
    () =>
      images
        .filter((img) => (filter ? img.tags.includes(filter) : img))
        .filter((img) => img.name.toLocaleLowerCase().includes(debouncedValue.toLocaleLowerCase())),
    [images, filter, debouncedValue],
  );
}
