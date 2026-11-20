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
          {/* Buttons sit on the side away from the floating WhatsApp button */}
          <span className="footer__social">
            <a className="social-btn" href={FACEBOOK} target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8.5V6.8c0-.8.5-1 .9-1H17V2.2L14.1 2.2C10.9 2.2 10.2 4.6 10.2 6.2v2.3H8v3.7h2.2V22H14v-9.8h2.7l.4-3.7z" /></svg>
              <span>{t.footer.facebook}</span>
            </a>
            <a className="social-btn" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
              <span>{t.footer.instagram}</span>
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
