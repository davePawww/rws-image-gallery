import type { CompressOptions } from '@/types/image-gallery.types';

export async function rotateImage(src: string, degrees: 90 | 180 | 270): Promise<string> {
  const img = await loadImage(src);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  if (degrees === 90 || degrees === 270) {
    canvas.width = img.naturalHeight;
    canvas.height = img.naturalWidth;
  } else {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
  }

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((degrees * Math.PI) / 180);
  ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);

  return canvas.toDataURL('image/png');
}

export async function cropImage(
  src: string,
  region: { x: number; y: number; width: number; height: number },
): Promise<string> {
  const img = await loadImage(src);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  canvas.width = region.width;
  canvas.height = region.height;
  ctx.drawImage(
    img,
    region.x,
    region.y,
    region.width,
    region.height,
    0,
    0,
    region.width,
    region.height,
  );

  return canvas.toDataURL('image/png');
}

export async function compressImage(
  dataUrl: string,
  options: CompressOptions = {},
): Promise<string> {
  const { maxWidth = 1920, maxHeight = 1920, quality = 0.8, format = 'image/jpeg' } = options;

  const img = await loadImage(dataUrl);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  let { naturalWidth: width, naturalHeight: height } = img;

  if (width > maxWidth) {
    height = Math.round((height * maxWidth) / width);
    width = maxWidth;
  }
  if (height > maxHeight) {
    width = Math.round((width * maxHeight) / height);
    height = maxHeight;
  }

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(img, 0, 0, width, height);

  return canvas.toDataURL(format, quality);
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
