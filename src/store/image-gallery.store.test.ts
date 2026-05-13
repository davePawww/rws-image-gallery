import { describe, expect, it } from 'vitest';

import { useImageGalleryStore } from '@/store/image-gallery.store';

describe('useImageGallery store', () => {
  it('adds pending images to the store', () => {
    useImageGalleryStore.getState().addPendingImage({
      id: 1,
      src: 'test.jpg',
      name: 'Test Image',
      size: 1024,
      date: '2023-01-01',
      tags: [],
    });

    expect(useImageGalleryStore.getState().pendingImages).toHaveLength(1);
  });

  it('adds images to the store', () => {
    useImageGalleryStore.getState().addImage({
      id: 2,
      src: 'test2.jpg',
      name: 'Test Image 2',
      size: 2048,
      date: '2023-01-02',
      tags: [],
    });

    expect(useImageGalleryStore.getState().images).toHaveLength(1);
  });

  it('sets preview open state', () => {
    useImageGalleryStore.getState().setPreviewOpen(true);
    expect(useImageGalleryStore.getState().previewOpen).toBe(true);

    useImageGalleryStore.getState().setPreviewOpen(false);
    expect(useImageGalleryStore.getState().previewOpen).toBe(false);
  });

  it('clears all pending images', () => {
    useImageGalleryStore.getState().addPendingImage({
      id: 3,
      src: 'test3.jpg',
      name: 'Test Image 3',
      size: 4096,
      date: '2023-01-03',
      tags: [],
    });

    useImageGalleryStore.getState().addPendingImage({
      id: 4,
      src: 'test4.jpg',
      name: 'Test Image 4',
      size: 4096,
      date: '2023-01-04',
      tags: [],
    });

    useImageGalleryStore.getState().clearPendingImages();
    expect(useImageGalleryStore.getState().pendingImages).toHaveLength(0);
  });

  it('removes an image by id', () => {
    useImageGalleryStore.getState().addImage({
      id: 5,
      src: 'test5.jpg',
      name: 'Test Image 5',
      size: 8192,
      date: '2023-01-05',
      tags: [],
    });

    useImageGalleryStore.getState().removeImage(2);
    expect(useImageGalleryStore.getState().images).toHaveLength(1);
    expect(useImageGalleryStore.getState().images[0].id).toBe(5);

    useImageGalleryStore.getState().removeImage(5);
    expect(useImageGalleryStore.getState().images).toHaveLength(0);
  });

  it('adds tags to pendingImages', () => {
    useImageGalleryStore.getState().addPendingImage({
      id: 1,
      src: 'test.jpg',
      name: 'Test Image',
      size: 1024,
      date: '2023-01-01',
      tags: [],
    });

    useImageGalleryStore.getState().addPendingImageTag(1, 'test');

    expect(useImageGalleryStore.getState().pendingImages[0].tags).toHaveLength(1);
    expect(useImageGalleryStore.getState().pendingImages[0].tags[0]).toBe('test');
  });

  it('removes tags from pendingImages', () => {
    useImageGalleryStore.getState().addPendingImage({
      id: 1,
      src: 'test.jpg',
      name: 'Test Image',
      size: 1024,
      date: '2023-01-01',
      tags: ['test'],
    });

    useImageGalleryStore.getState().removePendingImageTag(1, 'test');
    expect(useImageGalleryStore.getState().pendingImages[0].tags).toHaveLength(0);
  });

  it('updates the filter', () => {
    useImageGalleryStore.getState().updateFilter('test');

    expect(useImageGalleryStore.getState().filter).toBe('test');
  });
});
