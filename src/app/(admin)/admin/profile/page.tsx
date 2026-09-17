'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { usePortfolioContent } from '@/context/content-context';
import { Save, Check, User } from 'lucide-react';

export default function AdminProfilePage() {
  const { profile, updateProfile } = usePortfolioContent();

  const [name, setName] = useState(profile.name);
  const [nickname, setNickname] = useState(profile.nickname);
  const [location, setLocation] = useState(profile.location);
  const [contactEmail, setContactEmail] = useState(profile.contactEmail);
  const [headline, setHeadline] = useState(profile.headline);
  const [bio, setBio] = useState(profile.bio);
  const [degreeStatus, setDegreeStatus] = useState(profile.degreeStatus);

  // Telemetry
  const [halfRunPace, setHalfRunPace] = useState(profile.telemetry.halfRunPace);
  const [halfRunDistance, setHalfRunDistance] = useState(profile.telemetry.halfRunDistance);
  const [wpmTyping, setWpmTyping] = useState(String(profile.telemetry.wpmTyping));
  const [githubCommitsYtd, setGithubCommitsYtd] = useState(String(profile.telemetry.githubCommitsYtd));
  const [posterArchiveCount, setPosterArchiveCount] = useState(String(profile.telemetry.posterArchiveCount));
  const [stravaConditionPercent, setStravaConditionPercent] = useState(String(profile.telemetry.stravaConditionPercent));
  const [stravaPace, setStravaPace] = useState(profile.telemetry.stravaPace);

  const [savedNotice, setSavedNotice] = useState(false);

  // Sync if context updates externally
  useEffect(() => {
    setName(profile.name);
    setNickname(profile.nickname);
    setLocation(profile.location);
    setContactEmail(profile.contactEmail);
    setHeadline(profile.headline);
    setBio(profile.bio);
    setDegreeStatus(profile.degreeStatus);
    setHalfRunPace(profile.telemetry.halfRunPace);
    setHalfRunDistance(profile.telemetry.halfRunDistance);
    setWpmTyping(String(profile.telemetry.wpmTyping));
    setGithubCommitsYtd(String(profile.telemetry.githubCommitsYtd));
    setPosterArchiveCount(String(profile.telemetry.posterArchiveCount));
    setStravaConditionPercent(String(profile.telemetry.stravaConditionPercent));
    setStravaPace(profile.telemetry.stravaPace);
  }, [profile]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      displayName: name,
      nickname,
      location,
      contactEmail,
      headline,
      bio,
      degreeStatus,
      telemetry: {
        ...profile.telemetry,
        halfRunPace,
        halfRunDistance,
        wpmTyping: Number(wpmTyping) || 128,
        githubCommitsYtd: Number(githubCommitsYtd) || 840,
        posterArchiveCount: Number(posterArchiveCount) || 85,
        stravaConditionPercent: Number(stravaConditionPercent) || 94,
        stravaPace,
      },
    });

    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-wrap items-center justify-between pb-4 border-b-2.5 border-carbon gap-3">
        <div>
          <h1 className="font-display font-black text-2xl uppercase text-carbon tracking-tight flex items-center gap-2">
            <User className="w-6 h-6 text-kalcer-orange" />
            Profile &amp; Telemetry Settings
          </h1>
          <p className="font-mono text-xs text-carbon-muted mt-0.5">
            Curate biographical details, telemetry pace metrics, and headline copy across public pages.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedNotice && (
            <span className="px-2.5 py-1 bg-kalcer-emerald text-white font-mono text-xs font-bold flex items-center gap-1 animate-in fade-in">
              <Check className="w-3.5 h-3.5" /> Saved &amp; Synced!
            </span>
          )}
          <Button variant="primary" size="sm" type="submit" className="gap-1.5 font-mono">
            <Save className="w-3.5 h-3.5" /> Save Changes
          </Button>
        </div>
      </div>

      <Card elevation={1} className="p-6 bg-white space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="FULL NAME"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="NICKNAME // BRAND"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
          <Input
            label="LOCATION"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <Input
            label="CONTACT EMAIL"
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            required
          />
        </div>

        <Input
          label="HERO HEADLINE"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          required
        />
        <Textarea
          label="BIO COPY"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          required
        />
        <Textarea
          label="DEGREE / STATUS DETAILS"
          value={degreeStatus}
          onChange={(e) => setDegreeStatus(e.target.value)}
          rows={2}
          required
        />

        <div className="pt-4 border-t border-carbon/10">
          <div className="font-mono text-xs font-bold text-kalcer-cobalt uppercase mb-3">
            // LIVE TELEMETRY COUNTERS &amp; ATHLETIC STATE
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Input
              label="HALF RUN PACE"
              value={halfRunPace}
              onChange={(e) => setHalfRunPace(e.target.value)}
            />
            <Input
              label="HALF RUN DIST"
              value={halfRunDistance}
              onChange={(e) => setHalfRunDistance(e.target.value)}
            />
            <Input
              label="WPM TYPING SPEED"
              type="number"
              value={wpmTyping}
              onChange={(e) => setWpmTyping(e.target.value)}
            />
            <Input
              label="GITHUB COMMITS"
              type="number"
              value={githubCommitsYtd}
              onChange={(e) => setGithubCommitsYtd(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
            <Input
              label="POSTER ARCHIVE COUNT"
              type="number"
              value={posterArchiveCount}
              onChange={(e) => setPosterArchiveCount(e.target.value)}
            />
            <Input
              label="STRAVA CONDITION %"
              type="number"
              value={stravaConditionPercent}
              onChange={(e) => setStravaConditionPercent(e.target.value)}
            />
            <Input
              label="STRAVA PACE REF"
              value={stravaPace}
              onChange={(e) => setStravaPace(e.target.value)}
            />
          </div>
        </div>
      </Card>
    </form>
  );
}

