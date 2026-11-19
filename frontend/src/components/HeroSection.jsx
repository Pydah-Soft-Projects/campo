import React, { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  ArrowRight,
  Layers,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Star,
  StarHalf,
} from 'lucide-react';
import { revealEase } from './MotionPrimitives';
import { DashboardMockup } from './mockups/DashboardMockup';
import studentMobileImg from '../assets/student-mobile-campus.webp';
import leadershipImg from '../assets/institutional-leadership.webp';
import studentsLabImg from '../assets/students-classroom.webp';

export function HeroSection({ onRequestDemo }) {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], ['0px', '24px']);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.4]);

  const handleExploreClick = () => {
    const target = document.getElementById('platform');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[520px] items-center overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-white to-white pb-14 pt-28 sm:min-h-[700px] sm:pb-24 sm:pt-32 lg:min-h-[min(100vh,940px)] lg:py-20"
    >
      {/* Subtle Ambient Background Gradients */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 h-[500px] w-[500px] rounded-full bg-campo-teal/10 blur-[100px]" />
        <div className="absolute -left-20 top-1/3 h-[450px] w-[450px] rounded-full bg-blue-100/50 blur-[120px]" />
        <div className="absolute inset-0 bg-grid-subtle bg-grid-56 opacity-60" />
      </div>

      <div className="container-campo relative z-10 w-full">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          {/* Left Column: Editorial Headline & Actions */}
          <motion.div
            style={prefersReducedMotion ? undefined : { y: copyY, opacity: copyOpacity }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: revealEase }}
            className="lg:col-span-5 xl:col-span-5"
          >
            {/* Main Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: revealEase }}
              className="font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] text-campo-navy sm:text-5xl lg:text-[3.25rem] xl:text-[3.65rem]"
            >
              One Institution.
              <br />
              One Connected
              <br />
              Ecosystem<span className="text-campo-teal">.</span>
            </motion.h1>

            {/* Signature Accent Line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: revealEase }}
              className="mt-4 h-1 w-12 origin-left rounded-full bg-campo-teal sm:mt-5"
            />

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.28, ease: revealEase }}
              className="mt-4 max-w-lg text-[15px] leading-relaxed text-slate-600 sm:mt-5 sm:text-[17px]"
            >
              Everything your campus needs—connected, role-governed, and working together.
              Campo brings admissions, academic schedules, fee ledgers, examinations, and campus
              operations into one unified institutional workspace.
            </motion.p>

            {/* Action Buttons: Perfectly Aligned, Single-Line, Robust Padding */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.38, ease: revealEase }}
              className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
            >
              <motion.button
                type="button"
                onClick={onRequestDemo}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="group whitespace-nowrap inline-flex items-center justify-center gap-2 h-12 sm:h-13 px-6 sm:px-7 rounded-xl bg-campo-navy text-sm sm:text-base font-bold text-white shadow-card transition-all duration-200 hover:bg-campo-secondary hover:shadow-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-campo-teal"
              >
                <span>Request a Demo</span>
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                type="button"
                onClick={handleExploreClick}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="group whitespace-nowrap inline-flex items-center justify-center gap-2 h-12 sm:h-13 px-6 sm:px-7 rounded-xl border border-slate-300 bg-white text-sm sm:text-base font-bold text-campo-navy transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-campo-teal shadow-xs"
              >
                <span>Explore Platform Modules</span>
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              </motion.button>
            </motion.div>

            {/* Real Institutional Proof Avatar Stack */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.48, ease: revealEase }}
              className="mt-8 flex items-center gap-3 border-t border-slate-200/80 pt-5 sm:mt-9 sm:gap-3.5 sm:pt-6"
            >
              <div className="flex -space-x-2.5 shrink-0">
                <motion.img
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.52 }}
                  src={studentMobileImg}
                  alt="Student user"
                  loading="eager"
                  className="inline-block h-8.5 w-8.5 sm:h-9 sm:w-9 rounded-full ring-2 ring-white object-cover shrink-0"
                />
                <motion.img
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.58 }}
                  src={leadershipImg}
                  alt="Campus Dean"
                  loading="eager"
                  className="inline-block h-8.5 w-8.5 sm:h-9 sm:w-9 rounded-full ring-2 ring-white object-cover shrink-0"
                />
                <motion.img
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.64 }}
                  src={studentsLabImg}
                  alt="Students in lab"
                  loading="eager"
                  className="inline-block h-8.5 w-8.5 sm:h-9 sm:w-9 rounded-full ring-2 ring-white object-cover shrink-0"
                />
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  className="flex h-8.5 w-8.5 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-campo-navy text-[10px] font-bold text-campo-teal ring-2 ring-white shrink-0"
                >
                  20+
                </motion.div>
              </div>
              <div className="text-xs min-w-0 flex-1">
                <div className="flex items-center gap-1.5 font-bold text-campo-navy">
                  <div className="flex text-amber-400 shrink-0">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <StarHalf className="h-3.5 w-3.5 fill-current" />
                  </div>
                  <span className="whitespace-nowrap">4.5 / 5 Rating</span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium leading-snug mt-0.5">
                  Trusted by Autonomous Colleges &amp; Multi-Campus Trusts
                </p>
              </div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.58, ease: revealEase }}
              className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-5 text-xs"
            >
              <motion.div
                whileHover={{ y: -2, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className="flex items-center gap-1.5 font-semibold text-slate-700 cursor-default"
              >
                <Layers className="h-3.5 w-3.5 shrink-0 text-campo-teal-dark" />
                <span className="text-[11px] sm:text-xs whitespace-nowrap">Unified Platform</span>
              </motion.div>
              <motion.div
                whileHover={{ y: -2, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className="flex items-center gap-1.5 font-semibold text-slate-700 cursor-default"
              >
                <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-campo-teal-dark" />
                <span className="text-[11px] sm:text-xs whitespace-nowrap">Role-Governed</span>
              </motion.div>
              <motion.div
                whileHover={{ y: -2, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className="flex items-center gap-1.5 font-semibold text-slate-700 cursor-default"
              >
                <Sparkles className="h-3.5 w-3.5 shrink-0 text-campo-teal-dark" />
                <span className="text-[11px] sm:text-xs whitespace-nowrap">Audit-Ready Core</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column: Layered Live Product Showcase Mockup with Clean Floating Badges (Hidden on mobile view) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: revealEase }}
            className="hidden lg:block relative lg:col-span-7 xl:col-span-7"
          >
            {/* Top Floating Pill: Positioned Elegantly Above the Mockup (No cutoff or overlap) */}
            <div className="mb-2.5 flex items-center justify-center sm:justify-end">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35, ease: revealEase }}
                className="inline-flex items-center gap-2 sm:gap-2.5 rounded-xl border border-slate-200/90 bg-white/95 px-3 py-1.5 sm:px-3.5 shadow-elevated backdrop-blur-md max-w-full"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-50 text-campo-teal-dark shrink-0">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div className="text-left text-xs min-w-0">
                  <div className="flex items-center gap-1.5 font-bold text-campo-navy truncate">
                    <span>94.6% Live Attendance</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  </div>
                  <span className="text-[10px] text-slate-500 block truncate">Biometric Sync Across 14 Halls</span>
                </div>
              </motion.div>
            </div>

            {/* The Main High-Definition Executive Browser Frame */}
            <div className="relative z-10 transition-transform duration-500 hover:scale-[1.008]">
              <DashboardMockup />
            </div>

            {/* Bottom Floating Pill: Positioned Cleanly Below the Mockup (No overlap with sidebar or bottom bar) */}
            <div className="mt-2.5 flex items-center justify-center sm:justify-start">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45, ease: revealEase }}
                className="inline-flex items-center gap-2 sm:gap-2.5 rounded-xl border border-slate-200/90 bg-white/95 px-3 py-1.5 sm:px-3.5 shadow-elevated backdrop-blur-md max-w-full"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-campo-navy text-campo-teal shrink-0">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-left text-xs min-w-0">
                  <p className="font-bold text-campo-navy truncate">₹14.82 Cr Term Fees Realized</p>
                  <p className="text-[10px] text-emerald-600 font-bold truncate">92.4% Online Reconciliation Rate</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
