import React from 'react';
import { motion } from 'framer-motion';
import { aiCapabilities } from '../data/campoData';
import { SectionHeading, revealEase } from './MotionPrimitives';

export function IntelligenceSection() {
  return (
    <section id="features" className="section-padding bg-white">
      <div className="container-campo">
        <SectionHeading
          index="04"
          label="Intelligent Institutional Operations"
          title="From Institutional Data to Intelligent Decisions."
          description="Query existing institutional data directly—strictly scoped to each user's role and permissions."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: revealEase }}
          className="mx-auto mt-10 max-w-4xl divide-y divide-slate-200/80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card"
        >
          {aiCapabilities.map((cap) => {
            const Icon = cap.icon;
            const isImplemented = cap.statusTone === 'implemented';

            return (
              <div
                key={cap.title}
                className="flex flex-col justify-between gap-3 px-6 py-4 transition-colors hover:bg-campo-light/50 sm:flex-row sm:items-center sm:gap-4 sm:py-5"
              >
                <div className="flex items-start gap-3.5 sm:items-center">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-campo-surface text-campo-navy">
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
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
