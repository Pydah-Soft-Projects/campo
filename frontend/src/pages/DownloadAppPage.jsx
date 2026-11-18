import React, { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  Download,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { downloadConfig } from '../config/downloadConfig';
import { SectionHeading, revealEase } from '../components/MotionPrimitives';
import { MobileAppMockup } from '../components/mockups/MobileAppMockup';
import { CTASection } from '../components/CTASection';

// Official Apple vector logo (clean & centered)
function AppleIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 1.01-2.87-.96.04-2.1.65-2.77 1.42-.55.63-.99 1.66-.94 2.7.99.08 2.09-.5 2.7-1.25z" />
    </svg>
  );
}

// Official Google Android vector robot icon (perfectly proportioned & centered)
function AndroidIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.52 8.64l1.83-3.17a.64.64 0 00-.23-.87.64.64 0 00-.87.23L16.4 7.99a11.4 11.4 0 00-8.8 0L5.75 4.83a.64.64 0 00-.87-.23.64.64 0 00-.23.87l1.83 3.17C2.91 10.74.67 14.67.67 19.17h22.66c0-4.5-2.24-8.43-5.81-10.53zM7.05 14.5a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm9.9 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" />
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

// Interactive 3D Smartphone Container with Mouse Parallax and Floating Animation
function InteractiveSmartphoneWrapper({ children, prefersReducedMotion }) {
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Silky smooth Apple spring physics for organic momentum
  const mouseXSpring = useSpring(x, { stiffness: 65, damping: 20, mass: 0.6, restDelta: 0.0001 });
  const mouseYSpring = useSpring(y, { stiffness: 65, damping: 20, mass: 0.6, restDelta: 0.0001 });

  // Pronounced 3D rotations to vividly showcase the titanium side edges, buttons, and depth
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);
  const rotateZ = useTransform(mouseXSpring, [-0.5, 0.5], ['-2.5deg', '2.5deg']);

  // Dynamic shadow displacement tracking 3D perspective
  const shadowX = useTransform(mouseXSpring, [-0.5, 0.5], ['-28px', '28px']);
  const shadowScale = useTransform(mouseYSpring, [-0.5, 0.5], [0.88, 1.05]);

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !containerRef.current) return;
    // Only enable mouse-tracking 3D tilt on desktop viewports
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col items-center justify-center [perspective:1000px]"
    >
      {/* Ambient Teal Radial Glow behind Phone */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-campo-teal/20 blur-[90px]"
      />

      {/* Floating 3D Phone Body */}
      <motion.div
        style={
          prefersReducedMotion
            ? undefined
            : {
              rotateX,
              rotateY,
              rotateZ,
              transformStyle: 'preserve-3d',
            }
        }
        animate={
          prefersReducedMotion
            ? undefined
            : {
              y: [0, -8, 0],
            }
        }
        transition={{
          y: {
            duration: 5.5,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        className="relative w-full flex items-center justify-center transform-gpu [backface-visibility:hidden] antialiased"
      >
        {children}
      </motion.div>

      {/* Dynamic Breathing Soft Ground Shadow with Parallax Offset */}
      <motion.div
        style={
          prefersReducedMotion
            ? undefined
            : {
              x: shadowX,
              scale: shadowScale,
            }
        }
        animate={
          prefersReducedMotion
            ? undefined
            : {
              opacity: [0.35, 0.22, 0.35],
            }
        }
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="mx-auto mt-4 h-4 w-50 sm:w-58 rounded-full bg-slate-900/35 blur-lg pointer-events-none"
      />
    </div>
  );
}

export function DownloadAppPage({ onNavigateHome, onRequestDemo, onContactUs }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative min-h-screen bg-white">
      {/* ========================================================
          HERO SECTION: APPLE-INSPIRED 3D PRODUCT PRESENTATION
          ======================================================== */}
      <section className="relative min-h-[calc(100vh-76px)] flex items-center overflow-hidden bg-gradient-to-b from-[#F0FDF9]/80 via-slate-50 to-white py-8 sm:py-14 lg:py-16">
        {/* Subtle Mint Gradient & Ambient Floating Orbs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Subtle Dot Grid Canvas */}
          <div className="absolute inset-0 bg-[radial-gradient(#0e2a47_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.035]" />

          {/* Drifting Ambient Teal Glow */}
          <motion.div
            animate={
              prefersReducedMotion
                ? undefined
                : {
                  scale: [1, 1.12, 1],
                  x: [0, 25, 0],
                  y: [0, -20, 0],
                }
            }
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -right-10 top-1/4 h-[420px] w-[420px] rounded-full bg-campo-teal/15 blur-[110px]"
          />

          {/* Drifting Ambient Soft Blue Glow */}
          <motion.div
            animate={
              prefersReducedMotion
                ? undefined
                : {
                  scale: [1, 1.08, 1],
                  x: [0, -20, 0],
                  y: [0, 20, 0],
                }
            }
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -left-10 top-10 h-[380px] w-[380px] rounded-full bg-blue-100/45 blur-[120px]"
          />
        </div>

        <div className="container-campo relative z-10 w-full">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Left Column: Download CTAs & App Info (Word-by-Word Staggered Entrance) */}
            <motion.div
              initial={prefersReducedMotion ? undefined : { opacity: 0, x: -35 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
              transition={{ duration: 0.65, ease: revealEase }}
              className="w-full lg:col-span-7"
            >
              {/* Word-by-Word Animated Display Headline - Compact & Balanced on Mobile */}
              {prefersReducedMotion ? (
                <h1 className="font-display text-2xl font-extrabold leading-[1.2] tracking-[-0.025em] text-campo-navy sm:text-4xl sm:leading-[1.15] lg:text-[3.25rem]">
                  Your Entire Campus Life.
                  <br />
                  Right in Your Pocket<span className="text-campo-teal">.</span>
                </h1>
              ) : (
                <h1 className="font-display text-2xl font-extrabold leading-[1.2] tracking-[-0.025em] text-campo-navy sm:text-4xl sm:leading-[1.15] lg:text-[3.25rem]">
                  <span className="inline-block overflow-hidden pb-1.5 -mb-1.5 sm:pb-2.5 sm:-mb-2.5">
                    {['Your', 'Entire', 'Campus', 'Life.'].map((word, i) => (
                      <motion.span
                        key={word}
                        initial={{ opacity: 0, y: '100%', filter: 'blur(3px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{
                          duration: 0.55,
                          delay: i * 0.07,
                          ease: revealEase,
                        }}
                        className="inline-block mr-1.5 sm:mr-3"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </span>
                  <br />
                  <span className="inline-block overflow-hidden pb-1.5 -mb-1.5 sm:pb-2.5 sm:-mb-2.5">
                    {['Right', 'in', 'Your'].map((word, i) => (
                      <motion.span
                        key={word}
                        initial={{ opacity: 0, y: '100%', filter: 'blur(3px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{
                          duration: 0.55,
                          delay: (i + 4) * 0.07,
                          ease: revealEase,
                        }}
                        className="inline-block mr-1.5 sm:mr-3"
                      >
                        {word}
                      </motion.span>
                    ))}
                    <motion.span
                      initial={{ opacity: 0, y: '100%', filter: 'blur(3px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{
                        duration: 0.55,
                        delay: 7 * 0.07,
                        ease: revealEase,
                      }}
                      className="inline-block"
                    >
                      Pocket<span className="text-campo-teal">.</span>
                    </motion.span>
                  </span>
                </h1>
              )}

              {/* Description Fade-Up */}
              <motion.p
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 18, filter: 'blur(2px)' }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.6, delay: 0.45, ease: revealEase }}
                className="mt-3 sm:mt-4 max-w-xl text-xs sm:text-base leading-relaxed text-slate-600"
              >
                Experience real-time academic transparency. Pay semester fees with instant receipts, track biometric attendance, check daily lecture timetables, and carry your verified digital campus ID.
              </motion.p>

              {/* Download Action Cards with Stagger & Animated Teal Border on Hover */}
              <motion.div
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 22 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55, ease: revealEase }}
                className="mt-6 sm:mt-8 grid gap-3.5 sm:gap-4 sm:grid-cols-2"
              >
                {/* Android Card */}
                <motion.div
                  whileHover={prefersReducedMotion ? undefined : { y: -6, scale: 1.015 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="group rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-card transition-all duration-300 hover:border-campo-teal/70 hover:shadow-[0_20px_40px_-15px_rgba(20,217,196,0.22)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-campo-navy text-[#3DDC84] shadow-xs transition-transform duration-300 group-hover:scale-105 group-hover:bg-campo-secondary">
                      <AndroidIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200 flex items-center gap-1 shadow-2xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Beta Available
                    </span>
                  </div>

                  <h3 className="mt-3 sm:mt-3.5 font-display text-sm sm:text-base font-bold text-campo-navy">
                    {downloadConfig.android.name}
                  </h3>
                  <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-slate-500">
                    Version {downloadConfig.android.version} • {downloadConfig.android.fileSize}
                  </p>

                  <motion.a
                    href={downloadConfig.android.directApkUrl || '#'}
                    download={downloadConfig.android.apkFileName || true}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-3.5 sm:mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-campo-navy px-4 py-2 sm:py-2.5 text-xs font-semibold text-white shadow-card transition-all hover:bg-campo-secondary"
                  >
                    <Download className="h-4 w-4 text-campo-teal transition-transform duration-200 group-hover:translate-y-0.5" />
                    <span>Download APK ({downloadConfig.android.fileSize})</span>
                  </motion.a>
                </motion.div>

                {/* iOS Card */}
                <motion.div
                  whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-card transition-all duration-300 hover:border-slate-300 hover:shadow-elevated"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-campo-navy text-white shadow-xs transition-transform duration-300 group-hover:scale-105">
                      <AppleIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-600">
                      Coming Soon
                    </span>
                  </div>

                  <h3 className="mt-3 sm:mt-3.5 font-display text-sm sm:text-base font-bold text-campo-navy">
                    {downloadConfig.ios.name}
                  </h3>
                  <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-slate-500">
                    Requires {downloadConfig.ios.minOs} • App Store
                  </p>

                  <button
                    type="button"
                    disabled
                    className="mt-3.5 sm:mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 sm:py-2.5 text-xs font-semibold text-slate-400 cursor-not-allowed"
                  >
                    <AppleIcon className="h-4 w-4 text-slate-400" />
                    <span>Available Soon on App Store</span>
                  </button>
                </motion.div>
              </motion.div>

              {/* Security Badges with Micro-Interaction Lift */}
              <motion.div
                initial={prefersReducedMotion ? undefined : { opacity: 0 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-medium text-slate-500 border-t border-slate-100 pt-3.5 sm:pt-4"
              >
                <motion.span
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.04, y: -1 }}
                  className="flex items-center gap-1.5 transition-colors hover:text-campo-navy cursor-default"
                >
                  <ShieldCheck className="h-4 w-4 text-campo-teal-dark" />
                  256-bit Encrypted Session
                </motion.span>
                <motion.span
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.04, y: -1 }}
                  className="flex items-center gap-1.5 transition-colors hover:text-campo-navy cursor-default"
                >
                  <Lock className="h-4 w-4 text-campo-teal-dark" />
                  Biometric FaceID / TouchID
                </motion.span>
                <motion.span
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.04, y: -1 }}
                  className="flex items-center gap-1.5 transition-colors hover:text-campo-navy cursor-default"
                >
                  <Sparkles className="h-4 w-4 text-campo-teal-dark" />
                  Zero Third-Party Ads
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Right Column: Premium Device Mockup with 3D Entrance & Tilt - HIDDEN on Mobile (< lg) Screens */}
            <motion.div
              initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.92, y: 30 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2, ease: revealEase }}
              className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center w-full relative pt-6 sm:pt-8 lg:pt-11"
            >
              {/* Smartphone Display with 3D Parallax */}
              <div className="relative w-full max-w-[298px] sm:max-w-[318px] lg:max-w-[335px]">
                {/* Interactive 3D Smartphone Device Mockup */}
                <InteractiveSmartphoneWrapper prefersReducedMotion={prefersReducedMotion}>
                  <div className="w-full transform-gpu antialiased">
                    <MobileAppMockup />
                  </div>
                </InteractiveSmartphoneWrapper>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3-STEP SETUP GUIDE (SCROLL REVEAL ANIMATIONS)
          ======================================================== */}
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
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.1, ease: revealEase }}
                whileHover={prefersReducedMotion ? undefined : { y: -6, scale: 1.015 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-card transition-all duration-300 hover:border-slate-300 hover:shadow-elevated"
              >
                {/* Left Teal Accent Line on Hover (matches ecosystem pillar style) */}
                <span
                  aria-hidden="true"
                  className="absolute inset-y-3 left-0 w-1 sm:w-1.5 rounded-r-full bg-campo-teal opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />

                <div>
                  {/* Header Row: Title on Left, Large Typographic Number on Right */}
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-base sm:text-lg font-bold text-campo-navy transition-colors group-hover:text-campo-secondary">
                      {step.title}
                    </h3>
                    <span className="shrink-0 font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-none text-slate-400/80 transition-colors duration-300 group-hover:text-campo-teal">
                      {step.number}
                    </span>
                  </div>

                  <p className="mt-3 text-xs sm:text-[13px] leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </div>
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
              className="w-full sm:w-auto inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-campo-teal px-6 py-3 text-sm font-bold text-campo-deep shadow-card hover:bg-[#19d6c6] transition-all"
            >
              <span>Schedule Institutional Demo</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Institutional Demo CTA Card (Moved from below pricing) */}
      <CTASection
        onRequestDemo={onRequestDemo}
        onContactUs={onContactUs || onRequestDemo}
      />
    </div>
  );
}
