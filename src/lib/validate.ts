import type { VersionId } from './types';

/** Converts Arabic-Indic and Persian digits to 0-9. */
export function toAsciiDigits(input: string): string {
  return input.replace(/[٠-٩۰-۹]/g, (ch) => {
    const code = ch.charCodeAt(0);
    return String(code >= 0x06f0 ? code - 0x06f0 : code - 0x0660);
  });
}

export function versionForAge(age: number): VersionId | null {
  if (!Number.isInteger(age)) return null;
  if (age >= 6 && age <= 9) return 'A';
  if (age >= 10 && age <= 13) return 'B';
  if (age >= 14 && age <= 18) return 'C';
  return null;
}

/** Returns an Egyptian mobile number as 01xxxxxxxxx, or null if it isn't one. */
export function normalizePhone(raw: string): string | null {
  let digits = toAsciiDigits(String(raw ?? '')).replace(/\D/g, '');
  if (digits.startsWith('0020')) digits = digits.slice(4);
  else if (digits.startsWith('20') && digits.length === 12) digits = digits.slice(2);
  if (digits.length === 10 && digits.startsWith('1')) digits = `0${digits}`;
  return /^01[0125]\d{8}$/.test(digits) ? digits : null;
}

/** Trims and collapses spaces. Returns null unless 2–60 characters remain. */
export function cleanName(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const name = raw.replace(/\s+/g, ' ').trim();
  return name.length >= 2 && name.length <= 60 ? name : null;
}
