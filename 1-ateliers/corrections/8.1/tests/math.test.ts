import { describe, it, expect } from 'vitest';
import { sumAndMultiply } from '../../6.1/src/math';

describe('Testing sumAndMultiply()', () => {
  it('should multiply each number by factor and return the sum', () => {
    // (1 * 2) + (2 * 2) + (3 * 2) = 12
    const result = sumAndMultiply(2, 1, 2, 3);
    expect(result).toBe(12);
  });

  it('should return 0 when no extra numbers are provided', () => {
    const result = sumAndMultiply(5);
    expect(result).toBe(0);
  });
});
