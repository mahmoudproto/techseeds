import type { PublicQuestion, PublicTest, TestDefinition, TestLang, VersionId } from '../types';
import { versionA } from './versionA';
import { versionB } from './versionB';
import { versionC } from './versionC';

const TESTS: Record<VersionId, TestDefinition> = { A: versionA, B: versionB, C: versionC };

/** Arabic square letters used in the robot grid, and their English equivalents. */
const MARK_EN: Record<string, string> = { 'أ': 'A', 'ب': 'B', 'ج': 'C', 'د': 'D' };

export function getTest(version: VersionId): TestDefinition {
  return TESTS[version];
}

/** Strips everything that would reveal answers, points or track mapping, in the chosen language. */
export function toPublic(test: TestDefinition, lang: TestLang = 'ar'): PublicTest {
  const en = lang === 'en';
  const questions: PublicQuestion[] = test.questions.map((q) => {
    const program = en ? q.en?.program ?? q.program : q.program;
    let visual = q.visual;
    if (en && visual?.kind === 'robotGrid') {
      visual = { ...visual, marks: visual.marks.map((m) => ({ ...m, label: MARK_EN[m.label] ?? m.label })) };
    }
    return {
      id: q.id,
      section: q.kind === 'thinking' ? 'thinking' : q.kind === 'interest' ? 'interest' : 'tech',
      multi: q.kind === 'experience',
      prompt: en ? q.en?.prompt ?? q.prompt : q.prompt,
      ...(q.expr ? { expr: q.expr } : {}),
      ...(program ? { program } : {}),
      ...(visual ? { visual } : {}),
      options: q.options.map((o) => ({
        id: o.id,
        label: en ? o.en ?? o.label : o.label,
        ...(o.visual ? { visual: o.visual } : {}),
        ...('none' in o && o.none ? { exclusive: true } : {}),
      })),
    };
  });
  return { version: test.version, lang, questions };
}

export function allPublicTests(lang: TestLang = 'ar'): Record<VersionId, PublicTest> {
  return { A: toPublic(versionA, lang), B: toPublic(versionB, lang), C: toPublic(versionC, lang) };
}
