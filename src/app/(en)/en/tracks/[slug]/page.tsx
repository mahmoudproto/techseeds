import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import TrackPage from '@/components/TrackPage';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { SITE } from '@/lib/site-content';
import { TRACKS, getTrack } from '@/lib/tracks';
import '../../../../landing.css';

export function generateStaticParams() {
  return TRACKS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const track = getTrack((await params).slug);
  if (!track) return {};
  return { title: `${track.name.en} | TechSeeds Academy`, description: track.about.en };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const track = getTrack((await params).slug);
  if (!track) notFound();
  return (
    <>
      <SiteHeader cta="test" lang="en" />
      <main className="main">
        <TrackPage track={track} lang="en" />
      </main>
      <SiteFooter lang="en" />
      <WhatsAppFloat label={SITE.en.whatsappLabel} text={SITE.en.whatsappText} />
    </>
  );
}
