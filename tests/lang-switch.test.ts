import { describe, expect, it } from 'vitest';
import { otherLangPath } from '@/components/LangSwitch';

describe('otherLangPath', () => {
  it('maps Arabic pages to the same English page', () => {
    expect(otherLangPath('/', 'ar')).toBe('/en');
    expect(otherLangPath('/tracks/gamedev', 'ar')).toBe('/en/tracks/gamedev');
    expect(otherLangPath('/test', 'ar')).toBe('/en/test');
  });

  it('maps English pages to the same Arabic page', () => {
    expect(otherLangPath('/en', 'en')).toBe('/');
    expect(otherLangPath('/en/tracks/ai', 'en')).toBe('/tracks/ai');
    expect(otherLangPath('/en/test', 'en')).toBe('/test');
  });
});
