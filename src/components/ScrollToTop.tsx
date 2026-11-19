'use client';

import { useEffect } from 'react';

/**
 * Opens the page at the top. Next.js keeps the old scroll position when moving
 * between pages that share a layout, which left visitors at the bottom of a track page.
 */
export default function ScrollToTop() {
  useEffect(() => {
    if (window.location.hash) return; // a link to a section should still land on it
    const root = document.documentElement;
    const before = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto'; // jump, don't glide down the page
    window.scrollTo(0, 0);
    root.style.scrollBehavior = before;
  }, []);
  return null;
}
