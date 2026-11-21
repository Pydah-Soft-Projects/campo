import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import {
  Database,
  Link2,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { CampoLogo } from './CampoLogo';
import { SectionHeading, revealEase } from './MotionPrimitives';
import boardroomAnalyticsImg from '../assets/executive-analytics-boardroom.webp';

const coreFeatures = [
  {
    icon: Database,
    tag: 'Single Source of Truth',
    mobileTag: 'Single Source',
    title: 'Centralized Master Data',
    description:
      'Every student, course, fee ledger, and staff record lives in one shared central database. No scattered files, no lost records, and zero conflicting numbers across campus offices.',
    mobileDescription:
      'One central database for all student, fee, and staff records with zero data conflicts.',
  },
  {
    icon: CheckCircle2,
    tag: 'Instant Live Updates',
    mobileTag: 'Live Updates',
    title: 'Zero Confusion & Duplicate Work',
    description:
      'When accounts logs a fee payment or teachers mark attendance, the update reflects everywhere instantly. Staff never waste time exporting Excel sheets or reconciling conflicting reports.',
    mobileDescription:
      'Fee and attendance updates reflect everywhere instantly, ending manual Excel reconciliation.',
  },
  {
    icon: Link2,
    tag: '12 Synchronized Modules',
    mobileTag: '12 Sync Modules',
    title: 'Interconnected Applications',
    description:
      'Admissions, Academics, Exams, Finance, Transport, Hostel, and Library speak to each other automatically. When an event happens in one module, all related workflows update in harmony.',
    mobileDescription:
      'All campus modules communicate automatically, updating related workflows in real time.',
  },
  {
    icon: ShieldCheck,
    tag: 'Strict Institutional Security',
    mobileTag: 'Role Security',
    title: 'Role-Based Access Controls',
    description:
      'Principals, deans, teachers, accountants, and wardens access strictly what their designated role permits. Sensitive financial ledgers and academic scores stay private and secure.',
    mobileDescription:
      'Staff access strictly what their role permits, keeping academic and financial ledgers secure.',
  },
];

export function IntelligenceSection() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageParallaxY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="section-padding relative overflow-hidden bg-slate-50/60 border-y border-slate-200/80"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute right-1/4 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-blue-100/40 blur-[140px]" />
      </div>

      <div className="container-campo relative z-10">
        <SectionHeading
          label="Centralized Data"
          title="All Applications Connected. All Data in One Central System."
          align="center"
        />

        {/* Full-Section Expansive Layout with Image Fitting Entire Section Height */}
        <div className="mt-10 lg:mt-12 grid gap-8 lg:grid-cols-12 items-stretch">
          {/* Left Column (5 Cols): Full-Height Authentic Boardroom Image with Scroll Parallax */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: revealEase }}
            className="relative min-h-[340px] sm:min-h-[420px] lg:min-h-full rounded-3xl overflow-hidden border border-slate-200 bg-slate-900 shadow-workspace lg:col-span-5 flex flex-col justify-end"
          >
            {/* Image fits entire height of section with Parallax */}
            <motion.img
              src={boardroomAnalyticsImg}
              alt="University leadership monitoring real-time centralized campus operations"
              loading="lazy"
              decoding="async"
              style={prefersReducedMotion ? undefined : { y: imageParallaxY }}
              className="absolute inset-0 h-[112%] w-full object-cover transition-transform duration-700 hover:scale-105 will-change-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

            <div className="absolute top-4 left-4 z-10">
              <CampoLogo variant="light" size="sm" />
            </div>

            <div className="relative z-10 p-5 sm:p-8 text-white space-y-2.5 sm:space-y-3">
              <h4 className="font-display text-base sm:text-2xl font-bold text-white leading-snug">
                “When all campus departments share one core, data flows without barriers.”
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Empowering trustees, directors, and principals with reliable live visibility across all academic and financial operations.
              </p>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <Zap className="h-3.5 w-3.5 text-campo-teal" />
                  12 Connected Modules
                </span>
                <span className="text-emerald-400 font-semibold flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  Live Synchronized
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column (7 Cols): Core Features with Staggered Scroll Entrance */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* 4 Focused Feature Cards (Two rows side-by-side on mobile view) */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 h-full">
              {coreFeatures.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={feat.title}
                    initial={{ opacity: 0, y: 25, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.45,
                      delay: idx * 0.08,
                      ease: revealEase,
                    }}
                    whileHover={{ y: -4, scale: 1.015 }}
                    className="group flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-3 sm:p-6 shadow-card transition-all duration-300 hover:border-campo-teal/70 hover:shadow-elevated"
                  >
                    <div>
                      {/* Icon with Dark Line Color (Not filled dark box) & Tag */}
                      <div className="flex flex-wrap items-center justify-between gap-1.5">
                        <div className="flex h-8 w-8 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl border border-slate-200/90 bg-slate-50 text-campo-navy transition-all duration-300 group-hover:border-campo-teal/60 group-hover:bg-campo-teal/10 group-hover:text-campo-teal-dark group-hover:scale-110 group-hover:rotate-3 shrink-0">
                          <Icon className="h-4 w-4 sm:h-5 sm:w-5 stroke-[1.8]" />
                        </div>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-slate-600 border border-slate-200 truncate max-w-[110px] sm:max-w-none">
                          <span className="inline sm:hidden">{feat.mobileTag}</span>
                          <span className="hidden sm:inline">{feat.tag}</span>
                        </span>
                      </div>

                      {/* Title */}
                      <h5 className="mt-2.5 sm:mt-4 font-display text-xs sm:text-base font-bold leading-snug text-campo-navy">
                        {feat.title}
                      </h5>

                      {/* Description */}
                      <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-[13px] leading-relaxed text-slate-600">
                        <span className="inline sm:hidden">{feat.mobileDescription}</span>
                        <span className="hidden sm:inline">{feat.description}</span>
                      </p>
                    </div>

                    {/* Bottom Check Tag */}
                    <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-100 flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-semibold text-campo-teal-dark">
                      <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                      <span className="leading-tight">
                        <span className="inline sm:hidden">Verified Capability</span>
                        <span className="hidden sm:inline">Verified System Capability</span>
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
