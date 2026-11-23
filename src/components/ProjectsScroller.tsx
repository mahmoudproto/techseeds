'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from 'react';

export interface ScrollerItem {
  key: string;
  src: string;
  alt: string;
  track: string;
  tint: string;
  title: string;
  text?: string;
}

const SPEED = 32; // pixels per second
const RESUME_AFTER_TOUCH = 4000; // ms

/**
 * All student projects in one row that scrolls by itself, in reading direction.
 * It stops while the mouse is over it, while a finger is on it (and for a few seconds after),
 * and while anything inside has keyboard focus. Visitors can still scroll it by hand.
 * The list is drawn twice so the row can loop without a jump.
 */
export default function ProjectsScroller({ items, label }: { items: ScrollerItem[]; label: string }) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rtl = getComputedStyle(el).direction === 'rtl';
    let hovered = false;
    let focused = false;
    let touchedUntil = 0;
    let visible = false;
    let pos = el.scrollLeft;
    let last = 0;
    let frame = 0;

    // width of one copy of the list: distance from the first card to its duplicate
    const loopWidth = () => {
      const first = el.querySelector<HTMLElement>('[data-copy="0"]');
      const dup = el.querySelector<HTMLElement>('[data-copy="1"]');
      return first && dup ? Math.abs(dup.offsetLeft - first.offsetLeft) : 0;
    };

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 64) : 0;
      last = now;
      const paused = hovered || focused || !visible || now < touchedUntil || document.hidden;
      if (!paused) {
        const w = loopWidth();
        // if the visitor scrolled by hand, carry on from where they left it
        if (Math.abs(el.scrollLeft - pos) > 2) pos = el.scrollLeft;
        pos += ((rtl ? -1 : 1) * SPEED * dt) / 1000;
        if (w > 0 && Math.abs(pos) >= w) pos += rtl ? w : -w;
        el.scrollLeft = pos;
      } else {
        pos = el.scrollLeft;
      }
      frame = requestAnimationFrame(tick);
    };

    const onEnter = () => (hovered = true);
    const onLeave = () => (hovered = false);
    const onTouch = () => (touchedUntil = Number.POSITIVE_INFINITY);
    const onTouchEnd = () => (touchedUntil = performance.now() + RESUME_AFTER_TOUCH);
    const onFocusIn = () => (focused = true);
    const onFocusOut = () => (focused = false);

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('touchstart', onTouch, { passive: true });
    el.addEventListener('touchend', onTouchEnd);
    el.addEventListener('touchcancel', onTouchEnd);
    el.addEventListener('focusin', onFocusIn);
    el.addEventListener('focusout', onFocusOut);

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('touchstart', onTouch);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
      el.removeEventListener('focusin', onFocusIn);
      el.removeEventListener('focusout', onFocusOut);
    };
  }, []);

  const card = (p: ScrollerItem, copy: 0 | 1, i: number) => (
    <article
      className={`project project--${p.tint}`}
      key={`${copy}-${p.key}`}
      data-copy={i === 0 ? copy : undefined}
      aria-hidden={copy === 1 ? true : undefined}
    >
      <div className="project__screen">
        <span className="project__bar" aria-hidden="true"><i /><i /><i /></span>
        <img className="project__art" src={p.src} alt={copy === 1 ? '' : p.alt} loading="lazy" width={480} height={270} />
      </div>
      <span className="project__track">{p.track}</span>
      <h3 className="project__title">{p.title}</h3>
      {p.text && <p className="project__text">{p.text}</p>}
    </article>
  );

  return (
    <div className="pscroll" ref={box} role="region" aria-label={label} tabIndex={0}>
      {items.map((p, i) => card(p, 0, i))}
      {items.map((p, i) => card(p, 1, i))}
    </div>
  );
}
