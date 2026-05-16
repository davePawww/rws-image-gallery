import { create } from 'zustand';

import type { ImageGalleryStore, Image } from '@/types/image-gallery.types';

export const useImageGalleryStore = create<ImageGalleryStore>((set) => ({
  images: [],
  pendingImages: [],
  selectedImageIdx: null,
  previewOpen: false,
  lightboxOpen: false,
  filter: '',
  searchQuery: '',
  addImage: (image: Image) => set((state) => ({ images: [...state.images, image] })),
  addPendingImage: (image: Image) =>
    set((state) => ({ pendingImages: [...state.pendingImages, image] })),
  setSelectedImageIdx: (idx: number) => set({ selectedImageIdx: idx }),
  setPreviewOpen: (open: boolean) => set({ previewOpen: open }),
  setLightboxOpen: (open: boolean) => set({ lightboxOpen: open }),
  clearPendingImages: () => set({ pendingImages: [] }),
  removeImage: (id: number) =>
    set((state) => ({ images: state.images.filter((img) => img.id !== id) })),
  addPendingImageTag: (id: number, tag: string) =>
    set((state) => ({
      pendingImages: state.pendingImages.map((img) =>
        img.id === id ? { ...img, tags: [...img.tags, tag] } : img,
      ),
    })),
  removePendingImageTag: (id: number, tag: string) =>
    set((state) => ({
      pendingImages: state.pendingImages.map((img) =>
        img.id === id ? { ...img, tags: img.tags.filter((t) => t !== tag) } : img,
      ),
    })),
  updateFilter: (newFilter: string) =>
    set((state) => ({ filter: newFilter !== state.filter ? newFilter : '' })),
  setSearchQuery: (query: string) => set({ searchQuery: query }),
}));
