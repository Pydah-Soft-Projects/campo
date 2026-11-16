import React from 'react';
import { motion } from 'framer-motion';
import {
  Database,
  Link2,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { CampoLogo } from './CampoLogo';
import { SectionHeading, revealEase } from './MotionPrimitives';
import boardroomAnalyticsImg from '../assets/executive-analytics-boardroom.jpg';

const coreFeatures = [
  {
    icon: Database,
    tag: 'Single Source of Truth',
    title: 'Centralized Master Data',
    description:
      'Every student, course, fee ledger, and staff record lives in one shared central database. No scattered files, no lost records, and zero conflicting numbers across campus offices.',
  },
  {
    icon: CheckCircle2,
    tag: 'Instant Live Updates',
    title: 'Zero Confusion & Duplicate Work',
    description:
      'When accounts logs a fee payment or teachers mark attendance, the update reflects everywhere instantly. Staff never waste time exporting Excel sheets or reconciling conflicting reports.',
  },
  {
    icon: Link2,
    tag: '12 Synchronized Modules',
    title: 'Interconnected Applications',
    description:
      'Admissions, Academics, Exams, Finance, Transport, Hostel, and Library speak to each other automatically. When an event happens in one module, all related workflows update in harmony.',
  },
  {
    icon: ShieldCheck,
    tag: 'Strict Institutional Security',
    title: 'Role-Based Access Controls',
    description:
      'Principals, deans, teachers, accountants, and wardens access strictly what their designated role permits. Sensitive financial ledgers and academic scores stay private and secure.',
  },
];

export function IntelligenceSection() {
  return (
    <section id="features" className="section-padding relative overflow-hidden bg-slate-50/60 border-y border-slate-200/80">
      <div className="container-campo relative z-10">
        <SectionHeading
          index="04"
          label="Centralized Data"
          title="All Applications Connected. All Data in One Central System."
          align="center"
        />

        {/* Full-Section Expansive Layout with Image Fitting Entire Section Height */}
        <div className="mt-10 lg:mt-12 grid gap-8 lg:grid-cols-12 items-stretch">
          {/* Left Column (5 Cols): Full-Height Authentic Boardroom Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: revealEase }}
            className="relative min-h-[400px] lg:min-h-full rounded-3xl overflow-hidden border border-slate-200 bg-slate-900 shadow-workspace lg:col-span-5 flex flex-col justify-end"
          >
            {/* Image fits entire height of section */}
            <img
              src={boardroomAnalyticsImg}
              alt="University leadership monitoring real-time centralized campus operations"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />

            <div className="absolute top-4 left-4 z-10">
              <CampoLogo variant="light" size="sm" />
            </div>

            <div className="relative z-10 p-6 sm:p-8 text-white space-y-3">
              <h4 className="font-display text-lg sm:text-2xl font-bold text-white leading-snug">
                “When all campus departments share one core, data flows without barriers.”
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Empowering trustees, directors, and principals with reliable live visibility across all academic and financial operations.
              </p>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                <span>12 Connected Modules</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Synchronized
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column (7 Cols): Core Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.1, ease: revealEase }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            {/* 4 Focused Feature Cards (2x2 Grid with Light Background and Dark Icon Line) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
              {coreFeatures.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.title}
                    className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-card transition-all duration-300 hover:border-campo-teal/60 hover:shadow-elevated"
                  >
                    <div>
                      {/* Icon with Dark Line Color (Not filled dark box) & Tag */}
                      <div className="flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/90 bg-slate-50 text-campo-navy transition-all duration-300 group-hover:border-campo-teal/60 group-hover:bg-campo-teal/10 group-hover:text-campo-teal-dark group-hover:scale-105">
                          <Icon className="h-5 w-5 stroke-[1.8]" />
                        </div>
                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-600 border border-slate-200">
                          {feat.tag}
                        </span>
                      </div>

                      {/* Title */}
                      <h5 className="mt-4 font-display text-base font-bold text-campo-navy">
                        {feat.title}
                      </h5>

                      {/* Description */}
                      <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-slate-600">
                        {feat.description}
                      </p>
                    </div>

                    {/* Bottom Check Tag */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-campo-teal-dark">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Verified System Capability</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
