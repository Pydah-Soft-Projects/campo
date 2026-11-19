import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Calendar,
  CreditCard,
  UserCheck,
  Bell,
  Bus,
  ShieldCheck,
  Clock,
  QrCode,
  Download,
  Sparkles,
  ChevronRight,
  BookOpen,
  MapPin,
  GraduationCap,
  Users,
  PhoneCall,
  FileText,
} from 'lucide-react';
import { CampoLogo } from '../CampoLogo';
import studentPhoto from '../../assets/student-mobile-campus.webp';

export function MobileAppMockup({
  screen = 'dashboard',
  activeSide: controlledActiveSide,
  defaultSide = 'student',
  onSideChange,
}) {
  const [internalSide, setInternalSide] = useState(defaultSide);
  const activeSide = controlledActiveSide !== undefined ? controlledActiveSide : internalSide;

  return (
    <div className="relative mx-auto w-full select-none [transform-style:preserve-3d]">
      {/* Physical Hardware Buttons on Chassis with 3D Depth & Metallic Sheen */}
      {/* Left: Action Button / Mute Switch */}
      <div className="absolute -left-[5px] sm:-left-[6px] top-[80px] sm:top-[90px] h-7 sm:h-8 w-[5px] sm:w-[6px] rounded-l-md bg-gradient-to-r from-slate-500 via-slate-600 to-slate-800 shadow-[0_2px_4px_rgba(0,0,0,0.5),-1px_0_1px_rgba(255,255,255,0.2)_inset]" />
      {/* Left: Volume Up */}
      <div className="absolute -left-[5px] sm:-left-[6px] top-[125px] sm:top-[138px] h-12 sm:h-14 w-[5px] sm:w-[6px] rounded-l-md bg-gradient-to-r from-slate-500 via-slate-600 to-slate-800 shadow-[0_2px_4px_rgba(0,0,0,0.5),-1px_0_1px_rgba(255,255,255,0.2)_inset]" />
      {/* Left: Volume Down */}
      <div className="absolute -left-[5px] sm:-left-[6px] top-[185px] sm:top-[202px] h-12 sm:h-14 w-[5px] sm:w-[6px] rounded-l-md bg-gradient-to-r from-slate-500 via-slate-600 to-slate-800 shadow-[0_2px_4px_rgba(0,0,0,0.5),-1px_0_1px_rgba(255,255,255,0.2)_inset]" />
      {/* Right: Side / Power Button */}
      <div className="absolute -right-[5px] sm:-right-[6px] top-[140px] sm:top-[155px] h-16 sm:h-18 w-[5px] sm:w-[6px] rounded-r-md bg-gradient-to-l from-slate-500 via-slate-600 to-slate-800 shadow-[0_2px_4px_rgba(0,0,0,0.5),1px_0_1px_rgba(255,255,255,0.2)_inset]" />

      {/* Outer Device Chassis - Polished Metallic Titanium Frame with 3D Depth Edges */}
      <div className="relative rounded-[50px] sm:rounded-[54px] bg-gradient-to-b from-slate-600 via-slate-800 to-slate-950 p-[3.5px] sm:p-[4px] shadow-[0_30px_70px_-15px_rgba(15,23,42,0.55),0_12px_28px_-10px_rgba(15,23,42,0.35),-5px_0_12px_rgba(255,255,255,0.18)_inset,5px_0_12px_rgba(0,0,0,0.6)_inset,0_0_0_1px_rgba(255,255,255,0.22)]">
        {/* Inner Black OLED Bezel */}
        <div className="relative overflow-hidden rounded-[47px] sm:rounded-[51px] bg-slate-950 p-[8px] sm:p-[9px] ring-1 ring-white/10">
          {/* Dynamic Island Pill with Camera Iris Glare */}
          <div className="absolute left-1/2 top-[12px] sm:top-[14px] z-50 h-[25px] sm:h-[28px] w-[96px] sm:w-[108px] -translate-x-1/2 rounded-full bg-black px-2.5 flex items-center justify-between shadow-md ring-1 ring-white/10">
            {/* Front Camera Lens with Blue-Violet Anti-Reflective Coating */}
            <div className="relative h-2.5 sm:h-3 w-2.5 sm:w-3 rounded-full bg-[#0a0f1d] ring-1 ring-white/20 flex items-center justify-center">
              <div className="h-1 w-1 rounded-full bg-[#1e293b]" />
              <div className="absolute top-0.5 right-0.5 h-0.5 w-0.5 rounded-full bg-indigo-400/80" />
            </div>
            {/* Live Status Indicator */}
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
              <div className="h-2 w-0.5 rounded-full bg-campo-teal animate-pulse" />
            </div>
          </div>

          {/* Screen Display Area - Ultra-Crisp High-Definition OLED Display */}
          <div className="relative overflow-hidden rounded-[40px] sm:rounded-[44px] bg-[#F8FAFC] text-slate-800 shadow-inner antialiased [text-rendering:optimizeLegibility]">
            {/* Subtle Edge Reflection */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/10 to-transparent z-40"
            />

            {/* Mobile Status Bar */}
            <div className="relative z-30 flex items-center justify-between px-6 pt-3.5 pb-2 text-[11px] font-bold text-slate-900">
              <span className="tracking-tight font-extrabold">09:41</span>
              <div className="flex items-center gap-1.5">
                {/* 4-Bar Cellular Signal */}
                <div className="flex items-end gap-0.5 h-2.5">
                  <div className="w-0.5 h-1 rounded-2xs bg-slate-900" />
                  <div className="w-0.5 h-1.5 rounded-2xs bg-slate-900" />
                  <div className="w-0.5 h-2 rounded-2xs bg-slate-900" />
                  <div className="w-0.5 h-2.5 rounded-2xs bg-slate-900" />
                </div>
                {/* 5G Label */}
                <span className="text-[10px] font-black tracking-tighter text-slate-900">5G</span>
                {/* Battery with 94% fill */}
                <div className="relative h-2.5 w-4 rounded-xs border border-slate-900 p-0.5 flex items-center">
                  <div className="h-full w-[90%] bg-slate-900 rounded-2xs" />
                  <div className="absolute -right-0.5 h-1 w-0.5 rounded-r-xs bg-slate-900" />
                </div>
              </div>
            </div>

            {/* Screen Content Switched between Student & Parent with Apple App-Switch Transition */}
            <AnimatePresence mode="wait" initial={false}>
              {activeSide === 'student' ? (
                <motion.div
                  key="student-side"
                  initial={{ opacity: 0, x: -24, filter: 'blur(2px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: 24, filter: 'blur(2px)' }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Header / Student Profile Bar */}
                  <div className="relative bg-gradient-to-b from-campo-navy to-[#0c234a] px-4 pb-4 pt-2.5 text-white shadow-sm">
                    <div className="flex items-center justify-between">
                      <CampoLogo variant="light" size="sm" />
                      <div className="flex items-center gap-1.5">
                        <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-xs transition-colors">
                          <Bell className="h-3.5 w-3.5" />
                          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-campo-navy shadow-xs" />
                        </div>
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-xs">
                          <QrCode className="h-3.5 w-3.5 text-campo-teal" />
                        </div>
                      </div>
                    </div>

                    {/* Student Identity Card Overlay */}
                    <div className="mt-2.5 rounded-2xl border border-white/20 bg-white/[0.14] p-2.5 backdrop-blur-md shadow-xs">
                      <div className="flex items-center gap-2.5">
                        {/* Student Photo Avatar */}
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-campo-teal shadow-xs">
                          <img
                            src={studentPhoto}
                            alt="Student Aarav Sharma"
                            loading="eager"
                            decoding="sync"
                            className="h-full w-full object-cover"
                          />
                          <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-400 ring-1.5 ring-campo-navy" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="truncate font-display text-xs sm:text-[13px] font-bold text-white tracking-wide">
                              Aarav Sharma
                            </h4>
                            <span className="rounded-full bg-emerald-500/30 px-1.5 py-0.2 text-[8px] font-bold text-emerald-300 border border-emerald-400/40 flex items-center gap-0.5">
                              <ShieldCheck className="h-2 w-2" /> Verified
                            </span>
                          </div>
                          <p className="truncate text-[10px] text-teal-300 font-medium mt-0.5">
                            Roll: PYD-2023-CS-042
                          </p>
                          <p className="truncate text-[9px] text-slate-200 font-medium">
                            B.Tech Computer Science • Sem IV
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Scrollable Screen Content - Student */}
                  <div className="space-y-2.5 p-3 text-xs">
                    {/* 4 Interactive Quick Action Buttons */}
                    <div className="grid grid-cols-4 gap-1.5">
                      <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200/90 bg-white p-1.5 sm:p-2 text-center shadow-xs">
                        <div className="flex h-6.5 w-6.5 items-center justify-center rounded-lg bg-teal-50 text-campo-teal-dark">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </div>
                        <span className="mt-1 text-[9px] font-extrabold text-campo-navy">89.4%</span>
                        <span className="text-[8px] font-semibold text-slate-600">Attendance</span>
                      </div>

                      <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200/90 bg-white p-1.5 sm:p-2 text-center shadow-xs">
                        <div className="flex h-6.5 w-6.5 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                          <Calendar className="h-3.5 w-3.5" />
                        </div>
                        <span className="mt-1 text-[9px] font-extrabold text-campo-navy">5 Classes</span>
                        <span className="text-[8px] font-semibold text-slate-600">Today</span>
                      </div>

                      <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200/90 bg-white p-1.5 sm:p-2 text-center shadow-xs">
                        <div className="flex h-6.5 w-6.5 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                          <CreditCard className="h-3.5 w-3.5" />
                        </div>
                        <span className="mt-1 text-[9px] font-extrabold text-emerald-600">Paid</span>
                        <span className="text-[8px] font-semibold text-slate-600">Fee Ledger</span>
                      </div>

                      <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200/90 bg-white p-1.5 sm:p-2 text-center shadow-xs">
                        <div className="flex h-6.5 w-6.5 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                          <Bus className="h-3.5 w-3.5" />
                        </div>
                        <span className="mt-1 text-[9px] font-extrabold text-campo-navy">Route 14</span>
                        <span className="text-[8px] font-semibold text-slate-600">Bus Live</span>
                      </div>
                    </div>

                    {/* Live Lecture Card */}
                    <div className="rounded-2xl border border-slate-200/90 bg-white p-3 shadow-xs">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <div className="flex items-center gap-1.5">
                          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="font-display text-[11px] font-bold text-campo-navy">
                            Live Academic Session
                          </span>
                        </div>
                        <span className="rounded-md bg-teal-50 px-1.5 py-0.5 text-[9px] font-bold text-campo-teal-dark border border-teal-200/80">
                          In Progress
                        </span>
                      </div>

                      <div className="mt-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h5 className="font-display text-xs font-bold text-campo-navy leading-snug">
                              Design &amp; Analysis of Algorithms
                            </h5>
                            <p className="text-[10px] text-slate-600 font-medium mt-0.5 flex items-center gap-1">
                              <Clock className="h-3 w-3 text-slate-500" />
                              10:30 AM – 12:00 PM • Lab 04 (Block B)
                            </p>
                          </div>
                        </div>

                        <div className="mt-2 flex items-center justify-between rounded-xl bg-slate-50 px-2.5 py-1 text-[10px] border border-slate-200/80">
                          <div className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            <span className="font-bold text-slate-800">Biometric Attendance Logged</span>
                          </div>
                          <span className="font-mono text-[9px] font-extrabold text-emerald-600">10:28 AM</span>
                        </div>
                      </div>
                    </div>

                    {/* Verified Fee Receipt & Transaction Tile */}
                    <div className="rounded-2xl border border-slate-200/90 bg-white p-3 shadow-xs">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="font-display text-[11px] font-bold text-campo-navy flex items-center gap-1.5">
                          <CreditCard className="h-3.5 w-3.5 text-campo-teal-dark" />
                          Recent Digital Receipt
                        </span>
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700 border border-emerald-200">
                          Verified Zero Dues
                        </span>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div>
                          <p className="font-display text-xs font-bold text-campo-navy">
                            ₹45,000 <span className="text-[10px] font-medium text-slate-600">(Sem IV Tuition)</span>
                          </p>
                          <p className="text-[9px] text-slate-500 font-mono font-medium mt-0.5">
                            TXN: #PYD-2026-98124
                          </p>
                        </div>
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 rounded-lg bg-campo-navy px-2.5 py-1 text-[9px] font-bold text-white shadow-xs hover:bg-campo-secondary transition-colors"
                        >
                          <Download className="h-2.5 w-2.5 text-campo-teal" />
                          <span>Receipt PDF</span>
                        </button>
                      </div>
                    </div>

                    {/* Digital Campus Identity Bar */}
                    <div className="flex items-center justify-between rounded-2xl border border-slate-200/90 bg-gradient-to-r from-slate-50 via-white to-slate-50 p-2.5 shadow-xs">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6.5 w-6.5 items-center justify-center rounded-xl bg-campo-navy text-campo-teal">
                          <QrCode className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <p className="font-display text-[10px] font-bold text-campo-navy leading-none">
                            Encrypted Gate Pass
                          </p>
                          <p className="text-[9px] text-slate-600 font-medium mt-0.5">
                            Scan at Library &amp; Campus Turnstiles
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                    </div>
                  </div>

                  {/* Bottom Floating Navigation Dock - Student */}
                  <div className="relative px-3 pb-3 pt-1">
                    <div className="flex items-center justify-around rounded-2xl border border-slate-200/90 bg-white px-2 py-1.5 shadow-md">
                      <div className="flex flex-col items-center text-campo-teal-dark">
                        <BookOpen className="h-4 w-4 stroke-[2.5]" />
                        <span className="text-[8px] font-bold mt-0.5">Home</span>
                      </div>
                      <div className="flex flex-col items-center text-slate-500 hover:text-slate-800 transition-colors">
                        <Calendar className="h-4 w-4" />
                        <span className="text-[8px] font-semibold mt-0.5">Classes</span>
                      </div>
                      <div className="flex flex-col items-center text-slate-500 hover:text-slate-800 transition-colors">
                        <CreditCard className="h-4 w-4" />
                        <span className="text-[8px] font-semibold mt-0.5">Fees</span>
                      </div>
                      <div className="flex flex-col items-center text-slate-500 hover:text-slate-800 transition-colors">
                        <QrCode className="h-4 w-4" />
                        <span className="text-[8px] font-semibold mt-0.5">ID Card</span>
                      </div>
                    </div>

                    {/* iPhone Centered Home Indicator Bar */}
                    <div className="flex justify-center pt-2">
                      <div className="h-1 w-24 rounded-full bg-slate-400/80" />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="parent-side"
                  initial={{ opacity: 0, x: 24, filter: 'blur(2px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -24, filter: 'blur(2px)' }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Header / Parent Profile Bar */}
                  <div className="relative bg-gradient-to-b from-campo-navy to-[#081e42] px-4 pb-4 pt-2.5 text-white shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <CampoLogo variant="light" size="sm" />
                        <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-teal-300 border border-white/10">
                          Parent App
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-xs transition-colors">
                          <Bell className="h-3.5 w-3.5" />
                          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-amber-400 ring-2 ring-campo-navy shadow-xs" />
                        </div>
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-xs">
                          <PhoneCall className="h-3.5 w-3.5 text-campo-teal" />
                        </div>
                      </div>
                    </div>

                    {/* Parent & Linked Ward Identity Card Overlay */}
                    <div className="mt-2.5 rounded-2xl border border-white/20 bg-white/[0.14] p-2.5 backdrop-blur-md shadow-xs">
                      <div className="flex items-center gap-2.5">
                        {/* Parent Avatar with Guardian Badge */}
                        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-teal-600 to-campo-teal text-campo-deep font-extrabold text-xs shadow-xs ring-2 ring-white/30">
                          <span>RS</span>
                          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-1.5 ring-campo-navy" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="truncate font-display text-xs sm:text-[13px] font-bold text-white tracking-wide">
                              Ramesh Sharma
                            </h4>
                            <span className="rounded-full bg-teal-500/30 px-1.5 py-0.2 text-[8px] font-bold text-teal-300 border border-teal-400/40 flex items-center gap-0.5">
                              <Users className="h-2 w-2" /> Guardian
                            </span>
                          </div>
                          <p className="truncate text-[10px] text-teal-200 font-medium mt-0.5 flex items-center gap-1">
                            <span>Ward:</span>
                            <span className="font-bold text-white">Aarav Sharma</span>
                            <span className="text-[8px] text-teal-300/80">(CS-042)</span>
                          </p>
                          <p className="truncate text-[9px] text-slate-200 font-medium">
                            Pydah College of Engineering &bull; Sem IV
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Scrollable Screen Content - Parent */}
                  <div className="space-y-2.5 p-3 text-xs">
                    {/* 4 Parent Action & Verification Tiles */}
                    <div className="grid grid-cols-4 gap-1.5">
                      <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200/90 bg-white p-1.5 sm:p-2 text-center shadow-xs">
                        <div className="flex h-6.5 w-6.5 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </div>
                        <span className="mt-1 text-[9px] font-extrabold text-emerald-600">Present</span>
                        <span className="text-[8px] font-semibold text-slate-600">08:45 AM</span>
                      </div>

                      <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200/90 bg-white p-1.5 sm:p-2 text-center shadow-xs">
                        <div className="flex h-6.5 w-6.5 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                          <Bus className="h-3.5 w-3.5" />
                        </div>
                        <span className="mt-1 text-[9px] font-extrabold text-campo-navy">1.2 km</span>
                        <span className="text-[8px] font-semibold text-slate-600">Bus Live GPS</span>
                      </div>

                      <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200/90 bg-white p-1.5 sm:p-2 text-center shadow-xs">
                        <div className="flex h-6.5 w-6.5 items-center justify-center rounded-lg bg-teal-50 text-campo-teal-dark">
                          <CreditCard className="h-3.5 w-3.5" />
                        </div>
                        <span className="mt-1 text-[9px] font-extrabold text-teal-700">₹0 Due</span>
                        <span className="text-[8px] font-semibold text-slate-600">Fee Balance</span>
                      </div>

                      <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200/90 bg-white p-1.5 sm:p-2 text-center shadow-xs">
                        <div className="flex h-6.5 w-6.5 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                          <GraduationCap className="h-3.5 w-3.5" />
                        </div>
                        <span className="mt-1 text-[9px] font-extrabold text-campo-navy">8.7 SGPA</span>
                        <span className="text-[8px] font-semibold text-slate-600">Sem III Score</span>
                      </div>
                    </div>

                    {/* Live Campus Bus Transit & GPS Route */}
                    <div className="rounded-2xl border border-slate-200/90 bg-white p-3 shadow-xs">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <div className="flex items-center gap-1.5">
                          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="font-display text-[11px] font-bold text-campo-navy">
                            Live Transit &amp; ETA Tracking
                          </span>
                        </div>
                        <span className="rounded-md bg-sky-50 px-1.5 py-0.5 text-[9px] font-bold text-sky-700 border border-sky-200/80">
                          Route 14
                        </span>
                      </div>

                      <div className="mt-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h5 className="font-display text-xs font-bold text-campo-navy leading-snug">
                              Campus Express &bull; Sector 5 Route
                            </h5>
                            <p className="text-[10px] text-slate-600 font-medium mt-0.5 flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-emerald-600" />
                              Next Stop: Central Gate (3 mins • 1.2 km)
                            </p>
                          </div>
                        </div>

                        <div className="mt-2 flex items-center justify-between rounded-xl bg-slate-50 px-2.5 py-1.5 text-[10px] border border-slate-200/80">
                          <div className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            <span className="text-[9px] text-slate-700 font-medium">Driver: Suresh K.</span>
                          </div>
                          <span className="font-mono text-[9px] font-bold text-sky-700">Live 28 km/h</span>
                        </div>
                      </div>
                    </div>

                    {/* Gate Attendance & Safety Logs */}
                    <div className="rounded-2xl border border-slate-200/90 bg-white p-3 shadow-xs">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="font-display text-[11px] font-bold text-campo-navy flex items-center gap-1.5">
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                          Campus Safety &amp; Turnstile Logs
                        </span>
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700 border border-emerald-200">
                          Safely Inside
                        </span>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div>
                          <p className="font-display text-xs font-bold text-campo-navy">
                            Main Block Turnstile 02
                          </p>
                          <p className="text-[9px] text-slate-500 font-medium mt-0.5">
                            Biometric RFID logged at 10:28 AM
                          </p>
                        </div>
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          Verified Safe
                        </span>
                      </div>
                    </div>

                    {/* Official Principal Notice / Circular */}
                    <div className="flex items-center justify-between rounded-2xl border border-slate-200/90 bg-gradient-to-r from-slate-50 via-white to-slate-50 p-2.5 shadow-xs">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6.5 w-6.5 items-center justify-center rounded-xl bg-campo-navy text-campo-teal">
                          <FileText className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <p className="font-display text-[10px] font-bold text-campo-navy leading-none">
                            Mid-Term Exam Schedule Out
                          </p>
                          <p className="text-[9px] text-slate-600 font-medium mt-0.5">
                            Principal&apos;s Office &bull; Circular #084
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                    </div>
                  </div>

                  {/* Bottom Floating Navigation Dock - Parent */}
                  <div className="relative px-3 pb-3 pt-1">
                    <div className="flex items-center justify-around rounded-2xl border border-slate-200/90 bg-white px-2 py-1.5 shadow-md">
                      <div className="flex flex-col items-center text-campo-teal-dark">
                        <UserCheck className="h-4 w-4 stroke-[2.5]" />
                        <span className="text-[8px] font-bold mt-0.5">Ward</span>
                      </div>
                      <div className="flex flex-col items-center text-slate-500 hover:text-slate-800 transition-colors">
                        <Bus className="h-4 w-4" />
                        <span className="text-[8px] font-semibold mt-0.5">Bus GPS</span>
                      </div>
                      <div className="flex flex-col items-center text-slate-500 hover:text-slate-800 transition-colors">
                        <CreditCard className="h-4 w-4" />
                        <span className="text-[8px] font-semibold mt-0.5">Fees</span>
                      </div>
                      <div className="flex flex-col items-center text-slate-500 hover:text-slate-800 transition-colors">
                        <Bell className="h-4 w-4" />
                        <span className="text-[8px] font-semibold mt-0.5">Circulars</span>
                      </div>
                    </div>

                    {/* iPhone Centered Home Indicator Bar */}
                    <div className="flex justify-center pt-2">
                      <div className="h-1 w-24 rounded-full bg-slate-400/80" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
