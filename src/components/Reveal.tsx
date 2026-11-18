'use client';

import { useEffect } from 'react';

/** Cards that fade and slide in the first time they scroll into view. */
const SELECTOR = [
  '.trust__item', '.why__card', '.founder', '.role', '.track-card', '.project',
  '.step', '.review', '.faq__item', '.level', '.ws-form', '.map', '.final', '.track-cta',
].join(',');

export default function Reveal() {
  useEffect(() => {
    // Without IntersectionObserver, or for visitors who prefer less motion, show everything as is.
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const items = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).filter(
      // Anything already on screen when the page opens stays still.
      (el) => el.getBoundingClientRect().top > window.innerHeight,
    );

    // Cards side by side come in one after another.
    for (const el of items) {
      const siblings = el.parentElement ? Array.from(el.parentElement.children) : [el];
      const index = Math.min(siblings.indexOf(el), 5);
      el.style.setProperty('--reveal-delay', `${index * 90}ms`);
      el.classList.add('reveal');
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('reveal--in');
          observer.unobserve(entry.target); // first time only
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
