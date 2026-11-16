import { describe, expect, it } from 'vitest';
import { getTest, toPublic } from '@/lib/content';
import type { VersionId } from '@/lib/types';

const expected: Record<VersionId, { thinking: number; tech: number; experience: number; interest: number }> = {
  A: { thinking: 4, tech: 2, experience: 1, interest: 3 },
  B: { thinking: 5, tech: 4, experience: 1, interest: 5 },
  C: { thinking: 5, tech: 4, experience: 1, interest: 5 },
};

describe.each(['A', 'B', 'C'] as VersionId[])('version %s content', (version) => {
  const test = getTest(version);

  it('has the right number of questions per part', () => {
    const counts = { thinking: 0, tech: 0, experience: 0, interest: 0 };
    for (const q of test.questions) counts[q.kind] += 1;
    expect(counts).toEqual(expected[version]);
  });

  it('has unique question ids and unique option ids per question', () => {
    const ids = test.questions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const q of test.questions) {
      const optionIds = q.options.map((o) => o.id);
      expect(new Set(optionIds).size).toBe(optionIds.length);
    }
  });

  it('points every correct answer at a real option', () => {
    for (const q of test.questions) {
      if (q.kind === 'thinking' || q.kind === 'tech') {
        expect(q.options.some((o) => o.id === q.correct)).toBe(true);
      }
    }
  });

  it('gives every thinking question a tag and every tech question a "don\'t know" option', () => {
    for (const q of test.questions) {
      if (q.kind === 'thinking') expect(q.tag).toBeDefined();
      if (q.kind === 'tech') expect(q.options.some((o) => o.label === 'مش عارف')).toBe(true);
    }
  });

  it('offers each of the version tracks exactly once in every interest question', () => {
    for (const q of test.questions) {
      if (q.kind !== 'interest') continue;
      expect(q.options.map((o) => o.track).sort()).toEqual([...test.tracks].sort());
    }
  });

  it('has one exclusive "none" option in the experience question', () => {
    for (const q of test.questions) {
      if (q.kind !== 'experience') continue;
      expect(q.options.filter((o) => o.none).length).toBe(1);
    }
  });

  it('tech max equals knowledge questions plus the experience cap', () => {
    const knowledge = test.questions.filter((q) => q.kind === 'tech').length;
    expect(test.techMax).toBe(knowledge + 2);
  });

  it('does not leak answers, points or tracks to the browser', () => {
    const json = JSON.stringify(toPublic(test));
    expect(json).not.toContain('"correct"');
    expect(json).not.toContain('"track"');
    expect(json).not.toContain('"points"');
    expect(json).not.toContain('"tag"');
    expect(toPublic(test).questions.length).toBe(test.questions.length);
  });
});

describe('known answers', () => {
  const label = (version: VersionId, id: string) => {
    const q = getTest(version).questions.find((x) => x.id === id);
    if (!q || (q.kind !== 'thinking' && q.kind !== 'tech')) throw new Error(id);
    return q.options.find((o) => o.id === q.correct)?.label;
  };

  it('matches the approved answer key', () => {
    expect(label('A', 'a1')).toBe('دايرة زرقا');
    expect(label('A', 'a2')).toBe('4 نقط');
    expect(label('A', 'a3')).toBe('12');
    expect(label('A', 'a4')).toBe('6');
    expect(label('A', 'a5')).toBe('الكيبورد');
    expect(label('B', 'b1')).toBe('32');
    expect(label('B', 'b2')).toBe('دايرة زرقا');
    expect(label('B', 'b3')).toBe('20');
    expect(label('B', 'b4')).toBe('يوسف');
    expect(label('B', 'b5')).toBe('المربع ب');
    expect(label('B', 'b6')).toBe('Google Chrome');
    expect(label('B', 'b7')).toBe('T!ger#92mK');
    expect(label('C', 'c1')).toBe('42');
    expect(label('C', 'c2')).toBe('200');
    expect(label('C', 'c3')).toBe('6');
    expect(label('C', 'c4')).toBe('9');
    expect(label('C', 'c5')).toBe('5');
    expect(label('C', 'c6')).toBe('Windows');
  });

  it('agrees with the arithmetic', () => {
    expect(15 + 4 * 3 - 7).toBe(20);
    expect((35 + 11 + 4) * 4).toBe(200);
    let x = 5;
    x = x > 3 ? x * 2 : x + 1;
    x -= 4;
    expect(x).toBe(6);
  });

  it('puts the robot on square ب after: forward 2, turn right, forward 1', () => {
    const q = getTest('B').questions.find((x) => x.id === 'b5');
    if (!q || q.visual?.kind !== 'robotGrid') throw new Error('b5');
    const [col, row] = q.visual.start;
    const end: [number, number] = [col + 1, row - 2];
    expect(q.visual.marks.find((m) => m.label === 'ب')?.at).toEqual(end);
  });
});
