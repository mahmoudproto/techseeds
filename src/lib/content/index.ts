import type { PublicQuestion, PublicTest, TestDefinition, VersionId } from '../types';
import { versionA } from './versionA';
import { versionB } from './versionB';
import { versionC } from './versionC';

const TESTS: Record<VersionId, TestDefinition> = { A: versionA, B: versionB, C: versionC };

export function getTest(version: VersionId): TestDefinition {
  return TESTS[version];
}

/** Strips everything that would reveal answers, points or track mapping. */
export function toPublic(test: TestDefinition): PublicTest {
  const questions: PublicQuestion[] = test.questions.map((q) => ({
    id: q.id,
    section: q.kind === 'thinking' ? 'thinking' : q.kind === 'interest' ? 'interest' : 'tech',
    multi: q.kind === 'experience',
    prompt: q.prompt,
    ...(q.expr ? { expr: q.expr } : {}),
    ...(q.visual ? { visual: q.visual } : {}),
    options: q.options.map((o) => ({
      id: o.id,
      label: o.label,
      ...(o.visual ? { visual: o.visual } : {}),
      ...('none' in o && o.none ? { exclusive: true } : {}),
    })),
  }));
  return { version: test.version, questions };
}

export function allPublicTests(): Record<VersionId, PublicTest> {
  return { A: toPublic(versionA), B: toPublic(versionB), C: toPublic(versionC) };
}
