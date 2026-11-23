'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * A sideways-scrolling row (used for the parent reviews) that can also be dragged with the mouse.
 * A soft shadow shows at an edge while there is more to see past it, so a missing shadow
 * tells the visitor they've reached the start or the end.
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
  const [edges, setEdges] = useState({ start: false, end: true });

  useEffect(() => {
    const el = row.current;
    if (!el) return;

    // how far from the start (always positive, also for right-to-left rows)
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      const at = Math.abs(el.scrollLeft);
      setEdges({ start: at > 4, end: at < max - 4 });
    };

    let drag: { x: number; left: number; moved: number } | null = null;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      drag = { x: e.clientX, left: el.scrollLeft, moved: 0 };
      el.setPointerCapture(e.pointerId);
      el.classList.add('is-dragging');
    };
    const onMove = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      drag.moved = Math.max(drag.moved, Math.abs(dx));
      el.scrollLeft = drag.left - dx;
    };
    const onUp = (e: PointerEvent) => {
      if (!drag) return;
      drag = null;
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      // turning snapping back on settles the row on the nearest card
      el.classList.remove('is-dragging');
    };

    update();
    el.addEventListener('scroll', update, { passive: true });
    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className={`edge-shade${edges.start ? ' edge-shade--start' : ''}${edges.end ? ' edge-shade--end' : ''}`}>
      <div ref={row} className={className} tabIndex={0} role="region" aria-label={label}>
        {children}
      </div>
    </div>
  );
}
