import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { howItWorksSteps } from '../data/campoData';
import { SectionBackground, SectionHeading, revealEase } from './MotionPrimitives';

export function HowItWorks() {
  return (
    <section className="section-padding relative overflow-hidden border-y border-slate-200/80 bg-white">
      <SectionBackground variant="default" opacityClass="opacity-85" />
      <div className="container-campo relative z-10">
        <SectionHeading
          index="05"
          label="How Campo Works"
          title="Three Steps From Fragmented Tools to Connected Clarity."
          description="Bring your institutional applications onto one shared foundation, gain cross-department visibility within user permissions, and act with timely precision."
          align="center"
        />

        <div className="relative mt-14">
          {/* Desktop horizontal progress rail */}
          <div
            aria-hidden="true"
            className="absolute left-8 right-8 top-6 hidden h-px bg-slate-300 lg:block"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.85, ease: revealEase }}
              className="h-full w-full origin-left bg-campo-teal-dark"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.1,
                  ease: revealEase,
                }}
                className="relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 shadow-card"
              >
                <div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-campo-surface font-display text-sm font-extrabold text-campo-navy">
                    {step.step}
                  </div>

                  <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-campo-teal-dark">
                    {step.subtitle}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-bold text-campo-navy">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </div>

                <ul className="mt-6 space-y-2 border-t border-slate-100 pt-5">
                  {step.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-center gap-2.5 text-xs font-medium text-campo-ink"
                    >
                      <Check className="h-3.5 w-3.5 shrink-0 text-campo-teal-dark" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
