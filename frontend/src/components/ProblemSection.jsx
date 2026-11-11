import React from 'react';
import { motion } from 'framer-motion';
import { problemItems } from '../data/campoData';
import { SectionHeading, revealEase } from './MotionPrimitives';

export function ProblemSection() {
  return (
    <section className="section-padding border-y border-slate-200/80 bg-campo-surface">
      <div className="container-campo">
        <SectionHeading
          index="01"
          label="The Challenge"
          title="Managing an institution shouldn't mean managing multiple disconnected systems."
          description="Siloed campus software creates manual reconciliation and slows down leadership decisions."
          align="center"
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problemItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.38,
                  delay: idx * 0.04,
                  ease: revealEase,
                }}
                className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition-colors duration-200 hover:border-slate-300"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-campo-surface text-campo-navy">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-campo-navy">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
