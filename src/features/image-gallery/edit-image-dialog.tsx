import { RotateCcw, RotateCw } from 'lucide-react';
import { useRef, useState } from 'react';
import type { ReactCropperElement } from 'react-cropper';
import { Cropper } from 'react-cropper';

import 'cropperjs/dist/cropper.css';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useImageGalleryStore } from '@/store/image-gallery.store';
import type { EditImageDialogProps } from '@/types/image-gallery.types';
import { rotateImage } from '@/utils/image-editor';
export function EditImageDialog({ image, open, onOpenChange }: EditImageDialogProps) {
  const updateImage = useImageGalleryStore((state) => state.updateImage);
  const cropperRef = useRef<ReactCropperElement>(null);
  const [previewSrc, setPreviewSrc] = useState(image.src);
  const [saving, setSaving] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const handleRotate = async (degrees: 90 | 180 | 270) => {
    const newSrc = await rotateImage(previewSrc, degrees);
    setPreviewSrc(newSrc);
  };
  const handleCropDone = () => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;
    const croppedCanvas = cropper.getCroppedCanvas();
    const newSrc = croppedCanvas.toDataURL('image/png');
    setPreviewSrc(newSrc);
    setIsCropping(false);
  };
  const handleSave = () => {
    setSaving(true);
    const byteSize = new Blob([previewSrc]).size;
    updateImage(image.id, { src: previewSrc, size: byteSize });
    setSaving(false);
    onOpenChange(false);
  };
  const handleCancel = () => {
    setPreviewSrc(image.src);
    setIsCropping(false);
    onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-3xl" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Edit - {image.name}</DialogTitle>
        </DialogHeader>
        <div className="relative overflow-hidden rounded-md" style={{ height: 420 }}>
          <Cropper
            ref={cropperRef}
            src={previewSrc}
            style={{ height: '100%', width: '100%' }}
            viewMode={1}
            guides={true}
            dragMode="crop"
            autoCropArea={0.8}
            cropBoxMovable={true}
            cropBoxResizable={true}
            toggleDragModeOnDblclick={false}
          />
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <Button variant="outline" onClick={() => void handleRotate(90)}>
            <RotateCw /> Rotate 90°
          </Button>
          <Button variant="outline" onClick={() => void handleRotate(180)}>
            <RotateCcw className="rotate-180" /> Rotate 180°
          </Button>
          <Button variant="outline" onClick={() => void handleRotate(270)}>
            <RotateCcw /> Rotate 270°
          </Button>
          {!isCropping ? (
            <Button variant="outline" onClick={() => setIsCropping(true)}>
              Crop
            </Button>
          ) : (
            <>
              <Button onClick={handleCropDone}>Apply Crop</Button>
              <Button variant="outline" onClick={() => setIsCropping(false)}>
                Cancel Crop
              </Button>
            </>
          )}
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
