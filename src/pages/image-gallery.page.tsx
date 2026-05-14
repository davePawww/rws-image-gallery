import { Count, Filter, Gallery, ImagePreview, Search, UploadZone } from '@/features/image-gallery';

export default function ImageGalleryPage() {
  return (
    <>
      <UploadZone />
      <Search />
      <div className="flex items-start justify-between gap-4">
        <Filter />
        <Count />
      </div>
      <Gallery />
      <ImagePreview />
    </>
  );
}
