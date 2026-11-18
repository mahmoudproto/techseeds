'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/**
 * The header logo. On the home page it scrolls smoothly back to the top
 * (and clears any #section from the address); on other pages it goes home.
 */
export default function LogoLink({ home, children }: { home: string; children: ReactNode }) {
  const pathname = usePathname();

  function onClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname !== home) return; // normal navigation to the home page
    event.preventDefault();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    window.history.replaceState(null, '', home);
  }

  return (
    <Link href={home} aria-label="TechSeeds Academy" onClick={onClick}>
      {children}
    </Link>
  );
}
