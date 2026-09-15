import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kalcer Studio // Ariesta Rizky — Informatics, Print & Telemetry',
  description:
    'The multi-disciplinary portfolio and lab of Ariesta Rizky. High-compute systems, tactile Risograph print design, and endurance running telemetry.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen selection:bg-kalcer-orange selection:text-white">
        {children}
      </body>
    </html>
  );
}
