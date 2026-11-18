import type { Metadata, Viewport } from 'next';
import '@fontsource/cairo/400.css';
import '@fontsource/cairo/600.css';
import '@fontsource/cairo/700.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import Tracking from '@/components/Tracking';
import '../globals.css';

export const metadata: Metadata = {
  title: 'TechSeeds Academy | Coding and technology for kids and teens in Fayoum',
  description:
    'An in-person academy in Fayoum teaching programming, game development, AI and cybersecurity to ages 6–18, in small groups with an instructor and an assistant.',
  icons: { icon: '/logo-icon.svg' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2fa84f',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body>
        {children}
        <Tracking />
      </body>
    </html>
  );
}
