import React from 'react';
import { motion } from 'framer-motion';
import {
  Layers,
  DatabaseZap,
  Repeat,
  Clock,
  Quote,
} from 'lucide-react';
import { SectionHeading, revealEase } from './MotionPrimitives';
import campusHeroImg from '../assets/campus-hero.webp';

const frictionPoints = [
  {
    icon: Layers,
    iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    title: 'Multiple Disconnected Portals',
    impact: 'Admissions, academics, fees, and HR run on 4 separate systems with zero communication.',
  },
  {
    icon: DatabaseZap,
    iconBg: 'bg-blue-50 text-blue-600 border border-blue-100',
    title: 'Scattered Student & Staff Records',
    impact: 'The same student profile is duplicated across Excel sheets, leading to data errors.',
  },
  {
    icon: Repeat,
    iconBg: 'bg-purple-50 text-purple-600 border border-purple-100',
    title: 'Repetitive Manual Reconciliation',
    impact: 'Finance teams spend weeks matching fee receipts against bank statements.',
  },
  {
    icon: Clock,
    iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
    title: 'Delayed Executive Decisions',
    impact: 'College Chairmen and Principals wait days for compiled reports.',
  },
];

export function ProblemSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-white border-y border-slate-200/80">
      <div className="container-campo relative z-10">
        <SectionHeading
          index="01"
          label="The Campus Challenge"
          title="Managing an Institution Shouldn't Mean Juggling Fragmented Tools."
          description="Most colleges run on isolated departmental software. The result? Manual reconciliation, data silos, and administrative fatigue."
          align="center"
        />

        {/* 2-Column Responsive Layout */}
        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Full-Height Expansive Campus Photo with Quote Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: revealEase }}
            className="relative overflow-hidden rounded-3xl border border-slate-200 lg:col-span-6 shadow-workspace min-h-[340px] sm:min-h-[460px] lg:min-h-[500px] flex flex-col justify-end"
          >
            {/* Full-Bleed Photograph */}
            <img
              src={campusHeroImg}
              alt="Autonomous college campus architecture"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Gradient Overlay - Subtle so photo shows through clearly */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* Bottom Glassmorphism Narrative Card with Slight Transparent Blur */}
            <div className="relative z-10 p-3 sm:p-6">
              <div className="rounded-2xl border border-white/20 bg-slate-950/45 p-4 sm:p-5 backdrop-blur-md text-white shadow-elevated">
                <p className="font-display text-xs sm:text-base font-semibold leading-relaxed text-white">
                  <span className="mr-2 inline-flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-500/25 text-emerald-400 align-middle">
                    <Quote className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-emerald-400" />
                  </span>
                  "When admissions, fees, and academics operate on isolated systems, campus leadership spends more time fixing data errors than governing."
                </p>

                <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-3 sm:gap-4 border-t border-white/10 pt-3 text-[11px] sm:text-xs text-slate-200">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                    <span>Duplicate Data</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]" />
                    <span>Delayed Ledgers</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                    <span>Audit Friction</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 2x2 Friction Points Grid (Two rows side-by-side on mobile) */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-2.5 sm:gap-4 lg:gap-5">
            {frictionPoints.map((point, idx) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45, delay: idx * 0.08, ease: revealEase }}
                  className="group flex flex-col justify-start rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-3.5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-card"
                >
                  <div
                    className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl ${point.iconBg} transition-transform duration-300 group-hover:scale-105`}
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="mt-3 sm:mt-5 font-display text-xs sm:text-base font-bold leading-snug text-campo-navy">
                    {point.title}
                  </h3>
                  <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-[13px] leading-relaxed text-slate-600">
                    {point.impact}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
