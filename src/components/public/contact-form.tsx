'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MascotRenderer } from '@/components/mascot/mascot-renderer';
import { SpeechBubble } from '@/components/mascot/speech-bubble';
import { mockProfile } from '@/data';
import { Check, Copy, Send } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('PROJECT INQUIRY');
  const [submitted, setSubmitted] = useState(false);

  const subjects = [
    'PROJECT INQUIRY',
    'ENDURANCE TECH ADVISORY',
    'RISO / BRAND IDENTITY',
    'JUST SAYING HI',
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(mockProfile.contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="py-14 border-b-2.5 border-carbon bg-paper">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-kalcer-orange text-white font-mono text-xs font-bold uppercase">
                SECTION 07
              </span>
              <span className="font-mono text-xs text-carbon-muted uppercase tracking-wider">
                TRANSMISSION PORTAL // DIRECT LINK
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase text-carbon tracking-tight">
              LET&apos;S BUILD SOMETHING LOUD TOGETHER.
            </h2>
            <p className="font-body text-sm text-carbon-muted max-w-2xl mt-1">
              Whether you need high-throughput Pacing/Telemetry kernels, custom tactile brand identity with spot risoprinting, or endurance run consultation.
            </p>
          </div>
          <Badge variant="emerald" pill>
            INBOX OPEN
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            <Card elevation={2} className="p-6 bg-white space-y-4">
              <div className="font-mono text-xs font-bold uppercase text-carbon-muted">
                // DIRECT FREQUENCY
              </div>

              <div className="p-3 bg-paper-technical border-2 border-carbon flex items-center justify-between">
                <div>
                  <div className="font-mono text-[10px] text-carbon-muted font-bold">
                    PRIMARY EMAIL
                  </div>
                  <div className="font-mono text-sm font-bold text-carbon">
                    {mockProfile.contactEmail}
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 bg-white border border-carbon brutal-press hover:bg-kalcer-yellow"
                  title="Copy email"
                >
                  {copied ? <Check className="w-4 h-4 text-kalcer-emerald" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-2.5 bg-white border border-carbon">
                  <span className="text-carbon-muted block text-[10px]">TIMEZONE</span>
                  <span className="font-bold text-carbon">JAKARTA // GMT+7</span>
                </div>
                <div className="p-2.5 bg-white border border-carbon">
                  <span className="text-carbon-muted block text-[10px]">STATUS</span>
                  <span className="font-bold text-kalcer-emerald">READY FOR Q4 RIGS</span>
                </div>
              </div>

              {/* Mascot Dialogue */}
              <div className="pt-2 flex items-end gap-3">
                <MascotRenderer pose="developer-idea" size="sm" />
                <SpeechBubble
                  message="Transmit your project specs! Ariesta replies within 24 hours."
                  className="flex-1"
                />
              </div>
            </Card>
          </div>

          {/* Right Column: Interactive Brutalist Contact Form */}
          <div className="lg:col-span-7">
            <Card elevation={2} className="p-6 bg-white">
              {submitted ? (
                <div className="p-8 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto bg-kalcer-emerald text-white flex items-center justify-center font-display font-bold text-xl border-2 border-carbon brutal-shadow">
                    ✓
                  </div>
                  <h3 className="font-display font-black text-2xl text-carbon">
                    SIGNAL TRANSMITTED!
                  </h3>
                  <p className="font-mono text-xs text-carbon-muted">
                    Your transmission payload has been logged. Ariesta will establish contact shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="FULL NAME / CODENAME"
                      placeholder="e.g. Alex Henderson"
                      required
                    />
                    <Input
                      label="RETURN PROJECT // EMAIL"
                      type="email"
                      placeholder="alex@studio.co"
                      required
                    />
                  </div>

                  {/* Subject Radio Pills */}
                  <div>
                    <label className="block font-mono text-xs font-bold uppercase tracking-wider text-carbon mb-1.5">
                      TRANSMISSION FOCUS // SUBJECT
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {subjects.map((subj) => (
                        <button
                          type="button"
                          key={subj}
                          onClick={() => setSelectedSubject(subj)}
                          className={`px-3 py-1 font-mono text-xs font-bold border-2 border-carbon transition-all select-none brutal-press ${
                            selectedSubject === subj
                              ? 'bg-carbon text-white shadow-brutal-sm'
                              : 'bg-paper-technical text-carbon hover:bg-white'
                          }`}
                        >
                          {subj}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Textarea
                    label="TRANSMISSION BRIEF // PROJECT SPECS"
                    placeholder="Describe your technical requirements, design objectives, or endurance pacing advisory..."
                    rows={4}
                    required
                  />

                  <Button type="submit" variant="primary" size="lg" className="w-full gap-2">
                    <Send className="w-4 h-4" /> TRANSMIT SIGNAL -&gt;
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
