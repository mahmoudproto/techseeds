import Link from 'next/link';
import { WHATSAPP_NUMBER } from '@/lib/labels';
import { SITE, type Lang } from '@/lib/site-content';
import TopNav from './TopNav';

/** The full logo (icon + name). It always sits on white, as the brand requires. */
export function Logo({ boxed = false }: { boxed?: boolean }) {
  return (
    <span className={`logo${boxed ? ' logo--boxed' : ''}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-full.png" alt="TechSeeds Academy" width={294} height={110} />
    </span>
  );
}

export default function SiteHeader({
  cta,
  lang,
  otherHref,
}: {
  cta: 'test' | 'whatsapp';
  lang: Lang;
  /** Where the language button goes; defaults to the other language's home page. */
  otherHref?: string;
}) {
  const t = SITE[lang];
  return (
    <header className="header">
      <div className="header__inner">
        <Link href={t.home} aria-label="TechSeeds Academy">
          <Logo />
        </Link>

        <TopNav items={t.nav} label={t.header.menu} />

        <div className="header__actions">
          {/* A plain link so the browser loads the other language's page fully. */}
          <a className="lang" href={otherHref ?? t.other.href} lang={lang === 'ar' ? 'en' : 'ar'}>
            {t.other.label}
          </a>

          {cta === 'test' ? (
            <Link className="btn btn--small" href={lang === 'en' ? '/en/test' : '/test'}>
              <span>{t.header.test}</span>
              <span className="btn__arrow" aria-hidden="true">{t.arrow}</span>
            </Link>
          ) : (
            <a
              className="btn btn--small"
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{t.header.whatsapp}</span>
              <span className="btn__arrow" aria-hidden="true">{t.arrow}</span>
            </a>
          )}

          <details className="menu">
            <summary aria-label={t.header.menu}>
              <span />
              <span />
              <span />
            </summary>
            <div className="menu__panel">
              {t.nav.map((item) => (
                <Link key={item.href} href={item.href} className="menu__link">
                  {item.label}
                </Link>
              ))}
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
