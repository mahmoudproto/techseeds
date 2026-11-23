'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState, type ReactNode } from 'react';
import type React from 'react';

export interface StackCard {
  key: string;
  label: string;
  /** A photo or illustration… */
  img?: { src: string; alt: string };
  /** …or a drawn picture (used for projects without a screenshot yet). */
  art?: ReactNode;
}

export interface StackText {
  /** Name of the group, for screen readers. */
  label: string;
  /** "Tap a card to enlarge it" */
  open: string;
  prev: string;
  next: string;
  close: string;
  /** "Card" (followed by its number) */
  card: string;
}

/**
 * "Design 1" from the Track Hero Visual options: three stacked cards, one in front
 * and one tilted out on each side, with arrows and dots under them.
 * Clicking a side card brings it to the front; clicking the front card enlarges it.
 */
export default function TrackCards({ cards, text, dir }: { cards: StackCard[]; text: StackText; dir: 'rtl' | 'ltr' }) {
  const n = cards.length;
  const [front, setFront] = useState(0);
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const zoomCard = useRef<HTMLElement>(null);

  // The cards fan out from a neat pile the first time they come into view.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setShown(true), 150);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    // A tap anywhere outside the enlarged card closes it, not only on the dark area.
    const onDown = (e: PointerEvent) => {
      if (!zoomCard.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  const go = (step: number) => {
    setOpen(false);
    setFront((f) => (f + step + n) % n);
  };

  // Swipe (finger) or drag (mouse) sideways across the cards: the side card on the far side
  // of the swipe comes to the front, like flicking through a pile of photos.
  const swipe = useRef<{ x: number; y: number; done: boolean } | null>(null);
  const skipClick = useRef(false);
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    swipe.current = { x: e.clientX, y: e.clientY, done: false };
    skipClick.current = false;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const s = swipe.current;
    if (!s || s.done) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    s.done = true;
    skipClick.current = true;
    // swiping left brings the card on the right, and the other way round
    const one = box.current?.querySelector<HTMLElement>('.stack__card--pos1')?.getBoundingClientRect();
    const two = box.current?.querySelector<HTMLElement>('.stack__card--pos2')?.getBoundingClientRect();
    const oneIsRight = one && two ? one.left + one.width / 2 > two.left + two.width / 2 : dir === 'ltr';
    const wantRight = dx < 0;
    go(wantRight === oneIsRight ? 1 : -1);
  };
  const onPointerEnd = () => {
    swipe.current = null;
  };
  const num = (i: number) => (dir === 'rtl' ? ['١', '٢', '٣', '٤', '٥'][i] ?? String(i + 1) : String(i + 1));
  const current = cards[front];

  return (
    <div className="stack-wrap">
      <div
        ref={box}
        className={`stack${shown ? ' stack--shown' : ''}`}
        role="group"
        aria-label={text.label}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onClickCapture={(e) => {
          // a swipe is not a tap: don't also open or pick the card under the finger
          if (skipClick.current) {
            e.stopPropagation();
            e.preventDefault();
            skipClick.current = false;
          }
        }}
        onDragStart={(e) => e.preventDefault()}
      >
        {cards.map((card, i) => {
          const pos = (i - front + n) % n; // 0 = front, 1 = side, 2 = other side
          const isFront = pos === 0;
          return (
            <button
              key={card.key}
              type="button"
              className={`stack__card stack__card--pos${pos}`}
              onClick={() => (isFront ? setOpen(true) : (setFront(i), setOpen(false)))}
              aria-label={isFront ? `${card.label}: ${text.open}` : card.label}
            >
              <span className="stack__media">
                {card.img ? <img src={card.img.src} alt="" loading="lazy" /> : card.art}
              </span>
              <span className="stack__label">{card.label}</span>
              {isFront && (
                <span className="stack__zoom" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="stack-nav">
        <div className="stack-nav__row">
          <button type="button" className="stack-nav__btn" onClick={() => go(-1)} aria-label={text.prev}>
            <Chevron flip={dir === 'ltr'} />
          </button>
          <div className="stack-nav__dots">
            {cards.map((card, i) => (
              <button
                key={card.key}
                type="button"
                className="stack-nav__dot"
                onClick={() => {
                  setFront(i);
                  setOpen(false);
                }}
                aria-label={`${text.card} ${num(i)}`}
                aria-current={i === front}
              >
                <span />
              </button>
            ))}
          </div>
          <button type="button" className="stack-nav__btn stack-nav__btn--next" onClick={() => go(1)} aria-label={text.next}>
            <Chevron flip={dir === 'rtl'} />
          </button>
        </div>
      </div>

      {open && (
        <div className="stack-zoom" role="dialog" aria-modal="true" aria-label={current.label}>
          <div className="stack-zoom__backdrop" />
          <figure className="stack-zoom__card" ref={zoomCard}>
            <span className="stack__media">
              {current.img ? <img src={current.img.src} alt={current.img.alt} /> : current.art}
            </span>
            <figcaption className="stack__label">{current.label}</figcaption>
          </figure>
          <button ref={closeBtn} type="button" className="stack-zoom__close" onClick={() => setOpen(false)} aria-label={text.close}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}

/** Points right; flipped, points left. */
function Chevron({ flip }: { flip: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={flip ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'} />
    </svg>
  );
}
