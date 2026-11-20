import React from 'react';
import { motion } from 'framer-motion';
import {
  Layers,
  ShieldCheck,
  Building2,
  FileCheck,
  Quote,
  Sparkles,
} from 'lucide-react';
import { CampoLogo } from './CampoLogo';
import { SectionHeading, revealEase, AnimatedCounter } from './MotionPrimitives';
import { campusImpactMetrics } from '../data/campoData';
import leadershipImg from '../assets/institutional-leadership.webp';
import libraryImg from '../assets/campus-library.webp';
import convocationImg from '../assets/campus-convocation-success.webp';

export function WhyCampo() {
  return (
    <section id="about" className="section-padding relative overflow-hidden bg-white">
      <div className="container-campo relative z-10">
        <SectionHeading
          index="06"
          label="Why Campo"
          title="“Everything our campus needs, in one calm and connected place.”"
          description="Built directly with campus directors, teachers, and administrators who wanted an ERP that feels natural, fast, and reliable every single day."
          align="center"
        />

        {/* Real results, measured on campus (From Official Brochure) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: revealEase }}
          className="mt-8 sm:mt-10 rounded-3xl border border-slate-200 bg-slate-50/70 p-5 sm:p-7 shadow-xs"
        >
          <div className="text-center mb-5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-campo-teal-dark">
              Demonstrated Impact
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-campo-navy mt-0.5">
              Real results, measured on campus.
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {campusImpactMetrics.map((item, idx) => {
              const match = item.value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
              const prefix = match ? match[1] : '';
              const target = match ? parseFloat(match[2]) : 0;
              const suffix = match ? match[3] : '';

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.45, delay: idx * 0.05, ease: revealEase }}
                  className="rounded-2xl border border-slate-200/80 bg-white p-3 sm:p-4 text-center shadow-xs hover:border-campo-teal/50 hover:shadow-card transition-all"
                >
                  <div className="font-display text-xl sm:text-3xl font-black text-campo-teal-dark tracking-tight tabular-nums">
                    {target > 0 ? (
                      <AnimatedCounter
                        target={target}
                        prefix={prefix}
                        suffix={suffix}
                        once={false}
                        amount={0.1}
                        duration={1.25 + idx * 0.08}
                      />
                    ) : (
                      item.value
                    )}
                  </div>
                  <p className="mt-1 text-xs font-semibold text-slate-700 leading-snug">
                    {item.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Split-Screen Composition with Authentic Campus Photography */}
        <div className="mt-10 sm:mt-12 grid items-stretch gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Leadership Feature Card with Quote */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: revealEase }}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 text-white shadow-workspace lg:col-span-5 flex flex-col justify-between"
          >
            <div className="relative min-h-[250px] sm:min-h-[320px] w-full overflow-hidden">
              <img
                src={leadershipImg}
                alt="University academic leadership team"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <div className="absolute top-4 left-4">
                <CampoLogo variant="light" size="sm" />
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-campo-teal/20 px-2.5 py-0.5 text-[10px] font-bold text-campo-teal backdrop-blur-xs mb-2">
                  <Quote className="h-3 w-3" />
                  <span>Campus Director</span>
                </div>
                <p className="font-display text-sm sm:text-base font-bold text-white leading-snug">
                  “Campo eliminated weeks of manual reconciliation between our admissions, examinations, and fee counters.”
                </p>
              </div>
            </div>

            <div className="p-6 bg-slate-950 space-y-4">
              <div className="grid grid-cols-2 gap-3 border-b border-white/10 pb-4">
                <div>
                  <span className="font-display text-lg sm:text-xl font-extrabold text-campo-teal">
                    “One System”
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5">No duplicate paperwork</p>
                </div>
                <div>
                  <span className="font-display text-lg sm:text-xl font-extrabold text-white">
                    “Zero Confusion”
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5">Clear records for everyone</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                “We don't just deliver software — our team stays right beside your staff on campus until everyone feels comfortable, confident, and fast.”
              </p>
            </div>
          </motion.div>

          {/* Right Column: Experience Cards with Relatable Quotes */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.1, ease: revealEase }}
            className="flex flex-col justify-between gap-5 lg:col-span-7"
          >
            {/* Showcase Card 1: Academic & Student Success */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card flex flex-col sm:flex-row items-center transition-all duration-300 hover:border-campo-teal/50 hover:shadow-elevated">
              <div className="relative h-44 sm:h-full sm:w-56 w-full shrink-0 overflow-hidden">
                <img
                  src={convocationImg}
                  alt="Graduates celebrating at convocation"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-transparent to-black/20" />
                <span className="absolute top-3 left-3 rounded-full bg-campo-navy/85 px-2.5 py-0.5 text-[9px] font-bold text-campo-teal backdrop-blur-xs">
                  Student Success
                </span>
              </div>
              <div className="p-5 text-xs">
                <div className="flex items-center gap-1.5 text-campo-teal-dark font-bold text-[10px] uppercase tracking-wider">
                  <FileCheck className="h-3.5 w-3.5" />
                  <span>“From Day One to Convocation”</span>
                </div>
                <h4 className="mt-1 font-display text-base font-bold text-campo-navy">
                  “Every student journey stays smooth and organized.”
                </h4>
                <p className="mt-1.5 text-slate-600 text-xs leading-relaxed">
                  “Admissions, marks lists, attendance alerts, and hall tickets stay completely in sync. Staff spend less time managing files and more time mentoring students.”
                </p>
              </div>
            </div>

            {/* Showcase Card 2: Connected Campus Operations */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card flex flex-col sm:flex-row items-center transition-all duration-300 hover:border-campo-teal/50 hover:shadow-elevated">
              <div className="relative h-44 sm:h-full sm:w-56 w-full shrink-0 overflow-hidden">
                <img
                  src={libraryImg}
                  alt="Modern university central library"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-transparent to-black/20" />
                <span className="absolute top-3 left-3 rounded-full bg-campo-navy/85 px-2.5 py-0.5 text-[9px] font-bold text-campo-teal backdrop-blur-xs">
                  Connected Campus
                </span>
              </div>
              <div className="p-5 text-xs">
                <div className="flex items-center gap-1.5 text-campo-teal-dark font-bold text-[10px] uppercase tracking-wider">
                  <Layers className="h-3.5 w-3.5" />
                  <span>“One Campus, One Single Record”</span>
                </div>
                <h4 className="mt-1 font-display text-base font-bold text-campo-navy">
                  “Classrooms, library, bus routes, and fees speak to each other.”
                </h4>
                <p className="mt-1.5 text-slate-600 text-xs leading-relaxed">
                  “When a student clears fees or books a bus route, the accounts and transport teams see it immediately. No manual entries, no delays, no mismatched numbers.”
                </p>
              </div>
            </div>

            {/* 2 Bottom Quick Quotation Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-4 shadow-2xs">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-campo-navy text-campo-teal">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <h5 className="font-display text-xs font-bold text-campo-navy">
                    “Right access for the right person.”
                  </h5>
                </div>
                <p className="mt-2 text-[11px] text-slate-600 leading-relaxed">
                  “Teachers take attendance, accountants handle fees, and principals see the big picture — each with clean, secure, role-based views.”
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-4 shadow-2xs">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-campo-navy text-campo-teal">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <h5 className="font-display text-xs font-bold text-campo-navy">
                    “Grows with your institutions.”
                  </h5>
                </div>
                <p className="mt-2 text-[11px] text-slate-600 leading-relaxed">
                  “Whether you operate a single college or a large educational trust, manage all campuses easily from one unified, dependable login.”
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
