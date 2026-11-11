import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Layers, Lock, Sparkles } from 'lucide-react';
import heroShowcaseBg from '../assets/CAMPO-bg.png';
import { revealEase } from './MotionPrimitives';

export function HeroSection({ onRequestDemo }) {
  const handleExploreClick = () => {
    const target = document.getElementById('platform');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[620px] items-center overflow-hidden bg-gradient-to-br from-white via-[#F6FCFC] to-[#E6F7F8] pb-16 pt-28 sm:pb-20 sm:pt-32 lg:min-h-[700px] lg:pb-24 lg:pt-32"
    >
      {/* Desktop Full-Bleed Hero Background Artwork (Matches Reference Layout) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
      >
        <img
          src={heroShowcaseBg}
          alt=""
          className="h-full w-full object-cover object-right"
        />
        {/* Gentle left readability scrim preserving full right-side dashboard vibrancy */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent lg:w-[54%]" />
      </div>

      <div className="container-campo relative z-10">
        <div className="max-w-xl lg:max-w-[470px] xl:max-w-[540px]">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: revealEase }}
            className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-campo-teal-dark sm:text-xs"
          >
            <span className="h-px w-6 bg-campo-teal" />
            <span>Unified Institutional Management Platform</span>
            <span className="h-px w-6 bg-campo-teal" />
          </motion.div>

          {/* Main Display Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06, ease: revealEase }}
            className="mt-5 font-display text-4xl font-extrabold tracking-[-0.03em] text-campo-navy sm:text-5xl lg:text-[3.5rem] lg:leading-[1.04] xl:text-[3.85rem]"
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
            className="mt-5 h-1 w-10 origin-left rounded-full bg-campo-teal"
          />

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16, ease: revealEase }}
            className="mt-5 max-w-lg text-base leading-relaxed text-slate-600 sm:text-[17px]"
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
            className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center"
          >
            <button
              type="button"
              onClick={onRequestDemo}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-campo-navy px-7 py-3.5 text-sm font-semibold text-white shadow-card transition-all duration-200 hover:bg-campo-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-campo-teal focus-visible:ring-offset-2 sm:text-base"
            >
              Request a Demo
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            <button
              type="button"
              onClick={handleExploreClick}
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300/90 bg-white/90 px-7 py-3.5 text-sm font-semibold text-campo-navy backdrop-blur-sm transition-all duration-200 hover:border-slate-400 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-campo-teal focus-visible:ring-offset-2 sm:text-base"
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
            className="mt-10 grid grid-cols-1 gap-4 border-t border-slate-200/80 pt-6 sm:grid-cols-3"
          >
            <div className="flex items-center gap-2.5">
              <Layers className="h-4.5 w-4.5 shrink-0 text-campo-teal-dark" />
              <span className="text-xs font-medium leading-snug text-slate-600">
                12 Connected Applications
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Lock className="h-4.5 w-4.5 shrink-0 text-campo-teal-dark" />
              <span className="text-xs font-medium leading-snug text-slate-600">
                Role-Based Access Control
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-4.5 w-4.5 shrink-0 text-campo-teal-dark" />
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
      </div>
    </section>
  );
}
