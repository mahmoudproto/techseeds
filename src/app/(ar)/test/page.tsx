import type { Metadata } from 'next';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import TestFlow from '@/components/TestFlow';
import { allPublicTests } from '@/lib/content';

export const metadata: Metadata = {
  title: 'اختبار تحديد المستوى المجاني | TechSeeds Academy',
  description:
    'اختبار قصير ومجاني يساعدنا على معرفة مستوى طفلك في التكنولوجيا والمسار الأنسب له في أكاديمية TechSeeds.',
};

export default function TestPage() {
  // Only the answer-free version of the questions is passed to the browser.
  const tests = allPublicTests();
  return (
    <>
      <SiteHeader cta="whatsapp" lang="ar" />
      <main className="main">
        <TestFlow tests={tests} />
      </main>
      <SiteFooter lang="ar" />
    </>
  );
}
