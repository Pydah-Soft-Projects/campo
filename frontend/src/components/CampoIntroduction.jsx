import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
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

export function CampoIntroduction() {
  const containerRef = useRef(null);
  const [selectedPillarId, setSelectedPillarId] = useState(ecosystemPillars[0].id);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll progression through this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Automatically advance to the next tab as user scrolls down (on desktop where container is pinned)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    setScrollProgress(latest);
    const numTabs = ecosystemPillars.length;
    // Clamp to 0..0.999 so 1.0 doesn't exceed array bounds
    const clamped = Math.max(0, Math.min(0.999, latest));
    const nextIndex = Math.min(numTabs - 1, Math.floor(clamped * numTabs));
    const nextPillar = ecosystemPillars[nextIndex];
    if (nextPillar && nextPillar.id !== selectedPillarId) {
      setSelectedPillarId(nextPillar.id);
    }
  });

  // Clicking a tab scrolls smoothly to its segment on desktop, or immediately switches on mobile
  const handlePillarClick = (index, pillarId) => {
    setSelectedPillarId(pillarId);
    if (typeof window !== 'undefined' && window.innerWidth >= 1024 && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const containerTop = scrollTop + rect.top;
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      const targetProgress = (index + 0.15) / ecosystemPillars.length;
      const targetY = containerTop + targetProgress * totalScrollable;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  const selectedPillar =
    ecosystemPillars.find((p) => p.id === selectedPillarId) ||
    ecosystemPillars[0];

  const currentImage = pillarImages[selectedPillar.id] || admissionsImg;

  return (
    <section
      id="platform"
      ref={containerRef}
      className="relative w-full bg-white border-y border-slate-200/80 py-10 sm:py-14 lg:h-[360vh] lg:py-0"
    >
      {/* Viewport Frame: Natural document flow on mobile/tablet, Sticky pinned on Desktop */}
      <div className="relative w-full lg:sticky lg:top-0 lg:min-h-screen flex flex-col justify-center lg:py-10 lg:overflow-hidden">
        <div className="container-campo relative z-10 w-full my-auto">
          <SectionHeading
            index="02"
            label="Platform Architecture"
            title="Meet Campo. The Connected Intelligence Behind Your Institution."
            description="Campo replaces disconnected campus tools with one coordinated institutional backbone—where applications, records, and role-based permissions work together seamlessly."
            align="center"
          />

          {/* Interactive Architecture Studio with Image Integration */}
          <div className="mt-6 sm:mt-8 lg:mt-10 w-full">
            <div className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-campo-surface p-3 sm:p-5 lg:p-8 shadow-workspace">
              <div className="w-full grid items-stretch gap-5 lg:grid-cols-12 lg:gap-8">
                {/* Left: 4 Institutional Pillars Selector with Scroll Progress */}
                <div className="w-full flex flex-col justify-between lg:col-span-5">
                  <div className="w-full">
                    <div className="mb-3 sm:mb-4">
                      <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                        Institutional Ecosystem Pillars
                      </p>
                    </div>

                    <div className="w-full grid grid-cols-2 gap-2 sm:gap-2.5 lg:flex lg:flex-col lg:space-y-3.5">
                      {ecosystemPillars.map((pillar, index) => {
                        const isSelected = pillar.id === selectedPillarId;
                        const [firstWord, ...restWords] = pillar.label.split(' ');
                        const secondWord = restWords.join(' ');

                        // Calculate progress of this tab segment [0..1]
                        const segmentStart = index / ecosystemPillars.length;
                        const segmentSize = 1 / ecosystemPillars.length;
                        const tabProgress = Math.max(
                          0,
                          Math.min(1, (scrollProgress - segmentStart) / segmentSize)
                        );

                        return (
                          <button
                            key={pillar.id}
                            type="button"
                            onClick={() => handlePillarClick(index, pillar.id)}
                            className={`group relative flex w-full flex-col justify-center overflow-hidden rounded-xl sm:rounded-2xl border px-3 py-2 sm:px-3.5 sm:py-2.5 lg:flex-row lg:items-center lg:justify-between lg:px-6 lg:py-5 text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-campo-teal min-h-[54px] sm:min-h-[60px] lg:h-[96px] ${
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

                            {/* Scroll-Linked Progress Line */}
                            {isSelected && (
                              <div
                                style={{ width: `${Math.round(tabProgress * 100)}%` }}
                                className="absolute bottom-0 inset-x-0 h-1 bg-campo-teal transition-all duration-75"
                              />
                            )}

                            {/* Mobile Layout: Compact 2 Lines with Inline Number */}
                            <div className="flex flex-col justify-center w-full lg:hidden">
                              <span
                                className={`font-display text-[11.5px] sm:text-xs font-bold leading-tight ${
                                  isSelected ? 'text-white' : 'text-campo-navy'
                                }`}
                              >
                                {firstWord}
                              </span>
                              <div className="flex items-baseline justify-between w-full mt-0.5">
                                <span
                                  className={`font-display text-[11.5px] sm:text-xs font-bold leading-tight ${
                                    isSelected ? 'text-white' : 'text-campo-navy'
                                  }`}
                                >
                                  {secondWord}
                                </span>
                                <span
                                  className={`font-display text-sm sm:text-base font-extrabold leading-none shrink-0 ml-1.5 transition-all duration-300 ${
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
                                className={`font-display text-base font-bold leading-snug ${
                                  isSelected ? 'text-white' : 'text-campo-navy'
                                }`}
                              >
                                {pillar.label}
                              </span>
                              <span
                                className={`font-display text-3xl font-extrabold leading-none transition-all duration-300 ${
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
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.35, ease: revealEase }}
                      className="flex w-full flex-col justify-between"
                    >
                      <div>
                        {/* Authentic Pillar Photo Showcase Banner */}
                        <div className="relative h-44 sm:h-56 lg:h-[290px] xl:h-[320px] w-full overflow-hidden rounded-2xl border border-slate-200/90 shadow-card mb-4 sm:mb-5">
                          <img
                            src={currentImage}
                            alt={selectedPillar.label}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                          />
                        </div>

                        {/* Pillar Title */}
                        <div className="mb-2.5 sm:mb-3">
                          <h4 className="font-display text-lg sm:text-xl lg:text-2xl font-bold text-campo-navy">
                            {selectedPillar.label}
                          </h4>
                        </div>

                        {selectedPillar.alertQuote && (
                          <div className="mb-2.5 inline-flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-1.5 text-[11px] font-semibold text-amber-900 border border-amber-200/80">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                            <span>{selectedPillar.alertQuote}</span>
                          </div>
                        )}

                        <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                          {selectedPillar.description}
                        </p>

                        {/* Synchronized Applications */}
                        <div className="mt-4 sm:mt-5">
                          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                            Connected Portals &amp; Workflows
                          </p>
                          <div className="mt-2.5 flex flex-wrap gap-2 sm:gap-2.5">
                            {selectedPillar.modules.map((mod) => (
                              <span
                                key={mod}
                                className="inline-flex items-center gap-1.5 sm:gap-2 rounded-xl border border-slate-200 bg-white px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-campo-navy shadow-xs hover:border-campo-teal/60 transition-colors"
                              >
                                <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-campo-teal-dark shrink-0" />
                                <span>{mod}</span>
                              </span>
                            ))}
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
      </div>
    </section>
  );
}
