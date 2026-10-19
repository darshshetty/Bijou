import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bijouai.co';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Bijou — custom lab-grown diamond engagement rings', template: '%s · Bijou' },
  description: 'Design your engagement ring online, hold a 3D-printed model before it’s made, and we craft it with a lab-grown diamond.',
  openGraph: {
    title: 'Bijou — engagement rings, designed by you',
    description: 'Lab-grown diamonds. Your design, held in 3D before it’s made.',
    images: ['/images/setting-bridal-set.jpg'],
    url: SITE_URL,
    siteName: 'Bijou',
    type: 'website',
  },
};

export const viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
