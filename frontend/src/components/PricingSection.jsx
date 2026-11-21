import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import campusHeroImg from '../assets/campus-hero.webp';
import { revealEase } from './MotionPrimitives';

// --- Integration SVG Badges matching reference design ---
function BiometricIcon() {
  return (
    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center p-2 text-slate-700 shadow-2xs group-hover:border-campo-teal transition-colors">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-full h-full">
        {/* Frame Brackets */}
        <path d="M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M4 16v3a1 1 0 001 1h3M16 20h3a1 1 0 001-1v-3" />
        {/* Fingerprint ridges */}
        <path d="M12 7c-2.8 0-4 1.8-4 4.2v2.6c0 2 1.3 3.2 4 3.2s4-1.2 4-3.2v-2.6c0-2.4-1.2-4.2-4-4.2z" />
        <path d="M12 10v4" />
      </svg>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#25D366]/10 flex items-center justify-center p-2 shadow-2xs group-hover:scale-105 transition-transform">
      <svg viewBox="0 0 24 24" fill="#25D366" className="w-full h-full">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.97.58 3.84 1.68 5.43L2 22l4.82-1.74c1.53.94 3.3 1.48 5.22 1.48h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 18.15c-1.68 0-3.32-.45-4.75-1.3l-.34-.2-2.85 1.03.95-2.78-.22-.35a8.13 8.13 0 01-1.25-4.64c0-4.5 3.66-8.16 8.16-8.16 2.18 0 4.23.85 5.77 2.39a8.1 8.1 0 012.4 5.78c0 4.5-3.66 8.16-8.16 8.16zm4.47-6.1c-.25-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.12-.16.25-.63.8-.78.96-.14.16-.28.18-.52.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.28.37-.42.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.41-.41-.56-.42h-.48c-.16 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.16 1.73 2.64 4.19 3.7.59.25 1.04.4 1.4.52.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.46-.28z"/>
      </svg>
    </div>
  );
}

function BulkSmsIcon() {
  return (
    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center p-2 text-indigo-600 shadow-2xs group-hover:border-indigo-300 transition-colors">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-full h-full">
        <rect x="3" y="4" width="18" height="14" rx="3" fill="#EEF2FF" />
        <path d="M8 9h8M8 13h5" stroke="#4F46E5" />
        <path d="M8 18l-3 3v-3" stroke="#4F46E5" />
        <text x="12" y="12" fill="#4F46E5" fontSize="4.5" fontWeight="bold" textAnchor="middle">SMS</text>
      </svg>
    </div>
  );
}

function QrCodeIcon() {
  return (
    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center p-2 text-slate-800 shadow-2xs group-hover:border-campo-teal transition-colors">
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M3 3h7v7H3V3zm2 2v3h3V5H5zm8-2h7v7h-7V3zm2 2v3h3V5h-3zM3 13h7v7H3v-7zm2 2v3h3v-3H5zm8 0h3v3h-3v-3zm4 0h3v3h-3v-3zm0 4h3v3h-3v-3zm-4 0h3v3h-3v-3z" />
      </svg>
    </div>
  );
}

function BarcodeIcon() {
  return (
    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center p-2 text-slate-800 shadow-2xs group-hover:border-campo-teal transition-colors">
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <rect x="2" y="5" width="2" height="14" />
        <rect x="5" y="5" width="1" height="14" />
        <rect x="7" y="5" width="3" height="14" />
        <rect x="11" y="5" width="1" height="14" />
        <rect x="13" y="5" width="2.5" height="14" />
        <rect x="17" y="5" width="1" height="14" />
        <rect x="19" y="5" width="3" height="14" />
      </svg>
    </div>
  );
}

function GoogleWorkspaceIcon() {
  return (
    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center p-2 shadow-2xs group-hover:scale-105 transition-transform">
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.25 21.36 7.34 24 12 24z"/>
        <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"/>
        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.25 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
      </svg>
    </div>
  );
}

function PaymentGatewayIcon() {
  return (
    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center p-2 text-teal-600 shadow-2xs group-hover:border-campo-teal transition-colors">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-full h-full">
        {/* Credit Card */}
        <rect x="2" y="5" width="20" height="14" rx="3" fill="#F0FDFA" stroke="#0D9488" />
        <line x1="2" y1="10" x2="22" y2="10" stroke="#0D9488" strokeWidth="2" />
        <rect x="5" y="14" width="4" height="2" rx="0.5" fill="#0D9488" />
        {/* Verification Check Badge */}
        <circle cx="18" cy="14" r="3" fill="#00c5b5" />
        <path d="M16.8 14l.8.8 1.6-1.6" stroke="#071C46" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function PricingSection({ onRequestDemo }) {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bannerScale = useTransform(scrollYProgress, [0, 0.4], [0.97, 1]);
  const bannerImgY = useTransform(scrollYProgress, [0, 0.6], ['-4%', '4%']);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="section-padding relative overflow-hidden bg-white border-y border-slate-200/80"
    >
      <div className="container-campo relative z-10 max-w-6xl mx-auto">
        {/* Section Heading - Single Line with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: revealEase }}
          className="text-center w-full mx-auto mb-6 sm:mb-10 lg:mb-12 px-2"
        >
          <div className="mb-2 sm:mb-3 inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-campo-teal-dark">
            <span>Clear Investment</span>
          </div>
          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-[46px] xl:text-5xl font-black text-campo-navy tracking-tight leading-tight">
            Simple pricing per student per year
          </h2>
        </motion.div>

        {/* 90-Day Free Trial Banner with Scroll Scale & Parallax */}
        <motion.div
          style={prefersReducedMotion ? undefined : { scale: bannerScale }}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: revealEase }}
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-campo-navy p-5 sm:p-8 lg:p-9 text-white border border-white/10 shadow-workspace mb-8 sm:mb-12 lg:mb-14"
        >
          {/* Background Image Vignette with Scroll Parallax */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.img
              src={campusHeroImg}
              alt="Modern university campus architecture"
              loading="lazy"
              decoding="async"
              style={prefersReducedMotion ? undefined : { y: bannerImgY }}
              className="h-[110%] w-full object-cover opacity-35 will-change-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-campo-deep/95 via-campo-navy/90 to-campo-navy/70" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-7 lg:gap-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 lg:gap-7 text-center sm:text-left">
              {/* Circular Badge: 90 DAYS with Rotating Halo */}
              <div className="relative flex h-16 w-16 sm:h-22 sm:w-22 shrink-0 flex-col items-center justify-center rounded-full bg-campo-teal text-campo-deep shadow-lg">
                {/* Rotating Dashed Accent Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-1 sm:-inset-1.5 rounded-full border-2 border-dashed border-campo-teal/60 pointer-events-none"
                />
                <span className="font-display text-2xl sm:text-4xl font-black leading-none">
                  90
                </span>
                <span className="text-[9px] sm:text-xs font-black uppercase tracking-widest mt-0.5">
                  DAYS
                </span>
              </div>

              <div>
                <h3 className="font-display text-xl sm:text-3xl lg:text-[32px] font-black text-white tracking-tight leading-tight">
                  Try Campo, <span className="text-campo-teal">completely free</span>
                </h3>
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-base text-slate-200 max-w-2xl leading-relaxed">
                  Full access to every area. If it isn’t making your campus easier to run, walk away with your data
                </p>
              </div>
            </div>

            <div className="w-full sm:w-auto shrink-0 mt-2 sm:mt-0">
              <motion.button
                type="button"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onRequestDemo?.('90-Day Free Trial')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-campo-teal px-5 py-3 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-black text-campo-deep shadow-md transition-all hover:bg-[#19d6c6] hover:shadow-lg cursor-pointer font-outfit"
              >
                <span>Start 90-Day Free Trial</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* 3 Pricing Cards Grid with Staggered Scroll Entrance & Elevated Middle Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 items-stretch mb-10 sm:mb-14 lg:mb-18">
          {/* CARD 1: Core */}
          <motion.div
            initial={{ opacity: 0, y: 30, x: -15 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: revealEase }}
            whileHover={{ y: -6 }}
            className="flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition-all bg-white min-h-0 md:min-h-[640px] lg:min-h-[700px]"
          >
            {/* Header Block: Light Grey */}
            <div className="bg-[#F0F4F8] py-6 sm:py-8 lg:py-10 px-5 sm:px-6 lg:px-8 text-center border-b border-slate-200/60">
              <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-black text-campo-navy">
                Core
              </h3>
              <div className="mt-2 flex items-baseline justify-center gap-1">
                <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-campo-navy tracking-tight">
                  ₹200
                </span>
              </div>
              <p className="text-[11px] sm:text-sm text-slate-500 font-semibold mt-1">
                per student, per year
              </p>
              <p className="text-xs sm:text-[14px] lg:text-[15px] text-slate-600 font-medium mt-2.5 sm:mt-3 leading-relaxed max-w-[260px] mx-auto">
                Students, Classes, admissions and staff in one place
              </p>
            </div>

            {/* Checklist Body: White */}
            <div className="p-5 sm:p-7 lg:p-9 flex-1 flex flex-col justify-between space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-6 lg:space-y-7">
                {/* Academic Operations */}
                <div>
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-campo-teal shrink-0 stroke-[2.5]" />
                    <span className="font-display text-sm sm:text-[15px] lg:text-base font-bold text-campo-navy">
                      Academic Operations
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-500 pl-6 sm:pl-7 mt-1 sm:mt-1.5 leading-relaxed">
                    Academics, Examinations, Library
                  </p>
                </div>

                {/* Administrative Operations */}
                <div>
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-campo-teal shrink-0 stroke-[2.5]" />
                    <span className="font-display text-sm sm:text-[15px] lg:text-base font-bold text-campo-navy">
                      Administrative Operations
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-500 pl-6 sm:pl-7 mt-1 sm:mt-1.5 leading-relaxed">
                    Admissions, Fees, Lab Management, HRMS and Payroll
                  </p>
                </div>

                {/* Student Management and Engagement */}
                <div>
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-campo-teal shrink-0 stroke-[2.5]" />
                    <span className="font-display text-sm sm:text-[15px] lg:text-base font-bold text-campo-navy">
                      Student Management and Engagement
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-500 pl-6 sm:pl-7 mt-1 sm:mt-1.5 leading-relaxed">
                    Student Management, Student Clubs, Communications, Student and Parent App
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onRequestDemo?.('Core Plan')}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-campo-navy py-3 sm:py-3.5 lg:py-4 px-4 sm:px-5 text-xs sm:text-sm lg:text-base font-bold text-white transition-all hover:bg-slate-800 shadow-xs cursor-pointer mt-4 sm:mt-6 font-outfit"
              >
                <span>Request Demo</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>

          {/* CARD 2: Campus (Flagship Hero Card) */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.1, ease: revealEase }}
            whileHover={{ y: -8 }}
            className="flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-campo-teal shadow-[0_16px_40px_-8px_rgba(0,197,181,0.28)] lg:shadow-[0_20px_50px_-10px_rgba(0,197,181,0.35)] md:-translate-y-2 transition-all bg-white relative min-h-0 md:min-h-[640px] lg:min-h-[700px] ring-2 ring-campo-teal/30"
          >
            {/* Top Recommended Tag */}
            <div className="bg-gradient-to-r from-campo-teal to-[#14c7b8] py-1 sm:py-1.5 text-center">
              <span className="font-outfit text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-[#071C46] flex items-center justify-center gap-1.5">
                <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                Recommended for Full Campus
              </span>
            </div>

            {/* Header Block: Solid Dark Navy */}
            <div className="bg-campo-navy py-6 sm:py-8 lg:py-10 px-5 sm:px-6 lg:px-8 text-center">
              <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-black text-white">
                Campus
              </h3>
              <div className="mt-2 flex items-baseline justify-center gap-1">
                <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
                  ₹300
                </span>
              </div>
              <p className="text-[11px] sm:text-sm text-slate-300 font-semibold mt-1">
                per student, per year
              </p>
              <p className="text-xs sm:text-[14px] lg:text-[15px] text-slate-200 font-medium mt-2.5 sm:mt-3 leading-relaxed max-w-[260px] mx-auto">
                Adds buses, hostels, stores and upkeep
              </p>
            </div>

            {/* Checklist Body: White */}
            <div className="p-5 sm:p-7 lg:p-9 flex-1 flex flex-col justify-between space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-6 lg:space-y-7">
                {/* Everything in Core */}
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 text-campo-teal shrink-0 stroke-[2.5]" />
                  <span className="font-display text-sm sm:text-[15px] lg:text-base font-bold text-campo-navy">
                    Everything in Core
                  </span>
                </div>

                {/* with connector */}
                <div className="pl-6 sm:pl-7 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                  with
                </div>

                {/* Campus Operations */}
                <div>
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-campo-teal shrink-0 stroke-[2.5]" />
                    <span className="font-display text-sm sm:text-[15px] lg:text-base font-bold text-campo-navy">
                      Campus Operations
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-500 pl-6 sm:pl-7 mt-1 sm:mt-1.5 leading-relaxed">
                    Transport, Hostel, Stationery Maintenance
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onRequestDemo?.('Campus Plan')}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-campo-teal py-3 sm:py-3.5 lg:py-4 px-4 sm:px-5 text-xs sm:text-sm lg:text-base font-black text-campo-deep transition-all hover:bg-[#19d6c6] shadow-sm cursor-pointer mt-4 sm:mt-6 font-outfit"
              >
                <span>Request Demo</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>
            </div>
          </motion.div>

          {/* CARD 3: Campus AI */}
          <motion.div
            initial={{ opacity: 0, y: 30, x: 15 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.2, ease: revealEase }}
            whileHover={{ y: -6 }}
            className="flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition-all bg-white min-h-0 md:min-h-[640px] lg:min-h-[700px]"
          >
            {/* Header Block: Light Grey */}
            <div className="bg-[#F0F4F8] py-6 sm:py-8 lg:py-10 px-5 sm:px-6 lg:px-8 text-center border-b border-slate-200/60">
              <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-black text-campo-navy">
                Campus AI
              </h3>
              <div className="mt-2 flex items-baseline justify-center gap-1">
                <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-campo-navy tracking-tight">
                  ₹400
                </span>
              </div>
              <p className="text-[11px] sm:text-sm text-slate-500 font-semibold mt-1">
                per student, per year
              </p>
              <p className="text-xs sm:text-[14px] lg:text-[15px] text-slate-600 font-medium mt-2.5 sm:mt-3 leading-relaxed max-w-[260px] mx-auto">
                For campuses that want to hear about problems first
              </p>
            </div>

            {/* Checklist Body: White */}
            <div className="p-5 sm:p-7 lg:p-9 flex-1 flex flex-col justify-between space-y-6 sm:space-y-8">
              <div className="space-y-3.5 sm:space-y-4 lg:space-y-5">
                {/* Everything in Campus */}
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 text-campo-teal shrink-0 stroke-[2.5]" />
                  <span className="font-display text-sm sm:text-[15px] lg:text-base font-bold text-campo-navy">
                    Everything in Campus
                  </span>
                </div>

                {/* with connector */}
                <div className="pl-6 sm:pl-7 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                  with
                </div>

                {/* AI alerts across every area */}
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 text-campo-teal shrink-0 stroke-[2.5]" />
                  <span className="font-display text-sm sm:text-[15px] lg:text-base font-bold text-campo-navy">
                    AI alerts across every area
                  </span>
                </div>

                {/* Placement Training */}
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 text-campo-teal shrink-0 stroke-[2.5]" />
                  <span className="font-display text-sm sm:text-[15px] lg:text-base font-bold text-campo-navy">
                    Placement Training
                  </span>
                </div>

                {/* Staff Recruitment */}
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 text-campo-teal shrink-0 stroke-[2.5]" />
                  <span className="font-display text-sm sm:text-[15px] lg:text-base font-bold text-campo-navy">
                    Staff Recruitment
                  </span>
                </div>

                {/* Inventory */}
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 text-campo-teal shrink-0 stroke-[2.5]" />
                  <span className="font-display text-sm sm:text-[15px] lg:text-base font-bold text-campo-navy">
                    Inventory
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onRequestDemo?.('Campus AI Plan')}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-campo-navy py-3 sm:py-3.5 lg:py-4 px-4 sm:px-5 text-xs sm:text-sm lg:text-base font-bold text-white transition-all hover:bg-slate-800 shadow-xs cursor-pointer mt-4 sm:mt-6 font-outfit"
              >
                <span>Request Demo</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* ========================================================
            ZERO INTEGRATION COST (Bottom Row) with Stagger Wave
            ======================================================== */}
        <div className="pt-2 sm:pt-4 text-center">
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="font-display text-lg sm:text-xl lg:text-2xl font-black text-campo-navy tracking-tight mb-5 sm:mb-8"
          >
            Zero Integration Cost
          </motion.h3>

          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:flex md:flex-wrap items-center justify-center gap-3.5 sm:gap-6 md:gap-9 lg:gap-14">
            {[
              { component: BiometricIcon, label: 'Biometric devices' },
              { component: WhatsAppIcon, label: 'WhatsApp' },
              { component: BulkSmsIcon, label: 'Bulk SMS' },
              { component: QrCodeIcon, label: 'QR Code' },
              { component: BarcodeIcon, label: 'Barcode' },
              { component: GoogleWorkspaceIcon, label: 'Google Workspace' },
              { component: PaymentGatewayIcon, label: 'Payment Gateway' },
            ].map((item, idx) => {
              const IconComp = item.component;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 15, scale: 0.85 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.05,
                    ease: revealEase,
                  }}
                  whileHover={{ y: -4, scale: 1.08 }}
                  className="group flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-0 rounded-xl bg-slate-50/50 sm:bg-transparent border border-slate-200/50 sm:border-none cursor-default"
                >
                  <IconComp />
                  <span className="text-[11px] sm:text-xs font-semibold text-slate-600 group-hover:text-campo-navy transition-colors text-center leading-tight">
                    {item.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
