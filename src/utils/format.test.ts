import { describe, expect, it } from 'vitest';

import { formatDate, formatFileSize } from '@/utils/format';

describe('formatFileSize', () => {
  it('formats bytes', () => {
    expect(formatFileSize(500)).toBe('500 B');
  });

  it('formats kilobytes', () => {
    expect(formatFileSize(2048)).toBe('2.0 KB');
  });

  it('formats megabytes', () => {
    expect(formatFileSize(5 * 1024 * 1024)).toBe('5.0 MB');
  });

  it('formats gigabytes', () => {
    expect(formatFileSize(3 * 1024 * 1024 * 1024)).toBe('3.0 GB');
  });
});

describe('formatDate', () => {
  it('formats an ISO string into a readable date', () => {
    const result = formatDate('2023-01-01T12:00:00Z');
    expect(result).toMatch(/Jan/);
    expect(result).toMatch(/2023/);
  });
});
