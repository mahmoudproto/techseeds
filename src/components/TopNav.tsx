'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Item {
  href: string;
  label: string;
}

/** Header links, with a green line under the section the visitor is reading. */
export default function TopNav({ items, label }: { items: Item[]; label: string }) {
  const [active, setActive] = useState('');

  useEffect(() => {
    const ids = items.map((item) => item.href.split('#')[1]).filter(Boolean);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length < 2) return; // e.g. the test page, which only has the footer

    function update() {
      // The current section is the last one whose top has passed just below the header.
      const line = 140;
      let current = sections[0].id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id;
      }
      // At the very bottom of the page, the last section (contact) is the current one.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = sections[sections.length - 1].id;
      }
      setActive(current);
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [items]);

  return (
    <nav className="topnav" aria-label={label}>
      {items.map((item) => {
        const on = item.href.split('#')[1] === active;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`topnav__link${on ? ' topnav__link--on' : ''}`}
            aria-current={on ? 'true' : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
