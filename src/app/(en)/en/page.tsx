import Landing from '@/components/Landing';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import '../../landing.css';

export default function HomePageEn() {
  return (
    <>
      <SiteHeader cta="test" lang="en" />
      <main className="main">
        <Landing lang="en" />
      </main>
      <SiteFooter lang="en" />
    </>
  );
}
