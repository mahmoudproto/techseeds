import { afterEach, describe, expect, it, vi } from 'vitest';
import { getTest } from '@/lib/content';
import { score } from '@/lib/scoring';
import { SHEET_HEADERS, buildRow, guardCell, sendRow } from '@/lib/sheet';
import type { Answers, ScoreResult } from '@/lib/types';

const B = getTest('B');

function allFirstOptions(): Answers {
  const answers: Answers = {};
  for (const q of B.questions) answers[q.id] = q.kind === 'experience' ? ['o1'] : 'o1';
  return answers;
}

describe('buildRow', () => {
  const answers = allFirstOptions();
  const result = score(B, answers) as ScoreResult;
  const row = buildRow(
    { childName: '=HYPERLINK("x")', age: 11, version: 'B', parentName: 'منة', phone: '01129877798', durationSec: 425, answers, laptop: 'yes', lang: 'en' },
    B,
    result,
    new Date('2026-11-16T08:30:00Z'),
  );

  it('has one value per header', () => {
    expect(row.length).toBe(SHEET_HEADERS.length);
  });

  it('writes Cairo time, the phone as typed and minutes to one decimal', () => {
    expect(row[0]).toBe('2026-11-16 10:30');
    expect(row[5]).toBe('01129877798');
    expect(row[13]).toBe('7.1');
  });

  it('writes scores in words so the sheet does not read them as dates', () => {
    expect(row[6]).toMatch(/^\d من 5$/);
    expect(row[8]).toMatch(/^\d من 6$/);
  });

  it('guards against formula injection', () => {
    expect(row[1].startsWith("'=")).toBe(true);
    expect(guardCell('+201')).toBe("'+201");
    expect(guardCell('@x')).toBe("'@x");
    expect(guardCell('-1')).toBe("'-1");
    expect(guardCell('عمر')).toBe('عمر');
  });

  it('adds the laptop answer and the test language at the end', () => {
    expect(row[15]).toBe('أيوه');
    expect(row[16]).toBe('English');
  });

  it('lists every answer with a mark for graded questions', () => {
    const lines = row[14].split('\n');
    expect(lines.length).toBe(15);
    expect(lines[0]).toBe('1) 18 ✗');
    expect(lines[2]).toBe('3) 20 ✓');
  });
});

describe('sendRow', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('returns false when the webhook URL is not set', async () => {
    vi.stubEnv('SHEET_WEBHOOK_URL', '');
    expect(await sendRow(['x'])).toBe(false);
  });

  it('returns false when the sheet cannot be reached, after two tries', async () => {
    vi.stubEnv('SHEET_WEBHOOK_URL', 'https://example.invalid/hook');
    const fetchMock = vi.fn().mockRejectedValue(new Error('down'));
    vi.stubGlobal('fetch', fetchMock);
    expect(await sendRow(['x'])).toBe(false);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('returns false when the reply is not the script\'s ok', async () => {
    vi.stubEnv('SHEET_WEBHOOK_URL', 'https://example.invalid/hook');
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('<html>login</html>', { status: 200 })));
    expect(await sendRow(['x'])).toBe(false);
  });

  it('returns true and sends headers, values and the secret', async () => {
    vi.stubEnv('SHEET_WEBHOOK_URL', 'https://example.invalid/hook');
    vi.stubEnv('SHEET_WEBHOOK_SECRET', 's3cret');
    const fetchMock = vi.fn().mockResolvedValue(Response.json({ ok: true }));
    vi.stubGlobal('fetch', fetchMock);
    expect(await sendRow(['a', 'b'])).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const sent = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(sent).toEqual({ secret: 's3cret', headers: SHEET_HEADERS, values: ['a', 'b'] });
  });
});
