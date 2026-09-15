import React from 'react';
import { HeroSection } from '@/components/public/hero-section';
import { CaseStudies } from '@/components/public/case-studies';
import { DesignAtelier } from '@/components/public/design-atelier';
import { TechRigs } from '@/components/public/tech-rigs';
import { Credentials } from '@/components/public/credentials';
import { CreatorHub } from '@/components/public/creator-hub';
import { FieldScrapbook } from '@/components/public/field-scrapbook';
import { ContactForm } from '@/components/public/contact-form';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CaseStudies />
      <DesignAtelier />
      <TechRigs />
      <Credentials />
      <CreatorHub />
      <FieldScrapbook />
      <ContactForm />
    </>
  );
}
