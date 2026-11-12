import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { howItWorksSteps } from '../data/campoData';
import {
  BrandCornerWave,
  SectionBackground,
  SectionHeading,
  revealEase,
} from './MotionPrimitives';

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

        <div className="relative mt-9 sm:mt-12 lg:mt-14">
          {/* Desktop horizontal progress rail */}
          <div
            aria-hidden="true"
            className="absolute left-8 right-8 top-6 hidden h-px bg-slate-300 lg:block"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: revealEase }}
              className="h-full w-full origin-left bg-campo-teal-dark"
            />
          </div>

          <div className="grid gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 26, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.14 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: revealEase,
                }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-campo-secondary bg-gradient-to-br from-campo-navy via-campo-navy to-campo-deep p-5 text-white shadow-workspace transition-all duration-300 hover:-translate-y-1 hover:border-campo-teal/60 sm:p-7"
              >
                <BrandCornerWave className="h-20 w-44 opacity-85 transition-opacity duration-300 group-hover:opacity-100 sm:h-24 sm:w-52" />

                <div className="relative z-10">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-campo-teal font-display text-sm font-extrabold text-campo-deep shadow-sm transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12">
                    {step.step}
                  </div>

                  <p className="mt-5 text-[11px] font-semibold uppercase tracking-wider text-campo-teal sm:mt-6 sm:text-xs">
                    {step.subtitle}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-300 sm:mt-3">
                    {step.description}
                  </p>
                </div>

                <ul className="relative z-10 mt-5 space-y-2 border-t border-white/15 pt-4 sm:mt-6 sm:pt-5">
                  {step.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-center gap-2.5 text-xs font-medium text-slate-200"
                    >
                      <Check className="h-3.5 w-3.5 shrink-0 text-campo-teal" />
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
