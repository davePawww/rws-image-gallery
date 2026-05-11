import { create } from 'zustand';

import type { ImageGalleryStore, Image } from '@/types/image-gallery.types';

export const useImageGalleryStore = create<ImageGalleryStore>((set) => ({
  images: [],
  pendingImages: [],
  previewOpen: false,
  addPendingImage: (image: Image) =>
    set((state) => ({ pendingImages: [...state.pendingImages, image] })),
  addImage: (image: Image) => set((state) => ({ images: [...state.images, image] })),
  setPreviewOpen: (open: boolean) => set({ previewOpen: open }),
  clearPendingImages: () => set({ pendingImages: [] }),
}));
