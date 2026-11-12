import React from 'react';
import { motion } from 'framer-motion';
import { problemItems } from '../data/campoData';
import { SectionBackground, SectionHeading, revealEase } from './MotionPrimitives';

export function ProblemSection() {
  return (
    <section className="section-padding relative overflow-hidden border-y border-slate-200/80 bg-white">
      <SectionBackground variant="default" opacityClass="opacity-85" />
      <div className="container-campo relative z-10">
        <SectionHeading
          index="01"
          label="The Challenge"
          title="Managing an institution shouldn't mean managing multiple disconnected systems."
          description="Siloed campus software creates manual reconciliation and slows down leadership decisions."
          align="center"
        />

        <div className="mt-8 grid gap-3.5 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {problemItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 22, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.06,
                  ease: revealEase,
                }}
                className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-campo-teal/50 hover:shadow-elevated"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-campo-navy text-campo-teal shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-[18px] w-[18px]" />
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
