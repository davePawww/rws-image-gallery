export type Image = {
  id: number;
  src: string;
  name: string;
  size: number;
  date: string;
  tags: string[];
};

export type ImagePreviewProps = {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ImageGalleryStore = {
  images: Image[];
  pendingImages: Image[];
  addPendingImage: (image: Image) => void;
  addImage: (image: Image) => void;
};
