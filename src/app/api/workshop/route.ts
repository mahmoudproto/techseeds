import { NextResponse } from 'next/server';
import { SHEET_HEADERS, guardCell, sendRow } from '@/lib/sheet';
import { cleanName, normalizePhone } from '@/lib/validate';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function bad(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function cairoNow(): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Africa/Cairo', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false,
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return `${get('year')}-${get('month')}-${get('day')} ${get('hour')}:${get('minute')}`;
}

/** Books a seat in the free Sunday parents' workshop. Saved as a row in the same sheet as test results. */
export async function POST(request: Request) {
  const text = await request.text();
  if (text.length > 4000) return bad('too large');

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(text);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return bad('invalid body');
    body = parsed as Record<string, unknown>;
  } catch {
    return bad('invalid body');
  }

  if (typeof body.website === 'string' && body.website.length > 0) return bad('rejected');

  const parentName = cleanName(body.parentName);
  if (!parentName) return bad('parentName');
  const phone = normalizePhone(typeof body.phone === 'string' ? body.phone : '');
  if (!phone) return bad('phone');
  const date = typeof body.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(body.date) ? body.date : '';
  if (!date) return bad('date');
  const age = Number(body.childAge);
  const childAge = Number.isInteger(age) && age >= 6 && age <= 18 ? String(age) : '';

  // Same columns as a test result, so it lands in the same sheet without changing the script.
  const row = SHEET_HEADERS.map(() => '');
  row[0] = cairoNow();
  row[2] = childAge;
  row[3] = 'حجز ورشة الأهل';
  row[4] = guardCell(parentName);
  row[5] = phone;
  row[14] = `ورشة أولياء الأمور يوم الأحد ${date}`;

  const saved = await sendRow(row);
  return NextResponse.json({ ok: true, saved });
}
