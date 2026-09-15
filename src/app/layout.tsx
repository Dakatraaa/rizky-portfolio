import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Plus_Jakarta_Sans, Space_Mono } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-body',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FAF8F5',
};

export const metadata: Metadata = {
  title: 'Kalcer Studio // Ariesta Rizky — Informatics, Print & Telemetry',
  description:
    'The multi-disciplinary portfolio and lab of Ariesta Rizky. High-compute systems, tactile Risograph print design, and endurance running telemetry.',
  keywords: ['portfolio', 'informatics', 'risograph', 'neo-brutalist', 'ariesta rizky', 'kalcer studio'],
  authors: [{ name: 'Ariesta Rizky' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${spaceGrotesk.variable} ${plusJakartaSans.variable} ${spaceMono.variable}`}
    >
      <body className="antialiased min-h-screen selection:bg-kalcer-orange selection:text-white">
        {children}
      </body>
    </html>
  );
}
