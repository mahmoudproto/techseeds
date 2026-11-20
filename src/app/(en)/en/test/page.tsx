import type { Metadata } from 'next';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { SITE } from '@/lib/site-content';
import TestFlow from '@/components/TestFlow';
import { allPublicTests } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Free placement test | TechSeeds Academy',
  description:
    "A short, free test that shows your child's technology level and the TechSeeds track that suits them best.",
};

export default function TestPageEn() {
  // Only the answer-free version of the questions is passed to the browser.
  const tests = allPublicTests('en');
  return (
    <>
      <SiteHeader cta="whatsapp" lang="en" otherHref="/test" />
      <main className="main">
        <TestFlow tests={tests} lang="en" />
      </main>
      <SiteFooter lang="en" />
      <WhatsAppFloat label={SITE.en.whatsappLabel} text={SITE.en.whatsappText} />
    </>
  );
}
