'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState, type ReactNode } from 'react';

export interface StackCard {
  key: string;
  label: string;
  /** A photo or illustration… */
  img?: { src: string; alt: string };
  /** …or a drawn picture (used for projects without a screenshot yet). */
  art?: ReactNode;
}

/**
 * Three overlapping cards for a track. They fan out gently the first time they
 * come into view; clicking a card brings it to the front with a small lift.
 */
export default function TrackCards({ cards, label }: { cards: StackCard[]; label: string }) {
  // order[0] is the front card, order[1] and order[2] sit behind it on either side.
  const [order, setOrder] = useState(() => cards.map((_, i) => i));
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState<number | null>(null);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOpen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setOpen(true), 150);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function bringToFront(index: number) {
    if (order[0] === index) return;
    setOrder((prev) => [index, ...prev.filter((i) => i !== index)]);
    setLifted(index);
    window.setTimeout(() => setLifted((cur) => (cur === index ? null : cur)), 500);
  }

  return (
    <div ref={box} className={`stack${open ? ' stack--open' : ''}`} role="group" aria-label={label}>
      {cards.map((card, i) => {
        const slot = order.indexOf(i);
        return (
          <button
            key={card.key}
            type="button"
            className={`stack__card stack__card--slot${slot}${lifted === i ? ' stack__card--lift' : ''}`}
            style={{ zIndex: 3 - slot }}
            onClick={() => bringToFront(i)}
            aria-pressed={slot === 0}
            aria-label={card.label}
          >
            <span className="stack__inner">
              <span className="stack__media">
                {card.img ? <img src={card.img.src} alt={card.img.alt} loading="lazy" /> : card.art}
              </span>
              <span className="stack__label">{card.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
