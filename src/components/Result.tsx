'use client';

import { WHATSAPP_NUMBER } from '@/lib/labels';
import { TEST_TEXT } from '@/lib/test-text';
import type { PublicResult, TestLang } from '@/lib/types';

interface Props {
  lang: TestLang;
  result: PublicResult;
  parentName: string;
  age: number;
  onRestart: () => void;
}

export default function Result({ lang, result, parentName, age, onRestart }: Props) {
  const tt = TEST_TEXT[lang];
  const t = tt.result;
  const top = tt.tracks[result.top];
  const second = result.second ? tt.tracks[result.second] : null;
  const message = t.message(parentName, result.childName, age, top);
  const whatsapp = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <section className="result">
      <span className="blob blob--result" aria-hidden="true" />
      <p className="eyebrow">Your Result</p>
      <h1 className="title title--small">{t.title(result.childName)}</h1>
      <span className="title__bar" />

      <div className="result__cards">
        <div className="card result-card result-card--track">
          <span className="result-card__label">{result.tie && second ? t.closest : t.closestTrack}</span>
          <strong className="result-card__value">{result.tie && second ? t.between(top, second) : top}</strong>
          <span className="result-card__line">{tt.trackLines[result.top]}</span>
          {second && !result.tie && (
            <span className="result-card__second">
              {t.after} <b>{second}</b>
            </span>
          )}
        </div>

        <div className="card result-card result-card--strength">
          <span className="result-card__label">{t.strength}</span>
          <strong className="result-card__value result-card__value--small">{tt.strengths[result.strength]}</strong>
        </div>
      </div>

      <div className="cta">
        <div className="cta__copy">
          <strong>{t.ctaTitle}</strong>
          <span>{t.ctaText}</span>
        </div>
        <a className="btn" href={whatsapp} target="_blank" rel="noopener noreferrer">
          <span>{t.book}</span>
          <span className="btn__arrow" aria-hidden="true">{tt.arrow}</span>
        </a>
      </div>

      <button className="link" type="button" onClick={onRestart}>
        {t.again}
      </button>
    </section>
  );
}
