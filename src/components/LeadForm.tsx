'use client';

import { useState } from 'react';
import { normalizePhone } from '@/lib/validate';

interface Props {
  childName: string;
  submitting: boolean;
  serverError: string;
  onBack: () => void;
  onSubmit: (parentName: string, phone: string, website: string) => void;
}

export default function LeadForm({ childName, submitting, serverError, onBack, onSubmit }: Props) {
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [error, setError] = useState('');

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (submitting) return;
    const name = parentName.replace(/\s+/g, ' ').trim();
    if (name.length < 2) return setError('اكتب اسم ولي الأمر.');
    const normalized = normalizePhone(phone);
    if (!normalized) return setError('اكتب رقم واتساب مصري صحيح، مثل 01012345678.');
    setError('');
    onSubmit(name, normalized, website);
  }

  return (
    <section className="lead-step">
      <p className="eyebrow">Almost There</p>
      <h1 className="title title--small">النتيجة جاهزة!</h1>
      <span className="title__bar" />
      <p className="lead">اكتب بياناتك لعرض نتيجة {childName}.</p>

      <form className="card form" onSubmit={submit} noValidate>
        <label className="field">
          <span className="field__label">اسم ولي الأمر</span>
          <input
            className="input"
            type="text"
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
            maxLength={60}
            autoComplete="name"
          />
        </label>

        <label className="field">
          <span className="field__label">رقم واتساب</span>
          <input
            className="input input--ltr"
            type="tel"
            inputMode="tel"
            dir="ltr"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={20}
            autoComplete="tel"
            placeholder="01012345678"
          />
        </label>

        {/* Hidden from people; only bots fill it in. */}
        <label className="hp" aria-hidden="true">
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>

        <p className="privacy">بياناتكم هتُستخدم للتواصل معاكم من أكاديمية تك سيدز بس.</p>

        {(error || serverError) && (
          <p className="error" role="alert">
            {error || serverError}
          </p>
        )}

        <button className="btn btn--block" type="submit" disabled={submitting}>
          <span>{submitting ? 'جارٍ تجهيز النتيجة…' : 'اعرض النتيجة'}</span>
          {!submitting && (
            <span className="btn__arrow" aria-hidden="true">←</span>
          )}
        </button>
      </form>

      <button className="link" type="button" onClick={onBack} disabled={submitting}>
        الرجوع للأسئلة
      </button>
    </section>
  );
}
