import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import TestFlow from '@/components/TestFlow';
import { allPublicTests } from '@/lib/content';

export default function Page() {
  // Only the answer-free version of the questions is passed to the browser.
  const tests = allPublicTests();
  return (
    <>
      <SiteHeader />
      <main className="main">
        <TestFlow tests={tests} />
      </main>
      <SiteFooter />
    </>
  );
}
