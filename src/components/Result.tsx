'use client';

import { STRENGTH_LINE, TRACK_LABEL, TRACK_LINE, WHATSAPP_NUMBER } from '@/lib/labels';
import type { PublicResult } from '@/lib/types';

interface Props {
  result: PublicResult;
  parentName: string;
  age: number;
  onRestart: () => void;
}

export default function Result({ result, parentName, age, onRestart }: Props) {
  const top = TRACK_LABEL[result.top];
  const second = result.second ? TRACK_LABEL[result.second] : null;

  const message =
    `مرحبًا، أنا ${parentName} ولي أمر ${result.childName} (${age} سنة). ` +
    `خلّص اختبار تحديد المستوى والأقرب ليه مسار ${top}. عايز أحجز المقابلة المجانية.`;
  const whatsapp = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <section className="result">
      <span className="blob blob--result" aria-hidden="true" />
      <p className="eyebrow">Your Result</p>
      <h1 className="title title--small">النتيجة المبدئية لـ {result.childName}</h1>
      <span className="title__bar" />

      <div className="result__cards">
        <div className="card result-card result-card--track">
          <span className="result-card__label">
            {result.tie && second ? 'الأقرب ليه' : 'الأقرب ليه: مسار'}
          </span>
          {result.tie && second ? (
            <strong className="result-card__value">
              بين مسار {top} ومسار {second}
            </strong>
          ) : (
            <strong className="result-card__value">{top}</strong>
          )}
          <span className="result-card__line">{TRACK_LINE[result.top]}</span>
          {second && !result.tie && (
            <span className="result-card__second">
              وبعده: مسار <b>{second}</b>
            </span>
          )}
        </div>

        <div className="card result-card result-card--strength">
          <span className="result-card__label">نقطة قوة</span>
          <strong className="result-card__value result-card__value--small">
            {STRENGTH_LINE[result.strength]}
          </strong>
        </div>
      </div>

      <div className="cta">
        <div className="cta__copy">
          <strong>التقرير الكامل بمستواه في التكنولوجيا هنشرحهولكم في المقابلة المجانية.</strong>
          <span>احجز الآن وسنتواصل معك لتحديد الموعد.</span>
        </div>
        <a className="btn" href={whatsapp} target="_blank" rel="noopener noreferrer">
          <span>احجز المقابلة المجانية</span>
          <span className="btn__arrow" aria-hidden="true">←</span>
        </a>
      </div>

      <button className="link" type="button" onClick={onRestart}>
        اختبار طفل آخر
      </button>
    </section>
  );
}
