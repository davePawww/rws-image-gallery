import { lazy, Suspense } from 'react';

import {
  Count,
  Filter,
  GallerySkeleton,
  ImagePreview,
  Lightbox,
  Search,
  UploadZone,
} from '@/features/image-gallery';

const Gallery = lazy(async () => {
  const module = await import('@/features/image-gallery/gallery');

  return { default: module.Gallery };
});

export default function ImageGalleryPage() {
  return (
    <>
      <UploadZone />
      <Search />
      <div className="flex items-start justify-between gap-4">
        <Filter />
        <Count />
      </div>
      <Suspense fallback={<GallerySkeleton />}>
        <Gallery />
      </Suspense>
      <ImagePreview />
      <Lightbox />
    </>
  );
}
