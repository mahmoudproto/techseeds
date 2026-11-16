import { WHATSAPP_NUMBER } from '@/lib/labels';

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className={`logo${dark ? ' logo--dark' : ''}`}>
      <span className="logo__mark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-icon.svg" alt="" width={18} height={32} />
      </span>
      <span className="logo__text">
        <span className="logo__name">Tech Seeds</span>
        {dark && <span className="logo__tagline">Code Today .. Build Tomorrow</span>}
      </span>
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
