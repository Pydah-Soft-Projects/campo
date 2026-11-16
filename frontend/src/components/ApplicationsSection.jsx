import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Users,
  X,
  Link2,
} from 'lucide-react';
import { applications } from '../data/campoData';
import { SectionHeading, revealEase } from './MotionPrimitives';
import admissionsCardBg from '../assets/Module-Card-Bgs/Modern Admissions Campus Hero.webp';
import hrmsCardBg from '../assets/Module-Card-Bgs/Modern HR Payroll Workspace.webp';
import examCardBg from '../assets/Module-Card-Bgs/Exam Module Banner.webp';
import feeCardBg from '../assets/Module-Card-Bgs/Fee Management Banner.webp';
import libraryCardBg from '../assets/Module-Card-Bgs/Modern Library Study Banner.webp';
import stationeryCardBg from '../assets/Module-Card-Bgs/Stationary module Banner.webp';
import transportCardBg from '../assets/Module-Card-Bgs/Transport Module Banner.webp';
import hostelCardBg from '../assets/Module-Card-Bgs/Modern Hostel Management Campus.webp';
import academicCardBg from '../assets/Module-Card-Bgs/Academic Portal Banner.webp';
import studentDataCardBg from '../assets/Module-Card-Bgs/Student Data Management Banner.webp';
import staffRecruitmentCardBg from '../assets/Module-Card-Bgs/Staff Recruitement Module Banner.webp';
import maintenanceCardBg from '../assets/Module-Card-Bgs/Maintenance Module.webp';

// Complete Module card images map
const moduleImages = {
  'admissions-crm': admissionsCardBg,
  'hrms': hrmsCardBg,
  'examination-management': examCardBg,
  'fee-management': feeCardBg,
  'library-management': libraryCardBg,
  'stationery-management': stationeryCardBg,
  'transport-management': transportCardBg,
  'hostel-management': hostelCardBg,
  'academic-management': academicCardBg,
  'student-data': studentDataCardBg,
  'staff-recruitment': staffRecruitmentCardBg,
  'maintenance-management': maintenanceCardBg,
};

const modulePillConfig = {
  'admissions-crm': {
    pill: 'bg-emerald-50/95 text-emerald-800 border-emerald-200/80',
    circle: 'bg-emerald-600 text-white',
    label: 'Student & Academics',
    cardBg: 'bg-[#FAFBFD]',
    border: 'border-emerald-100',
    hoverBorder: 'hover:border-emerald-300',
    actionText: 'text-emerald-700 group-hover:text-emerald-800',
    aura: 'bg-emerald-400/20',
  },
  'hrms': {
    pill: 'bg-blue-50/95 text-blue-800 border-blue-200/80',
    circle: 'bg-blue-600 text-white',
    label: 'Administration & Finance',
    cardBg: 'bg-[#EFF5FC]',
    border: 'border-blue-100',
    hoverBorder: 'hover:border-blue-300',
    actionText: 'text-blue-700 group-hover:text-blue-800',
    aura: 'bg-blue-400/20',
  },
  'examination-management': {
    pill: 'bg-emerald-50/95 text-emerald-800 border-emerald-200/80',
    circle: 'bg-emerald-600 text-white',
    label: 'Student & Academics',
    cardBg: 'bg-[#F1F8F3]',
    border: 'border-emerald-100',
    hoverBorder: 'hover:border-emerald-300',
    actionText: 'text-emerald-700 group-hover:text-emerald-800',
    aura: 'bg-emerald-400/20',
  },
  'fee-management': {
    pill: 'bg-teal-50/95 text-teal-800 border-teal-200/80',
    circle: 'bg-teal-600 text-white',
    label: 'Administration & Finance',
    cardBg: 'bg-[#F0F9F7]',
    border: 'border-teal-100',
    hoverBorder: 'hover:border-teal-300',
    actionText: 'text-teal-700 group-hover:text-teal-800',
    aura: 'bg-teal-400/20',
  },
  'library-management': {
    pill: 'bg-purple-50/95 text-purple-800 border-purple-200/80',
    circle: 'bg-purple-600 text-white',
    label: 'Library',
    cardBg: 'bg-[#F5F0FD]',
    border: 'border-purple-100',
    hoverBorder: 'hover:border-purple-300',
    actionText: 'text-purple-700 group-hover:text-purple-800',
    aura: 'bg-purple-400/20',
  },
  'student-data': {
    pill: 'bg-cyan-50/95 text-cyan-800 border-cyan-200/80',
    circle: 'bg-cyan-600 text-white',
    label: 'Student & Academics',
    cardBg: 'bg-[#F0FAFB]',
    border: 'border-cyan-100',
    hoverBorder: 'hover:border-cyan-300',
    actionText: 'text-cyan-700 group-hover:text-cyan-800',
    aura: 'bg-cyan-400/20',
  },
  'academic-management': {
    pill: 'bg-purple-50/95 text-purple-800 border-purple-200/80',
    circle: 'bg-purple-600 text-white',
    label: 'Student & Academics',
    cardBg: 'bg-[#F7F4FD]',
    border: 'border-purple-100',
    hoverBorder: 'hover:border-purple-300',
    actionText: 'text-purple-700 group-hover:text-purple-800',
    aura: 'bg-purple-400/20',
  },
  'transport-management': {
    pill: 'bg-sky-50/95 text-sky-800 border-sky-200/80',
    circle: 'bg-sky-500 text-white',
    label: 'Campus Operations',
    cardBg: 'bg-[#F0F6FD]',
    border: 'border-sky-100',
    hoverBorder: 'hover:border-sky-300',
    actionText: 'text-sky-700 group-hover:text-sky-800',
    aura: 'bg-sky-400/20',
  },
  'hostel-management': {
    pill: 'bg-rose-50/95 text-rose-800 border-rose-200/80',
    circle: 'bg-rose-500 text-white',
    label: 'Campus Operations',
    cardBg: 'bg-[#FAF0ED]',
    border: 'border-rose-100',
    hoverBorder: 'hover:border-rose-300',
    actionText: 'text-rose-700 group-hover:text-rose-800',
    aura: 'bg-rose-400/20',
  },
  'staff-recruitment': {
    pill: 'bg-orange-50/95 text-orange-800 border-orange-200/80',
    circle: 'bg-orange-500 text-white',
    label: 'Administration & Finance',
    cardBg: 'bg-[#FDF3EE]',
    border: 'border-orange-100',
    hoverBorder: 'hover:border-orange-300',
    actionText: 'text-orange-700 group-hover:text-orange-800',
    aura: 'bg-orange-400/20',
  },
  'maintenance-management': {
    pill: 'bg-teal-50/95 text-teal-800 border-teal-200/80',
    circle: 'bg-teal-600 text-white',
    label: 'Campus Operations',
    cardBg: 'bg-[#F2FAF9]',
    border: 'border-teal-100',
    hoverBorder: 'hover:border-teal-300',
    actionText: 'text-teal-700 group-hover:text-teal-800',
    aura: 'bg-teal-400/20',
  },
  'stationery-management': {
    pill: 'bg-amber-50/95 text-amber-800 border-amber-200/80',
    circle: 'bg-amber-500 text-white',
    label: 'Campus Operations',
    cardBg: 'bg-[#FDF7F0]',
    border: 'border-amber-100',
    hoverBorder: 'hover:border-amber-300',
    actionText: 'text-amber-700 group-hover:text-amber-800',
    aura: 'bg-amber-400/20',
  },
};

function ModuleCard({ app, onInspect }) {
  const Icon = app.icon;
  const moduleImg = moduleImages[app.id];
  const config = modulePillConfig[app.id] || {
    pill: 'bg-emerald-50/90 text-emerald-800 border-emerald-200/80',
    circle: 'bg-emerald-600 text-white',
    label: app.category,
    cardBg: 'bg-white',
    border: 'border-slate-200/90',
    hoverBorder: 'hover:border-campo-teal/60',
    actionText: 'text-campo-teal-dark group-hover:text-campo-navy',
    aura: 'bg-emerald-400/20',
  };

  return (
    <article
      onClick={() => onInspect(app)}
      className={`group relative flex h-[205px] sm:h-[215px] w-[370px] sm:w-[410px] shrink-0 overflow-hidden rounded-3xl border ${config.border} ${config.cardBg} shadow-card transition-all duration-300 hover:-translate-y-1 ${config.hoverBorder} hover:shadow-elevated cursor-pointer select-none`}
    >
      {/* Background Graphic / Image Area */}
      {moduleImg ? (
        <>
          <img
            src={moduleImg}
            alt={app.name}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-right pointer-events-none"
          />
          {/* Subtle light gradient: light at top-left, gentle at bottom-left so artwork shows through */}
          <div className="absolute inset-y-0 left-0 w-[65%] sm:w-[68%] bg-gradient-to-br from-white/70 via-white/30 to-transparent pointer-events-none z-[1]" />
        </>
      ) : (
        <div className="absolute right-4 inset-y-0 w-[38%] flex items-center justify-center pointer-events-none">
          {/* Soft Aura Glow */}
          <div className={`absolute h-24 w-24 rounded-full ${config.aura} blur-xl`} />
          {/* Subtle placeholder icon tile ready for upcoming module images */}
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 shadow-xs backdrop-blur-xs transition-transform duration-300 group-hover:scale-105">
            {Icon && <Icon className="h-8 w-8 text-slate-400 group-hover:text-campo-teal-dark transition-colors" />}
          </div>
        </div>
      )}

      {/* Left Content Column */}
      <div className="relative z-10 flex h-full w-[68%] sm:w-[70%] flex-col justify-between p-4 sm:p-4.5">
        {/* Top: Module Title & Sub text directly under it */}
        <div>
          <div className="-ml-1 inline-block rounded-lg border border-white/70 bg-white/75 px-2 py-0.5 shadow-2xs backdrop-blur-md">
            <h4 className="font-display text-sm sm:text-[15px] font-bold leading-snug whitespace-nowrap text-campo-navy group-hover:text-campo-secondary transition-colors">
              {app.name}
            </h4>
          </div>

          {/* Sub text under header */}
          <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-slate-600 line-clamp-2">
            {app.description}
          </p>
        </div>

        {/* Bottom: Explore Module Link */}
        <div className={`inline-flex items-center gap-1.5 text-xs font-bold ${config.actionText} transition-colors`}>
          <span>Explore Module</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </article>
  );
}

export function ApplicationsSection({ onRequestDemo }) {
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    if (!selectedApp) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedApp(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedApp]);

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

  // Map of applications by ID for curated, distinct color distribution
  const appMap = new Map(applications.map((app) => [app.id, app]));

  // Curated color-alternating rows so no same-color cards appear side-by-side (including loop seams)
  const row1Ids = [
    'admissions-crm',        // Green (Admissions CRM)
    'academic-management',   // Purple (Academics)
    'hrms',                  // Blue (HRMS)
    'stationery-management', // Amber (Stationery)
    'fee-management',        // Teal (Fees & Payments)
    'hostel-management',     // Rose (Hostel)
  ];

  const row2Ids = [
    'student-data',           // Cyan (Student Records)
    'examination-management', // Sage Green (Examinations)
    'library-management',     // Purple (Library)
    'transport-management',   // Sky Blue (Campus Transport)
    'staff-recruitment',      // Coral Orange (Staff Recruitment)
    'maintenance-management', // Mint (Maintenance)
  ];

  const row1 = row1Ids.map((id) => appMap.get(id)).filter(Boolean);
  const row2 = row2Ids.map((id) => appMap.get(id)).filter(Boolean);

  // Duplicate arrays to create an infinite, seamless loop
  const row1Items = [...row1, ...row1];
  const row2Items = [...row2, ...row2];

  return (
    <section
      id="solutions"
      className="section-padding relative overflow-hidden bg-slate-50/70 border-y border-slate-200/80"
    >
      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-left {
          display: flex;
          width: max-content;
          animation: marqueeLeft 42s linear infinite;
        }
        .animate-marquee-right {
          display: flex;
          width: max-content;
          animation: marqueeRight 42s linear infinite;
        }
        .animate-marquee-left:hover,
        .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="container-campo relative z-10 mb-8 sm:mb-12">
        <SectionHeading
          index="03"
          label="Platform Modules"
          title="Unified Campus Modules Operating on One Core."
          description="Continuous bidirectional synchronization across every institutional domain. Hover to pause and inspect any module."
          align="center"
        />
      </div>

      {/* Two-Row Continuous Bidirectional Marquee */}
      <div className="relative w-full overflow-hidden space-y-4 sm:space-y-5 py-2">
        {/* Soft Gradient Fade Masks on Screen Edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-36 bg-gradient-to-r from-slate-50/95 via-slate-50/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-36 bg-gradient-to-l from-slate-50/95 via-slate-50/80 to-transparent z-10" />

        {/* Row 1: Right-to-Left Continuous Marquee */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-left flex gap-4 sm:gap-5">
            {row1Items.map((app, index) => (
              <ModuleCard
                key={`r1-${app.id}-${index}`}
                app={app}
                onInspect={setSelectedApp}
              />
            ))}
          </div>
        </div>

        {/* Row 2: Left-to-Right Continuous Marquee */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-right flex gap-4 sm:gap-5">
            {row2Items.map((app, index) => (
              <ModuleCard
                key={`r2-${app.id}-${index}`}
                app={app}
                onInspect={setSelectedApp}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Module Detail Modal */}
      <AnimatePresence>
        {selectedApp && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="module-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedApp(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.28, ease: revealEase }}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-workspace z-10"
            >
              {/* Modal Navy Header */}
              <div className="bg-campo-navy p-5 sm:p-6 text-white flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-campo-teal">
                    {selectedApp.category}
                  </span>
                  <h3 id="module-modal-title" className="font-display text-xl font-bold sm:text-2xl mt-0.5">
                    {selectedApp.name}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="rounded-full bg-white/10 p-1.5 text-slate-300 hover:bg-white/20 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-7 space-y-5 max-h-[75vh] overflow-y-auto">
                <div>
                  <p className="text-sm leading-relaxed text-slate-700">
                    {selectedApp.description}
                  </p>
                </div>

                {/* Target Roles */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Primary Operational Stakeholders
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedApp.roles?.map((role) => (
                      <span
                        key={role}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-campo-navy"
                      >
                        <Users className="h-3 w-3 text-campo-teal-dark" />
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Connected Workflows */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Key Integrated Workflows
                  </span>
                  <div className="space-y-2">
                    {selectedApp.workflows?.map((wf) => (
                      <div key={wf} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-campo-teal-dark mt-0.5" />
                        <span>{wf}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ecosystem Connections */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Link2 className="h-4 w-4 text-campo-teal-dark" />
                    <span>Synchronized with: <strong>{selectedApp.connectsTo?.join(', ')}</strong></span>
                  </div>
                </div>

                {/* Modal CTA */}
                <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedApp(null)}
                    className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleRequestModuleDemo}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-campo-navy px-5 py-2 text-xs font-semibold text-white shadow-card hover:bg-campo-secondary"
                  >
                    <span>Request Demo for {selectedApp.name}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-campo-teal" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
