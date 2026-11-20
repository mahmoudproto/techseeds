'use client';

import { useState } from 'react';
import { TEST_TEXT } from '@/lib/test-text';
import type { TestLang } from '@/lib/types';

const AGES = Array.from({ length: 13 }, (_, i) => i + 6);

interface Props {
  lang: TestLang;
  initialName: string;
  initialAge: number | null;
  onDraft: (childName: string, age: number | null) => void;
  onStart: (childName: string, age: number) => void;
}

export default function Welcome({ lang, initialName, initialAge, onDraft, onStart }: Props) {
  const t = TEST_TEXT[lang].welcome;
  const arrow = TEST_TEXT[lang].arrow;
  const [name, setName] = useState(initialName);
  const [age, setAge] = useState<number | null>(initialAge);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState('');

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const clean = name.replace(/\s+/g, ' ').trim();
    if (clean.length < 2) return setError(t.errName);
    if (age === null) return setError(t.errAge);
    if (!confirmed) return setError(t.errConfirm);
    setError('');
    onStart(clean, age);
  }

  return (
    <section className="welcome">
      <div className="welcome__copy">
        <p className="eyebrow">Growing Young Minds</p>
        <h1 className="title">{t.title}</h1>
        <span className="title__bar" />
        <p className="lead">{t.lead}</p>

        <ul className="chips">
          <li className="chip chip--green">{t.chips[0]}</li>
          <li className="chip chip--blue">{t.chips[1]}</li>
          <li className="chip chip--yellow">{t.chips[2]}</li>
        </ul>

        <form className="card form" onSubmit={submit} noValidate>
          <label className="field">
            <span className="field__label">{t.name}</span>
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                onDraft(e.target.value, age);
              }}
              maxLength={60}
              autoComplete="off"
              placeholder={t.namePlaceholder}
            />
          </label>

          <fieldset className="field">
            <legend className="field__label">{t.age}</legend>
            <div className="ages">
              {AGES.map((a) => (
                <button
                  key={a}
                  type="button"
                  className={`age${age === a ? ' age--on' : ''}`}
                  aria-pressed={age === a}
                  onClick={() => {
                    setAge(a);
                    onDraft(name, a);
                  }}
                >
                  {a}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="check">
            <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} />
            <span>{t.confirm}</span>
          </label>

          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}

          <button className="btn btn--block" type="submit">
            <span>{t.start}</span>
            <span className="btn__arrow" aria-hidden="true">{arrow}</span>
          </button>
        </form>

        <p className="note">
          <strong>{t.noteStrong}</strong> {t.note}
        </p>
      </div>

      <div className="welcome__art" aria-hidden="true">
        <span className="blob blob--blue" />
        <span className="blob blob--green" />
        <span className="dot dot--yellow" />
        <span className="dot dot--blue" />
        <span className="dot dot--green" />
        <div className="art-card">
          {t.art.map((item, i) => (
            <div className="art-step" key={item.title}>
              <span className="art-step__num">0{i + 1}</span>
              <span>
                <strong>{item.title}</strong>
                <small>{item.text}</small>
              </span>
            </div>
          ))}
        </div>
        <span className="code-chip">
          <span>Python</span>
          <span>Scratch</span>
          <span>AI</span>
        </span>
        <span className="badge">&lt;/&gt;</span>
      </div>
    </section>
  );
}
