import Landing from '@/components/Landing';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { SITE } from '@/lib/site-content';
import '../landing.css';

// Rebuilt hourly so the "next group" strip disappears on its own after the start day.
export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <SiteHeader cta="test" lang="ar" />
      <main className="main">
        <Landing lang="ar" />
      </main>
      <SiteFooter lang="ar" />
      <WhatsAppFloat label={SITE.ar.whatsappLabel} />
    </>
  );
}
