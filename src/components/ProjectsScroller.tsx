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
const SETTLE = 180; // ms of no movement after a swipe before it moves by itself again

/**
 * All student projects in one row that scrolls by itself, in reading direction.
 * It stops while the mouse is over it, while a finger is on it or the row is still gliding
 * after a swipe, and while anything inside has keyboard focus. Visitors can scroll it by hand:
 * swipe on phones, drag with the mouse or use the scrollbar on computers.
 * The list is drawn twice so the row can loop without a jump.
 */
export default function ProjectsScroller({ items, label }: { items: ScrollerItem[]; label: string }) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rtl = getComputedStyle(el).direction === 'rtl';
    const dir = rtl ? -1 : 1;

    let hovered = false;
    let focused = false;
    let touching = false;
    let dragging = false;
    let settleUntil = 0;
    let visible = false;
    let pos = el.scrollLeft;
    let last = 0;
    let frame = 0;
    let lastX = 0;
    let moved = 0;

    // width of one copy of the list: distance from the first card to its duplicate
    const loopWidth = () => {
      const first = el.querySelector<HTMLElement>('[data-copy="0"]');
      const dup = el.querySelector<HTMLElement>('[data-copy="1"]');
      return first && dup ? Math.abs(dup.offsetLeft - first.offsetLeft) : 0;
    };

    // move to an offset along the reading direction, looping inside one copy of the list
    const setOffset = (offset: number) => {
      const w = loopWidth();
      const o = w > 0 ? ((offset % w) + w) % w : Math.max(0, offset);
      el.scrollLeft = o * dir;
      pos = el.scrollLeft;
    };
    const offset = () => el.scrollLeft * dir;

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 64) : 0;
      last = now;
      const paused =
        still || hovered || focused || touching || dragging || !visible || now < settleUntil || document.hidden;
      if (!paused) {
        // if the visitor scrolled by hand, carry on from where they left it
        if (Math.abs(el.scrollLeft - pos) > 2) pos = el.scrollLeft;
        pos += (dir * SPEED * dt) / 1000;
        const w = loopWidth();
        if (w > 0 && Math.abs(pos) >= w) pos -= dir * w;
        el.scrollLeft = pos;
      } else {
        pos = el.scrollLeft;
      }
      frame = requestAnimationFrame(tick);
    };

    // mouse only: a tap on a phone fires mouseenter too and would leave the row stopped
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') hovered = true;
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') hovered = false;
    };

    // finger: stop while it's on the row, start again once the swipe has finished gliding
    const onTouchStart = () => (touching = true);
    const onTouchEnd = () => {
      touching = false;
      settleUntil = performance.now() + SETTLE;
    };
    const onScroll = () => {
      // hand scrolling (scrollbar, glide after a swipe): keep looping and wait until it stops
      if (touching || dragging || hovered || performance.now() < settleUntil) {
        const w = loopWidth();
        if (w > 0 && offset() >= w - 1) setOffset(offset() - w);
        if (!touching && !hovered) settleUntil = performance.now() + SETTLE;
      }
    };

    // mouse drag to scroll, like swiping
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      dragging = true;
      moved = 0;
      lastX = e.clientX;
      el.setPointerCapture(e.pointerId);
      el.classList.add('is-dragging');
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      moved += Math.abs(dx);
      // dragging toward the start of the row shows what comes next
      setOffset(offset() - dx * dir);
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      el.classList.remove('is-dragging');
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    };
    const onClick = (e: MouseEvent) => {
      if (moved > 5) e.preventDefault();
    };

    // keyboard focus only: a mouse click also focuses the row and must not stop it for good
    const onFocusIn = (e: FocusEvent) => (focused = (e.target as Element).matches(':focus-visible'));
    const onFocusOut = () => (focused = false);

    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd);
    el.addEventListener('touchcancel', onTouchEnd);
    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    el.addEventListener('click', onClick, true);
    el.addEventListener('focusin', onFocusIn);
    el.addEventListener('focusout', onFocusOut);

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
      el.removeEventListener('click', onClick, true);
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
        <img className="project__art" src={p.src} alt={copy === 1 ? '' : p.alt} loading="lazy" draggable={false} width={480} height={270} />
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
