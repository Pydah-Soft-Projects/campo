import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { SectionHeading, revealEase } from './MotionPrimitives';
import migrationImg from '../assets/data-records-migration.webp';
import facultySetupImg from '../assets/faculty-staff-setup.webp';
import goLiveImg from '../assets/campus-go-live.webp';

const simpleSteps = [
  {
    step: 'Step 01',
    actionWord: 'GET',
    image: migrationImg,
    title: 'Move Your Campus Records Easily',
    subtitle: 'Smooth Onboarding',
    description:
      'Our team helps you move your existing student details, courses, and fee records into Campo smoothly without losing any data.',
    points: [
      'Simple import of student & staff records',
      'Class and subject schedules mapped cleanly',
      'Dedicated support every step of the way',
    ],
  },
  {
    step: 'Step 02',
    actionWord: 'SET',
    image: facultySetupImg,
    title: 'Set Up Staff & Campus Facilities',
    subtitle: 'Easy Permissions',
    description:
      'Give teachers, accountants, and office staff the exact tools they need. Connect biometric attendance and online payments in minutes.',
    points: [
      'Simple, secure logins for teachers & staff',
      'Connect attendance machines & campus gates',
      'Easy online fee collection setup',
    ],
  },
  {
    step: 'Step 03',
    actionWord: 'GO',
    image: goLiveImg,
    title: 'Go Live on Campus & Mobile',
    subtitle: 'Campus Live',
    description:
      'Students and parents get the easy mobile app. Principals and management get clear, live reports on one simple dashboard.',
    points: [
      'Student companion app ready on day one',
      'Real-time attendance & instant fee receipts',
      'Clear, simple reports for management',
    ],
  },
];

export function HowItWorks() {
  return (
    <section className="section-padding relative overflow-hidden bg-slate-50/70 border-y border-slate-200/80">
      <div className="container-campo relative z-10">
        <SectionHeading
          index="05"
          label="How It Works"
          title="Getting Started with Campo is Simple and Smooth."
          description="We guide your campus from start to finish so your staff and students can start using Campo with complete confidence."
          align="center"
        />

        {/* 3 Equal-Sized Step Cards */}
        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3 pb-4 items-stretch">
          {simpleSteps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: Math.min(index * 0.15, 0.3),
                ease: revealEase,
              }}
              className="group flex flex-col items-center justify-between w-full"
            >
              {/* Upper Main Card - Uniform Size across all 3 cards */}
              <div className="w-full min-h-[490px] sm:min-h-[530px] md:h-[565px] flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-card transition-all duration-300 group-hover:-translate-y-1 group-hover:border-campo-teal/60 group-hover:shadow-elevated">
                <div>
                  {/* Clean Authentic Photograph (Identical Height) */}
                  <div className="relative h-44 sm:h-48 w-full overflow-hidden rounded-2xl border border-slate-200 shadow-2xs mb-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                  </div>

                  {/* Title with flexible height for small screen multi-line wrapping */}
                  <div className="min-h-[44px] sm:h-[54px] flex items-start">
                    <h3 className="font-display text-base sm:text-lg font-bold leading-snug text-campo-navy">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description with flexible height for mobile screens */}
                  <div className="mt-2 min-h-[56px] sm:h-[72px]">
                    <p className="text-xs sm:text-[13px] leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* GET / SET / GO In-Between Dark Typography (Identical Height) */}
                <div className="relative h-14 sm:h-16 flex items-center justify-center overflow-hidden">
                  <span className="pointer-events-none select-none font-display text-4xl sm:text-5xl font-black tracking-[0.25em] text-slate-800/85 uppercase transition-all duration-300 group-hover:scale-105 group-hover:text-campo-navy">
                    {item.actionWord}
                  </span>
                  <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-300/80 to-transparent pointer-events-none" />
                </div>

                {/* Bullet Points with exact height container */}
                <div className="min-h-[85px] sm:h-[112px] border-t border-slate-100/80 pt-3 flex flex-col justify-start">
                  <ul className="space-y-2.5">
                    {item.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="h-3.5 w-3.5 shrink-0 mt-0.5 text-campo-teal-dark" />
                        <span className="leading-tight">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Hanging Suspension System Below Card (Campo Brand Theme, Completely Clean) */}
              <div className="flex flex-col items-center w-full mt-auto">
                {/* Two Clean Vertical Hanging Cables */}
                <div className="flex w-36 justify-between px-6 pointer-events-none -mt-0.5">
                  <div className="h-6 w-[1.5px] bg-slate-300 transition-colors duration-300 group-hover:bg-campo-teal/60" />
                  <div className="h-6 w-[1.5px] bg-slate-300 transition-colors duration-300 group-hover:bg-campo-teal/60" />
                </div>

                {/* Hanging Text Signboard in Campo Theme (Identical Height) */}
                <motion.div
                  whileHover={{ rotate: [-1.2, 1.2, -0.6, 0.6, 0], transition: { duration: 0.8, ease: 'easeInOut' } }}
                  style={{ transformOrigin: 'top center' }}
                  className="relative w-full max-w-[270px] h-[64px] sm:h-[68px] flex flex-col justify-center items-center -mt-0.5 rounded-2xl border border-campo-secondary/80 bg-campo-navy px-4 py-2 text-center shadow-card transition-all duration-300 group-hover:border-campo-teal/70 group-hover:shadow-elevated"
                >
                  {/* Hanging Board Text Content in Campo Colors */}
                  <div>
                    <span className="font-mono text-[10px] font-extrabold uppercase tracking-[0.18em] text-campo-teal block">
                      {item.step}
                    </span>
                    <p className="mt-0.5 font-display text-xs sm:text-sm font-bold text-white tracking-tight">
                      {item.subtitle}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
