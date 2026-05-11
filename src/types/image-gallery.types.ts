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
  addPendingImage: (image: Image) => void;
  addImage: (image: Image) => void;
  setPreviewOpen: (open: boolean) => void;
  clearPendingImages: () => void;
};
