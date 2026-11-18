import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Plug,
  Sliders,
  Play,
} from 'lucide-react';
import {
  pricingPlans,
  integrationHighlights,
  pickPlugPlaySteps,
} from '../data/campoData';
import { SectionHeading, revealEase } from './MotionPrimitives';

export function PricingSection({ onRequestDemo }) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(1); // Default to Campus (Index 1 - Most Popular)

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : pricingPlans.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < pricingPlans.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="pricing" className="section-padding relative overflow-hidden bg-white border-y border-slate-200/80">
      <div className="container-campo relative z-10">
        <SectionHeading
          index="07"
          label="Institutional Pricing"
          title="Simple pricing, per student per year."
          description="Predictable annual plans designed for institutions of every scale. Full transparency, zero hidden charges, and completely risk-free trial."
          align="center"
        />

        {/* ========================================================
            90-DAY RISK-FREE TRIAL BANNER (Clean Institutional Reassurance)
            ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: revealEase }}
          className="mt-8 sm:mt-10 overflow-hidden rounded-3xl bg-gradient-to-br from-campo-navy via-slate-900 to-campo-deep p-6 sm:p-8 lg:p-10 text-white border border-white/10 shadow-workspace"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              {/* Badge 90 DAYS */}
              <div className="flex h-16 w-16 sm:h-24 sm:w-24 shrink-0 flex-col items-center justify-center rounded-2xl bg-campo-teal text-campo-deep shadow-elevated">
                <span className="font-display text-2xl sm:text-4xl font-black leading-none">
                  90
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest mt-0.5">
                  Days
                </span>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-campo-teal/20 px-3 py-1 text-xs font-bold text-campo-teal backdrop-blur-xs mb-2">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Guaranteed Zero Risk Setup</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Try Campo, completely free.
                </h3>
                <p className="mt-1.5 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                  Full access to every area. If it isn’t making your campus easier to run, walk away with your data. No lock-in, no penalties.
                </p>
              </div>
            </div>

            <div className="w-full sm:w-auto shrink-0">
              <button
                type="button"
                onClick={() => onRequestDemo?.('90-Day Free Trial')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-campo-teal px-6 py-3.5 text-sm font-bold text-campo-deep shadow-elevated transition-all hover:bg-[#19d6c6] hover:shadow-card hover:-translate-y-0.5"
              >
                <span>Start 90-Day Free Trial</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* ========================================================
            3D FLOWER PETAL STAGE WITH LEFT/RIGHT ARROWS
            ======================================================== */}
        <div className="relative mt-8 sm:mt-10 mx-auto w-full max-w-5xl h-[720px] sm:h-[710px] flex justify-center px-2 sm:px-12 select-none">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Plan"
            className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 z-40 flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full border border-slate-200/90 bg-white text-campo-navy shadow-elevated transition-all duration-200 hover:scale-110 hover:border-campo-teal active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-campo-navy" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Plan"
            className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 z-40 flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full border border-slate-200/90 bg-white text-campo-navy shadow-elevated transition-all duration-200 hover:scale-110 hover:border-campo-teal active:scale-95 cursor-pointer"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-campo-navy" />
          </button>

          {/* 3 Petal Cards Container - Sleeker width and increased height */}
          <div className="relative w-full max-w-[460px] sm:max-w-[480px] h-full flex justify-center">
            {pricingPlans.map((plan, idx) => {
              // Mathematical cyclic offset: 0 = center active, 1 = right peek, 2 = left peek (-1)
              const diff = (idx - activeIndex + 3) % 3;
              const isActive = diff === 0;
              const isRight = diff === 1;
              const isLeft = diff === 2;

              // Flower Petal Organic Asymmetric Contours
              const petalShape =
                idx === 0
                  ? 'rounded-tl-[44px] rounded-br-[44px] rounded-tr-3xl rounded-bl-3xl'
                  : idx === 1
                  ? 'rounded-[36px]'
                  : 'rounded-tr-[44px] rounded-bl-[44px] rounded-tl-3xl rounded-br-3xl';

              // Visual variants based on cyclic stage position
              let transformX = '0%';
              let scale = 1;
              let rotate = 0;
              let opacity = 1;
              let zIndex = 30;

              if (isLeft) {
                transformX = '-48%';
                scale = 0.88;
                rotate = -3.5;
                opacity = 0.55;
                zIndex = 10;
              } else if (isRight) {
                transformX = '48%';
                scale = 0.88;
                rotate = 3.5;
                opacity = 0.55;
                zIndex = 10;
              }

              return (
                <motion.div
                  key={plan.id}
                  onClick={() => !isActive && setActiveIndex(idx)}
                  animate={
                    prefersReducedMotion
                      ? { opacity: isActive ? 1 : 0.4 }
                      : {
                          x: transformX,
                          scale,
                          rotate,
                          opacity,
                          zIndex,
                        }
                  }
                  transition={{
                    type: 'spring',
                    stiffness: 220,
                    damping: 24,
                    mass: 0.8,
                  }}
                  className={`absolute top-0 w-full max-w-[340px] sm:max-w-[460px] lg:max-w-[480px] h-[670px] sm:h-[660px] flex flex-col justify-between ${petalShape} bg-white p-6 sm:p-7 transition-shadow duration-300 ${
                    isActive
                      ? plan.popular
                        ? 'border-2 border-campo-teal shadow-[0_20px_50px_-15px_rgba(20,217,196,0.35)] cursor-default'
                        : idx === 0
                        ? 'border-2 border-emerald-400 shadow-[0_20px_45px_-15px_rgba(16,185,129,0.3)] cursor-default'
                        : 'border-2 border-blue-400 shadow-[0_20px_45px_-15px_rgba(59,130,246,0.3)] cursor-default'
                      : 'border border-slate-200/90 shadow-md hover:opacity-85 cursor-pointer'
                  }`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-xs font-bold shadow-md ${
                          plan.popular
                            ? 'bg-campo-navy text-campo-teal border border-campo-teal/40'
                            : 'bg-blue-900/90 text-blue-200 border border-blue-400/40'
                        }`}
                      >
                        <Sparkles className="h-3 w-3" />
                        <span>{plan.badge}</span>
                      </span>
                    </div>
                  )}

                  {/* Card Header: Plan Name, Summary & Price */}
                  <div className="flex items-start justify-between gap-4 pt-1">
                    <div>
                      <h3 className="font-display text-2xl sm:text-3xl font-black text-campo-navy tracking-tight">
                        {plan.name}
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed max-w-[240px]">
                        {plan.summary}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="flex items-baseline justify-end gap-0.5">
                        <span className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-campo-navy">
                          ₹{plan.price}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mt-1">
                        {plan.billingPeriod}
                      </span>
                    </div>
                  </div>

                  {/* ACTIVE CARD: Workflows & Operations using complete height */}
                  {isActive ? (
                    <div className="flex flex-col justify-between flex-1 mt-4 pt-3.5 border-t border-slate-100">
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Included Workflows &amp; Operations
                          </p>
                          <span className="text-[11px] font-semibold text-campo-teal-dark bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100">
                            {plan.categories.length} Areas Included
                          </span>
                        </div>

                        {/* Full-width Category Cards - Distributed to use the complete height without truncation */}
                        <div className="flex-1 flex flex-col justify-around gap-2 my-1">
                          {plan.categories.map((cat, cIdx) => {
                            const isAi = cat.isAi;
                            return (
                              <div
                                key={cIdx}
                                className={`rounded-xl p-2.5 sm:p-3 border transition-all ${
                                  isAi
                                    ? 'bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-teal-500/10 border-campo-teal/60 text-campo-navy shadow-xs ring-1 ring-campo-teal/20'
                                    : 'bg-slate-50/90 border-slate-200/80 text-slate-700 hover:bg-slate-100/80'
                                }`}
                              >
                                <div className="flex items-center gap-2 font-bold text-slate-900 text-xs sm:text-[13px]">
                                  <CheckCircle2
                                    className={`h-4 w-4 shrink-0 ${
                                      isAi
                                        ? 'text-campo-teal-dark'
                                        : 'text-campo-teal'
                                    }`}
                                  />
                                  <span>{cat.name}</span>
                                </div>
                                <p className="text-[10.5px] sm:text-[11px] text-slate-500 pl-6 mt-0.5 leading-relaxed">
                                  {cat.modules}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Card CTA with generous click target */}
                      <div className="pt-3.5 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => onRequestDemo?.(`${plan.name} Plan`)}
                          className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-3.5 px-5 text-sm font-bold transition-all shadow-xs cursor-pointer ${
                            plan.popular
                              ? 'bg-campo-navy text-white hover:bg-slate-800 hover:shadow-card'
                              : 'bg-slate-100 text-campo-navy hover:bg-slate-200 hover:text-slate-900'
                          }`}
                        >
                          <span>{plan.buttonText}</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* PEEKING CARD: Clean Minimized Backside View using complete height */
                    <div className="flex flex-col justify-between flex-1 mt-5 pt-4 border-t border-slate-100">
                      <div className="space-y-3 flex-1">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Included Operations ({plan.categories.length})
                        </p>
                        <div className="space-y-2.5">
                          {plan.categories.map((cat, cIdx) => (
                            <div key={cIdx} className="flex items-center gap-2 text-xs text-slate-600">
                              <CheckCircle2 className="h-3.5 w-3.5 text-campo-teal shrink-0" />
                              <span className="font-medium truncate">{cat.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm text-slate-400">
                        <span className="font-medium text-slate-500">
                          {plan.categories.length} Operations
                        </span>
                        <span className="font-bold text-campo-teal flex items-center gap-1.5 group-hover:underline">
                          <span>Click to view</span>
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Petal Dots Indicator */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {pricingPlans.map((plan, idx) => (
            <button
              key={plan.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to ${plan.name} plan`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx
                  ? 'w-8 bg-campo-teal'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        {/* ========================================================
            CONNECTING YOUR TOOLS COSTS NOTHING (Integration Callout)
            ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: revealEase }}
          className="mt-8 sm:mt-10 rounded-2xl border border-teal-200/80 bg-gradient-to-r from-teal-50/90 via-emerald-50/70 to-teal-50/90 p-5 sm:p-7 shadow-xs"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-campo-teal text-campo-deep shadow-xs">
                <Plug className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-display text-base font-bold text-campo-navy">
                  {integrationHighlights.title}
                </h4>
                <p className="mt-0.5 text-xs sm:text-sm text-slate-700 leading-relaxed max-w-3xl">
                  {integrationHighlights.description}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {integrationHighlights.tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 border border-teal-200/60 shadow-xs"
                >
                  <CheckCircle2 className="h-3 w-3 text-campo-teal" />
                  <span>{tool}</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ========================================================
            PICK. PLUG. PLAY. SECTION
            ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: revealEase }}
          className="mt-12 sm:mt-14 overflow-hidden rounded-3xl bg-campo-navy p-6 sm:p-8 lg:p-10 text-white shadow-workspace border border-campo-secondary"
        >
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <h3 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
              Pick. Plug. Play.
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300">
              Zero complicated migration. Modular flexibility tailored to your campus evolution.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 sm:grid-cols-3">
            {pickPlugPlaySteps.map((step, idx) => {
              const iconMap = [Sliders, Plug, Play];
              const StepIcon = iconMap[idx] || Sliders;

              return (
                <div
                  key={step.tag}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 backdrop-blur-xs transition-colors hover:bg-white/10"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-display text-lg font-bold text-campo-teal">
                      {step.title}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-campo-teal">
                      <StepIcon className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <span>Need a custom plan for multi-campus university trust?</span>
            <button
              type="button"
              onClick={() => onRequestDemo?.('Custom Multi-Campus Quote')}
              className="inline-flex items-center gap-1.5 font-bold text-campo-teal hover:underline"
            >
              <span>Request Custom Institutional Quote</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
