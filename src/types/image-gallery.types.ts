export type Image = {
  id: number;
  src: string;
  name: string;
  size: number;
  date: string;
  tags: string[];
};

export type ImagePreviewProps = {
  images: Image[];
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirmImages: React.Dispatch<React.SetStateAction<Image[]>>;
};
