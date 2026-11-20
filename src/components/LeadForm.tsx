'use client';

import { useState } from 'react';
import { TEST_TEXT } from '@/lib/test-text';
import type { TestLang } from '@/lib/types';
import { normalizePhone } from '@/lib/validate';

export type Laptop = 'yes' | 'no';

interface Props {
  lang: TestLang;
  childName: string;
  submitting: boolean;
  serverError: string;
  onBack: () => void;
  onSubmit: (parentName: string, phone: string, laptop: Laptop, website: string) => void;
}

export default function LeadForm({ lang, childName, submitting, serverError, onBack, onSubmit }: Props) {
  const t = TEST_TEXT[lang].lead;
  const arrow = TEST_TEXT[lang].arrow;
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [laptop, setLaptop] = useState<Laptop | null>(null);
  const [website, setWebsite] = useState('');
  const [error, setError] = useState('');

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (submitting) return;
    const name = parentName.replace(/\s+/g, ' ').trim();
    if (name.length < 2) return setError(t.errParent);
    const normalized = normalizePhone(phone);
    if (!normalized) return setError(t.errPhone);
    if (!laptop) return setError(t.errLaptop);
    setError('');
    onSubmit(name, normalized, laptop, website);
  }

  return (
    <section className="lead-step">
      <p className="eyebrow">Almost There</p>
      <h1 className="title title--small">{t.title}</h1>
      <span className="title__bar" />
      <p className="lead">{t.text(childName)}</p>

      <form className="card form" onSubmit={submit} noValidate>
        <label className="field">
          <span className="field__label">{t.parent}</span>
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
          <span className="field__label">{t.phone}</span>
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

        <fieldset className="field">
          <legend className="field__label">{t.laptop}</legend>
          <div className="yesno">
            {(['yes', 'no'] as Laptop[]).map((v) => (
              <button
                key={v}
                type="button"
                className={`age${laptop === v ? ' age--on' : ''}`}
                aria-pressed={laptop === v}
                onClick={() => setLaptop(v)}
              >
                {v === 'yes' ? t.yes : t.no}
              </button>
            ))}
          </div>
        </fieldset>

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

        <p className="privacy">{t.privacy}</p>

        {(error || serverError) && (
          <p className="error" role="alert">
            {error || serverError}
          </p>
        )}

        <button className="btn btn--block" type="submit" disabled={submitting}>
          <span>{submitting ? t.sending : t.submit}</span>
          {!submitting && (
            <span className="btn__arrow" aria-hidden="true">{arrow}</span>
          )}
        </button>
      </form>

      <button className="link" type="button" onClick={onBack} disabled={submitting}>
        {t.back}
      </button>
    </section>
  );
}
