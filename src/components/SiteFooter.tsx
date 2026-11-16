import Link from 'next/link';
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '@/lib/labels';
import { Logo, NAV } from './SiteHeader';

const FACEBOOK = 'https://www.facebook.com/profile.php?id=61595067910231';
const INSTAGRAM = 'https://www.instagram.com/tech_seedsacademy';

export default function SiteFooter() {
  return (
    <footer className="footer" id="contact">
      <div className="footer__inner">
        <span className="footer__brand">
          <Logo boxed />
          <span className="footer__slogan">Growing Young Minds</span>
        </span>

        <nav className="footer__nav" aria-label="روابط الموقع">
          {NAV.slice(0, 5).map((item) => (
            <Link key={item.href} href={item.href} className="footer__link">
              {item.label}
            </Link>
          ))}
          <Link href="/test" className="footer__link">
            اختبار تحديد المستوى
          </Link>
        </nav>

        <div className="footer__contact">
          <a
            className="footer__link"
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            واتساب <span dir="ltr">{WHATSAPP_DISPLAY}</span>
          </a>
          <span className="footer__text">Hive Co-working Space، شارع أحمد شوقي، الفيوم</span>
          <span className="footer__social">
            <a className="footer__link" href={FACEBOOK} target="_blank" rel="noopener noreferrer">
              فيسبوك
            </a>
            <a className="footer__link" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
              إنستجرام
            </a>
          </span>
        </div>
      </div>
      <p className="footer__copy">© جميع الحقوق محفوظة {new Date().getFullYear()} TechSeeds Academy</p>
    </footer>
  );
}
