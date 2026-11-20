import { NextResponse } from 'next/server';
import { getTest } from '@/lib/content';
import { score } from '@/lib/scoring';
import { buildRow, sendRow } from '@/lib/sheet';
import type { Answers, PublicResult } from '@/lib/types';
import { cleanName, normalizePhone, versionForAge } from '@/lib/validate';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 20_000;
const MAX_DURATION_SEC = 2 * 60 * 60;

function bad(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function POST(request: Request) {
  const text = await request.text();
  if (text.length > MAX_BODY_BYTES) return bad('too large');

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(text);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return bad('invalid body');
    body = parsed as Record<string, unknown>;
  } catch {
    return bad('invalid body');
  }

  // Hidden field that only bots fill in.
  if (typeof body.website === 'string' && body.website.length > 0) return bad('rejected');

  const childName = cleanName(body.childName);
  const parentName = cleanName(body.parentName);
  if (!childName) return bad('childName');
  if (!parentName) return bad('parentName');

  const age = Number(body.age);
  const version = versionForAge(age);
  if (!version) return bad('age');

  const phone = normalizePhone(typeof body.phone === 'string' ? body.phone : '');
  if (!phone) return bad('phone');

  const laptop = body.laptop === 'yes' || body.laptop === 'no' ? body.laptop : null;
  if (!laptop) return bad('laptop');
  const lang = body.lang === 'en' ? 'en' : 'ar';

  const test = getTest(version);
  const result = score(test, body.answers as Answers);
  if ('error' in result) return bad('answers');

  const rawDuration = Number(body.durationSec);
  const durationSec = Number.isFinite(rawDuration)
    ? Math.min(MAX_DURATION_SEC, Math.max(0, Math.round(rawDuration)))
    : 0;

  const row = buildRow(
    { childName, age, version, parentName, phone, durationSec, answers: body.answers as Answers, laptop, lang },
    test,
    result,
  );
  const saved = await sendRow(row);

  const response: PublicResult = {
    childName,
    version,
    top: result.top,
    second: result.second,
    tie: result.tie,
    strength: result.strength,
    saved,
  };
  return NextResponse.json(response);
}
