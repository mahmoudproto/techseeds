'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * A sideways-scrolling row (used for the parent reviews). It stays where the visitor leaves it.
 * On computers it can be dragged with the mouse. Under it is the same green bar as the
 * projects row (the browser's own scrollbar is hidden); the bar can be dragged too.
 */
export default function DragRow({
  className,
  label,
  children,
}: {
  className: string;
  label: string;
  children: ReactNode;
}) {
  const row = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = row.current;
    const track = bar.current;
    const thumb = track?.querySelector<HTMLElement>('.pscroll-bar__thumb');
    if (!el || !track || !thumb) return;
    const dir = getComputedStyle(el).direction === 'rtl' ? -1 : 1;

    // the thumb: as wide as the part on screen, placed by how far the row has scrolled
    const paint = () => {
      const max = el.scrollWidth - el.clientWidth;
      const size = el.scrollWidth > 0 ? Math.min(1, el.clientWidth / el.scrollWidth) : 1;
      const at = max > 0 ? Math.abs(el.scrollLeft) / max : 0;
      thumb.style.width = `${size * 100}%`;
      thumb.style.insetInlineStart = `${at * (1 - size) * 100}%`;
      track.hidden = size >= 1;
    };

    let drag: { x: number; on: 'row' | 'bar' } | null = null;
    const start = (on: 'row' | 'bar', target: HTMLElement) => (e: PointerEvent) => {
      if (e.button !== 0) return;
      if (on === 'row' && e.pointerType !== 'mouse') return; // fingers swipe natively
      drag = { x: e.clientX, on };
      target.setPointerCapture(e.pointerId);
      target.classList.add('is-dragging');
      if (on === 'bar') e.preventDefault();
    };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      drag.x = e.clientX;
      if (drag.on === 'row') el.scrollLeft -= dx;
      else el.scrollLeft += ((dx * dir * el.scrollWidth) / track.clientWidth) * dir;
    };
    const end = (target: HTMLElement) => (e: PointerEvent) => {
      if (!drag) return;
      drag = null;
      if (target.hasPointerCapture(e.pointerId)) target.releasePointerCapture(e.pointerId);
      target.classList.remove('is-dragging');
    };

    const rowDown = start('row', el);
    const barDown = start('bar', track);
    const rowUp = end(el);
    const barUp = end(track);
    el.addEventListener('pointerdown', rowDown);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', rowUp);
    el.addEventListener('pointercancel', rowUp);
    track.addEventListener('pointerdown', barDown);
    track.addEventListener('pointermove', move);
    track.addEventListener('pointerup', barUp);
    track.addEventListener('pointercancel', barUp);
    el.addEventListener('scroll', paint, { passive: true });
    window.addEventListener('resize', paint);
    paint();
    return () => {
      el.removeEventListener('pointerdown', rowDown);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', rowUp);
      el.removeEventListener('pointercancel', rowUp);
      track.removeEventListener('pointerdown', barDown);
      track.removeEventListener('pointermove', move);
      track.removeEventListener('pointerup', barUp);
      track.removeEventListener('pointercancel', barUp);
      el.removeEventListener('scroll', paint);
      window.removeEventListener('resize', paint);
    };
  }, []);

  return (
    <>
      <div ref={row} className={className} tabIndex={0} role="region" aria-label={label}>
        {children}
      </div>
      <div className="pscroll-bar" ref={bar} aria-hidden="true">
        <span className="pscroll-bar__thumb" />
      </div>
    </>
  );
}
