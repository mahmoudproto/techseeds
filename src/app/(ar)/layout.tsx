import type { Metadata, Viewport } from 'next';
import '@fontsource/readex-pro/400.css';
import '@fontsource/readex-pro/500.css';
import '@fontsource/readex-pro/600.css';
import '@fontsource/rubik/500.css';
import '@fontsource/rubik/600.css';
import '@fontsource/rubik/700.css';
import Tracking from '@/components/Tracking';
import '../globals.css';

export const metadata: Metadata = {
  title: 'TechSeeds Academy | تعليم البرمجة والتكنولوجيا للأطفال والناشئين في الفيوم',
  description:
    'أكاديمية حضورية في الفيوم لتعليم البرمجة وتطوير الألعاب والذكاء الاصطناعي والأمن السيبراني من 6 إلى 18 سنة، في مجموعات صغيرة مع مدرب ومساعد.',
  icons: { icon: '/logo-icon.svg' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2fa84f',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
        <Tracking />
      </body>
    </html>
  );
}
