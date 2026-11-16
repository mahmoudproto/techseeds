import type { Metadata, Viewport } from 'next';
import '@fontsource/cairo/400.css';
import '@fontsource/cairo/600.css';
import '@fontsource/cairo/700.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'اختبار تحديد المستوى المجاني | Tech Seeds Academy',
  description:
    'اختبار قصير ومجاني يساعدنا على معرفة مستوى طفلك في التكنولوجيا والمسار الأنسب له في أكاديمية Tech Seeds.',
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
      <body>{children}</body>
    </html>
  );
}
