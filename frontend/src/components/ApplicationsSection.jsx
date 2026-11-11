import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  CheckCircle2,
  Link2,
  Users,
  X,
} from 'lucide-react';
import { applications, applicationCategories } from '../data/campoData';
import { SectionHeading, revealEase } from './MotionPrimitives';

export function ApplicationsSection({ onRequestDemo }) {
  const [activeCategory, setActiveCategory] = useState('All Modules');
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    if (!selectedApp) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedApp(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedApp]);

  const filteredApps =
    activeCategory === 'All Modules'
      ? applications
      : applications.filter((app) => app.category === activeCategory);

  const handleRequestModuleDemo = () => {
    setSelectedApp(null);
    if (onRequestDemo) {
      onRequestDemo();
      return;
    }
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="solutions"
      className="section-padding border-y border-slate-200/80 bg-campo-surface"
    >
      <div className="container-campo">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            index="03"
            label="Applications & Solutions"
            title="Twelve Purpose-Built Applications. One Connected Ecosystem."
            description="Every department operates with specialized tools tailored to its workflows—while sharing one unified directory, identity layer, and institutional data model."
          />

          {/* Clean Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter Campo applications by domain"
            className="flex flex-wrap gap-1.5 rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm lg:shrink-0"
          >
            {applicationCategories.map((category) => {
              const isSelected = activeCategory === category;
              const count =
                category === 'All Modules'
                  ? applications.length
                  : applications.filter((a) => a.category === category).length;

              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                    isSelected
                      ? 'bg-campo-navy text-white'
                      : 'text-slate-600 hover:bg-campo-surface hover:text-campo-navy'
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`text-[11px] ${
                      isSelected ? 'text-campo-teal' : 'text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean 4-Column Architectural Module Grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredApps.map((app, index) => {
            const Icon = app.icon;
            return (
              <motion.article
                key={app.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.36,
                  delay: (index % 8) * 0.03,
                  ease: revealEase,
                }}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-elevated"
              >
                <div>
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-campo-surface text-campo-navy transition-colors duration-200 group-hover:border-campo-teal/50 group-hover:bg-teal-50/60 group-hover:text-campo-teal-dark">
                      <Icon className="h-[18px] w-[18px]" />
                    </div>
                    <span className="text-right text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      {app.category}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-base font-bold text-campo-navy">
                    {app.name}
                  </h3>

                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                    {app.description}
                  </p>
                </div>

                {/* Minimal Action Footer */}
                <div className="mt-4 flex justify-end border-t border-slate-100 pt-3">
                  <button
                    type="button"
                    onClick={() => setSelectedApp(app)}
                    className="inline-flex items-center gap-1 rounded text-xs font-semibold text-campo-navy transition-colors hover:text-campo-teal-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-campo-teal"
                  >
                    Explore module
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Light-Mode Application Detail Inspector Modal */}
      <AnimatePresence>
        {selectedApp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedApp(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="app-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-campo-navy/25 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.2, ease: revealEase }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-workspace"
            >
              <div className="flex items-start justify-between gap-4 border-b border-slate-200 bg-campo-surface px-6 py-5 sm:px-8">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-campo-navy">
                    {React.createElement(selectedApp.icon, {
                      className: 'h-5 w-5',
                    })}
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-campo-teal-dark">
                      {selectedApp.category}
                    </span>
                    <h3
                      id="app-modal-title"
                      className="font-display text-xl font-bold text-campo-navy"
                    >
                      {selectedApp.name}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  aria-label="Close application details"
                  className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white hover:text-campo-navy"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                  {selectedApp.description}
                </p>

                <div className="mt-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Key Institutional Workflows
                  </h4>
                  <ul className="mt-3 space-y-2.5">
                    {selectedApp.workflows?.map((workflow) => (
                      <li
                        key={workflow}
                        className="flex items-start gap-2.5 text-sm text-campo-ink"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-campo-teal-dark" />
                        <span>{workflow}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-campo-surface/70 p-4">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-campo-navy">
                      <Users className="h-3.5 w-3.5 text-campo-teal-dark" />
                      <span>Primary Roles</span>
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {selectedApp.roles?.map((role) => (
                        <span
                          key={role}
                          className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-campo-ink"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-campo-surface/70 p-4">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-campo-navy">
                      <Link2 className="h-3.5 w-3.5 text-campo-teal-dark" />
                      <span>Direct Ecosystem Links</span>
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {selectedApp.connectsTo.map((peer) => (
                        <span
                          key={peer}
                          className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-campo-navy"
                        >
                          {peer}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedApp(null)}
                    className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-campo-navy"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleRequestModuleDemo}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-campo-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-campo-secondary"
                  >
                    Request Demo for {selectedApp.name}
                    <ArrowUpRight className="h-4 w-4 text-campo-teal" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
