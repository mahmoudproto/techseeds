'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

interface Item {
  href: string;
  label: string;
}

/** The phone menu. It closes when you pick a link, tap anywhere outside it, or press Escape. */
export default function MobileMenu({ items, label }: { items: Item[]; label: string }) {
  const menu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const close = () => menu.current?.removeAttribute('open');
    const onDown = (e: PointerEvent) => {
      if (menu.current?.open && !menu.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menu.current?.open) {
        close();
        menu.current.querySelector('summary')?.focus();
      }
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <details className="menu" ref={menu}>
      <summary aria-label={label}>
        <span />
        <span />
        <span />
      </summary>
      <div className="menu__panel">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="menu__link"
            onClick={() => menu.current?.removeAttribute('open')}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </details>
  );
}
