import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { cropImage, rotateImage } from '@/utils/image-editor';

let mockContext: {
  translate: ReturnType<typeof vi.fn>;
  rotate: ReturnType<typeof vi.fn>;
  drawImage: ReturnType<typeof vi.fn>;
};

beforeEach(() => {
  mockContext = {
    translate: vi.fn(),
    rotate: vi.fn(),
    drawImage: vi.fn(),
  };
  // Mock Image so loadImage() resolves with known dimensions
  vi.stubGlobal(
    'Image',
    class MockImage {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      naturalWidth = 200;
      naturalHeight = 100;
      src = '';
      constructor() {
        // Fires after the real code has set img.onload and img.src
        setTimeout(() => this.onload?.(), 0);
      }
    },
  );
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
    mockContext as unknown as CanvasRenderingContext2D,
  );
  vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue('data:image/png;base64,mock');
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('rotateImage', () => {
  it('returns a data URL string', async () => {
    const result = await rotateImage('test.jpg', 90);
    expect(result).toBe('data:image/png;base64,mock');
  });

  it('swaps dimensions and translates to center for 90°', async () => {
    await rotateImage('test.jpg', 90);
    expect(mockContext.translate).toHaveBeenCalledWith(50, 100);
  });

  it('swaps dimensions and translates to center for 270°', async () => {
    await rotateImage('test.jpg', 270);
    expect(mockContext.translate).toHaveBeenCalledWith(50, 100);
  });

  it('keeps dimensions for 180°', async () => {
    await rotateImage('test.jpg', 180);
    expect(mockContext.translate).toHaveBeenCalledWith(100, 50);
  });

  it('rotates by the correct angle', async () => {
    await rotateImage('test.jpg', 90);
    expect(mockContext.rotate).toHaveBeenCalledWith(Math.PI / 2);
  });

  it('draws the image onto the canvas', async () => {
    await rotateImage('test.jpg', 90);
    expect(mockContext.drawImage).toHaveBeenCalledOnce();
  });
});

describe('cropImage', () => {
  it('returns a data URL string', async () => {
    const result = await cropImage('test.jpg', { x: 10, y: 20, width: 80, height: 60 });
    expect(result).toBe('data:image/png;base64,mock');
  });
  it('draws the cropped region from the source image', async () => {
    await cropImage('test.jpg', { x: 10, y: 20, width: 80, height: 60 });
    expect(mockContext.drawImage).toHaveBeenCalledWith(
      expect.anything(), // the Image element
      10,
      20, // source x, y
      80,
      60, // source w, h
      0,
      0, // dest x, y
      80,
      60, // dest w, h
    );
  });
});
