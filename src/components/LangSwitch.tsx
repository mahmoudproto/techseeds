'use client';

import type { MouseEvent } from 'react';
import type { Lang } from '@/lib/site-content';

/** The same page in the other language: /tracks/ai <-> /en/tracks/ai, / <-> /en. */
export function otherLangPath(path: string, from: Lang): string {
  if (from === 'ar') return path === '/' ? '/en' : `/en${path}`;
  const rest = path.replace(/^\/en(?=\/|$)/, '');
  return rest === '' ? '/' : rest;
}

/** The id of the section the visitor is reading now: the one crossing a line a third of the way down the screen. */
function currentSection(): string {
  if (window.scrollY < 80) return '';
  const line = window.innerHeight * 0.35;
  let id = '';
  for (const el of document.querySelectorAll<HTMLElement>('section[id]')) {
    const r = el.getBoundingClientRect();
    if (r.top <= line && r.bottom > line) id = el.id;
  }
  return id;
}

/**
 * The language button. It opens the same page in the other language, at the same section,
 * instead of the other language's home page. Without JavaScript the plain link still works.
 */
export default function LangSwitch({ lang, label, href }: { lang: Lang; label: string; href: string }) {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    const section = currentSection();
    const target = otherLangPath(window.location.pathname.replace(/\/$/, '') || '/', lang);
    // a full load, so the page comes back in the other direction (rtl / ltr) and font
    window.location.assign(target + (section && section !== 'home' && section !== 'top' ? `#${section}` : ''));
  };
  return (
    <a className="lang" href={href} lang={lang === 'ar' ? 'en' : 'ar'} onClick={onClick}>
      {label}
    </a>
  );
}
