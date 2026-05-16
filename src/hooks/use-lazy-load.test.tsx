import { act, cleanup, render, screen } from '@testing-library/react';
import { beforeEach, afterEach, describe, vi, it, expect } from 'vitest';

import { useLazyLoad } from '@/hooks/use-lazy-load';

const observe = vi.fn();
const unobserve = vi.fn();
const disconnect = vi.fn();

let intersectionCallback: IntersectionObserverCallback;
let observerOptions: IntersectionObserverInit | undefined;

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds = [];
  readonly scrollMargin = '';
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    intersectionCallback = callback;
    observerOptions = options;
  }
  observe = observe;
  unobserve = unobserve;
  disconnect = disconnect;
  takeRecords() {
    return [];
  }
}

function TestComponent() {
  const { isVisible, elementRef } = useLazyLoad<HTMLDivElement>();

  return (
    <>
      <div ref={elementRef} data-testid="target" />
      <span data-testid="visible">{String(isVisible)}</span>
    </>
  );
}

describe('useLazyLoad', () => {
  beforeEach(() => {
    observe.mockClear();
    unobserve.mockClear();
    disconnect.mockClear();
    observerOptions = undefined;

    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    cleanup();
  });

  it('observes the element with the expected options', () => {
    render(<TestComponent />);
    const target = screen.getByTestId('target');

    expect(screen.getByTestId('visible')).toHaveTextContent('false');
    expect(observe).toHaveBeenCalledWith(target);
    expect(observerOptions).toEqual({
      threshold: 0.1,
      rootMargin: '50px',
    });
  });

  it('sets isVisible to true and unobserves when intersecting', () => {
    render(<TestComponent />);
    const target = screen.getByTestId('target');

    act(() => {
      intersectionCallback(
        [
          {
            isIntersecting: true,
          } as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      );
    });

    expect(screen.getByTestId('visible')).toHaveTextContent('true');
    expect(unobserve).toHaveBeenCalledWith(target);
  });

  it('disconnects the observer on unmount', () => {
    const { unmount } = render(<TestComponent />);
    unmount();
    expect(disconnect).toHaveBeenCalled();
  });
});
