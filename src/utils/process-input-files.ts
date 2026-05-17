import type { Image } from '@/types/image-gallery.types';
import { compressImage } from '@/utils/image-editor';

export async function processInputFiles(files: File[]): Promise<Image[]> {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  const filtered = files.filter((file) => allowedTypes.includes(file.type));
  const results: Image[] = [];

  for (const file of filtered) {
    try {
      const dataUrl = await readFileAsDataURL(file);
      const compressed = await compressImage(dataUrl);
      const blob = await (await fetch(compressed)).blob();
      results.push({
        id: Date.now() + Math.random(),
        src: compressed,
        name: file.name,
        size: blob.size,
        date: new Date().toISOString(),
        tags: [],
      });
    } catch {
      console.error(`Failed to read file: ${file.name}`);
    }
  }

  return results;
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('FileReader result was not a string'));
      }
    };
    reader.onerror = () => reject(new Error(`Failed to read file: ${file.name}`));
    reader.readAsDataURL(file);
  });
}
