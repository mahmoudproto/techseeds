'use client';

import { track as vercelTrack } from '@vercel/analytics';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Standard Meta Pixel events we map our own events to. */
const META_EVENT: Record<string, string> = {
  test_started: 'InitiateCheckout',
  test_completed: 'Lead',
  workshop_booked: 'Schedule',
  whatsapp_click: 'Contact',
};

export type TrackEvent = 'test_started' | 'test_completed' | 'workshop_booked' | 'whatsapp_click';

/** Records an event in Vercel Analytics and, when a pixel is configured, in Meta. Never throws. */
export function track(event: TrackEvent, data: Record<string, string | number> = {}) {
  try {
    vercelTrack(event, data);
  } catch {
    // Analytics must never break the page.
  }
  try {
    window.fbq?.('track', META_EVENT[event], data);
  } catch {
    // Same here.
  }
}
