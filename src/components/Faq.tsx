'use client';

import { useId, useState } from 'react';

/** FAQ list: each answer slides open and closed. The first one starts open. */
export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number[]>([0]);
  const id = useId();

  function toggle(i: number) {
    setOpen((cur) => (cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i]));
  }

  return (
    <div className="faq">
      {items.map((item, i) => {
        const on = open.includes(i);
        return (
          <div className={`faq__item${on ? ' faq__item--open' : ''}`} key={item.q}>
            <h3 className="faq__q">
              <button
                type="button"
                id={`${id}-q${i}`}
                aria-expanded={on}
                aria-controls={`${id}-a${i}`}
                onClick={() => toggle(i)}
              >
                <span>{item.q}</span>
                <span className="faq__icon" aria-hidden="true" />
              </button>
            </h3>
            <div className="faq__panel" id={`${id}-a${i}`} role="region" aria-labelledby={`${id}-q${i}`} inert={!on}>
              <div className="faq__inner">
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
