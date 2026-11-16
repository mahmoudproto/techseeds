import Landing from '@/components/Landing';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import './landing.css';

export default function HomePage() {
  return (
    <>
      <SiteHeader cta="test" />
      <main className="main">
        <Landing />
      </main>
      <SiteFooter />
    </>
  );
}
