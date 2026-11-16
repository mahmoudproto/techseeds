'use client';

import { useMemo, useState } from 'react';
import { track } from '@/lib/track';
import { normalizePhone } from '@/lib/validate';
import type { Lang } from '@/lib/site-content';

const TEXT = {
  ar: {
    name: 'اسم ولي الأمر', phone: 'رقم واتساب', date: 'اليوم المناسب', age: 'سن الطفل (اختياري)',
    submit: 'احجز مكانك', sending: 'جارٍ الحجز…', arrow: '←',
    errName: 'اكتب اسم ولي الأمر.', errPhone: 'اكتب رقم واتساب مصري صحيح، مثل 01012345678.',
    errServer: 'حدث خطأ. حاول مرة أخرى أو راسلنا على واتساب.',
    doneTitle: 'تم تسجيل طلبك', doneText: 'سنتواصل معك على واتساب لتأكيد الحجز والموعد.',
    sunday: 'الأحد', locale: 'ar-EG-u-nu-latn',
  },
  en: {
    name: 'Parent name', phone: 'WhatsApp number', date: 'Which Sunday', age: 'Child age (optional)',
    submit: 'Book your seat', sending: 'Booking…', arrow: '→',
    errName: 'Enter the parent name.', errPhone: 'Enter a valid Egyptian WhatsApp number, like 01012345678.',
    errServer: 'Something went wrong. Try again or message us on WhatsApp.',
    doneTitle: 'Your request is in', doneText: 'We will message you on WhatsApp to confirm the booking and time.',
    sunday: 'Sunday', locale: 'en-GB',
  },
};

/** The next four Sundays, as YYYY-MM-DD plus a readable label. */
function nextSundays(locale: string, word: string) {
  const out: { value: string; label: string }[] = [];
  const day = new Date();
  day.setHours(12, 0, 0, 0);
  day.setDate(day.getDate() + 1);
  while (day.getDay() !== 0) day.setDate(day.getDate() + 1);
  for (let i = 0; i < 4; i += 1) {
    const value = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
    const label = `${word} ${new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long' }).format(day)}`;
    out.push({ value, label });
    day.setDate(day.getDate() + 7);
  }
  return out;
}

export default function WorkshopForm({ lang }: { lang: Lang }) {
  const t = TEXT[lang];
  const sundays = useMemo(() => nextSundays(t.locale, t.sunday), [t.locale, t.sunday]);
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [childAge, setChildAge] = useState('');
  const [website, setWebsite] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (sending) return;
    const name = parentName.replace(/\s+/g, ' ').trim();
    if (name.length < 2) return setError(t.errName);
    const normalized = normalizePhone(phone);
    if (!normalized) return setError(t.errPhone);
    setError('');
    setSending(true);
    try {
      const response = await fetch('/api/workshop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ parentName: name, phone: normalized, date: date || sundays[0].value, childAge, website }),
      });
      if (!response.ok) return setError(t.errServer);
      track('workshop_booked');
      setDone(true);
    } catch {
      setError(t.errServer);
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <div className="card form workshop__done" role="status">
        <strong>{t.doneTitle}</strong>
        <p>{t.doneText}</p>
      </div>
    );
  }

  return (
    <form className="card form" onSubmit={submit} noValidate>
      <label className="field">
        <span className="field__label">{t.name}</span>
        <input className="input" type="text" value={parentName} onChange={(e) => setParentName(e.target.value)} maxLength={60} autoComplete="name" />
      </label>
      <label className="field">
        <span className="field__label">{t.phone}</span>
        <input className="input input--ltr" type="tel" inputMode="tel" dir="ltr" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={20} autoComplete="tel" placeholder="01012345678" />
      </label>
      <div className="workshop__row">
        <label className="field">
          <span className="field__label">{t.date}</span>
          <select className="input" value={date || sundays[0].value} onChange={(e) => setDate(e.target.value)} suppressHydrationWarning>
            {sundays.map((s) => (
              <option key={s.value} value={s.value} suppressHydrationWarning>{s.label}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span className="field__label">{t.age}</span>
          <select className="input" value={childAge} onChange={(e) => setChildAge(e.target.value)}>
            <option value="">—</option>
            {Array.from({ length: 13 }, (_, i) => i + 6).map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="hp" aria-hidden="true">
        Website
        <input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </label>
      {error && <p className="error" role="alert">{error}</p>}
      <button className="btn btn--block" type="submit" disabled={sending}>
        <span>{sending ? t.sending : t.submit}</span>
        {!sending && <span className="btn__arrow" aria-hidden="true">{t.arrow}</span>}
      </button>
    </form>
  );
}
