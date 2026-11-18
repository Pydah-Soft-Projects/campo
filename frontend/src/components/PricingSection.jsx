import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Plug,
  Sliders,
  Play,
  Layers,
  HelpCircle,
} from 'lucide-react';
import {
  pricingPlans,
  integrationHighlights,
  pickPlugPlaySteps,
} from '../data/campoData';
import { SectionHeading, revealEase } from './MotionPrimitives';

export function PricingSection({ onRequestDemo }) {
  return (
    <section id="pricing" className="section-padding relative overflow-hidden bg-slate-50/80">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#0e2a47_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      <div className="container-campo relative z-10">
        <SectionHeading
          index="07"
          label="Institutional Pricing"
          title="Simple pricing, per student per year."
          description="Predictable annual plans designed for institutions of every scale. Full transparency, zero hidden charges, and completely risk-free trial."
          align="center"
        />

        {/* ========================================================
            90-DAY RISK-FREE TRIAL BANNER (From Brochure)
            ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: revealEase }}
          className="mt-10 sm:mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-campo-navy via-slate-900 to-campo-deep p-6 sm:p-8 lg:p-10 text-white border border-white/10 shadow-workspace"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
              {/* Badge 90 DAYS */}
              <div className="flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 flex-col items-center justify-center rounded-2xl bg-campo-teal text-campo-deep shadow-elevated">
                <span className="font-display text-3xl sm:text-4xl font-black leading-none">
                  90
                </span>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest mt-0.5">
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
            3 TIER PRICING CARDS
            ======================================================== */}
        <div className="mt-10 sm:mt-12 grid gap-6 lg:grid-cols-3 items-stretch">
          {pricingPlans.map((plan, index) => {
            const isPopular = plan.popular;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: revealEase }}
                className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 transition-all duration-300 ${
                  isPopular
                    ? 'border-2 border-campo-teal bg-white shadow-workspace lg:-translate-y-2'
                    : 'border border-slate-200/90 bg-white shadow-card hover:border-slate-300 hover:shadow-elevated'
                }`}
              >
                {/* Popular Pill */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-campo-navy px-4 py-1 text-xs font-bold text-campo-teal shadow-md border border-campo-teal/40">
                      <Sparkles className="h-3 w-3" />
                      <span>{plan.badge}</span>
                    </span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Summary */}
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl font-black text-campo-navy">
                      {plan.name}
                    </h3>
                  </div>

                  <p className="mt-2 text-xs sm:text-sm text-slate-500 min-h-[38px] leading-relaxed">
                    {plan.summary}
                  </p>

                  {/* Pricing Rate */}
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-baseline gap-1.5">
                    <span className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-campo-navy">
                      ₹{plan.price}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {plan.billingPeriod}
                    </span>
                  </div>

                  {/* Modules Group Breakdown */}
                  <div className="mt-6 space-y-4 pt-6 border-t border-slate-100">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Included Workflows &amp; Operations
                    </p>

                    <div className="space-y-3.5">
                      {plan.categories.map((cat, cIdx) => (
                        <div
                          key={cIdx}
                          className={`rounded-xl p-3 border text-xs ${
                            cat.isAi
                              ? 'bg-campo-teal/10 border-campo-teal/40 text-campo-navy font-medium'
                              : 'bg-slate-50 border-slate-200/80 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                            <CheckCircle2
                              className={`h-4 w-4 shrink-0 ${
                                cat.isAi ? 'text-campo-teal-dark' : 'text-campo-teal'
                              }`}
                            />
                            <span>{cat.name}</span>
                          </div>
                          <p className="text-[11px] text-slate-600 pl-5.5 leading-relaxed">
                            {cat.modules}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onRequestDemo?.(`${plan.name} Plan`)}
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs sm:text-sm font-bold transition-all shadow-xs ${
                      isPopular
                        ? 'bg-campo-navy text-white hover:bg-slate-800 hover:shadow-card'
                        : 'bg-slate-100 text-campo-navy hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    <span>{plan.buttonText}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
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
