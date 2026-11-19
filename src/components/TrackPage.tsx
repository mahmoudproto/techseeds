/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { WHATSAPP_NUMBER } from '@/lib/labels';
import { MEDIA } from '@/lib/media';
import { SITE, whatsappLink, type Lang } from '@/lib/site-content';
import { AGE_BANDS, TRACKS, type Track } from '@/lib/tracks';
import { Squiggle } from './Doodles';
import { ProjectArt, WaIcon } from './Landing';
import ScrollToTop from './ScrollToTop';
import TrackCards, { type StackCard } from './TrackCards';
import Reveal from './Reveal';

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
      <section className={`track-hero track-hero--${track.color}`}>
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
            <TrackCards key={track.slug} cards={cards} label={p.cards} />
            <div className="instructor">
              {track.instructor ? (
                <img className="instructor__photo" src={track.instructor.photo} alt="" width={72} height={72} />
              ) : (
                <span className="instructor__photo instructor__photo--empty" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="34" height="34" fill="#8fa3b7"><circle cx="12" cy="8.5" r="4.2" /><path d="M3.8 21c.8-4.4 4.2-6.6 8.2-6.6s7.4 2.2 8.2 6.6z" /></svg>
                </span>
              )}
              <span className="instructor__text">
                <small>{p.instructor}</small>
                <strong>{track.instructor ? track.instructor.name[lang] : p.instructorSoon}</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="s-head">
            <p className="kicker">{p.ages}</p>
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

      <section className="section section--tint">
        <div className="wrap track-detail">
          <div>
            <h2 className="h2 h2--small">{p.projects}</h2>
            <ul className="check-list">
              {track.projects.map((pr) => (
                <li key={pr.en}>{pr[lang]}</li>
              ))}
            </ul>
            <p className="soon-note soon-note--start">{p.projectsNote}</p>
          </div>
          <div>
            <h2 className="h2 h2--small">{p.how}</h2>
            <ul className="check-list">
              {p.howItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="track-cta">
            <div>
              <h2 className="h2 h2--small">{p.cta}</h2>
              <p>{p.ctaText}</p>
            </div>
            <div className="hero__ctas">
              <Link className="btn" href="/test">
                <span>{p.test}</span>
                <span className="btn__arrow" aria-hidden="true">{t.arrow}</span>
              </Link>
              <a className="btn btn--wa" href={whatsapp} target="_blank" rel="noopener noreferrer">
                <WaIcon />
                <span>{p.whatsapp}</span>
              </a>
            </div>
          </div>

          <nav className="other-tracks" aria-label={t.tracks.kicker}>
            {others.map((tr) => (
              <Link key={tr.slug} className={`other-track other-track--${tr.color}`} href={`${base}/tracks/${tr.slug}`}>
                {tr.name[lang]} <span aria-hidden="true">{t.arrow}</span>
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </>
  );
}
