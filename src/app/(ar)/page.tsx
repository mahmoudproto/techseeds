import Landing from '@/components/Landing';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import '../landing.css';

export default function HomePage() {
  return (
    <>
      <SiteHeader cta="test" lang="ar" />
      <main className="main">
        <Landing lang="ar" />
      </main>
      <SiteFooter lang="ar" />
    </>
  );
}
