import type { Image } from '@/types/image-gallery.types';

export async function processInputFiles(files: File[]): Promise<Image[]> {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  const filtered = files.filter((file) => allowedTypes.includes(file.type));
  const results: Image[] = [];

  for (const file of filtered) {
    try {
      const src = await readFileAsDataURL(file);
      results.push({
        id: Date.now() + Math.random(),
        src,
        name: file.name,
        size: file.size,
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
