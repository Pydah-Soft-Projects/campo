import React from 'react';
import { motion } from 'framer-motion';
import { revealEase } from './MotionPrimitives';

const STATS = [
  {
    value: '500K+',
    label: 'messages delivered',
    highlight: true,
  },
  {
    value: '15K+',
    label: 'students & parents',
    highlight: false,
  },
  {
    value: '8%',
    label: 'more admissions',
    highlight: false,
  },
  {
    value: '12%',
    label: 'mileage saving',
    highlight: false,
  },
  {
    value: '15%',
    label: 'food saving in hostels',
    highlight: false,
  },
  {
    value: '50%',
    label: 'lower processing fee',
    highlight: false,
  },
];

export function CampusStatsSection() {
  return (
    <section className="relative overflow-hidden bg-[#071C46] py-16 sm:py-20 lg:py-24 text-white">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute right-0 top-1/4 h-[450px] w-[450px] rounded-full bg-campo-teal/10 blur-[130px]" />
        <div className="absolute -left-20 bottom-10 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[140px]" />
      </div>

      <div className="container-campo relative z-10 w-full">
        {/* Section Header from reference design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: revealEase }}
          className="max-w-3xl"
        >
          <p className="font-outfit text-xs sm:text-[13px] font-bold tracking-[0.2em] uppercase text-blue-200/90">
            PROVEN ON OUR OWN CAMPUS
          </p>
          <h2 className="mt-2.5 font-outfit text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12]">
            Real results, measured on campus.
          </h2>
        </motion.div>

        {/* 6 Stats Grid (3 Columns x 2 Rows) */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.5,
                delay: idx * 0.07,
                ease: revealEase,
              }}
              whileHover={{ y: -4, scale: 1.015 }}
              className={`rounded-2xl p-6 sm:p-7 transition-all duration-200 shadow-md ${
                stat.highlight
                  ? 'bg-campo-teal text-[#071C46] shadow-campo-teal/20'
                  : 'bg-[#0B2452]/70 border border-white/10 hover:border-white/25 hover:bg-[#0B2452]'
              }`}
            >
              <div
                className={`font-outfit text-4xl sm:text-5xl font-black tracking-tight ${
                  stat.highlight ? 'text-[#071C46]' : 'text-campo-teal'
                }`}
              >
                {stat.value}
              </div>
              <p
                className={`mt-2 font-outfit text-sm sm:text-base font-semibold leading-snug ${
                  stat.highlight ? 'text-[#071C46]/90' : 'text-slate-300'
                }`}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
