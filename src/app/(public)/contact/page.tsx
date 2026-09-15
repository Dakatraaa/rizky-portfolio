import React from 'react';
import { ContactForm } from '@/components/public/contact-form';

export const metadata = {
  title: 'Contact & Signal Transmission // Kalcer Studio',
  description: 'Reach out for high-throughput telemetry kernels, Risograph brand identities, and pacing advisory.',
};

export default function ContactPage() {
  return (
    <div className="py-6">
      <ContactForm />
    </div>
  );
}
