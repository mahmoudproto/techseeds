import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import TrackPage from '@/components/TrackPage';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { SITE } from '@/lib/site-content';
import { TRACKS, getTrack } from '@/lib/tracks';
import '../../../landing.css';

export function generateStaticParams() {
  return TRACKS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const track = getTrack((await params).slug);
  if (!track) return {};
  return { title: `${track.name.ar} | TechSeeds Academy`, description: track.about.ar };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const track = getTrack((await params).slug);
  if (!track) notFound();
  return (
    <>
      <SiteHeader cta="test" lang="ar" otherHref={`/en/tracks/${track.slug}`} />
      <main className="main">
        <TrackPage track={track} lang="ar" />
      </main>
      <SiteFooter lang="ar" />
      <WhatsAppFloat label={SITE.ar.whatsappLabel} text={SITE.ar.whatsappText} />
    </>
  );
}
