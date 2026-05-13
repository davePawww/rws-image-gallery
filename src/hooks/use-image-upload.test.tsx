import { act, cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useImageUpload } from '@/hooks/use-image-upload';
import { useImageGalleryStore } from '@/store/image-gallery.store';
import * as processInputFilesModule from '@/utils/process-input-files';

function TestComponent() {
  const { isDragging, handleDragOver, handleDragLeave, handleDrop, handleFileInput } =
    useImageUpload();

  return (
    <div
      data-testid="drop-zone"
      data-dragging={isDragging}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input data-testid="file-input" type="file" onChange={handleFileInput} multiple />
    </div>
  );
}

describe('useImageUpload', () => {
  beforeEach(() => {
    useImageGalleryStore.setState({
      images: [],
      pendingImages: [],
      previewOpen: false,
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('sets isDragging to true on dragover and false on dragleave', () => {
    const { getByTestId } = render(<TestComponent />);
    const zone = getByTestId('drop-zone');

    fireEvent.dragOver(zone);
    expect(zone).toHaveAttribute('data-dragging', 'true');

    fireEvent.dragLeave(zone);
    expect(zone).toHaveAttribute('data-dragging', 'false');
  });

  it('processes dropped files and adds them as pending images', async () => {
    const fakeImage = { id: 1, src: 'data:...', name: 'test.jpg', size: 100, date: '', tags: [] };
    vi.spyOn(processInputFilesModule, 'processInputFiles').mockResolvedValue([fakeImage]);

    const { getByTestId } = render(<TestComponent />);

    act(() => {
      fireEvent.drop(getByTestId('drop-zone'), {
        dataTransfer: { files: [new File([''], 'test.jpg', { type: 'image/jpeg' })] },
      });
    });

    await waitFor(() => {
      expect(useImageGalleryStore.getState().pendingImages).toHaveLength(1);
      expect(useImageGalleryStore.getState().previewOpen).toBe(true);
    });
  });

  it('does not open preview when processInputFiles returns empty array', async () => {
    vi.spyOn(processInputFilesModule, 'processInputFiles').mockResolvedValue([]);

    const { getByTestId } = render(<TestComponent />);

    act(() => {
      fireEvent.drop(getByTestId('drop-zone'), {
        dataTransfer: { files: [] },
      });
    });

    await waitFor(() => {
      expect(useImageGalleryStore.getState().previewOpen).toBe(false);
    });
  });

  it('clears the file input value after file selection', async () => {
    vi.spyOn(processInputFilesModule, 'processInputFiles').mockResolvedValue([]);

    const { getByTestId } = render(<TestComponent />);
    const input = getByTestId('file-input') as HTMLInputElement;

    act(() => {
      fireEvent.change(input, { target: { files: [] } });
    });

    await waitFor(() => {
      expect(input.value).toBe('');
    });
  });
});
