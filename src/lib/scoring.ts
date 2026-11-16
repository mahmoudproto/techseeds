import type {
  Answers,
  ScoreResult,
  Strength,
  Tag,
  TechLevel,
  TestDefinition,
  Track,
} from './types';

const STRENGTH_ORDER: Tag[] = ['logic', 'pattern', 'math'];
const EXPERIENCE_CAP = 2;

export function score(test: TestDefinition, answers: Answers): ScoreResult | { error: string } {
  if (!answers || typeof answers !== 'object') return { error: 'answers missing' };

  let thinkingCorrect = 0;
  let thinkingTotal = 0;
  let techPoints = 0;
  const byTag: Record<Tag, { correct: number; total: number }> = {
    pattern: { correct: 0, total: 0 },
    math: { correct: 0, total: 0 },
    logic: { correct: 0, total: 0 },
  };
  const tracks: Partial<Record<Track, number>> = {};
  for (const t of test.tracks) tracks[t] = 0;

  for (const q of test.questions) {
    const answer = answers[q.id];

    if (q.kind === 'experience') {
      if (!Array.isArray(answer) || answer.length === 0) return { error: `missing ${q.id}` };
      const chosen = new Set(answer);
      let points = 0;
      for (const id of chosen) {
        const option = q.options.find((o) => o.id === id);
        if (!option) return { error: `bad option for ${q.id}` };
        points += option.points;
      }
      techPoints += Math.min(EXPERIENCE_CAP, points);
      continue;
    }

    if (typeof answer !== 'string') return { error: `missing ${q.id}` };

    if (q.kind === 'interest') {
      const option = q.options.find((o) => o.id === answer);
      if (!option) return { error: `bad option for ${q.id}` };
      tracks[option.track] = (tracks[option.track] ?? 0) + 1;
      continue;
    }

    if (!q.options.some((o) => o.id === answer)) return { error: `bad option for ${q.id}` };
    const isCorrect = answer === q.correct;
    if (q.kind === 'thinking') {
      thinkingTotal += 1;
      if (isCorrect) thinkingCorrect += 1;
      if (q.tag) {
        byTag[q.tag].total += 1;
        if (isCorrect) byTag[q.tag].correct += 1;
      }
    } else if (isCorrect) {
      techPoints += 1;
    }
  }

  let strength: Strength = 'start';
  let bestRatio = 0;
  for (const tag of STRENGTH_ORDER) {
    const { correct, total } = byTag[tag];
    const ratio = total === 0 ? 0 : correct / total;
    if (ratio > bestRatio) {
      bestRatio = ratio;
      strength = tag;
    }
  }

  const [basicFrom, advancedFrom] = test.techThresholds;
  const level: TechLevel =
    techPoints >= advancedFrom ? 'advanced' : techPoints >= basicFrom ? 'basic' : 'beginner';

  // Stable sort keeps the version's own track order between equal counts.
  const ranked = [...test.tracks].sort((a, b) => (tracks[b] ?? 0) - (tracks[a] ?? 0));
  const top = ranked[0];
  const runnerUp = ranked[1];
  const showSecond = test.tracks.length > 2 && runnerUp !== undefined && (tracks[runnerUp] ?? 0) > 0;
  const second = showSecond ? runnerUp : null;
  const tie = second !== null && tracks[second] === tracks[top];

  return {
    thinking: { correct: thinkingCorrect, total: thinkingTotal },
    strength,
    tech: { points: techPoints, max: test.techMax, level },
    tracks,
    top,
    second,
    tie,
  };
}
