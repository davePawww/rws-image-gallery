import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useDebounce } from '@/hooks/use-debounce';

describe('useDebounce hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 500));
    expect(result.current).toBe('hello');
  });

  it('updates the debounced value after the delay', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'hello', delay: 300 },
    });

    rerender({ value: 'world', delay: 300 });

    // Expected: 'hello'
    // it should change at 301ms
    expect(result.current).toBe('hello');

    // Fast-forward
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe('world');
  });

  it('cancels the previous ttimeout when value changes rapidly (debounce behavior)', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'a', delay: 300 },
    });

    rerender({ value: 'b', delay: 300 });
    act(() => {
      vi.advanceTimersByTime(100);
    });

    rerender({ value: 'c', delay: 300 });

    // Expected is still the old value after only 100ms of the new timer
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe('a');

    // advance the timer
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe('c');
  });

  it('cleans up the timeout on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout');
    const { rerender, unmount } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'hello', delay: 300 },
    });

    rerender({ value: 'world', delay: 300 });
    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
