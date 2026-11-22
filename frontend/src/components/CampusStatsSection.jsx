import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { revealEase, AnimatedCounter } from './MotionPrimitives';

const STATS = [
  {
    target: 500,
    suffix: 'K+',
    label: 'Real-Time Alerts Delivered',
    highlight: true,
  },
  {
    target: 15,
    suffix: 'K+',
    label: 'Active Students & Parents',
    highlight: false,
  },
  {
    target: 8,
    suffix: '%',
    label: 'Higher Admission Conversion',
    highlight: false,
  },
  {
    target: 12,
    suffix: '%',
    label: 'Transport Mileage Saved',
    highlight: false,
  },
  {
    target: 15,
    suffix: '%',
    label: 'Hostel Food Waste Reduced',
    highlight: false,
  },
  {
    prefix: 'Up to',
    target: 50,
    suffix: '%',
    label: 'Lower Payment Gateway Fee',
    highlight: false,
  },
];

export function CampusStatsSection() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const glowY1 = useTransform(scrollYProgress, [0, 1], ['-40px', '40px']);
  const glowY2 = useTransform(scrollYProgress, [0, 1], ['40px', '-40px']);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#071C46] py-16 sm:py-20 lg:py-24 text-white"
    >
      {/* Ambient background glow with scroll-driven drift */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <motion.div
          style={prefersReducedMotion ? undefined : { y: glowY1 }}
          className="absolute right-0 top-1/4 h-[480px] w-[480px] rounded-full bg-campo-teal/15 blur-[140px]"
        />
        <motion.div
          style={prefersReducedMotion ? undefined : { y: glowY2 }}
          className="absolute -left-20 bottom-10 h-[440px] w-[440px] rounded-full bg-blue-600/15 blur-[150px]"
        />
        {/* Subtle grid pattern for institutional data depth */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      <div className="container-campo relative z-10 w-full">
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: revealEase }}
          className="max-w-3xl"
        >
          <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12]">
            Real results, measured on campus.
          </h2>
        </motion.div>

        {/* 6 Stats Grid (3 Columns x 2 Rows) with Animated Odometer Counters */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.08,
                ease: revealEase,
              }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`group relative overflow-hidden rounded-2xl p-6 sm:p-7 transition-all duration-300 shadow-md ${
                stat.highlight
                  ? 'bg-gradient-to-br from-campo-teal via-[#1cded0] to-campo-teal text-[#071C46] shadow-campo-teal/30 ring-1 ring-white/20'
                  : 'bg-[#0B2452]/80 backdrop-blur-sm border border-white/10 hover:border-campo-teal/40 hover:bg-[#0E2C64]'
              }`}
            >
              {/* Highlight card ambient sheen */}
              {stat.highlight && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-45 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"
                />
              )}

              {/* Number with Animated Counter */}
              {stat.prefix && (
                <span
                  className={`block text-xs sm:text-sm font-bold tracking-tight mb-0.5 ${
                    stat.highlight ? 'text-[#071C46]' : 'text-campo-teal'
                  }`}
                >
                  {stat.prefix}
                </span>
              )}
              <div
                className={`font-outfit text-4xl sm:text-5xl font-black tracking-tight ${
                  stat.highlight ? 'text-[#071C46]' : 'text-campo-teal'
                }`}
              >
                <AnimatedCounter
                  target={stat.target}
                  suffix={stat.suffix}
                  duration={1.4}
                  once={true}
                />
              </div>

              <p
                className={`mt-2 font-outfit text-base sm:text-lg font-bold leading-snug ${
                  stat.highlight ? 'text-[#071C46]' : 'text-white'
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
