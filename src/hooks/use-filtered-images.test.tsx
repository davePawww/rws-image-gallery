import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useFilteredImages } from '@/hooks/use-filtered-images';
import { useImageGalleryStore } from '@/store/image-gallery.store';
import type { Image } from '@/types/image-gallery.types';

function makeImage(overrides: Partial<Image> & { id: number }): Image {
  return {
    src: `/images/${overrides.id}.jpg`,
    name: `Image ${overrides.id}`,
    size: 1000,
    date: '2025-01-01',
    tags: [],
    ...overrides,
  };
}

describe('useFilteredImages hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    useImageGalleryStore.setState({
      images: [],
      filter: '',
      searchQuery: '',
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns all images when no filter or search query is set', () => {
    const images = [makeImage({ id: 1, tags: ['nature'] }), makeImage({ id: 2, tags: ['city'] })];

    act(() => {
      useImageGalleryStore.setState({ images });
    });

    const { result } = renderHook(() => useFilteredImages());

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toHaveLength(2);
    expect(result.current).toEqual(images);
  });

  it('filters images by tag when a filter is set', () => {
    act(() => {
      useImageGalleryStore.setState({
        images: [
          makeImage({ id: 1, tags: ['nature'] }),
          makeImage({ id: 2, tags: ['city'] }),
          makeImage({ id: 3, tags: ['nature', 'landscape'] }),
        ],
        filter: 'nature',
      });
    });

    const { result } = renderHook(() => useFilteredImages());

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toHaveLength(2);
    expect(result.current.map((img) => img.id)).toEqual([1, 3]);
  });

  it('filters by search query (case-insensitive)', () => {
    act(() => {
      useImageGalleryStore.setState({
        images: [
          makeImage({ id: 1, name: 'Sunset Beach' }),
          makeImage({ id: 2, name: 'Mountain View' }),
          makeImage({ id: 3, name: 'Beach sunset' }),
        ],
        searchQuery: 'sunset',
      });
    });

    const { result } = renderHook(() => useFilteredImages());

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toHaveLength(2);
    expect(result.current.map((img) => img.id)).toEqual([1, 3]);
  });

  it('combines tag filter and search query', () => {
    act(() => {
      useImageGalleryStore.setState({
        images: [
          makeImage({ id: 1, name: 'Sunset Beach', tags: ['nature'] }),
          makeImage({ id: 2, name: 'City Sunset', tags: ['city'] }),
          makeImage({ id: 3, name: 'Mountain Trail', tags: ['nature'] }),
        ],
        filter: 'nature',
        searchQuery: 'sunset',
      });
    });

    const { result } = renderHook(() => useFilteredImages());

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toHaveLength(1);
    expect(result.current[0].id).toBe(1);
  });
});
