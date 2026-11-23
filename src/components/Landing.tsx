/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { WHATSAPP_NUMBER } from '@/lib/labels';
import { MEDIA } from '@/lib/media';
import { TRACKS } from '@/lib/tracks';
import ProjectsScroller, { type ScrollerItem } from './ProjectsScroller';
import { SITE, whatsappLink, type Lang } from '@/lib/site-content';
import { LOCATION, NEXT_START_DATE, SEATS_LEFT } from '@/lib/site-config';
import AgeTabs from './AgeTabs';
import { Sparkle, Squiggle } from './Doodles';
import Faq from './Faq';
import Reveal from './Reveal';
import Icon from './LandingIcon';
import WorkshopForm from './WorkshopForm';

function Head({ kicker, title, text, center = false }: { kicker: string; title: string; text?: string; center?: boolean }) {
  return (
    <div className={`s-head${center ? ' s-head--center' : ''}`}>
      <p className="kicker">{kicker}</p>
      <h2 className="h2">{title}</h2>
      {text && <p className="s-head__text">{text}</p>}
    </div>
  );
}

export default function Landing({ lang }: { lang: Lang }) {
  const t = SITE[lang];
  const whatsapp = whatsappLink(WHATSAPP_NUMBER, t.whatsappText);
  const arrow = <span className="btn__arrow" aria-hidden="true">{t.arrow}</span>;

  // The "next group" strip hides itself once the start day has passed or the group is full.
  const start = new Date(`${NEXT_START_DATE}T23:59:59+02:00`);
  const showNext = SEATS_LEFT > 0 && start.getTime() > Date.now();
  const startLabel = new Intl.DateTimeFormat(t.next.locale, {
    weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Africa/Cairo',
  }).format(start);

  return (
    <>
      <Reveal />
      {/* 1. Hero: text first, photo on the other side, green and yellow shapes behind it */}
      <section className="hero-band" id="home">
        <span className="bg-shape bg-shape--blue hero-band__blue" aria-hidden="true" />
        <span className="bg-shape bg-shape--green hero-band__green" aria-hidden="true" />
        <span className="bg-shape bg-shape--sun hero-band__sun" aria-hidden="true" />
        <div className="wrap hero">
          <div className="hero__copy">
            {showNext && (
              <p className="next-group">
                <span className="next-group__dot" aria-hidden="true" />
                <span>{t.next.starts} <b>{startLabel}</b></span>
                <span className="next-group__seats">{t.next.seats(SEATS_LEFT)}</span>
              </p>
            )}
            {/* Each \n in the text is a line break; the yellow line sits under the last line only. */}
            <h1 className="hero__title">
              {t.hero.title.split('\n').map((line) => (
                <span className="hero__line" key={line}>{line}</span>
              ))}
              {t.hero.highlight.split('\n').map((line, i, all) =>
                i < all.length - 1 ? (
                  <span className="hero__line hero__line--green" key={line}>{line}</span>
                ) : (
                  <span className="hero__line" key={line}>
                    <span className="hl">
                      {line}
                      <Squiggle />
                    </span>
                  </span>
                ),
              )}
            </h1>
            <p className="hero__lead">{t.hero.lead}</p>
            <div className="hero__cta-row">
              <Link className="btn btn--big" href={lang === 'en' ? '/en/test' : '/test'}>
                <span>{t.hero.cta}</span>
                {arrow}
              </Link>
              <p className="hero__note">{t.hero.note}</p>
            </div>
          </div>

          <div className="hero__visual">
            <span className="shape shape--green" aria-hidden="true" />
            <span className="shape shape--yellow" aria-hidden="true" />
            <span className="shape shape--blue-dot" aria-hidden="true" />
            <img
              className="hero__photo"
              src={MEDIA.hero.src}
              alt={MEDIA.hero.alt[lang]}
              width={640}
              height={480}
              fetchPriority="high"
            />
          </div>
        </div>

        {/* 2. Trust strip */}
        <div className="wrap trust-wrap">
          <ul className="trust">
            {t.stats.map((s) => (
              <li className="trust__item" key={s.value}>
                <span className={`tint tint--${s.tint}`}><Icon name={s.icon} color={s.color} /></span>
                <span className="trust__text">
                  <strong>{s.value}</strong>
                  <small>{s.label}</small>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Why us: message and photo side by side, then three equal points in one row */}
      <section className="section" id="why">
        <div className="wrap">
          <div className="why">
            <div className="why__intro">
              <Head kicker={t.why.kicker} title={t.why.title} text={t.why.text} />
              <figure className="founder">
                <figcaption className="founder__label">{t.why.founder.title}</figcaption>
                <blockquote>{t.why.founder.quote}</blockquote>
                {t.why.founder.name && <p className="founder__name">{t.why.founder.name}</p>}
              </figure>
            </div>
            <div className="why__side">
              <span className="bg-shape bg-shape--blue why__blob" aria-hidden="true" />
              <img className="why__photo" src={MEDIA.why.src} alt={MEDIA.why.alt[lang]} loading="lazy" width={940} height={692} />
            </div>
          </div>
          <ul className="why__list">
            {t.why.items.map((w) => (
              <li className="why__card" key={w.title}>
                <span className={`tint tint--${w.tint}`}><Icon name={w.icon} color={w.color} /></span>
                <strong>{w.title}</strong>
                <span>{w.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Teaching team */}
      <section className="section section--blue" id="team">
        <div className="wrap team">
          <div className="team__photo-wrap">
            <span className="bg-shape bg-shape--green team__blob" aria-hidden="true" />
            <img className="team__photo" src={MEDIA.team.src} alt={MEDIA.team.alt[lang]} loading="lazy" width={1600} height={1067} />
          </div>
          <div>
            <Head kicker={t.team.kicker} title={t.team.title} text={t.team.text} />
            <div className="roles">
              {t.team.roles.map((r, i) => (
                <div className="role" key={r.title}>
                  <span className={`role__badge role__badge--${i === 0 ? 'green' : 'yellow'}`} aria-hidden="true">
                    <Icon name={i === 0 ? 'board' : 'hands'} color={i === 0 ? '#2fa84f' : '#d99a00'} />
                  </span>
                  <strong>{r.title}</strong>
                  <p>{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Tracks by age */}
      <section className="section" id="tracks">
        <div className="wrap">
          <Head kicker={t.tracks.kicker} title={t.tracks.title} text={t.tracks.text} center />
          <AgeTabs lang={lang} />

          <div className="projects-block" id="projects">
            <Head kicker={t.projects.kicker} title={t.projects.title} text={t.projects.text} center />
            <ProjectsScroller items={projectItems(lang)} label={t.projects.title} />
            <p className="soon-note">{t.projects.note}</p>
          </div>

        </div>
      </section>

      {/* 6. How we start */}
      <section className="section section--cream" id="how">
        <div className="wrap">
          <div className="s-head s-head--center">
            <p className="kicker kicker--hand">{t.how.kicker}</p>
            <h2 className="h2">{t.how.title}</h2>
            <p className="s-head__text">{t.how.sub}</p>
          </div>
          <ol className="steps">
            {t.how.steps.map((s, i) => (
              <li className="step" key={s.n}>
                <span className="step__num">{s.n}</span>
                <strong>{s.title}</strong>
                <span className="step__text">{s.text}</span>
                {i < t.how.steps.length - 1 && <StepArrow />}
              </li>
            ))}
          </ol>
          <div className="center">
            <Link className="btn btn--raised" href={lang === 'en' ? '/en/test' : '/test'}>
              {t.how.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Parents' workshop booking, higher up than before */}
      <section className="section" id="workshop">
        <div className="wrap">
          <div className="workshop">
            <div className="workshop__copy">
              <p className="kicker">{t.workshop.kicker}</p>
              <h2 className="h2">{t.workshop.title}</h2>
              <p className="s-head__text">{t.workshop.text}</p>
              <ul className="workshop__points">
                {t.workshop.points.map((point) => (
                  <li key={point.title}>
                    <strong>{point.title}</strong>
                    <span>{point.text}</span>
                  </li>
                ))}
              </ul>
              <div className="map">
                <iframe
                  className="map__frame"
                  title={t.workshop.mapTitle}
                  src={`https://www.google.com/maps?q=${LOCATION.lat},${LOCATION.lng}&z=17&hl=${lang}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a className="map__open" href={LOCATION.mapsLink} target="_blank" rel="noopener noreferrer">
                  {t.workshop.mapOpen}
                </a>
              </div>
              <p className="address">
                <span className="address__pin" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#d99a00" strokeWidth="2"><path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
                </span>
                <span>
                  <span className="tag" dir="ltr">{t.workshop.place}</span> {t.workshop.address}
                </span>
              </p>
            </div>
            <WorkshopForm lang={lang} />
          </div>
        </div>
      </section>

      {/* 9. Testimonials */}
      <section className="section" id="reviews">
        <div className="wrap">
          <Head kicker={t.reviews.kicker} title={t.reviews.title} text={t.reviews.sub} />
          <div className="reviews" tabIndex={0} role="region" aria-label={t.reviews.title}>
            {SITE.ar.reviews.items.map((r) => (
              <figure className="review" key={r.name} lang="ar" dir="rtl">
                <span className="review__quote" aria-hidden="true">”</span>
                <blockquote>{r.text}</blockquote>
                <figcaption>
                  <strong>{r.name}</strong>
                  {!r.name.startsWith('ولي') && <span>{SITE.ar.reviews.parent}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="reviews__hint">{t.reviews.hint} {t.arrow}</p>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="section section--green" id="faq">
        <div className="wrap wrap--narrow">
          <Head kicker={t.faq.kicker} title={t.faq.title} center />
          <Faq items={t.faq.items} />
        </div>
      </section>

      {/* 11. Final call to action */}
      <section className="section">
        <div className="wrap">
          <div className="final">
            <img className="final__photo" src={MEDIA.finalCta.src} alt={MEDIA.finalCta.alt[lang]} loading="lazy" width={1400} height={878} />
            <div className="final__copy">
              <Sparkle className="final__sparkle" />
              <h2 className="final__title">{t.final.title}</h2>
              <p>{t.final.text}</p>
              <div className="hero__ctas">
                <Link className="btn btn--big" href={lang === 'en' ? '/en/test' : '/test'}>
                  <span>{t.final.cta}</span>
                  {arrow}
                </Link>
                <a className="btn btn--ghost-light" href={whatsapp} target="_blank" rel="noopener noreferrer">
                  {t.final.whatsapp}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function WaIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4z" />
      <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.8-2-1-.8.8c-1-.5-1.7-1.2-2.2-2.2l.8-.8-1-2z" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Dashed hand-drawn arrow between two steps (points to the next step in reading order). */
function StepArrow() {
  return (
    <svg className="step__arrow" viewBox="0 0 60 30" aria-hidden="true">
      <path d="M56 20 C 44 4, 22 2, 8 16" fill="none" stroke="#122e4f" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 5" />
      <path d="M4 9 L8 17 L16 14" fill="none" stroke="#122e4f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Small drawn "screens" standing in for project screenshots until real ones arrive. */
export function ProjectArt({ tint }: { tint: string }) {
  if (tint === 'yellow') {
    return (
      <svg viewBox="0 0 200 110" className="project__art">
        <rect width="200" height="110" fill="#122e4f" />
        {[[20, 14], [60, 30], [150, 18], [175, 60], [35, 70], [110, 8]].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill="#ffffff" opacity="0.8" />
        ))}
        <circle cx="62" cy="34" r="11" fill="#8a96a6" />
        <circle cx="146" cy="44" r="8" fill="#8a96a6" />
        <rect x="98" y="40" width="3" height="22" rx="1.5" fill="#f8bc17" />
        <path d="M100 66 l12 22 h-24 z" fill="#3eaae5" />
        <g fill="#f08a7b"><circle cx="176" cy="96" r="4" /><circle cx="164" cy="96" r="4" /><circle cx="152" cy="96" r="4" /></g>
      </svg>
    );
  }
  if (tint === 'blue') {
    return (
      <svg viewBox="0 0 200 110" className="project__art">
        <rect width="200" height="110" fill="#e6f2fc" />
        <rect x="14" y="16" width="70" height="16" rx="6" fill="#f8bc17" />
        <rect x="14" y="38" width="88" height="16" rx="6" fill="#3eaae5" />
        <rect x="24" y="60" width="70" height="16" rx="6" fill="#3eaae5" opacity="0.7" />
        <rect x="14" y="82" width="60" height="16" rx="6" fill="#2fa84f" />
        <circle cx="150" cy="62" r="20" fill="#ffffff" stroke="#122e4f" strokeWidth="3" />
        <circle cx="143" cy="58" r="3" fill="#122e4f" /><circle cx="157" cy="58" r="3" fill="#122e4f" />
        <path d="M142 68 q8 7 16 0" stroke="#122e4f" strokeWidth="3" fill="none" strokeLinecap="round" />
        <rect x="128" y="20" width="56" height="18" rx="9" fill="#ffffff" stroke="#122e4f" strokeWidth="2" />
      </svg>
    );
  }
  if (tint === 'mint') {
    return (
      <svg viewBox="0 0 200 110" className="project__art">
        <rect width="200" height="110" fill="#edf7f3" />
        <rect x="30" y="22" width="140" height="22" rx="8" fill="#ffffff" stroke="#122e4f" strokeWidth="2" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <circle key={i} cx={46 + i * 13} cy="33" r="3.4" fill="#122e4f" />
        ))}
        <rect x="30" y="56" width="140" height="10" rx="5" fill="#d5dee8" />
        <rect x="30" y="56" width="104" height="10" rx="5" fill="#2fa84f" />
        <path d="M86 78 l10 10 18-20" stroke="#2fa84f" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 110" className="project__art">
      <rect width="200" height="110" fill="#e9f7ee" />
      <rect x="16" y="14" width="80" height="82" rx="8" fill="#ffffff" stroke="#122e4f" strokeWidth="2" />
      <rect x="26" y="26" width="60" height="30" rx="4" fill="#f8bc17" opacity="0.8" />
      <rect x="26" y="64" width="54" height="6" rx="3" fill="#d5dee8" />
      <rect x="26" y="76" width="40" height="6" rx="3" fill="#d5dee8" />
      <rect x="110" y="30" width="74" height="54" rx="10" fill="#2fa84f" />
      <circle cx="132" cy="52" r="4" fill="#ffffff" /><circle cx="162" cy="52" r="4" fill="#ffffff" />
      <rect x="134" y="64" width="26" height="5" rx="2.5" fill="#ffffff" />
      <path d="M147 30 v-12" stroke="#2fa84f" strokeWidth="3" strokeLinecap="round" />
      <circle cx="147" cy="16" r="4" fill="#f8bc17" />
    </svg>
  );
}

const TRACK_TINT = { ai: 'yellow', programming: 'blue', cyber: 'mint', gamedev: 'green' } as const;

/** Every student project screenshot, track by track. The four featured ones keep their longer text. */
function projectItems(lang: Lang): ScrollerItem[] {
  const featured = SITE[lang].projects.items;
  return TRACKS.flatMap((tr) =>
    tr.shots.map((shot) => {
      const m = MEDIA.projects[shot.img];
      const f = featured.find((x) => x.img === shot.img);
      return {
        key: shot.img,
        src: m.src,
        alt: m.alt[lang],
        track: tr.name[lang],
        tint: TRACK_TINT[tr.slug],
        title: f ? f.title : shot.caption[lang],
        text: f?.text,
      };
    }),
  );
}
