import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '@/lib/labels';
import { Logo } from './SiteHeader';

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <span className="footer__brand">
          <Logo boxed />
          <span className="footer__slogan">Growing Young Minds</span>
        </span>
        <a
          className="footer__link"
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          واتساب <span dir="ltr">{WHATSAPP_DISPLAY}</span>
        </a>
      </div>
      <p className="footer__copy">© جميع الحقوق محفوظة {new Date().getFullYear()} Tech Seeds Academy</p>
    </footer>
  );
}
