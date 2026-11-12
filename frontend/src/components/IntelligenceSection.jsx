import React from 'react';
import { motion } from 'framer-motion';
import { aiCapabilities } from '../data/campoData';
import { CampoLogo } from './CampoLogo';
import { SectionBackground, SectionHeading, revealEase } from './MotionPrimitives';

export function IntelligenceSection() {
  return (
    <section id="features" className="section-padding relative overflow-hidden bg-white">
      <SectionBackground variant="flipY" opacityClass="opacity-75" />
      <div className="container-campo relative z-10">
        <SectionHeading
          index="04"
          label="Intelligent Institutional Operations"
          title="From Institutional Data to Intelligent Decisions."
          description="Query existing institutional data directly—strictly scoped to each user's role and permissions."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.14 }}
          transition={{ duration: 0.5, ease: revealEase }}
          className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-elevated sm:mt-10"
        >
          {/* Deep Navy Brand Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 bg-campo-navy px-4 py-3.5 text-white sm:gap-3 sm:px-6 sm:py-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <CampoLogo variant="light" size="sm" />
              <span aria-hidden="true" className="h-3.5 w-px bg-white/20" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-campo-teal sm:text-xs sm:tracking-[0.14em]">
                Operational Intelligence
              </span>
            </div>
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-teal-100 sm:px-3 sm:text-[11px]">
              Permission-Scoped Access
            </span>
          </div>

          <div className="divide-y divide-slate-200/80">
            {aiCapabilities.map((cap, idx) => {
              const Icon = cap.icon;
              const isImplemented = cap.statusTone === 'implemented';

              return (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.06,
                    ease: revealEase,
                  }}
                  className="group flex flex-col justify-between gap-3 px-4 py-4 transition-colors duration-200 hover:bg-campo-light/70 sm:flex-row sm:items-center sm:gap-4 sm:px-6 sm:py-5"
                >
                  <div className="flex items-start gap-3.5 sm:items-center">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-campo-navy text-campo-teal transition-transform duration-200 group-hover:scale-105">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-bold text-campo-navy sm:text-base">
                        {cap.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-slate-600 sm:text-sm">
                        {cap.description}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`w-fit shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold ${
                      isImplemented
                        ? 'border border-teal-200 bg-teal-50 text-campo-teal-dark'
                        : 'border border-slate-200 bg-slate-100 text-slate-600'
                    }`}
                  >
                    {cap.status}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
