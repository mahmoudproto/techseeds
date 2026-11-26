/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { WHATSAPP_NUMBER } from '@/lib/labels';
import { MEDIA } from '@/lib/media';
import { SITE, whatsappLink, type Lang } from '@/lib/site-content';
import { AGE_BANDS, TRACKS, type Track } from '@/lib/tracks';
import { Squiggle } from './Doodles';
import { ProjectArt, WaIcon } from './Landing';
import ScrollToTop from './ScrollToTop';
import InstructorPicker from './InstructorPicker';
import Reveal from './Reveal';
import TrackCards, { type StackCard } from './TrackCards';

/** One track's own page: what it is, what each age learns, and how a month runs. */
export default function TrackPage({ track, lang }: { track: Track; lang: Lang }) {
  const t = SITE[lang];
  const p = t.trackPage;
  const base = lang === 'ar' ? '' : '/en';
  const cards: StackCard[] = track.cards.map((c, i) => {
    const key = `${track.slug}-${i}`;
    if (c.kind === 'art') {
      const m = MEDIA.tracks[track.slug];
      return { key, label: c.label[lang], img: { src: m.src, alt: m.alt[lang] } };
    }
    if (c.kind === 'photo') {
      const m = MEDIA.trackPhotos[track.slug];
      return { key, label: c.label[lang], img: { src: m.src, alt: m.alt[lang] } };
    }
    if (c.project) {
      const m = MEDIA.projects[c.project];
      return { key, label: c.label[lang], img: { src: m.src, alt: m.alt[lang] } };
    }
    return { key, label: c.label[lang], art: <ProjectArt tint={c.tint} /> };
  });
  const whatsapp = whatsappLink(WHATSAPP_NUMBER, `${t.whatsappText} (${track.name[lang]})`);
  const others = TRACKS.filter((tr) => tr.slug !== track.slug);

  return (
    <>
      <ScrollToTop key={track.slug} />
      <Reveal />
      <section className={`track-hero track-hero--${track.slug}`} id="top">
        <div className="wrap track-hero__inner">
          <div>
            <Link className="back" href={`${base}/#tracks`}>
              <span aria-hidden="true">{lang === 'ar' ? '→' : '←'}</span> {p.back}
            </Link>
            <h1 className="hero__title">
              <span className="hl">
                {track.name[lang]}
                <Squiggle />
              </span>
            </h1>
            <p className="hero__lead">{track.about[lang]}</p>
            <p className="track-hero__ages">
              {AGE_BANDS.filter((b) => track.levels[b.id]).map((b) => (
                <span className="chip" key={b.id}>{b.label[lang]}</span>
              ))}
            </p>
          </div>
          <div className="track-visual">
            <span className="bg-shape bg-shape--blue track-visual__blue" aria-hidden="true" />
            <span className="bg-shape bg-shape--green track-visual__green" aria-hidden="true" />
            <TrackCards
              key={track.slug}
              cards={cards}
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
              text={{ label: p.cards, open: p.open, prev: p.prev, next: p.next, close: p.close, card: p.hint }}
            />
            {track.instructors?.length ? (
              <InstructorPicker
                key={`${track.slug}-trainers`}
                people={track.instructors}
                lead={track.leadInstructor}
                lang={lang}
                text={{ title: p.trainersTitle, pick: p.trainersPick }}
              />
            ) : (
              <div className="trainers trainers--soon">
                <span className="trainers__photo trainers__photo--empty" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="34" height="34" fill="#7a8da1"><circle cx="12" cy="8.5" r="4.2" /><path d="M3.8 21c.8-4.4 4.2-6.6 8.2-6.6s7.4 2.2 8.2 6.6z" /></svg>
                </span>
                <span className="trainers__who">
                  <strong className="trainers__name">{p.instructor}</strong>
                  <span className="trainers__role">{p.instructorSoon}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section" id="ages">
        <div className="wrap">
          <div className="s-head">
            <h2 className="h2">{track.short[lang]}</h2>
          </div>
          <div className="levels">
            {AGE_BANDS.map((b) => {
              const level = track.levels[b.id];
              if (!level) return null;
              return (
                <article className="level" key={b.id}>
                  <span className="level__age">{b.label[lang]}</span>
                  <p>{level.text[lang]}</p>
                  <div>
                    <span className="level__label">{p.tools}</span>
                    <ul className="tags">
                      {level.tools.map((tool) => (
                        <li className="tag" key={tool} dir="ltr">{tool}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
          {!track.levels.young && <p className="soon-note">{p.notTaught}</p>}
        </div>
      </section>

      <section className="section section--tint" id="gains" aria-labelledby="gains-title">
        <div className="wrap gains">
          <div>
            <h2 className="h2 h2--small" id="gains-title">{p.gains}</h2>
            <ul className="check-list">
              {track.gains.map((g) => (
                <li key={g.en}>{g[lang]}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="h2 h2--small">{p.skills}</h2>
            <ul className="skills">
              {p.skillItems.map((sk) => (
                <li className="skill" key={sk.title}>
                  <strong>{sk.title}</strong>
                  <span>{sk.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {AGE_BANDS.some((b) => track.journey[b.id]?.length) && (
        <section className="section" id="journey" aria-labelledby="journey-title">
          <div className="wrap">
            <div className="s-head">
              <h2 className="h2" id="journey-title">{p.journey}</h2>
            </div>
            {AGE_BANDS.flatMap((b) =>
              (track.journey[b.id] ?? []).map((j) => (
                <div className="journey" key={`${b.id}-${j.heading.en}`}>
                  <h3 className="journey__head">
                    {b.label[lang]} · <span dir={lang === 'ar' ? 'rtl' : 'ltr'}>{j.heading[lang]}</span>
                  </h3>
                  {j.prereq && (
                    <p className="journey__prereq">
                      <strong>{p.prereq}</strong> {j.prereq[lang]}
                    </p>
                  )}
                  <ol className="journey__levels">
                    {j.levels.map((lv, i) => (
                      <li className="jlevel" key={lv.title.en}>
                        <span className="jlevel__n">{p.level(i + 1)}</span>
                        <h4 className="jlevel__title">{lv.title[lang]}</h4>
                        <p className="jlevel__text">{lv.text[lang]}</p>
                        <p className="jlevel__project">
                          <strong>{p.finalProject}</strong> {lv.project[lang]}
                        </p>
                      </li>
                    ))}
                  </ol>
                  {j.note && <p className="journey__note">{j.note[lang]}</p>}
                </div>
              )),
            )}
          </div>
        </section>
      )}

      {track.shots.length > 0 && (
        <section className="section section--tint" id="projects" aria-labelledby="shots-title">
          <div className="wrap">
            <div className="s-head">
              <h2 className="h2" id="shots-title">{p.shots}</h2>
            </div>
            <div className={`shots${track.shots.length === 1 ? ' shots--one' : ''}${track.shots.length > 4 ? ' shots--many' : ''}`}>
              {track.shots.map((shot) => {
                const m = MEDIA.projects[shot.img];
                return (
                  <figure className="shot" key={shot.img}>
                    <div className="shot__img">
                      <img src={m.src} alt={m.alt[lang]} loading="lazy" />
                    </div>
                    <figcaption>{shot.caption[lang]}</figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="section" id="how">
        <div className="wrap track-detail">
          <div>
            <h2 className="h2 h2--small">{p.how}</h2>
            <ul className="check-list">
              {p.howItems.map((item, i) => (
                // the second line describes what each session is for; some tracks run their levels differently
                <li key={item}>{i === 1 && track.rhythm ? track.rhythm[lang] : item}</li>
              ))}
            </ul>
          </div>
          <aside className="guarantee-box">
            <h2 className="h2 h2--small">{p.guarantee.title}</h2>
            <p>{p.guarantee.text}</p>
          </aside>
        </div>
      </section>

      <section className="section section--tint" id="start">
        <div className="wrap">
          <div className="track-cta">
            <div>
              <h2 className="h2 h2--small">{p.cta}</h2>
              <p>{p.ctaText}</p>
            </div>
            <div className="hero__ctas">
              <Link className="btn" href={lang === 'en' ? '/en/test' : '/test'}>
                <span>{p.test}</span>
                <span className="btn__arrow" aria-hidden="true">{t.arrow}</span>
              </Link>
              <a className="btn btn--wa" href={whatsapp} target="_blank" rel="noopener noreferrer">
                <WaIcon />
                <span>{p.whatsapp}</span>
              </a>
            </div>
          </div>

          <nav className="other-tracks" aria-labelledby="other-tracks-title">
            <h2 className="other-tracks__title" id="other-tracks-title">{p.others}</h2>
            <div className="other-tracks__list">
              {others.map((tr) => {
                const pic = MEDIA.tracks[tr.slug];
                return (
                  <Link key={tr.slug} className={`other-track other-track--${tr.slug}`} href={`${base}/tracks/${tr.slug}`}>
                    <img className="other-track__pic" src={pic.src} alt="" width={64} height={64} loading="lazy" />
                    <span className="other-track__name">{tr.name[lang]}</span>
                    <span className="other-track__arrow" aria-hidden="true">{t.arrow}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </section>
    </>
  );
}
