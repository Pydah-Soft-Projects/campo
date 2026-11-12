import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Layers } from 'lucide-react';
import { ecosystemHighlights, ecosystemPillars } from '../data/campoData';
import {
  BrandCornerWave,
  Reveal,
  SectionBackground,
  SectionHeading,
  revealEase,
} from './MotionPrimitives';

export function CampoIntroduction() {
  const [selectedPillarId, setSelectedPillarId] = useState(
    ecosystemPillars[0].id
  );

  const selectedPillar =
    ecosystemPillars.find((p) => p.id === selectedPillarId) ||
    ecosystemPillars[0];

  return (
    <section id="platform" className="section-padding relative overflow-hidden bg-white">
      <SectionBackground variant="flipX" opacityClass="opacity-80" />
      <div className="container-campo relative z-10">
        <SectionHeading
          index="02"
          label="Introducing Campo"
          title="Meet Campo. The Connected Intelligence Behind Your Institution."
          description="Campo replaces disconnected campus tools with one coordinated institutional backbone—where applications, records, and role-based permissions work together seamlessly."
          align="center"
        />

        {/* Light-Mode Interactive Architecture Studio */}
        <Reveal className="mt-8 sm:mt-12">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-campo-surface p-4 shadow-card sm:rounded-3xl sm:p-8 lg:p-10">
            <div className="grid items-stretch gap-5 sm:gap-6 lg:grid-cols-12 lg:gap-8">
              {/* Left: 4 Institutional Pillars Selector */}
              <div className="flex flex-col justify-between lg:col-span-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Institutional Pillars
                  </p>
                  <div className="mt-3 space-y-2.5">
                    {ecosystemPillars.map((pillar, index) => {
                      const isSelected = pillar.id === selectedPillarId;
                      return (
                        <button
                          key={pillar.id}
                          type="button"
                          onClick={() => setSelectedPillarId(pillar.id)}
                          className={`group relative flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-campo-teal ${
                            isSelected
                              ? 'border-campo-navy bg-campo-navy text-white shadow-elevated'
                              : 'border-slate-200/80 bg-white/80 hover:border-slate-300 hover:bg-white'
                          }`}
                        >
                          {isSelected && (
                            <span
                              aria-hidden="true"
                              className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-campo-teal"
                            />
                          )}
                          <div className="pl-1.5">
                            <span
                              className={`font-mono text-[11px] font-semibold ${
                                isSelected ? 'text-campo-teal' : 'text-campo-teal-dark'
                              }`}
                            >
                              0{index + 1}
                            </span>
                            <p
                              className={`font-display text-sm font-bold sm:text-base ${
                                isSelected ? 'text-white' : 'text-campo-navy'
                              }`}
                            >
                              {pillar.label}
                            </p>
                          </div>
                          <span
                            className={`rounded-md px-2.5 py-1 text-[11px] font-semibold ${
                              isSelected
                                ? 'bg-white/15 text-teal-100'
                                : 'bg-campo-surface text-slate-600'
                            }`}
                          >
                            {pillar.modules.length} apps
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-600">
                  <Layers className="h-4 w-4 shrink-0 text-campo-teal-dark" />
                  <span>
                    All 4 pillars synchronize through one shared Campo
                    institutional directory.
                  </span>
                </div>
              </div>

              {/* Right: Clean White Connected Architecture Card */}
              <div className="flex lg:col-span-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedPillar.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.24, ease: revealEase }}
                    className="flex w-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 bg-campo-navy px-5 py-3.5 text-white sm:px-8 sm:py-4">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-campo-teal sm:text-xs">
                          Connected Pillar View
                        </span>
                        <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-teal-100 sm:px-3 sm:text-[11px]">
                          Permission-Governed
                        </span>
                      </div>

                      <div className="p-5 sm:p-8">
                        <h3 className="font-display text-xl font-bold text-campo-navy sm:text-2xl">
                          {selectedPillar.label}
                        </h3>
                        <p className="mt-2.5 text-sm leading-relaxed text-slate-600 sm:text-base">
                          {selectedPillar.description}
                        </p>

                        {/* Connected Applications */}
                        <div className="mt-6">
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Synchronized Applications
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {selectedPillar.modules.map((mod) => (
                              <span
                                key={mod}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-campo-surface px-3 py-1.5 text-xs font-semibold text-campo-navy"
                              >
                                <CheckCircle2 className="h-3.5 w-3.5 text-campo-teal-dark" />
                                {mod}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Shared Institutional Data */}
                        <div className="mt-6 rounded-xl border border-slate-200/90 bg-campo-surface/70 p-4">
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                            Shared Institutional Data Entities
                          </p>
                          <p className="mt-1 text-sm font-semibold text-campo-navy">
                            {selectedPillar.sharedData}
                          </p>
                        </div>

                        <div className="mt-6 border-t border-slate-100 pt-4">
                          <a
                            href="#solutions"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-campo-navy transition-colors hover:text-campo-teal-dark"
                          >
                            Explore all 12 connected applications
                            <ArrowRight className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Interactive 6-Highlight Architectural Grid (Dark Navy Hover Cards) */}
        <Reveal delay={0.08} className="mt-8 sm:mt-12">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
            {ecosystemHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  tabIndex={0}
                  className="group relative overflow-hidden bg-white p-5 transition-colors duration-300 hover:bg-campo-navy focus:bg-campo-navy focus:outline-none sm:p-7 lg:p-8"
                >
                  <BrandCornerWave className="h-20 w-44 opacity-0 transition-opacity duration-300 group-hover:opacity-85 group-focus:opacity-85" />
                  <div className="relative z-10">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-campo-surface text-campo-navy transition-colors duration-300 group-hover:border-campo-teal group-hover:bg-campo-teal group-hover:text-campo-deep group-focus:border-campo-teal group-focus:bg-campo-teal group-focus:text-campo-deep">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-display text-base font-bold text-campo-navy transition-colors duration-300 group-hover:text-white group-focus:text-white sm:mt-5 sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-slate-300 group-focus:text-slate-300 sm:mt-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
