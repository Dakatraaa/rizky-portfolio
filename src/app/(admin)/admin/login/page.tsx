'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MascotRenderer } from '@/components/mascot/mascot-renderer';
import { Lock, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [passcode, setPasscode] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Foundation demo redirect to admin console
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-paper graph-paper-bg flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <MascotRenderer pose="interaction-wave" size="md" />
          </div>
          <h1 className="font-display font-black text-2xl uppercase tracking-tight text-carbon">
            KALCER CMS CONSOLE
          </h1>
          <p className="font-mono text-xs text-carbon-muted">
            AUTHENTICATED ACCESS ONLY // ARIESTA RIZKY LAB
          </p>
        </div>

        <Card elevation={2} className="p-6 bg-white space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="OPERATOR IDENTIFIER"
              type="text"
              defaultValue="ariesta@kalcer.studio"
              required
            />
            <Input
              label="ACCESS PASSCODE"
              type="password"
              placeholder="Enter passcode (any key in demo mode)..."
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              required
            />

            <Button type="submit" variant="primary" size="lg" className="w-full gap-2 font-mono">
              <Lock className="w-4 h-4" /> AUTHORIZE SESSION <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <div className="pt-2 text-center">
            <Link href="/" className="font-mono text-xs text-kalcer-cobalt hover:underline">
              ← Return to Public Portfolio
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
