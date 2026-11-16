import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { ecosystemPillars } from '../data/campoData';
import { Reveal, SectionHeading, revealEase } from './MotionPrimitives';
import admissionsImg from '../assets/admissions-counseling.jpg';
import studentsLabImg from '../assets/students-classroom.jpg';
import boardroomImg from '../assets/executive-analytics-boardroom.jpg';
import fleetImg from '../assets/campus-fleet-transport.jpg';

const pillarImages = {
  'admissions-identity': admissionsImg,
  'academics-learning': studentsLabImg,
  'finance-hr': boardroomImg,
  'campus-services': fleetImg,
};

export function CampoIntroduction() {
  const [selectedPillarId, setSelectedPillarId] = useState(
    ecosystemPillars[0].id
  );
  const [isPaused, setIsPaused] = useState(false);

  // Automatically cycle through the 4 ecosystem pillars in sequence
  useEffect(() => {
    if (isPaused) return undefined;

    const timer = setInterval(() => {
      setSelectedPillarId((currentId) => {
        const currentIndex = ecosystemPillars.findIndex((p) => p.id === currentId);
        const nextIndex = (currentIndex + 1) % ecosystemPillars.length;
        return ecosystemPillars[nextIndex].id;
      });
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const selectedPillar =
    ecosystemPillars.find((p) => p.id === selectedPillarId) ||
    ecosystemPillars[0];

  const currentImage = pillarImages[selectedPillar.id] || admissionsImg;

  return (
    <section id="platform" className="section-padding relative overflow-hidden bg-white">
      <div className="container-campo relative z-10">
        <SectionHeading
          index="02"
          label="Platform Architecture"
          title="Meet Campo. The Connected Intelligence Behind Your Institution."
          description="Campo replaces disconnected campus tools with one coordinated institutional backbone—where applications, records, and role-based permissions work together seamlessly."
          align="center"
        />

        {/* Interactive Architecture Studio with Image Integration */}
        <Reveal className="mt-8 sm:mt-12">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-campo-surface p-5 sm:p-8 lg:p-10 shadow-workspace">
            <div className="grid items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
              {/* Left: 4 Institutional Pillars Selector with Generous Height & Auto Sequence */}
              <div className="flex flex-col justify-between lg:col-span-5">
                <div>
                  <div className="mb-4">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                      Institutional Ecosystem Pillars
                    </p>
                  </div>

                  <div
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className="space-y-3.5 sm:space-y-4"
                  >
                    {ecosystemPillars.map((pillar, index) => {
                      const isSelected = pillar.id === selectedPillarId;
                      return (
                        <button
                          key={pillar.id}
                          type="button"
                          onClick={() => {
                            setSelectedPillarId(pillar.id);
                            setIsPaused(true);
                          }}
                          className={`group relative flex w-full items-center justify-between overflow-hidden rounded-2xl border px-6 py-5 sm:py-6 text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-campo-teal min-h-[94px] sm:min-h-[104px] ${
                            isSelected
                              ? 'border-campo-navy bg-campo-navy text-white shadow-elevated'
                              : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          {isSelected && (
                            <span
                              aria-hidden="true"
                              className="absolute inset-y-2.5 left-0 w-1.5 rounded-r-full bg-campo-teal"
                            />
                          )}

                          {/* Smooth Auto-Advance Progress Line */}
                          {isSelected && !isPaused && (
                            <motion.div
                              key={`progress-${pillar.id}`}
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: 4.5, ease: 'linear' }}
                              style={{ transformOrigin: 'left' }}
                              className="absolute bottom-0 inset-x-0 h-0.5 bg-campo-teal/70"
                            />
                          )}

                          {/* Left Pillar Title */}
                          <div className="pr-14">
                            <p
                              className={`font-display text-base sm:text-lg font-bold leading-snug ${
                                isSelected ? 'text-white' : 'text-campo-navy'
                              }`}
                            >
                              {pillar.label}
                            </p>
                          </div>

                          {/* Right Side Bottom Number Rising from Bottom Animation */}
                          <div className="absolute right-5 bottom-3 overflow-hidden pointer-events-none">
                            <motion.span
                              animate={{
                                y: isSelected ? 0 : 20,
                                opacity: isSelected ? 1 : 0.25,
                                scale: isSelected ? 1 : 0.92,
                              }}
                              transition={{
                                type: 'spring',
                                stiffness: 350,
                                damping: 28,
                                mass: 0.8,
                              }}
                              className={`block font-display text-3xl sm:text-4xl font-extrabold leading-none ${
                                isSelected
                                  ? 'text-campo-teal'
                                  : 'text-slate-400/80 group-hover:text-slate-500'
                              }`}
                            >
                              0{index + 1}
                            </motion.span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right: Clean Connected Pillar Showcase with Height-Matched Photo Banner */}
              <div className="flex lg:col-span-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedPillar.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.38, ease: revealEase }}
                    className="flex w-full flex-col justify-between"
                  >
                    <div>
                      {/* Authentic Pillar Photo Showcase Banner (Substantially Increased Height) */}
                      <div className="relative h-72 sm:h-80 lg:h-[345px] w-full overflow-hidden rounded-2xl border border-slate-200/90 shadow-card mb-5">
                        <img
                          src={currentImage}
                          alt={selectedPillar.label}
                          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
                        <div className="absolute bottom-5 left-6 right-6 text-white">
                          <h4 className="font-display text-xl sm:text-2xl font-bold text-white">
                            {selectedPillar.label}
                          </h4>
                        </div>
                      </div>

                      <p className="text-sm leading-relaxed text-slate-600">
                        {selectedPillar.description}
                      </p>

                      {/* Synchronized Applications */}
                      <div className="mt-5">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Synchronized Applications
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2.5">
                          {selectedPillar.modules.map((mod) => (
                            <span
                              key={mod}
                              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-campo-navy shadow-xs"
                            >
                              <CheckCircle2 className="h-4 w-4 text-campo-teal-dark" />
                              {mod}
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
        </Reveal>
      </div>
    </section>
  );
}
