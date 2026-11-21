import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { ecosystemPillars } from '../data/campoData';
import { SectionHeading, revealEase } from './MotionPrimitives';
import admissionsImg from '../assets/admissions-counseling.webp';
import studentsLabImg from '../assets/students-classroom.webp';
import boardroomImg from '../assets/executive-analytics-boardroom.webp';
import fleetImg from '../assets/campus-fleet-transport.webp';
import studentMobileImg from '../assets/student-mobile-campus.webp';

const pillarImages = {
  'academics-operation': studentsLabImg,
  'administrative-operations': boardroomImg,
  'campus-operations': fleetImg,
  'student-management-engagement': studentMobileImg,
};

const moduleToSlugMap = {
  'Academics': '/applications/academic-management',
  'Examination': '/applications/examination-management',
  'Library': '/applications/library-management',
  'CRT & Placement Training': '/applications/student-data',
  'Admissions': '/applications/admissions-crm',
  'Fees': '/applications/fee-management',
  'Staff Recruitment': '/applications/staff-recruitment',
  'HRMS & Payroll': '/applications/hrms',
  'Hostels': '/applications/hostel-management',
  'Transport': '/applications/transport-management',
  'Stationary Store': '/applications/stationery-management',
  'Inventory': '/applications/inventory-store',
  'Maintenance': '/applications/maintenance-management',
  'Student Records': '/applications/student-data',
  'Student Clubs': '/applications/student-data',
  'Student & Parent Mobile App': '/download',
};

export function CampoIntroduction({ onNavigate }) {
  const [selectedPillarId, setSelectedPillarId] = useState(ecosystemPillars[0].id);

  const selectedPillar =
    ecosystemPillars.find((p) => p.id === selectedPillarId) ||
    ecosystemPillars[0];

  const currentImage = pillarImages[selectedPillar.id] || admissionsImg;

  return (
    <section
      id="platform"
      className="relative w-full bg-white border-y border-slate-200/80 py-16 sm:py-20 lg:py-24"
    >
      <div className="container-campo relative z-10 w-full">
        <SectionHeading
          index="02"
          label="Platform Architecture"
          title="Meet Campo. The Connected Intelligence Behind Your Institution."
          description="Campo replaces disconnected campus tools with one coordinated institutional backbone—where applications, records, and role-based permissions work together seamlessly."
          align="center"
        />

        {/* Interactive Architecture Studio with Image Integration */}
        <div className="mt-8 sm:mt-10 lg:mt-12 w-full">
          <div className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-campo-surface p-4 sm:p-6 lg:p-8 shadow-workspace">
            <div className="w-full grid items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
              {/* Left: 4 Institutional Pillars Selector */}
              <div className="w-full flex flex-col justify-between lg:col-span-5">
                <div className="w-full">
                  <div className="mb-3 sm:mb-4">
                    <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-slate-500 font-outfit">
                      Institutional Ecosystem Pillars
                    </p>
                  </div>

                  <div className="w-full grid grid-cols-2 gap-2 sm:gap-2.5 lg:flex lg:flex-col lg:space-y-3.5">
                    {ecosystemPillars.map((pillar, index) => {
                      const isSelected = pillar.id === selectedPillarId;
                      const [firstWord, ...restWords] = pillar.label.split(' ');
                      const secondWord = restWords.join(' ');

                      return (
                        <button
                          key={pillar.id}
                          type="button"
                          onClick={() => setSelectedPillarId(pillar.id)}
                          className={`group relative flex w-full flex-col justify-center overflow-hidden rounded-xl sm:rounded-2xl border px-3.5 py-2.5 sm:px-4 sm:py-3 lg:flex-row lg:items-center lg:justify-between lg:px-6 lg:py-5 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-campo-teal min-h-[58px] sm:min-h-[64px] lg:h-[96px] cursor-pointer ${
                            isSelected
                              ? 'border-campo-navy bg-campo-navy text-white shadow-elevated'
                              : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          {isSelected && (
                            <span
                              aria-hidden="true"
                              className="absolute inset-y-1.5 left-0 w-1 sm:w-1.5 rounded-r-full bg-campo-teal"
                            />
                          )}

                          {/* Mobile Layout: Compact 2 Lines with Inline Number */}
                          <div className="flex flex-col justify-center w-full lg:hidden">
                            <span
                              className={`font-outfit text-[11.5px] sm:text-xs font-bold leading-tight ${
                                isSelected ? 'text-white' : 'text-campo-navy'
                              }`}
                            >
                              {firstWord}
                            </span>
                            <div className="flex items-baseline justify-between w-full mt-0.5">
                              <span
                                className={`font-outfit text-[11.5px] sm:text-xs font-bold leading-tight ${
                                  isSelected ? 'text-white' : 'text-campo-navy'
                                }`}
                              >
                                {secondWord}
                              </span>
                              <span
                                className={`font-outfit text-sm sm:text-base font-extrabold leading-none shrink-0 ml-1.5 transition-all duration-200 ${
                                  isSelected
                                    ? 'text-campo-teal'
                                    : 'text-slate-400 group-hover:text-slate-600'
                                }`}
                              >
                                0{index + 1}
                              </span>
                            </div>
                          </div>

                          {/* Desktop Layout: Title on Left, Large Number on Right */}
                          <div className="hidden lg:flex lg:items-center lg:justify-between w-full">
                            <span
                              className={`font-outfit text-base font-bold leading-snug ${
                                isSelected ? 'text-white' : 'text-campo-navy'
                              }`}
                            >
                              {pillar.label}
                            </span>
                            <span
                              className={`font-outfit text-3xl font-extrabold leading-none transition-all duration-200 ${
                                isSelected
                                  ? 'text-campo-teal'
                                  : 'text-slate-400/90 group-hover:text-slate-600'
                              }`}
                            >
                              0{index + 1}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right: Clean Connected Pillar Showcase with Height-Matched Photo Banner */}
              <div className="w-full flex lg:col-span-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedPillar.id}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.28, ease: revealEase }}
                    className="flex w-full flex-col justify-between"
                  >
                    <div>
                      {/* Authentic Pillar Photo Showcase Banner */}
                      <div className="relative h-44 sm:h-56 lg:h-[280px] xl:h-[310px] w-full overflow-hidden rounded-2xl border border-slate-200/90 shadow-card mb-4 sm:mb-5">
                        <img
                          src={currentImage}
                          alt={selectedPillar.label}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                      </div>

                      {/* Pillar Title */}
                      <div className="mb-2 sm:mb-2.5">
                        <h4 className="font-outfit text-lg sm:text-xl lg:text-2xl font-bold text-campo-navy">
                          {selectedPillar.label}
                        </h4>
                      </div>

                      {selectedPillar.alertQuote && (
                        <div className="mb-2.5 inline-flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-1.5 text-[11px] font-semibold text-amber-900 border border-amber-200/80">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                          <span>{selectedPillar.alertQuote}</span>
                        </div>
                      )}

                      <p className="font-sans text-xs sm:text-sm leading-relaxed text-slate-600">
                        {selectedPillar.description}
                      </p>

                      {/* Synchronized Applications - Clickable to Navigate to Portal Page */}
                      <div className="mt-4 sm:mt-5">
                        <p className="font-outfit text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                          Connected Portals &amp; Workflows (Click to View)
                        </p>
                        <div className="mt-2.5 flex flex-wrap gap-2 sm:gap-2.5">
                          {selectedPillar.modules.map((mod) => {
                            const targetRoute =
                              moduleToSlugMap[mod] || '/applications/student-data';
                            return (
                              <button
                                key={mod}
                                type="button"
                                onClick={() => onNavigate?.(targetRoute)}
                                className="group inline-flex items-center gap-1.5 sm:gap-2 rounded-xl border border-slate-200 bg-white px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-campo-navy shadow-xs transition-all duration-200 hover:border-campo-teal hover:bg-slate-50 hover:shadow-sm cursor-pointer"
                              >
                                <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-campo-teal-dark shrink-0 group-hover:scale-110 transition-transform" />
                                <span>{mod}</span>
                                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-campo-teal-dark group-hover:translate-x-0.5 transition-all" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
