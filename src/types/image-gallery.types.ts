export type Image = {
  id: number;
  src: string;
  name: string;
  size: number;
  date: string;
  tags: string[];
};

export type ImageGalleryStore = {
  images: Image[];
  pendingImages: Image[];
  previewOpen: boolean;
  filter: string | null;
  addPendingImage: (image: Image) => void;
  addImage: (image: Image) => void;
  setPreviewOpen: (open: boolean) => void;
  clearPendingImages: () => void;
  removeImage: (id: number) => void;
  addPendingImageTag: (id: number, tag: string) => void;
  removePendingImageTag: (id: number, tag: string) => void;
  updateFilter: (newFilter: string) => void;
};
