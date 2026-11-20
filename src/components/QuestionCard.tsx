'use client';

import { TEST_TEXT } from '@/lib/test-text';
import type { PublicOption, PublicQuestion, TestLang } from '@/lib/types';
import { OptionPicture, QuestionPicture } from './Visuals';

interface Props {
  lang: TestLang;
  question: PublicQuestion;
  /** Option ids in the order to show them. */
  order: string[];
  value: string | string[] | undefined;
  index: number;
  total: number;
  onChange: (value: string | string[]) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function QuestionCard({
  lang,
  question,
  order,
  value,
  index,
  total,
  onChange,
  onBack,
  onNext,
}: Props) {
  const tt = TEST_TEXT[lang];
  const t = tt.question;
  const section = t.sections[question.section];
  const [countA, countN, countB] = t.count(index + 1, total);
  const options = order
    .map((id) => question.options.find((o) => o.id === id))
    .filter((o): o is PublicOption => Boolean(o));

  const selected = Array.isArray(value) ? value : value ? [value] : [];
  const answered = selected.length > 0;
  const isLast = index === total - 1;
  const hasPictures = options.some((o) => o.visual);
  const compact = hasPictures || options.every((o) => o.label.length <= 16);

  function pick(option: PublicOption) {
    if (!question.multi) return onChange(option.id);
    if (option.exclusive) return onChange(selected.includes(option.id) ? [] : [option.id]);
    const exclusiveIds = question.options.filter((o) => o.exclusive).map((o) => o.id);
    const rest = selected.filter((id) => !exclusiveIds.includes(id));
    onChange(rest.includes(option.id) ? rest.filter((id) => id !== option.id) : [...rest, option.id]);
  }

  return (
    <section className="question">
      <div className="progress">
        <div className="progress__meta">
          <span className="progress__section">
            <span className="eyebrow eyebrow--inline">{section.en}</span>
            <strong>{section.label}</strong>
          </span>
          <span className="progress__count">
            {countA} <b>{countN}</b> {countB}
          </span>
        </div>
        <div
          className="progress__track"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={index + 1}
        >
          <span className="progress__fill" style={{ width: `${((index + 1) / total) * 100}%` }} />
        </div>
      </div>

      <div className="card question__card" key={question.id}>
        <h2 className="question__prompt">{question.prompt}</h2>
        {question.expr && (
          <p className="expr" dir="ltr">
            {question.expr}
          </p>
        )}
        {question.program && (
          <div className="program">
            {question.program.map((line, i) => (
              <div key={i} className={line.startsWith('  ') ? 'program__line program__line--in' : 'program__line'}>
                {line.trim()}
              </div>
            ))}
          </div>
        )}
        {question.visual && (
          <div className="question__visual">
            <QuestionPicture visual={question.visual} />
          </div>
        )}
        {question.multi && <p className="hint">{t.multi}</p>}

        <div className={`options${compact ? ' options--grid' : ''}`}>
          {options.map((option) => {
            const on = selected.includes(option.id);
            return (
              <button
                key={option.id}
                type="button"
                className={`option${on ? ' option--on' : ''}${option.visual ? ' option--picture' : ''}`}
                aria-pressed={on}
                onClick={() => pick(option)}
              >
                {option.visual && (
                  <span className="option__picture">
                    <OptionPicture visual={option.visual} />
                  </span>
                )}
                <span className="option__label">{option.label}</span>
                {question.multi && !option.visual && (
                  <span className="option__check" aria-hidden="true">
                    {on ? '✓' : ''}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="nav">
        <button className="btn btn--ghost" type="button" onClick={onBack}>
          {t.back}
        </button>
        <button className="btn" type="button" onClick={onNext} disabled={!answered}>
          <span>{isLast ? t.finish : t.next}</span>
          <span className="btn__arrow" aria-hidden="true">{tt.arrow}</span>
        </button>
      </div>
    </section>
  );
}
