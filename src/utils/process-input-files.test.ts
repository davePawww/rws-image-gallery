import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/utils/image-editor', async () => {
  const actual =
    await vi.importActual<typeof import('@/utils/image-editor')>('@/utils/image-editor');
  return {
    ...actual,
    compressImage: vi.fn((dataUrl: string) => Promise.resolve(dataUrl)), // passthrough by default
  };
});

import * as imageEditor from '@/utils/image-editor';
import { processInputFiles } from '@/utils/process-input-files';

describe('processInputFiles', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'FileReader',
      class {
        onload: ((e: ProgressEvent<FileReader>) => void) | null = null;
        onerror: (() => void) | null = null;
        readAsDataURL() {
          this.onload?.({
            target: { result: 'data:image/jpeg;base64,abc' },
          } as unknown as ProgressEvent<FileReader>);
        }
      },
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('processes valid image files', async () => {
    const file = new File([''], 'photo.jpg', { type: 'image/jpeg' });
    const results = await processInputFiles([file]);
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('photo.jpg');
    // src is now the result of compressImage, which we mocked to return the input
    expect(results[0].src).toBe('data:image/jpeg;base64,abc');
    expect(results[0].tags).toEqual([]);
    // size is now blob.size, not file.size — will differ from original test
    expect(imageEditor.compressImage).toHaveBeenCalledWith('data:image/jpeg;base64,abc');
  });

  it('filters out invalid file types', async () => {
    const file = new File([''], 'doc.pdf', { type: 'application/pdf' });
    const results = await processInputFiles([file]);

    expect(results).toHaveLength(0);
  });

  it('skips files that fail to read', async () => {
    vi.stubGlobal(
      'FileReader',
      class {
        onload: unknown = null;
        onerror: (() => void) | null = null;
        readAsDataURL() {
          this.onerror?.();
        }
      },
    );
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const file = new File([''], 'photo.jpg', { type: 'image/jpeg' });

    const results = await processInputFiles([file]);

    expect(results).toHaveLength(0);
    expect(consoleSpy).toHaveBeenCalledWith('Failed to read file: photo.jpg');
    consoleSpy.mockRestore();
  });

  it('catches compressImage failures', async () => {
    vi.mocked(imageEditor.compressImage).mockRejectedValue(new Error('compress failed'));
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const file = new File([''], 'photo.jpg', { type: 'image/jpeg' });
    const results = await processInputFiles([file]);
    expect(results).toHaveLength(0);
    consoleSpy.mockRestore();
  });
});
