import React, { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  Sparkles,
  GraduationCap,
  Briefcase,
  Bus,
  Users,
  ArrowRight,
} from 'lucide-react';
import { revealEase } from './MotionPrimitives';
import { MobileAppMockup } from './mockups/MobileAppMockup';

const CATEGORIES = [
  {
    num: '01',
    title: 'Academics Operations',
    icon: GraduationCap,
  },
  {
    num: '02',
    title: 'Administrative Operations',
    icon: Briefcase,
  },
  {
    num: '03',
    title: 'Campus Operations',
    icon: Bus,
  },
  {
    num: '04',
    title: 'Student Management & Engagement',
    icon: Users,
  },
];

export function HeroSection({ onRequestDemo }) {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const copyY = useTransform(scrollYProgress, [0, 1], ['0px', '42px']);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.45]);
  const phoneY = useTransform(scrollYProgress, [0, 1], ['0px', '-28px']);
  const phoneScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const phoneRotateZ = useTransform(scrollYProgress, [0, 1], [0, -2.5]);
  const orbitScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const pillTopY = useTransform(scrollYProgress, [0, 1], ['0px', '35px']);
  const pillBottomY = useTransform(scrollYProgress, [0, 1], ['0px', '-32px']);

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
      className="relative overflow-hidden bg-[#F1F4F8] pt-24 pb-14 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24"
    >
      {/* Subtle ambient lighting glows (Light grey & soft navy/blue tones, zero green) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <motion.div
          style={prefersReducedMotion ? undefined : { scale: orbitScale }}
          className="absolute right-0 top-1/4 h-[520px] w-[520px] rounded-full bg-blue-100/50 blur-[130px]"
        />
        <div className="absolute -left-20 top-1/3 h-[450px] w-[450px] rounded-full bg-slate-200/60 blur-[140px]" />
      </div>

      <div className="container-campo relative z-10 w-full">
        {/* 2-Column Main Layout: Symmetrically Aligned & Balanced */}
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-14">
          {/* Left Column: AI Alerts Badge, Headline, 4 Category Cards, CTAs */}
          <motion.div
            style={prefersReducedMotion ? undefined : { y: copyY, opacity: copyOpacity }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: revealEase }}
            className="lg:col-span-6 xl:col-span-6"
          >
            {/* Pill Badge: ✨ AI ALERTS (Dark Blue matching Demo button, Zero Green) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: revealEase }}
              className="inline-flex items-center gap-2 rounded-full bg-campo-navy px-3.5 py-1 sm:px-4 sm:py-1.5 shadow-xs"
            >
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-300" strokeWidth={2.5} />
              <span className="font-outfit text-[11px] sm:text-xs font-bold tracking-wider text-white uppercase">
                AI ALERTS
              </span>
            </motion.div>

            {/* Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: revealEase }}
              className="mt-3.5 sm:mt-4 font-outfit text-[32px] xs:text-4xl sm:text-5xl lg:text-[52px] xl:text-[56px] font-extrabold leading-[1.12] sm:leading-[1.08] tracking-tight text-slate-900"
            >
              AI is observing your
              <span className="block text-campo-teal">whole campus.</span>
            </motion.h1>

            {/* Eyebrow Label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 sm:mt-6 font-outfit text-[10px] sm:text-xs font-bold tracking-[0.14em] sm:tracking-[0.16em] text-slate-500 uppercase"
            >
              FOUR CATEGORIES · EVERY PART OF YOUR INSTITUTION
            </motion.p>

            {/* 4 Category Cards (2x2 Grid Responsive) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: revealEase }}
              className="mt-3.5 sm:mt-4 grid grid-cols-2 gap-2.5 sm:gap-4"
            >
              {CATEGORIES.map((cat, idx) => {
                const IconComponent = cat.icon;
                return (
                  <motion.div
                    key={cat.num}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.28 + idx * 0.06,
                      ease: revealEase,
                    }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="group relative flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3.5 rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white p-2.5 xs:p-3 sm:p-4 shadow-sm transition-all duration-200 hover:border-campo-navy/30 hover:shadow-md overflow-hidden"
                  >
                    {/* Hover accent sheen */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    {/* Dark Blue Icon Badge */}
                    <div className="relative z-10 flex h-9 w-9 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-campo-navy text-white shadow-xs transition-transform duration-300 group-hover:scale-110">
                      <IconComponent className="h-4 w-4 sm:h-6 sm:w-6" strokeWidth={2.2} />
                    </div>
                    <div className="relative z-10 min-w-0 flex-1">
                      <span className="font-outfit text-[10px] sm:text-xs font-bold text-slate-500 block">
                        {cat.num}
                      </span>
                      <h3 className="font-outfit text-[11.5px] xs:text-xs sm:text-[15px] font-bold leading-tight text-slate-900 mt-0.5 sm:mt-0 line-clamp-2">
                        {cat.title}
                      </h3>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Action Buttons Row (Side by side) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.45, ease: revealEase }}
              className="mt-6 sm:mt-7 flex flex-row flex-wrap items-center gap-3 sm:gap-4"
            >
              <motion.button
                type="button"
                onClick={onRequestDemo}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="group inline-flex h-11 sm:h-12 items-center justify-center gap-2 rounded-xl bg-campo-navy px-5 sm:px-6 text-xs sm:text-sm font-bold text-white shadow-card transition-all duration-200 hover:bg-campo-secondary hover:shadow-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-campo-navy font-outfit cursor-pointer whitespace-nowrap"
              >
                <span>Request a Demo</span>
                <ArrowRight className="h-4 w-4 shrink-0 text-blue-300 transition-transform duration-200 group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                type="button"
                onClick={handleExploreClick}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="group inline-flex h-11 sm:h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 sm:px-6 text-xs sm:text-sm font-bold text-campo-navy shadow-xs transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-campo-navy font-outfit cursor-pointer whitespace-nowrap"
              >
                <span>Explore Platform</span>
                <ArrowRight className="h-4 w-4 shrink-0 text-campo-navy transition-transform duration-200 group-hover:translate-x-1" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Smartphone Device Mockup with Scroll Parallax & Floating Live Indicators */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: revealEase }}
            className="relative flex items-center justify-center lg:col-span-6 xl:col-span-6 mt-4 lg:mt-0"
          >
            {/* Centered Relative Wrapper */}
            <div className="relative flex items-center justify-center py-4 sm:py-6 w-full max-w-full">
              {/* Perfectly Centered Circular Orbit & Backdrop directly behind the phone */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -m-10 xs:-m-16 sm:-m-24 lg:-m-28 flex items-center justify-center"
              >
                {/* Soft circular background glow */}
                <div className="h-[280px] w-[280px] xs:h-[340px] xs:w-[340px] sm:h-[520px] sm:w-[520px] lg:h-[560px] lg:w-[560px] rounded-full bg-blue-100/60 shrink-0" />

                {/* Rotating dashed outer orbit ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                  className="absolute h-[320px] w-[320px] xs:h-[390px] xs:w-[390px] sm:h-[590px] sm:w-[590px] lg:h-[630px] lg:w-[630px] rounded-full border-2 border-dashed border-blue-200/90 shrink-0"
                />

                {/* Secondary inner counter-rotating ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                  className="absolute h-[240px] w-[240px] xs:h-[300px] xs:w-[300px] sm:h-[450px] sm:w-[450px] lg:h-[480px] lg:w-[480px] rounded-full border border-dotted border-blue-300/40 shrink-0"
                />
              </div>

              {/* Floating Live Indicator Badge 1: Top-Left (Fee Reconciliation) */}
              <motion.div
                style={prefersReducedMotion ? undefined : { y: pillTopY }}
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: [-5, 5, -5],
                      }
                }
                transition={{
                  duration: 4.6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="pointer-events-auto absolute -left-1 xs:-left-3 sm:-left-12 lg:-left-16 top-4 sm:top-14 z-20 flex items-center gap-2 sm:gap-2.5 rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md px-2.5 py-1.5 sm:px-4 sm:py-2.5 shadow-elevated scale-90 xs:scale-95 sm:scale-100 origin-top-left"
              >
                <div className="flex h-7 w-7 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-campo-navy text-campo-teal shadow-xs">
                  <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-outfit text-[10px] sm:text-xs font-bold text-slate-900">
                      AI Fee Alert
                    </span>
                  </div>
                  <p className="font-sans text-[9px] sm:text-[10px] text-slate-500 font-medium">
                    99.4% Automated Match
                  </p>
                </div>
              </motion.div>

              {/* Floating Live Indicator Badge 2: Bottom-Right (Campus Fleet) */}
              <motion.div
                style={prefersReducedMotion ? undefined : { y: pillBottomY }}
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: [6, -6, 6],
                      }
                }
                transition={{
                  duration: 5.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="pointer-events-auto absolute -right-1 xs:-right-3 sm:-right-8 lg:-right-12 bottom-4 sm:bottom-16 z-20 flex items-center gap-2 sm:gap-2.5 rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md px-2.5 py-1.5 sm:px-4 sm:py-2.5 shadow-elevated scale-90 xs:scale-95 sm:scale-100 origin-bottom-right"
              >
                <div className="flex h-7 w-7 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-campo-teal text-campo-navy shadow-xs">
                  <Bus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-outfit text-[10px] sm:text-xs font-bold text-slate-900">
                      Campus Fleet Live
                    </span>
                  </div>
                  <p className="font-sans text-[9px] sm:text-[10px] text-slate-500 font-medium">
                    18 Routes On Schedule
                  </p>
                </div>
              </motion.div>

              {/* 3D Smartphone Device with Hardware Depth, Scroll Parallax & Levitation */}
              <motion.div
                style={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: phoneY,
                        scale: phoneScale,
                        rotateZ: phoneRotateZ,
                        transformStyle: 'preserve-3d',
                        perspective: 1200,
                      }
                }
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: [-7, 7, -7],
                        rotateY: [-2, 2, -2],
                        rotateX: [1, -1, 1],
                      }
                }
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative z-10 w-[250px] xs:w-[280px] sm:w-[325px]"
              >
                <MobileAppMockup
                  screen="alerts"
                  colorTheme="navy"
                  className="w-full"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
