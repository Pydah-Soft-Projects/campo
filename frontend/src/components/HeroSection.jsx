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

  const copyY = useTransform(scrollYProgress, [0, 1], ['0px', '28px']);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.55]);

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
      className="relative overflow-hidden bg-[#F1F4F8] pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24"
    >
      {/* Subtle ambient lighting glows (Light grey & soft navy/blue tones, zero green) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-blue-100/50 blur-[130px]" />
        <div className="absolute -left-20 top-1/3 h-[450px] w-[450px] rounded-full bg-slate-200/60 blur-[140px]" />
      </div>

      <div className="container-campo relative z-10 w-full">
        {/* 2-Column Main Layout: Symmetrically Aligned & Balanced */}
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-14">
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
              className="inline-flex items-center gap-2 rounded-full bg-campo-navy px-4 py-1.5 shadow-xs"
            >
              <Sparkles className="h-4 w-4 text-blue-300" strokeWidth={2.5} />
              <span className="font-outfit text-xs font-bold tracking-wider text-white uppercase">
                AI ALERTS
              </span>
            </motion.div>

            {/* Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: revealEase }}
              className="mt-4 font-outfit text-3xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[52px] xl:text-[56px]"
            >
              AI is watching your
              <span className="block text-campo-teal">whole campus.</span>
            </motion.h1>

            {/* Eyebrow Label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 font-outfit text-[11px] font-bold tracking-[0.16em] text-slate-500 uppercase sm:text-xs"
            >
              FOUR CATEGORIES · EVERY PART OF YOUR INSTITUTION
            </motion.p>

            {/* 4 Category Cards (2x2 Grid) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: revealEase }}
              className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4"
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
                    whileHover={{ y: -3, scale: 1.015 }}
                    className="group flex items-center gap-3.5 rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md sm:p-4"
                  >
                    {/* Dark Blue Icon Badge (Matching Request a Demo Button, Zero Green) */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-campo-navy text-white shadow-xs transition-transform duration-200 group-hover:scale-105 sm:h-12 sm:w-12">
                      <IconComponent className="h-6 w-6" strokeWidth={2.2} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="font-outfit text-xs font-bold text-slate-500">
                        {cat.num}
                      </span>
                      <h3 className="font-outfit text-sm font-bold leading-tight text-slate-900 sm:text-[15px]">
                        {cat.title}
                      </h3>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Action Buttons Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.45, ease: revealEase }}
              className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <motion.button
                type="button"
                onClick={onRequestDemo}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-campo-navy px-6 text-sm font-bold text-white shadow-card transition-all duration-200 hover:bg-campo-secondary hover:shadow-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-campo-navy sm:h-13 sm:px-7 sm:text-base font-outfit"
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
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 text-sm font-bold text-campo-navy shadow-xs transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-campo-navy sm:h-13 sm:px-7 sm:text-base font-outfit"
              >
                <span>Explore Platform</span>
                <ArrowRight className="h-4 w-4 shrink-0 text-campo-navy transition-transform duration-200 group-hover:translate-x-1" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Smartphone Device Mockup with Centered Orbit */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: revealEase }}
            className="relative flex items-center justify-center lg:col-span-6 xl:col-span-6"
          >
            {/* Centered Relative Wrapper */}
            <div className="relative flex items-center justify-center py-6">
              {/* Perfectly Centered Circular Orbit & Backdrop directly behind the phone */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -m-16 sm:-m-24 lg:-m-28 flex items-center justify-center"
              >
                {/* Soft circular background glow */}
                <div className="h-[440px] w-[440px] sm:h-[520px] sm:w-[520px] lg:h-[560px] lg:w-[560px] rounded-full bg-blue-100/60 shrink-0" />

                {/* Rotating dashed outer orbit ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                  className="absolute h-[500px] w-[500px] sm:h-[590px] sm:w-[590px] lg:h-[630px] lg:w-[630px] rounded-full border-2 border-dashed border-blue-200/90 shrink-0"
                />
              </div>

              {/* 3D Smartphone Device with Hardware Depth & Levitation Animation */}
              <motion.div
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
                style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
                className="relative z-10 w-[295px] sm:w-[325px]"
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
