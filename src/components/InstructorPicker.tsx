'use client';

/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import type { Instructor } from '@/lib/tracks';
import type { Lang } from '@/lib/site-content';

/**
 * "Design F" from the Track Hero Visual board: the track's instructors as photo buttons.
 * Tapping a photo shows that person's name and experience in the box below, so each
 * name appears once. A single instructor is shown directly, with no buttons.
 */
export default function InstructorPicker({
  people,
  lead,
  lang,
  text,
}: {
  people: Instructor[];
  /** Who is picked when the page opens. */
  lead?: Instructor;
  lang: Lang;
  text: { title: string; pick: string };
}) {
  const [picked, setPicked] = useState(() => Math.max(0, lead ? people.indexOf(lead) : 0));
  const current = people[Math.min(picked, people.length - 1)];
  if (!current) return null;
  const many = people.length > 1;

  return (
    <section className="trainers" aria-labelledby="trainers-title">
      <h2 className="trainers__title" id="trainers-title">{text.title}</h2>
      {many ? (
        <div className="trainers__photos" role="group" aria-label={text.pick}>
          {people.map((person, i) => (
            <button
              key={person.photo}
              type="button"
              className="trainers__pick"
              onClick={() => setPicked(i)}
              aria-pressed={i === picked}
              aria-label={person.name[lang]}
            >
              <img className="trainers__photo" src={person.photo} alt="" width={92} height={92} />
              {i === picked && (
                <span className="trainers__check" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10" /></svg>
                </span>
              )}
            </button>
          ))}
        </div>
      ) : (
        <div className="trainers__photos">
          <img className="trainers__photo trainers__photo--solo" src={current.photo} alt="" width={92} height={92} />
        </div>
      )}
      <div className="trainers__detail" aria-live="polite">
        {/* the key remounts the text, so the new person fades in */}
        <div className="trainers__who" key={current.photo}>
          <strong className="trainers__name">{current.name[lang]}</strong>
          <span className="trainers__role">{current.role[lang]}</span>
        </div>
      </div>
    </section>
  );
}
