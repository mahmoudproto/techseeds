'use client';

/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useId, useRef, useState } from 'react';
import { MEDIA } from '@/lib/media';
import { SITE, type Lang } from '@/lib/site-content';
import { AGE_BANDS, TRACKS, type AgeBand } from '@/lib/tracks';

/** Tracks grouped by age: one tab per age band, equal-size cards inside. */
export default function AgeTabs({ lang }: { lang: Lang }) {
  const t = SITE[lang];
  const [band, setBand] = useState<AgeBand>('middle');
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const base = lang === 'ar' ? '' : '/en';

  // Arrow keys move between tabs, as screen-reader users expect.
  function onKey(e: React.KeyboardEvent, i: number) {
    const forward = lang === 'ar' ? 'ArrowLeft' : 'ArrowRight';
    const back = lang === 'ar' ? 'ArrowRight' : 'ArrowLeft';
    let next = i;
    if (e.key === forward) next = (i + 1) % AGE_BANDS.length;
    else if (e.key === back) next = (i - 1 + AGE_BANDS.length) % AGE_BANDS.length;
    else return;
    e.preventDefault();
    setBand(AGE_BANDS[next].id);
    tabs.current[next]?.focus();
  }

  const tracks = TRACKS.filter((tr) => tr.levels[band]);

  return (
    <div className="age-tabs">
      <div className="age-tabs__list" role="tablist" aria-label={t.tracks.tabs}>
        {AGE_BANDS.map((b, i) => {
          const on = b.id === band;
          return (
            <button
              key={b.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${b.id}`}
              aria-selected={on}
              aria-controls={`${id}-panel`}
              tabIndex={on ? 0 : -1}
              className={`age-tab${on ? ' age-tab--on' : ''}`}
              onClick={() => setBand(b.id)}
              onKeyDown={(e) => onKey(e, i)}
            >
              {b.label[lang]}
            </button>
          );
        })}
      </div>

      <div
        className={`track-grid track-grid--${tracks.length}`}
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${band}`}
      >
        {tracks.map((tr) => {
          const level = tr.levels[band]!;
          const photo = MEDIA.tracks[tr.slug];
          return (
            <article className={`track-card track-card--${tr.color}`} key={tr.slug}>
              <div className="track-card__media">
                <img src={photo.src} alt={photo.alt[lang]} loading="lazy" width={900} height={600} />
              </div>
              <div className="track-card__body">
                <h3 className="track-card__name">{tr.name[lang]}</h3>
                <p className="track-card__text">{level.text[lang]}</p>
                <ul className="tags" aria-label={t.trackPage.tools}>
                  {level.tools.map((tool) => (
                    <li className="tag" key={tool} dir="ltr">{tool}</li>
                  ))}
                </ul>
                <Link className="track-card__more" href={`${base}/tracks/${tr.slug}`}>
                  {t.tracks.more} <span aria-hidden="true">{t.arrow}</span>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
