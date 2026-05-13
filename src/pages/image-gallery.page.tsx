import { Filter, Gallery, ImagePreview, UploadZone } from '@/features/image-gallery';

export default function ImageGalleryPage() {
  return (
    <>
      <UploadZone />
      <Filter />
      <Gallery />
      <ImagePreview />
    </>
  );
}
