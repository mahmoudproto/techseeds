import Link from 'next/link';
import { WHATSAPP_NUMBER } from '@/lib/labels';

export const NAV = [
  { href: '/#home', label: 'الرئيسية' },
  { href: '/#about', label: 'عن الأكاديمية' },
  { href: '/#programs', label: 'البرامج' },
  { href: '/#why', label: 'لماذا نحن' },
  { href: '/#reviews', label: 'آراء أولياء الأمور' },
  { href: '/#contact', label: 'تواصل معنا' },
];

/** The full logo (icon + name). It always sits on white, as the brand requires. */
export function Logo({ boxed = false }: { boxed?: boolean }) {
  return (
    <span className={`logo${boxed ? ' logo--boxed' : ''}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-full.png" alt="TechSeeds Academy" width={294} height={110} />
    </span>
  );
}

export default function SiteHeader({ cta }: { cta: 'test' | 'whatsapp' }) {
  return (
    <header className="header">
      <div className="header__inner">
        <Link href="/" aria-label="TechSeeds Academy">
          <Logo />
        </Link>

        <nav className="topnav" aria-label="القائمة الرئيسية">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="topnav__link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header__actions">
          {cta === 'test' ? (
            <Link className="btn btn--small" href="/test">
              <span>اختبار مجاني</span>
              <span className="btn__arrow" aria-hidden="true">←</span>
            </Link>
          ) : (
            <a
              className="btn btn--small"
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>تواصل معنا</span>
              <span className="btn__arrow" aria-hidden="true">←</span>
            </a>
          )}

          <details className="menu">
            <summary aria-label="القائمة">
              <span />
              <span />
              <span />
            </summary>
            <div className="menu__panel">
              {NAV.map((item) => (
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
