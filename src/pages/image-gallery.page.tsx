import { Filter, Gallery, ImagePreview, Search, UploadZone } from '@/features/image-gallery';

export default function ImageGalleryPage() {
  return (
    <>
      <UploadZone />
      <Search />
      <Filter />
      <Gallery />
      <ImagePreview />
    </>
  );
}
