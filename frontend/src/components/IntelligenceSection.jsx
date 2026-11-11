import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Lock, Sparkles } from 'lucide-react';
import campusArchitecture from '../assets/campus-architecture.jpg';
import { aiCapabilities, aiRoleDemos } from '../data/campoData';
import { Reveal, SectionHeading, revealEase } from './MotionPrimitives';

export function IntelligenceSection() {
  const [selectedRoleId, setSelectedRoleId] = useState(aiRoleDemos[0].id);
  const activeDemo =
    aiRoleDemos.find((demo) => demo.id === selectedRoleId) || aiRoleDemos[0];

  return (
    <section
      id="features"
      className="section-padding relative overflow-hidden bg-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <img
          src={campusArchitecture}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover object-center opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white" />
      </div>

      <div className="container-campo relative z-10">
        <SectionHeading
          index="04"
          label="Intelligent Institutional Operations"
          title="From Institutional Data to Intelligent Decisions."
          description="Query existing institutional data directly—strictly scoped to each user's role and permissions."
        />

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-12">
          {/* Left: Minimal Role-Scoped Assistant Preview */}
          <Reveal className="lg:col-span-6">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-campo-surface px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="h-4 w-4 text-campo-teal-dark" />
                  <h3 className="font-display text-sm font-bold text-campo-navy">
                    Campo Institutional Assistant
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-campo-teal-dark">
                  <Lock className="h-3 w-3" />
                  {activeDemo.scopeBadge}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <div
                  role="tablist"
                  aria-label="Preview AI response by role"
                  className="flex flex-wrap gap-2"
                >
                  {aiRoleDemos.map((demo) => {
                    const selected = demo.id === selectedRoleId;
                    return (
                      <button
                        key={demo.id}
                        role="tab"
                        aria-selected={selected}
                        type="button"
                        onClick={() => setSelectedRoleId(demo.id)}
                        className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                          selected
                            ? 'border-campo-navy bg-campo-navy text-white'
                            : 'border-slate-200 bg-campo-surface text-slate-600 hover:text-campo-navy'
                        }`}
                      >
                        {demo.role}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDemo.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2, ease: revealEase }}
                    className="mt-4 space-y-3"
                  >
                    <div className="rounded-xl border border-slate-200 bg-campo-surface/60 px-4 py-3">
                      <p className="text-xs font-semibold text-campo-navy sm:text-sm">
                        “{activeDemo.question}”
                      </p>
                    </div>

                    <div className="rounded-xl border border-teal-200/80 bg-teal-50/35 px-4 py-4">
                      <p className="text-sm leading-relaxed text-campo-ink">
                        {activeDemo.answer}
                      </p>
                      <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-campo-teal-dark">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Permission-scoped to {activeDemo.role}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>

          {/* Right: Compact 5-Row Capability List */}
          <div className="lg:col-span-6">
            <div className="divide-y divide-slate-200/80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
              {aiCapabilities.map((cap) => {
                const Icon = cap.icon;
                const isImplemented = cap.statusTone === 'implemented';

                return (
                  <div
                    key={cap.title}
                    className="flex items-start justify-between gap-4 px-5 py-4 transition-colors hover:bg-campo-light/50"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-campo-surface text-campo-navy">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-display text-sm font-bold text-campo-navy">
                          {cap.title}
                        </h3>
                        <p className="mt-0.5 text-xs text-slate-600 sm:text-sm">
                          {cap.description}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
