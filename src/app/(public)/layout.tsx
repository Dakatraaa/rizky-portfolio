import React from 'react';
import { Navbar } from '@/components/public/navbar';
import { Footer } from '@/components/public/footer';
import { MascotDock } from '@/components/mascot/mascot-dock';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Navbar />
      <main className="flex-1 graph-paper-bg">{children}</main>
      <Footer />
      <MascotDock />
    </div>
  );
}
