import { describe, expect, it } from 'vitest';
import { getTest } from '@/lib/content';
import { score } from '@/lib/scoring';
import type { Answers, ScoreResult, TestDefinition, Track, VersionId } from '@/lib/types';

/** Builds a full answer sheet. `interest` lists the track to pick for each interest question in order. */
function sheet(
  test: TestDefinition,
  opts: { correct?: boolean | string[]; experience?: string[]; interest?: Track[] } = {},
): Answers {
  const answers: Answers = {};
  let interestIndex = 0;
  for (const q of test.questions) {
    if (q.kind === 'experience') {
      answers[q.id] = opts.experience ?? [q.options.find((o) => o.none)!.id];
    } else if (q.kind === 'interest') {
      const track = opts.interest?.[interestIndex] ?? test.tracks[0];
      interestIndex += 1;
      answers[q.id] = q.options.find((o) => o.track === track)!.id;
    } else {
      const right = Array.isArray(opts.correct) ? opts.correct.includes(q.id) : opts.correct ?? false;
      answers[q.id] = right ? q.correct : q.options.find((o) => o.id !== q.correct && o.label !== 'مش عارف')!.id;
    }
  }
  return answers;
}

function ok(result: ScoreResult | { error: string }): ScoreResult {
  if ('error' in result) throw new Error(result.error);
  return result;
}

const B = getTest('B');
const A = getTest('A');
const C = getTest('C');

describe('score', () => {
  it('gives full marks for an all-correct sheet', () => {
    const r = ok(score(B, sheet(B, { correct: true, experience: ['o3'] })));
    expect(r.thinking).toEqual({ correct: 5, total: 5 });
    expect(r.tech).toEqual({ points: 6, max: 6, level: 'advanced' });
  });

  it('scores zero for wrong answers and "none"', () => {
    const r = ok(score(B, sheet(B)));
    expect(r.thinking.correct).toBe(0);
    expect(r.tech).toEqual({ points: 0, max: 6, level: 'beginner' });
    expect(r.strength).toBe('start');
  });

  it('scores "don\'t know" as zero', () => {
    const answers = sheet(B);
    for (const q of B.questions) {
      if (q.kind === 'tech') answers[q.id] = q.options.find((o) => o.label === 'مش عارف')!.id;
    }
    expect(ok(score(B, answers)).tech.points).toBe(0);
  });

  it('caps the experience question at 2 points', () => {
    const r = ok(score(B, sheet(B, { experience: ['o1', 'o2', 'o3', 'o4', 'o5'] })));
    expect(r.tech.points).toBe(2);
  });

  it.each([
    ['A', 1, 'beginner'], ['A', 2, 'basic'], ['A', 3, 'basic'], ['A', 4, 'advanced'],
    ['B', 2, 'beginner'], ['B', 3, 'basic'], ['B', 4, 'basic'], ['B', 5, 'advanced'],
    ['C', 2, 'beginner'], ['C', 3, 'basic'], ['C', 5, 'advanced'],
  ] as [VersionId, number, string][])('version %s with %i tech points is %s', (version, points, level) => {
    const test = getTest(version);
    const techIds = test.questions.filter((q) => q.kind === 'tech').map((q) => q.id);
    const knowledge = Math.min(points, techIds.length);
    const extra = points - knowledge;
    const exp = test.questions.find((q) => q.kind === 'experience')!;
    const experience =
      extra === 0
        ? undefined
        : exp.kind === 'experience'
          ? exp.options.filter((o) => o.points === 1).slice(0, extra).map((o) => o.id)
          : undefined;
    const r = ok(score(test, sheet(test, { correct: techIds.slice(0, knowledge), experience })));
    expect(r.tech.points).toBe(points);
    expect(r.tech.level).toBe(level);
  });

  it('picks the leading track in version A with no second', () => {
    const r = ok(score(A, sheet(A, { interest: ['programming', 'ai', 'programming'] })));
    expect(r.top).toBe('programming');
    expect(r.second).toBeNull();
    expect(r.tie).toBe(false);
    const r2 = ok(score(A, sheet(A, { interest: ['ai', 'ai', 'programming'] })));
    expect(r2.top).toBe('ai');
  });

  it('reports the top two tracks in version B', () => {
    const r = ok(score(B, sheet(B, { interest: ['cyber', 'cyber', 'cyber', 'ai', 'ai'] })));
    expect(r.top).toBe('cyber');
    expect(r.second).toBe('ai');
    expect(r.tie).toBe(false);
    expect(r.tracks).toEqual({ programming: 0, gamedev: 0, ai: 2, cyber: 3 });
  });

  it('flags a tie between the two leaders', () => {
    const r = ok(score(C, sheet(C, { interest: ['gamedev', 'gamedev', 'ai', 'ai', 'cyber'] })));
    expect(r.tie).toBe(true);
    expect([r.top, r.second].sort()).toEqual(['ai', 'gamedev']);
  });

  it('shows no second track when only one track got any picks', () => {
    const r = ok(score(B, sheet(B, { interest: ['ai', 'ai', 'ai', 'ai', 'ai'] })));
    expect(r.top).toBe('ai');
    expect(r.second).toBeNull();
  });

  it('picks the strongest thinking area, logic first on a tie', () => {
    // b1 pattern, b3 math, b4 logic all correct; b2 pattern and b5 logic wrong -> math 1/1 wins
    expect(ok(score(B, sheet(B, { correct: ['b1', 'b3', 'b4'] }))).strength).toBe('math');
    // b1+b2 pattern 2/2, b4+b5 logic 2/2, math 0 -> tie -> logic
    expect(ok(score(B, sheet(B, { correct: ['b1', 'b2', 'b4', 'b5'] }))).strength).toBe('logic');
    expect(ok(score(B, sheet(B, { correct: ['b1', 'b2'] }))).strength).toBe('pattern');
  });

  it('rejects missing, unknown or malformed answers', () => {
    const missing = sheet(B);
    delete missing.b7;
    expect(score(B, missing)).toHaveProperty('error');

    const unknown = sheet(B);
    unknown.b1 = 'zzz';
    expect(score(B, unknown)).toHaveProperty('error');

    const emptyMulti = sheet(B);
    emptyMulti.b10 = [];
    expect(score(B, emptyMulti)).toHaveProperty('error');

    const badInterest = sheet(B);
    badInterest.b11 = 'o9';
    expect(score(B, badInterest)).toHaveProperty('error');

    expect(score(B, null as unknown as Answers)).toHaveProperty('error');
  });
});
