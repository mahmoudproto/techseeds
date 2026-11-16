import { LEVEL_LABEL, STRENGTH_LABEL, TRACK_LABEL } from './labels';
import type { Answers, ScoreResult, TestDefinition, VersionId } from './types';

export interface SubmissionInput {
  childName: string;
  age: number;
  version: VersionId;
  parentName: string;
  phone: string;
  durationSec: number;
  answers: Answers;
}

export const SHEET_HEADERS = [
  'التاريخ والوقت',
  'اسم الطفل',
  'السن',
  'النسخة',
  'اسم ولي الأمر',
  'واتساب',
  'درجة التفكير',
  'نقطة القوة',
  'نقاط التكنولوجيا',
  'مستوى التكنولوجيا',
  'نقاط كل مسار',
  'الميل الأول',
  'الميل التاني',
  'الوقت بالدقايق',
  'كل الإجابات',
];

/** Stops a spreadsheet from running text as a formula. */
export function guardCell(value: string): string {
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

function cairoTimestamp(now: Date): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Africa/Cairo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return `${get('year')}-${get('month')}-${get('day')} ${get('hour')}:${get('minute')}`;
}

function answersText(test: TestDefinition, answers: Answers): string {
  return test.questions
    .map((q, index) => {
      const answer = answers[q.id];
      const ids = Array.isArray(answer) ? answer : [answer];
      const labels = ids
        .map((id) => q.options.find((o) => o.id === id)?.label ?? '?')
        .join(' + ');
      const mark =
        q.kind === 'thinking' || q.kind === 'tech' ? (answer === q.correct ? ' ✓' : ' ✗') : '';
      return `${index + 1}) ${labels}${mark}`;
    })
    .join('\n');
}

export function buildRow(
  input: SubmissionInput,
  test: TestDefinition,
  result: ScoreResult,
  now: Date = new Date(),
): string[] {
  const trackPoints = test.tracks
    .map((t) => `${TRACK_LABEL[t]}: ${result.tracks[t] ?? 0}`)
    .join(' · ');
  const minutes = Math.round((input.durationSec / 60) * 10) / 10;

  return [
    cairoTimestamp(now),
    guardCell(input.childName),
    String(input.age),
    input.version,
    guardCell(input.parentName),
    input.phone,
    `${result.thinking.correct} من ${result.thinking.total}`,
    STRENGTH_LABEL[result.strength],
    `${result.tech.points} من ${result.tech.max}`,
    LEVEL_LABEL[result.tech.level],
    trackPoints,
    TRACK_LABEL[result.top],
    result.second ? TRACK_LABEL[result.second] + (result.tie ? ' (متساويين)' : '') : '',
    String(minutes),
    guardCell(answersText(test, input.answers)),
  ];
}

const ATTEMPTS = 2;
const TIMEOUT_MS = 4000;

/** Sends one row to the Google Apps Script webhook. Never throws. */
export async function sendRow(values: string[]): Promise<boolean> {
  const url = process.env.SHEET_WEBHOOK_URL;
  if (!url) {
    console.warn('SHEET_WEBHOOK_URL is not set; the result was not saved.');
    return false;
  }
  const body = JSON.stringify({
    secret: process.env.SHEET_WEBHOOK_SECRET ?? '',
    headers: SHEET_HEADERS,
    values,
  });

  for (let attempt = 1; attempt <= ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        redirect: 'follow',
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (response.ok) {
        const data = (await response.json().catch(() => null)) as { ok?: boolean } | null;
        if (data?.ok === true) return true;
      }
      console.warn(`Sheet webhook attempt ${attempt} was not accepted (${response.status}).`);
    } catch (error) {
      console.warn(`Sheet webhook attempt ${attempt} failed:`, error);
    }
  }
  return false;
}
