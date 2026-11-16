import React from 'react';
import { motion } from 'framer-motion';
import {
  Smartphone,
  CheckCircle2,
  Bell,
  ArrowRight,
  ShieldCheck,
  Lock,
  Download,
  Sparkles,
} from 'lucide-react';
import { downloadConfig } from '../config/downloadConfig';
import { SectionHeading, revealEase } from '../components/MotionPrimitives';
import { CampoLogo } from '../components/CampoLogo';
import { MobileAppMockup } from '../components/mockups/MobileAppMockup';

// Official Apple vector icon
function AppleIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 1.01-2.87-.96.04-2.1.65-2.77 1.42-.55.63-.99 1.66-.94 2.7.99.08 2.09-.5 2.7-1.25z" />
    </svg>
  );
}

// Crisp Android vector robot icon
function AndroidIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.4116 13.8533 8 12 8s-3.5902.4116-5.1367.9497L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396" />
    </svg>
  );
}

const setupSteps = [
  {
    number: '01',
    title: 'Download & Install',
    description: 'Get the official Campo Student Companion on your Android device (iOS coming soon).',
  },
  {
    number: '02',
    title: 'Enter Institutional Code',
    description: 'Provide your unique campus code and your student registration number.',
  },
  {
    number: '03',
    title: 'Access Student Portal',
    description: 'Sign in with biometric verification to access your fees, attendance, and schedules.',
  },
];

export function DownloadAppPage({ onNavigateHome, onRequestDemo }) {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Hero Section Fitted to Screen with Responsive Device Mockup */}
      <section className="relative min-h-[calc(100vh-76px)] flex items-center overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white py-14 sm:py-20 lg:py-24">
        {/* Ambient Blur */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-campo-teal/10 blur-[100px]" />
          <div className="absolute left-10 top-10 h-[350px] w-[350px] rounded-full bg-blue-100/40 blur-[120px]" />
        </div>

        <div className="container-campo relative z-10 w-full">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Column: Download CTAs & App Info (Sliding from Left) */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: revealEase }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-campo-teal-dark">
                <Smartphone className="h-3.5 w-3.5 text-campo-teal" />
                <span>Official Student Mobile Companion</span>
              </div>

              <h1 className="mt-4 font-display text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-campo-navy sm:text-5xl lg:text-[3.25rem]">
                Your Entire Campus Life.
                <br />
                Right in Your Pocket<span className="text-campo-teal">.</span>
              </h1>

              <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-slate-600">
                Experience real-time academic transparency. Pay semester fees with instant receipts, track biometric attendance, check daily lecture timetables, and carry your verified digital campus ID.
              </p>

              {/* Download Action Cards */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {/* Android Card */}
                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-card transition-all hover:border-campo-teal/60 hover:shadow-elevated">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-campo-navy text-campo-teal">
                      <AndroidIcon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                      Beta Available
                    </span>
                  </div>

                  <h3 className="mt-3.5 font-display text-base font-bold text-campo-navy">
                    {downloadConfig.android.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Version {downloadConfig.android.version} • {downloadConfig.android.fileSize}
                  </p>

                  <a
                    href={downloadConfig.android.directApkUrl || '#'}
                    download={downloadConfig.android.apkFileName || true}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-campo-navy px-4 py-2.5 text-xs font-semibold text-white shadow-card transition-all hover:bg-campo-secondary"
                  >
                    <Download className="h-4 w-4 text-campo-teal" />
                    <span>Download APK ({downloadConfig.android.fileSize})</span>
                  </a>
                </div>

                {/* iOS Card */}
                <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-card">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                      <AppleIcon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-600">
                      Coming Soon
                    </span>
                  </div>

                  <h3 className="mt-3.5 font-display text-base font-bold text-campo-navy">
                    {downloadConfig.ios.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Requires {downloadConfig.ios.minOs} • App Store
                  </p>

                  <button
                    type="button"
                    disabled
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-400 cursor-not-allowed"
                  >
                    <AppleIcon className="h-4 w-4 text-slate-400" />
                    <span>Available Soon on App Store</span>
                  </button>
                </div>
              </div>

              {/* Security Badges */}
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 border-t border-slate-100 pt-4">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-campo-teal-dark" />
                  256-bit Encrypted Session
                </span>
                <span className="flex items-center gap-1.5">
                  <Lock className="h-4 w-4 text-campo-teal-dark" />
                  Biometric FaceID / TouchID
                </span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-campo-teal-dark" />
                  Zero Third-Party Ads
                </span>
              </div>
            </motion.div>

            {/* Right Column: Premium Device Mockup (Sliding from Right) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: revealEase }}
              className="lg:col-span-5 flex flex-col items-center justify-center w-full"
            >
              {/* Responsive Device Mockup */}
              <div className="w-full max-w-[295px] sm:max-w-[320px] md:max-w-[335px] transition-transform duration-500 hover:scale-[1.015]">
                <MobileAppMockup />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3-Step Setup Guide */}
      <section className="section-padding bg-slate-50/70 border-t border-slate-200/80">
        <div className="container-campo">
          <SectionHeading
            index="01"
            label="Simple Setup"
            title="From Download to Daily Campus Utility in 3 Steps."
            description="Secure institutional authentication linked directly to your student registration code."
            align="center"
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {setupSteps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.1, ease: revealEase }}
                className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-card"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-campo-navy font-display text-sm font-bold text-campo-teal">
                  {step.number}
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-campo-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Need Institutional Demo Banner */}
          <div className="mt-14 rounded-3xl bg-campo-navy p-6 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-campo-teal">
                For College Leadership &amp; Administrators
              </span>
              <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold">
                Want to deploy the Campo Student App for your campus?
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-300">
                We provide complete onboarding, student data synchronization, and campus branding.
              </p>
            </div>

            <button
              type="button"
              onClick={onRequestDemo}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-campo-teal px-6 py-3 text-sm font-bold text-campo-deep shadow-card hover:bg-[#19d6c6]"
            >
              <span>Schedule Institutional Demo</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
