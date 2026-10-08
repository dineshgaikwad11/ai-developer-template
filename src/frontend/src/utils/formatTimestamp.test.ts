import { describe, expect, it } from 'vitest';
import { formatTimestamp } from './formatTimestamp';

describe('formatTimestamp', () => {
  it('returns a readable date for valid timestamps', () => {
    expect(formatTimestamp('2025-01-01T12:00:00.000Z')).not.toBe('unknown');
  });

  it('returns a fallback for invalid timestamps', () => {
    expect(formatTimestamp('not-a-date')).toBe('unknown');
  });
});
