'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MascotRenderer } from '@/components/mascot/mascot-renderer';
import { SpeechBubble } from '@/components/mascot/speech-bubble';
import { mockProfile } from '@/data';
import { Check, Copy, Send, Loader2, AlertCircle, RotateCcw } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('PROJECT INQUIRY');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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

  const validateForm = () => {
    const errs: { name?: string; email?: string; message?: string } = {};
    if (!name.trim()) errs.name = 'Please enter your name or codename.';
    if (!email.trim()) {
      errs.email = 'Please provide an email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please provide a valid email format (e.g. name@domain.com).';
    }
    if (!message.trim()) {
      errs.message = 'Please provide a transmission message or project brief.';
    } else if (message.trim().length < 10) {
      errs.message = 'Message must contain at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('loading');

    // Simulate reliable mock signal transmission
    setTimeout(() => {
      setStatus('success');
    }, 1200);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setErrors({});
    setStatus('idle');
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
                  className="p-2 bg-white border border-carbon brutal-press hover:bg-kalcer-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-carbon"
                  title="Copy email"
                  aria-label="Copy primary email address"
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
              {status === 'success' ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto bg-kalcer-emerald text-white flex items-center justify-center font-display font-black text-2xl border-3 border-carbon brutal-shadow">
                    ✓
                  </div>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-carbon uppercase">
                    SIGNAL TRANSMITTED!
                  </h3>
                  <p className="font-body text-sm text-carbon/90 max-w-md mx-auto">
                    Your transmission payload for <strong className="text-kalcer-orange">[{selectedSubject}]</strong> has been logged into the lab dispatch queue. Ariesta will review and reply to <strong>{email}</strong> shortly.
                  </p>
                  <div className="pt-3">
                    <Button
                      onClick={handleReset}
                      variant="secondary"
                      size="md"
                      className="gap-2 font-mono"
                    >
                      <RotateCcw className="w-4 h-4" /> TRANSMIT ANOTHER SIGNAL
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Input
                        label="FULL NAME / CODENAME"
                        placeholder="e.g. Alex Henderson"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                      {errors.name && (
                        <p className="font-mono text-xs text-kalcer-orange mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <Input
                        label="RETURN PROJECT // EMAIL"
                        type="email"
                        placeholder="alex@studio.co"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      {errors.email && (
                        <p className="font-mono text-xs text-kalcer-orange mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                        </p>
                      )}
                    </div>
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
                          className={`px-3 py-1 font-mono text-xs font-bold border-2 border-carbon transition-all select-none brutal-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-carbon ${
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

                  <div>
                    <Textarea
                      label="TRANSMISSION BRIEF // PROJECT SPECS"
                      placeholder="Describe your technical requirements, design objectives, or endurance pacing advisory..."
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                    {errors.message && (
                      <p className="font-mono text-xs text-kalcer-orange mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={status === 'loading'}
                    className="w-full gap-2"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> ENCODING &amp; TRANSMITTING SIGNAL...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> TRANSMIT SIGNAL -&gt;
                      </>
                    )}
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

