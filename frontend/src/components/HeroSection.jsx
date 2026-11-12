import React, { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowRight, Layers, Lock, Sparkles } from 'lucide-react';
import heroShowcaseBg from '../assets/CAMPO-bg.png';
import { revealEase } from './MotionPrimitives';

export function HeroSection({ onRequestDemo }) {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0px', '72px']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
  const copyY = useTransform(scrollYProgress, [0, 1], ['0px', '28px']);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

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
      className="relative flex min-h-[580px] items-center overflow-hidden bg-gradient-to-br from-white via-[#F7FCFD] to-[#E8F8FA] pb-12 pt-24 sm:min-h-[620px] sm:pb-20 sm:pt-32 lg:min-h-[min(100vh,980px)] lg:py-24"
    >
      {/* Desktop Full-Bleed Hero Background Artwork fitting full screen width */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
      >
        <motion.img
          src={heroShowcaseBg}
          alt=""
          style={prefersReducedMotion ? undefined : { y: bgY, scale: bgScale }}
          className="h-full w-full object-cover object-right will-change-transform"
        />
        {/* Gentle left readability scrim preserving full right-side dashboard & corner waves */}
        <div className="absolute inset-y-0 left-0 w-[50%] bg-gradient-to-r from-white via-white/80 to-transparent" />
        {/* Smooth bottom fade into white so hero transitions cleanly into Section 01 */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/70 to-transparent" />
      </div>

      <motion.div
        style={
          prefersReducedMotion ? undefined : { y: copyY, opacity: copyOpacity }
        }
        className="container-campo relative z-10 will-change-transform"
      >
        <div className="max-w-xl lg:max-w-[460px] xl:max-w-[540px] 2xl:max-w-[600px]">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: revealEase }}
            className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-campo-teal-dark sm:gap-3 sm:text-xs sm:tracking-[0.16em]"
          >
            <span className="h-px w-4 bg-campo-teal sm:w-6" />
            <span>Unified Institutional Management Platform</span>
            <span className="h-px w-4 bg-campo-teal sm:w-6" />
          </motion.div>

          {/* Main Display Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06, ease: revealEase }}
            className="mt-4 font-display text-[2.2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-campo-navy sm:mt-5 sm:text-5xl lg:text-[3.5rem] lg:leading-[1.04] xl:text-[3.85rem]"
          >
            One Institution.
            <br />
            One Connected
            <br />
            Ecosystem<span className="text-campo-teal">.</span>
          </motion.h1>

          {/* Short Signature Teal Accent Rule */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.45, delay: 0.14, ease: revealEase }}
            className="mt-4 h-1 w-10 origin-left rounded-full bg-campo-teal sm:mt-5"
          />

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16, ease: revealEase }}
            className="mt-4 max-w-lg text-[15px] leading-relaxed text-slate-600 sm:mt-5 sm:text-[17px]"
          >
            Everything your institution needs—connected, intelligent, and working
            together. Campo brings admissions, academics, finance, administration,
            and campus operations into one cohesive institutional workspace.
          </motion.p>

          {/* Primary & Secondary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22, ease: revealEase }}
            className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-3.5"
          >
            <button
              type="button"
              onClick={onRequestDemo}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-campo-navy px-6 py-3.5 text-sm font-semibold text-white shadow-card transition-all duration-200 hover:bg-campo-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-campo-teal focus-visible:ring-offset-2 sm:w-auto sm:px-7 sm:text-base"
            >
              Request a Demo
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            <button
              type="button"
              onClick={handleExploreClick}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300/90 bg-white/90 px-6 py-3.5 text-sm font-semibold text-campo-navy backdrop-blur-sm transition-all duration-200 hover:border-slate-400 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-campo-teal focus-visible:ring-offset-2 sm:w-auto sm:px-7 sm:text-base"
            >
              Explore the Platform
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </motion.div>

          {/* Bottom Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease: revealEase }}
            className="mt-8 grid grid-cols-1 gap-3 border-t border-slate-200/80 pt-5 sm:mt-10 sm:grid-cols-3 sm:gap-4 sm:pt-6"
          >
            <div className="flex items-center gap-2.5">
              <Layers className="h-[18px] w-[18px] shrink-0 text-campo-teal-dark" />
              <span className="text-xs font-medium leading-snug text-slate-600">
                12 Connected Applications
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Lock className="h-[18px] w-[18px] shrink-0 text-campo-teal-dark" />
              <span className="text-xs font-medium leading-snug text-slate-600">
                Role-Based Access Control
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-[18px] w-[18px] shrink-0 text-campo-teal-dark" />
              <span className="text-xs font-medium leading-snug text-slate-600">
                Permission-Scoped AI Q&amp;A
              </span>
            </div>
          </motion.div>
        </div>

        {/* Mobile & Tablet Showcase Image (shown cleanly below copy below lg breakpoint) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3, ease: revealEase }}
          className="mt-10 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-workspace lg:hidden"
        >
          <img
            src={heroShowcaseBg}
            alt="Campo unified institutional management platform dashboard"
            className="h-auto w-full object-cover object-right"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
