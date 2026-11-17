import Link from 'next/link';
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '@/lib/labels';
import { SITE, whatsappLink, type Lang } from '@/lib/site-content';
import { Logo } from './SiteHeader';

const FACEBOOK = 'https://www.facebook.com/profile.php?id=61595067910231';
const INSTAGRAM = 'https://www.instagram.com/tech_seedsacademy';

export default function SiteFooter({ lang }: { lang: Lang }) {
  const t = SITE[lang];
  return (
    <footer className="footer" id="contact">
      <div className="footer__inner">
        <span className="footer__brand">
          <Logo boxed />
          <span className="footer__slogan">{t.footer.slogan}</span>
        </span>

        <nav className="footer__nav" aria-label={t.header.menu}>
          {t.nav.slice(0, 5).map((item) => (
            <Link key={item.href} href={item.href} className="footer__link">
              {item.label}
            </Link>
          ))}
          <Link href="/test" className="footer__link">
            {t.footer.test}
          </Link>
        </nav>

        <div className="footer__contact">
          <a
            className="footer__link"
            href={whatsappLink(WHATSAPP_NUMBER, t.whatsappText)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.footer.whatsapp} <span dir="ltr">{WHATSAPP_DISPLAY}</span>
          </a>
          <span className="footer__text">{t.footer.address}</span>
          <span className="footer__social">
            <a className="footer__link" href={FACEBOOK} target="_blank" rel="noopener noreferrer">
              {t.footer.facebook}
            </a>
            <a className="footer__link" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
              {t.footer.instagram}
            </a>
          </span>
        </div>
      </div>
      <p className="footer__copy">
        © {t.footer.rights} {new Date().getFullYear()} TechSeeds Academy
        <span className="footer__credit"> · {t.footer.photos}</span>
      </p>
    </footer>
  );
}
