import Link from 'next/link';
import { WHATSAPP_NUMBER } from '@/lib/labels';
import { SITE, whatsappLink, type Lang } from '@/lib/site-content';
import LangSwitch from './LangSwitch';
import LogoLink from './LogoLink';
import MobileMenu from './MobileMenu';
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
        <LogoLink home={t.home}>
          <Logo />
        </LogoLink>

        <TopNav items={t.nav} label={t.header.menu} />

        <div className="header__actions">
          {/* Opens the same page and section in the other language (a full page load). */}
          <LangSwitch lang={lang} label={t.other.label} href={otherHref ?? t.other.href} />

          {cta === 'test' ? (
            <Link className="btn btn--small" href={lang === 'en' ? '/en/test' : '/test'}>
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

          <MobileMenu items={t.nav} label={t.header.menu} />
        </div>
      </div>
    </header>
  );
}
