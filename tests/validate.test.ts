import { describe, expect, it } from 'vitest';
import { cleanName, normalizePhone, versionForAge } from '@/lib/validate';

describe('versionForAge', () => {
  it('maps ages to versions', () => {
    expect([5, 6, 9, 10, 13, 14, 18, 19].map(versionForAge)).toEqual([
      null, 'A', 'A', 'B', 'B', 'C', 'C', null,
    ]);
  });
  it('rejects non-integers', () => {
    expect(versionForAge(7.5)).toBeNull();
    expect(versionForAge(Number.NaN)).toBeNull();
  });
});

describe('normalizePhone', () => {
  it('accepts Egyptian mobiles in common spellings', () => {
    for (const raw of ['01129877798', '+20 112 987 7798', '٠١١٢٩٨٧٧٧٩٨', '0020-1129877798', '1129877798']) {
      expect(normalizePhone(raw)).toBe('01129877798');
    }
  });
  it('rejects landlines, short numbers and junk', () => {
    for (const raw of ['0212345678', '0112987779', '01329877798', 'abc', '']) {
      expect(normalizePhone(raw)).toBeNull();
    }
  });
});

describe('cleanName', () => {
  it('trims and collapses spaces', () => {
    expect(cleanName('  عمر   أحمد ')).toBe('عمر أحمد');
  });
  it('rejects too short, too long and non-strings', () => {
    expect(cleanName('ع')).toBeNull();
    expect(cleanName('ع'.repeat(61))).toBeNull();
    expect(cleanName(42)).toBeNull();
  });
});
