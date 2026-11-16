'use client';

import { WHATSAPP_NUMBER } from '@/lib/labels';
import { track } from '@/lib/track';

/** A WhatsApp button that stays in the corner of every page. */
export default function WhatsAppFloat({ label }: { label: string }) {
  return (
    <a
      className="wa-float"
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      onClick={() => track('whatsapp_click', { place: 'float' })}
    >
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4z" />
        <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.8-2-1-.8.8c-1-.5-1.7-1.2-2.2-2.2l.8-.8-1-2z" fill="#ffffff" stroke="none" />
      </svg>
    </a>
  );
}
