import Link from 'next/link';
import { WHATSAPP_NUMBER } from '@/lib/labels';
import { SITE, type Lang } from '@/lib/site-content';
import Icon from './LandingIcon';

/* eslint-disable @next/next/no-img-element */

export default function Landing({ lang }: { lang: Lang }) {
  const t = SITE[lang];
  const whatsapp = `https://wa.me/${WHATSAPP_NUMBER}`;
  const arrow = <span className="btn__arrow" aria-hidden="true">{t.arrow}</span>;

  return (
    <>
      {/* Hero */}
      <div className="hero-band" id="home">
        <span className="hero-band__shape hero-band__shape--blue" aria-hidden="true" />
        <span className="hero-band__shape hero-band__shape--green" aria-hidden="true" />
        <span className="hero-band__shape hero-band__shape--sun" aria-hidden="true" />
        <section className="landing hero">
          <div className="hero__copy">
            <p className="eyebrow">Growing Young Minds</p>
            <h1 className="title">{t.hero.title}</h1>
            <p className="lead">{t.hero.lead}</p>
            <div className="hero__ctas">
              <Link className="btn" href="/test">
                <span>{t.hero.cta}</span>
                {arrow}
              </Link>
              <a className="hero__link" href={whatsapp} target="_blank" rel="noopener noreferrer">
                {t.hero.whatsapp}
              </a>
            </div>
          </div>
          <div className="hero__art" aria-hidden="true">
          <span className="blob blob--blue" />
          <span className="blob blob--green" />
          <span className="dot dot--yellow" />
          <span className="dot dot--blue" />
          <span className="dot dot--green" />
          <div className="art-card art-card--code">
            <div className="code-window__bar"><i /><i /><i /></div>
            <pre className="code-window" dir="ltr">{`when  🚩 clicked
repeat 10
   move 10 steps
   say "Hello!"`}</pre>
            <div className="art-tracks">
              <span className="tint tint--blue"><Icon name="code" color="#3eaae5" /></span>
              <span className="tint tint--yellow"><Icon name="game" color="#d99a00" /></span>
              <span className="tint tint--green"><Icon name="ai" color="#2fa84f" /></span>
              <span className="tint tint--mint"><Icon name="shield" color="#2fa84f" /></span>
            </div>
          </div>
          <span className="code-chip"><span>Python</span><span>Scratch</span><span>Unity</span><span>AI</span></span>
          <span className="badge">&lt;/&gt;</span>
        </div>
        </section>
      </div>

      <div className="landing">
        {/* Stats */}
        <section className="l-section l-section--tight stats-wrap">
          <div className="card stats">
            {t.stats.map((s) => (
              <div className="stat" key={s.value}>
                <span className={`tint tint--${s.tint}`}><Icon name={s.icon} color={s.color} /></span>
                <span className="stat__text">
                  <strong>{s.value}</strong>
                  <small>{s.label}</small>
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* About */}
        <section className="l-section about" id="about">
          <div className="about__copy">
            <p className="eyebrow">{t.about.eyebrow}</p>
            <h2 className="h2">{t.about.title}</h2>
            <span className="title__bar" />
            <p className="lead lead--wide">{t.about.text}</p>
            <div className="pillars">
              {t.about.pillars.map((p) => (
                <div className="card pillar" key={p.lines[0]}>
                  <Icon name={p.icon} size={30} color="#2fa84f" />
                  <span>{p.lines[0]}<br />{p.lines[1]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Programs */}
        <section className="l-section" id="programs">
          <div className="section-head">
            <p className="eyebrow">{t.programs.eyebrow}</p>
            <h2 className="h2">{t.programs.title}</h2>
            <span className="title__bar" />
            <p className="lead lead--wide">{t.programs.text}</p>
          </div>
          <div className="programs">
            {t.programs.items.map((p) => (
              <div className={`program program--${p.tint}`} key={p.name}>
                <span className="program__icon"><Icon name={p.icon} size={26} color={p.color} /></span>
                <strong className="program__ar">{p.name}</strong>
                <span className="program__ages">{p.ages}</span>
                <span className="program__note">{p.note}</span>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="l-section">
          <div className="how">
            <div className="how__body">
              <p className="eyebrow">{t.how.eyebrow}</p>
              <h2 className="h2">{t.how.title}</h2>
              <p className="how__sub">{t.how.sub}</p>
              <ol className="steps">
                {t.how.steps.map((s) => (
                  <li className="step" key={s.n}>
                    <span className="step__num">{s.n}</span>
                    <strong>{s.title}</strong>
                    <span>{s.text}</span>
                  </li>
                ))}
              </ol>
              <Link className="btn" href="/test">
                <span>{t.how.cta}</span>
                {arrow}
              </Link>
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="l-section" id="why">
          <div className="section-head">
            <p className="eyebrow">{t.why.eyebrow}</p>
            <h2 className="h2">{t.why.title}</h2>
            <span className="title__bar" />
          </div>
          <div className="why">
            {t.why.items.map((w) => (
              <div className="card why__card" key={w.title}>
                <span className={`tint tint--${w.tint}`}><Icon name={w.icon} color={w.color} /></span>
                <strong>{w.title}</strong>
                <p>{w.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="l-section" id="reviews">
          <div className="reviews-head">
            <div>
              <p className="eyebrow">{t.reviews.eyebrow}</p>
              <h2 className="h2">{t.reviews.title}</h2>
              <p className="how__sub">{t.reviews.sub}</p>
            </div>
          </div>
          <div className="reviews" tabIndex={0} role="region" aria-label={t.reviews.title}>
            {SITE.ar.reviews.items.map((r) => (
              <figure className="card review" key={r.name} lang="ar" dir="rtl">
                <blockquote>«{r.text}»</blockquote>
                <figcaption>
                  <span className="review__avatar" aria-hidden="true">{r.name.charAt(0)}</span>
                  {r.name}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="reviews__hint">{t.reviews.hint} {t.arrow}</p>
        </section>

        {/* CTA banner */}
        <section className="l-section l-section--tight">
          <div className="cta">
            <div className="cta__copy">
              <strong>{t.banner.title}</strong>
              <span>{t.banner.text}</span>
            </div>
            <Link className="btn" href="/test">
              <span>{t.banner.cta}</span>
              {arrow}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
