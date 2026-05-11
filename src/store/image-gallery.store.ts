import { create } from 'zustand';

import type { ImageGalleryStore, Image } from '@/types/image-gallery.types';

export const useImageGalleryStore = create<ImageGalleryStore>((set) => ({
  pendingImages: [],
  addPendingImage: (image: Image) =>
    set((state) => ({ pendingImages: [...state.pendingImages, image] })),
}));
