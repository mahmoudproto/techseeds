import { WHATSAPP_NUMBER } from '@/lib/labels';

/** The full logo (icon + name). It always sits on white, as the brand requires. */
export function Logo({ boxed = false }: { boxed?: boolean }) {
  return (
    <span className={`logo${boxed ? ' logo--boxed' : ''}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-full.png" alt="TechSeeds Academy" width={294} height={110} />
    </span>
  );
}

export default function SiteHeader() {
  return (
    <header className="header">
      <div className="header__inner">
        <Logo />
        <a
          className="btn btn--small"
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>تواصل معنا</span>
          <span className="btn__arrow" aria-hidden="true">←</span>
        </a>
      </div>
    </header>
  );
}
