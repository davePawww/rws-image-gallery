import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

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
    expect(results[0].src).toBe('data:image/jpeg;base64,abc');
    expect(results[0].tags).toEqual([]);
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
});
