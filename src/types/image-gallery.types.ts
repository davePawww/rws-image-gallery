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
  selectedImageIdx: number | null;
  previewOpen: boolean;
  lightboxOpen: boolean;
  filter: string;
  searchQuery: string;
  addImage: (image: Image) => void;
  addPendingImage: (image: Image) => void;
  setSelectedImageIdx: (idx: number) => void;
  setPreviewOpen: (open: boolean) => void;
  setLightboxOpen: (open: boolean) => void;
  clearPendingImages: () => void;
  removeImage: (id: number) => void;
  addPendingImageTag: (id: number, tag: string) => void;
  removePendingImageTag: (id: number, tag: string) => void;
  updateFilter: (newFilter: string) => void;
  setSearchQuery: (query: string) => void;
  updateImage: (id: number, updates: Partial<Pick<Image, 'src' | 'name' | 'size'>>) => void;
};

export type GalleryItemProps = {
  image: Image;
  idx: number;
};

export type EditImageDialogProps = {
  image: Image;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export type CompressOptions = {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'image/jpeg' | 'image/png';
};
