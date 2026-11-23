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
 * All student projects in one row that scrolls by itself and loops.
 * It stops while the mouse is over it, while a finger is on it or the row is still gliding
 * after a swipe, and while anything inside has keyboard focus. Visitors can scroll it by hand:
 * swipe on phones, drag the row or its bar with the mouse on computers.
 * After a visitor scrolls by hand, it carries on moving in the direction they scrolled.
 * The list is drawn twice so the row can loop without a jump. The browser's own scrollbar
 * is hidden because it can't show a loop; the bar under the row loops with the cards.
 */
export default function ProjectsScroller({ items, label }: { items: ScrollerItem[]; label: string }) {
  const box = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    const track = bar.current;
    if (!el || !track) return;
    const thumbs = Array.from(track.querySelectorAll<HTMLElement>('.pscroll-bar__thumb'));
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rtl = getComputedStyle(el).direction === 'rtl';
    const dir = rtl ? -1 : 1; // scrollLeft sign of the reading direction

    let run = 1; // 1 = moves on in reading direction, -1 = moves back
    let hovered = false;
    let focused = false;
    let touching = false;
    let dragging: 'row' | 'bar' | null = null;
    let settleUntil = 0;
    let visible = false;
    let last = 0;
    let frame = 0;
    let lastX = 0;
    let moved = 0;
    let off = 0; // position along the reading direction, inside one copy

    // width of one copy of the list: distance from the first card to its duplicate
    const loopWidth = () => {
      const first = el.querySelector<HTMLElement>('[data-copy="0"]');
      const dup = el.querySelector<HTMLElement>('[data-copy="1"]');
      return first && dup ? Math.abs(dup.offsetLeft - first.offsetLeft) : 0;
    };

    // the bar: one thumb for what's on screen; a second one shows the part that has looped round
    const paintBar = () => {
      const w = loopWidth();
      if (!w) return;
      const size = Math.min(1, el.clientWidth / w);
      const at = off / w;
      thumbs.forEach((t, i) => {
        t.style.width = `${size * 100}%`;
        t.style.insetInlineStart = `${(at - i) * 100}%`;
      });
    };

    // Where a position is drawn. Near the start of the list it is drawn in the second copy
    // (same cards), so there is always room to scroll back as well as forward.
    let shown = Math.abs(el.scrollLeft);
    const place = (o: number, w: number) => (w > 0 && o < w / 2 ? o + w : o);
    const wrap = (o: number, w: number) => (w > 0 ? ((o % w) + w) % w : Math.max(0, o));

    // move to a position, looping inside one copy of the list
    const setOffset = (o: number) => {
      const w = loopWidth();
      off = wrap(o, w);
      el.scrollLeft = place(off, w) * dir;
      shown = Math.abs(el.scrollLeft);
      paintBar();
    };

    // a hand scroll by `delta` (along the reading direction): remember which way it went
    const handMove = (delta: number) => {
      if (Math.abs(delta) > 0.5) run = delta > 0 ? 1 : -1;
    };

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 64) : 0;
      last = now;
      const paused =
        still || hovered || focused || touching || dragging || !visible || now < settleUntil || document.hidden;
      if (!paused) setOffset(off + (run * SPEED * dt) / 1000);
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

    // any scroll not made by this code (swipe, glide, trackpad): follow it and keep looping
    const onScroll = () => {
      const now = Math.abs(el.scrollLeft);
      const delta = now - shown;
      if (Math.abs(delta) < 0.5) return; // our own move
      shown = now;
      handMove(delta);
      const w = loopWidth();
      off = wrap(off + delta, w);
      // only jump to the matching card in the other copy when it is needed to keep room
      if (Math.abs(place(off, w) - now) > 1) setOffset(off);
      else paintBar();
      if (!touching) settleUntil = performance.now() + SETTLE;
    };

    // dragging the row with the mouse, like swiping
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      dragging = 'row';
      moved = 0;
      lastX = e.clientX;
      el.setPointerCapture(e.pointerId);
      el.classList.add('is-dragging');
    };
    const onMove = (e: PointerEvent) => {
      if (dragging !== 'row') return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      moved += Math.abs(dx);
      // pulling the cards toward the start of the row shows what comes next
      const delta = -dx * dir;
      handMove(delta);
      setOffset(off + delta);
    };
    const onUp = (e: PointerEvent) => {
      if (dragging !== 'row') return;
      dragging = null;
      el.classList.remove('is-dragging');
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    };
    const onClick = (e: MouseEvent) => {
      if (moved > 5) e.preventDefault();
    };

    // dragging the bar: moving the thumb along the bar moves through the list
    const onBarDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      dragging = 'bar';
      lastX = e.clientX;
      track.setPointerCapture(e.pointerId);
      track.classList.add('is-dragging');
      e.preventDefault();
    };
    const onBarMove = (e: PointerEvent) => {
      if (dragging !== 'bar') return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      const delta = ((dx * dir) / track.clientWidth) * loopWidth();
      handMove(delta);
      setOffset(off + delta);
    };
    const onBarUp = (e: PointerEvent) => {
      if (dragging !== 'bar') return;
      dragging = null;
      track.classList.remove('is-dragging');
      if (track.hasPointerCapture(e.pointerId)) track.releasePointerCapture(e.pointerId);
      settleUntil = performance.now() + SETTLE;
    };

    // keyboard focus only: a mouse click also focuses the row and must not stop it for good
    const onFocusIn = (e: FocusEvent) => (focused = (e.target as Element).matches(':focus-visible'));
    const onFocusOut = () => (focused = false);
    const onResize = () => setOffset(off);

    const on = <K extends keyof HTMLElementEventMap>(
      t: HTMLElement,
      type: K,
      fn: (e: HTMLElementEventMap[K]) => void,
      opts?: AddEventListenerOptions | boolean,
    ) => {
      t.addEventListener(type, fn, opts);
      return () => t.removeEventListener(type, fn, opts);
    };
    const offs = [
      on(el, 'pointerenter', onEnter),
      on(el, 'pointerleave', onLeave),
      on(track, 'pointerenter', onEnter),
      on(track, 'pointerleave', onLeave),
      on(el, 'touchstart', onTouchStart, { passive: true }),
      on(el, 'touchend', onTouchEnd),
      on(el, 'touchcancel', onTouchEnd),
      on(el, 'scroll', onScroll, { passive: true }),
      on(el, 'pointerdown', onDown),
      on(el, 'pointermove', onMove),
      on(el, 'pointerup', onUp),
      on(el, 'pointercancel', onUp),
      on(el, 'click', onClick, true),
      on(el, 'focusin', onFocusIn),
      on(el, 'focusout', onFocusOut),
      on(track, 'pointerdown', onBarDown),
      on(track, 'pointermove', onBarMove),
      on(track, 'pointerup', onBarUp),
      on(track, 'pointercancel', onBarUp),
    ];
    window.addEventListener('resize', onResize);

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    setOffset(0);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      offs.forEach((f) => f());
      window.removeEventListener('resize', onResize);
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
    <>
      <div className="pscroll" ref={box} role="region" aria-label={label} tabIndex={0}>
        {items.map((p, i) => card(p, 0, i))}
        {items.map((p, i) => card(p, 1, i))}
      </div>
      <div className="pscroll-bar" ref={bar} aria-hidden="true">
        <span className="pscroll-bar__thumb" />
        <span className="pscroll-bar__thumb" />
      </div>
    </>
  );
}
