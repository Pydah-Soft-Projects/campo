import React from 'react';
import { motion } from 'framer-motion';
import { whyCampoFeatures } from '../data/campoData';
import { CampoLogo } from './CampoLogo';
import {
  AnimatedCounter,
  BrandCornerWave,
  Reveal,
  SectionBackground,
  SectionHeading,
  revealEase,
} from './MotionPrimitives';

const platformStats = [
  { value: 12, suffix: '', label: 'Connected Institutional Apps' },
  { value: 1, suffix: '', label: 'Unified Ecosystem Core' },
  { value: 100, suffix: '%', label: 'Role-Scoped Information Access' },
  { value: 360, suffix: '°', label: 'Cross-Department Visibility' },
];

export function WhyCampo() {
  const [featuredItem, ...otherItems] = whyCampoFeatures;
  const FeaturedIcon = featuredItem.icon;

  return (
    <section id="about" className="section-padding relative overflow-hidden bg-white">
      <SectionBackground variant="flipX" opacityClass="opacity-75" />
      <div className="container-campo relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left: Editorial Narrative */}
          <div className="lg:col-span-6">
            <SectionHeading
              index="06"
              label="Why Campo"
              title="More Than Software. A Better Way to Run Your Institution."
              description="Built for Directors, Chairmen, Registrars, and institutional administrators who want unified governance without compromising departmental autonomy."
            />
          </div>

          {/* Right: 2x2 Platform Counters */}
          <Reveal delay={0.08} className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-campo-surface p-6 sm:p-7">
              {platformStats.map((stat) => (
                <div
                  key={stat.label}
                  className="border-l-2 border-campo-teal-dark/70 pl-3.5"
                >
                  <span className="font-display text-2xl font-extrabold text-campo-navy sm:text-3xl">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </span>
                  <p className="mt-1 text-xs font-medium text-slate-600">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Differentiators Grid */}
        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          {/* Featured Ecosystem Card (Dark Navy Anchor Card with Teal Brand Wave) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: revealEase }}
            className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-campo-secondary border-t-4 border-t-campo-teal bg-gradient-to-br from-campo-navy via-campo-navy to-campo-deep p-7 text-white shadow-workspace lg:col-span-5"
          >
            <BrandCornerWave className="h-28 w-64 opacity-85" />

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-campo-teal">
                  <FeaturedIcon className="h-5 w-5" />
                </div>
                <CampoLogo variant="light" size="sm" />
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-campo-teal">
                Core Differentiation
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold text-white">
                {featuredItem.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                {featuredItem.description}
              </p>
            </div>

            <div className="relative z-10 mt-8 rounded-xl border border-white/15 bg-white/[0.06] p-4 backdrop-blur-sm">
              <p className="text-xs font-semibold text-white">
                Built for Real Institutional Scale
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-300">
                Every workflow—from applicant enquiry to student records, fee
                reconciliation, and campus workforce—operates on one coherent
                foundation.
              </p>
            </div>
          </motion.div>

          {/* 6 Architectural Differentiator Cells */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {otherItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.04,
                    ease: revealEase,
                  }}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-all duration-200 hover:border-slate-300 hover:shadow-elevated"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-campo-surface text-campo-navy">
                    <Icon className="h-[18px] w-[18px] text-campo-teal-dark" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-campo-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.description}
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
