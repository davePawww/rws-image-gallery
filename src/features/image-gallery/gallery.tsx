import { useImageGalleryStore } from '@/store/image-gallery.store';

export function Gallery() {
  const images = useImageGalleryStore((state) => state.images);

  return (
    <div>
      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {images.map((image) => (
            <div key={image.id} className="relative h-80 w-full overflow-hidden rounded-md">
              <img
                src={image.src}
                alt={image.name}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
