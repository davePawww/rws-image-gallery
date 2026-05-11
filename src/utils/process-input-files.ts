import { useImageGalleryStore } from '@/store/image-gallery.store';

export const processInputFiles = (files: File[]) => {
  const { addPendingImage } = useImageGalleryStore.getState();
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
  const images = Array.from(files).filter((file) => allowedTypes.includes(file.type));

  images.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      addPendingImage({
        id: Date.now() + Math.random(),
        src: e.target?.result as string,
        name: file.name,
        size: file.size,
        date: new Date().toISOString(),
        tags: [],
      });
    };
    reader.readAsDataURL(file);
  });
};
