import Link from 'next/link';
import { WHATSAPP_NUMBER } from '@/lib/labels';
import { SITE, whatsappLink, type Lang } from '@/lib/site-content';
import LogoLink from './LogoLink';
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

export default function SiteHeader({ cta, lang }: { cta: 'test' | 'whatsapp'; lang: Lang }) {
  const t = SITE[lang];
  return (
    <header className="header">
      <div className="header__inner">
        <LogoLink home={t.home}>
          <Logo />
        </LogoLink>

        <TopNav items={t.nav} label={t.header.menu} />

        <div className="header__actions">
          {/* A plain link so the browser loads the other language's page fully. */}
          <a className="lang" href={t.other.href} lang={lang === 'ar' ? 'en' : 'ar'}>
            {t.other.label}
          </a>

          {cta === 'test' ? (
            <Link className="btn btn--small" href="/test">
              <span>{t.header.test}</span>
              <span className="btn__arrow" aria-hidden="true">{t.arrow}</span>
            </Link>
          ) : (
            <a
              className="btn btn--small"
              href={whatsappLink(WHATSAPP_NUMBER, t.whatsappText)}
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
