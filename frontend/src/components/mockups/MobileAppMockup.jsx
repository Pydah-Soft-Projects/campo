import React from 'react';
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
  Wifi,
  Sparkles,
  ChevronRight,
  BookOpen,
  MapPin,
} from 'lucide-react';
import { CampoLogo } from '../CampoLogo';
import studentPhoto from '../../assets/student-mobile-campus.jpg';

export function MobileAppMockup({ screen = 'dashboard' }) {
  return (
    <div className="relative mx-auto w-full max-w-[295px] sm:max-w-[320px] md:max-w-[335px] select-none">
      {/* Physical Hardware Buttons on Chassis */}
      {/* Left: Action Button / Mute Switch */}
      <div className="absolute -left-[4px] sm:-left-[5px] top-[75px] sm:top-[85px] h-6 sm:h-7 w-[4px] rounded-l-md bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 shadow-xs" />
      {/* Left: Volume Up */}
      <div className="absolute -left-[4px] sm:-left-[5px] top-[115px] sm:top-[128px] h-10 sm:h-12 w-[4px] rounded-l-md bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 shadow-xs" />
      {/* Left: Volume Down */}
      <div className="absolute -left-[4px] sm:-left-[5px] top-[170px] sm:top-[188px] h-10 sm:h-12 w-[4px] rounded-l-md bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 shadow-xs" />
      {/* Right: Side / Power Button */}
      <div className="absolute -right-[4px] sm:-right-[5px] top-[130px] sm:top-[145px] h-14 sm:h-16 w-[4px] rounded-r-md bg-gradient-to-l from-slate-600 via-slate-700 to-slate-800 shadow-xs" />

      {/* Outer Device Chassis - Polished Metallic Frame with Beveled Chamfer */}
      <div className="relative rounded-[48px] sm:rounded-[54px] bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 p-[3px] sm:p-[4px] shadow-[0_25px_60px_-15px_rgba(15,23,42,0.5),0_10px_20px_-10px_rgba(15,23,42,0.3),0_0_0_1px_rgba(255,255,255,0.18)]">
        {/* Inner Black OLED Bezel */}
        <div className="relative overflow-hidden rounded-[45px] sm:rounded-[50px] bg-slate-950 p-[8px] sm:p-[9px] ring-1 ring-white/10">
          {/* Dynamic Island Pill with Camera Iris Glare */}
          <div className="absolute left-1/2 top-[11px] sm:top-[13px] z-50 h-[24px] sm:h-[27px] w-[92px] sm:w-[104px] -translate-x-1/2 rounded-full bg-black px-2.5 flex items-center justify-between shadow-md ring-1 ring-white/5">
            {/* Front Camera Lens with Blue-Violet Anti-Reflective Coating */}
            <div className="relative h-2.5 sm:h-3 w-2.5 sm:w-3 rounded-full bg-[#0a0f1d] ring-1 ring-white/20 flex items-center justify-center">
              <div className="h-1 w-1 rounded-full bg-[#1e293b]" />
              <div className="absolute top-0.5 right-0.5 h-0.5 w-0.5 rounded-full bg-indigo-400/80" />
            </div>
            {/* Live Audio / Verification Active Indicator */}
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
              <div className="h-2 w-0.5 rounded-full bg-campo-teal animate-pulse" />
            </div>
          </div>

          {/* Screen Display Area */}
          <div className="relative overflow-hidden rounded-[38px] sm:rounded-[43px] bg-slate-100/90 text-slate-800 shadow-inner">
            {/* Photorealistic Screen Glass Sheen Overlay */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-y-[50%] -left-[50%] w-[200%] rotate-30 bg-gradient-to-r from-transparent via-white/8 to-transparent z-40"
            />

            {/* Mobile Status Bar */}
            <div className="relative z-30 flex items-center justify-between px-6 pt-3 pb-1 text-[11px] font-bold text-slate-800">
              <span className="tracking-tight">09:41</span>
              <div className="flex items-center gap-1.5">
                {/* 4-Bar Cellular Signal */}
                <div className="flex items-end gap-0.5 h-2.5">
                  <div className="w-0.5 h-1 rounded-2xs bg-slate-800" />
                  <div className="w-0.5 h-1.5 rounded-2xs bg-slate-800" />
                  <div className="w-0.5 h-2 rounded-2xs bg-slate-800" />
                  <div className="w-0.5 h-2.5 rounded-2xs bg-slate-800" />
                </div>
                {/* 5G Label */}
                <span className="text-[10px] font-extrabold tracking-tighter">5G</span>
                {/* Battery with 94% fill */}
                <div className="relative h-2.5 w-4 rounded-xs border border-slate-800 p-0.5 flex items-center">
                  <div className="h-full w-[90%] bg-slate-800 rounded-2xs" />
                  <div className="absolute -right-0.5 h-1 w-0.5 rounded-r-xs bg-slate-800" />
                </div>
              </div>
            </div>

            {/* Header / Student Profile Bar */}
            <div className="relative bg-gradient-to-b from-campo-navy to-[#0c234a] px-4 pb-4 pt-2 text-white shadow-sm">
              <div className="flex items-center justify-between">
                <CampoLogo variant="light" size="sm" />
                <div className="flex items-center gap-1.5">
                  <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-xs transition-colors">
                    <Bell className="h-3.5 w-3.5" />
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-campo-navy shadow-xs" />
                  </div>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-xs">
                    <QrCode className="h-3.5 w-3.5 text-campo-teal" />
                  </div>
                </div>
              </div>

              {/* Student Identity Card Overlay */}
              <div className="mt-3 rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-md shadow-xs">
                <div className="flex items-center gap-3">
                  {/* Student Photo Avatar */}
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-campo-teal shadow-xs">
                    <img
                      src={studentPhoto}
                      alt="Student Aarav Sharma"
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-1.5 ring-campo-navy" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="truncate font-display text-xs sm:text-[13px] font-bold text-white">
                        Aarav Sharma
                      </h4>
                      <span className="rounded-full bg-emerald-500/25 px-1.5 py-0.2 text-[8px] font-bold text-emerald-300 border border-emerald-400/30 flex items-center gap-0.5">
                        <ShieldCheck className="h-2 w-2" /> Verified
                      </span>
                    </div>
                    <p className="truncate text-[10px] text-teal-200 mt-0.5">
                      Roll: PYD-2023-CS-042
                    </p>
                    <p className="truncate text-[9px] text-slate-300">
                      B.Tech Computer Science • Sem IV
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Screen Content */}
            <div className="space-y-2.5 p-3 text-xs">
              {/* 4 Interactive Quick Action Buttons */}
              <div className="grid grid-cols-4 gap-1.5">
                <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200/80 bg-white p-2 text-center shadow-xs">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-50 text-campo-teal-dark">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <span className="mt-1 text-[9px] font-bold text-campo-navy">89.4%</span>
                  <span className="text-[8px] text-slate-500">Attendance</span>
                </div>

                <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200/80 bg-white p-2 text-center shadow-xs">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Calendar className="h-3.5 w-3.5" />
                  </div>
                  <span className="mt-1 text-[9px] font-bold text-campo-navy">5 Classes</span>
                  <span className="text-[8px] text-slate-500">Today</span>
                </div>

                <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200/80 bg-white p-2 text-center shadow-xs">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <CreditCard className="h-3.5 w-3.5" />
                  </div>
                  <span className="mt-1 text-[9px] font-bold text-emerald-600">Paid</span>
                  <span className="text-[8px] text-slate-500">Fee Ledger</span>
                </div>

                <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200/80 bg-white p-2 text-center shadow-xs">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                    <Bus className="h-3.5 w-3.5" />
                  </div>
                  <span className="mt-1 text-[9px] font-bold text-campo-navy">Route 14</span>
                  <span className="text-[8px] text-slate-500">Bus Live</span>
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
                  <span className="rounded-md bg-teal-50 px-1.5 py-0.5 text-[9px] font-bold text-campo-teal-dark border border-teal-200/60">
                    In Progress
                  </span>
                </div>

                <div className="mt-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h5 className="font-display text-xs font-bold text-campo-navy leading-snug">
                        Design &amp; Analysis of Algorithms
                      </h5>
                      <p className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                        <Clock className="h-3 w-3 text-slate-400" />
                        10:30 AM – 12:00 PM • Lab 04 (Block B)
                      </p>
                    </div>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between rounded-xl bg-slate-50 px-2.5 py-1.5 text-[10px] border border-slate-200/60">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span className="font-semibold text-slate-700">Biometric Attendance Logged</span>
                    </div>
                    <span className="font-mono text-[9px] font-bold text-emerald-600">10:28 AM</span>
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
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700 border border-emerald-200/80">
                    Verified Zero Dues
                  </span>
                </div>

                <div className="mt-2.5 flex items-center justify-between">
                  <div>
                    <p className="font-display text-xs font-bold text-campo-navy">
                      ₹45,000 <span className="text-[10px] font-normal text-slate-500">(Sem IV Tuition)</span>
                    </p>
                    <p className="text-[9px] text-slate-400 font-mono mt-0.5">
                      TXN: #PYD-2026-98124
                    </p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-lg bg-campo-navy px-2.5 py-1.5 text-[9px] font-bold text-white shadow-xs hover:bg-campo-secondary transition-colors"
                  >
                    <Download className="h-2.5 w-2.5 text-campo-teal" />
                    <span>Receipt PDF</span>
                  </button>
                </div>
              </div>

              {/* Digital Campus Identity Bar */}
              <div className="flex items-center justify-between rounded-2xl border border-slate-200/90 bg-gradient-to-r from-slate-50 via-white to-slate-50 p-2.5 shadow-xs">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-campo-navy text-campo-teal">
                    <QrCode className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-display text-[10px] font-bold text-campo-navy leading-none">
                      Encrypted Gate Pass
                    </p>
                    <p className="text-[9px] text-slate-500 mt-0.5">
                      Scan at Library &amp; Campus Turnstiles
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </div>
            </div>

            {/* Bottom Floating Navigation Dock */}
            <div className="relative px-3 pb-3 pt-1">
              <div className="flex items-center justify-around rounded-2xl border border-slate-200/80 bg-white/95 px-2 py-1.5 shadow-md backdrop-blur-md">
                <div className="flex flex-col items-center text-campo-teal-dark">
                  <BookOpen className="h-4 w-4 stroke-[2.5]" />
                  <span className="text-[8px] font-bold mt-0.5">Home</span>
                </div>
                <div className="flex flex-col items-center text-slate-400">
                  <Calendar className="h-4 w-4" />
                  <span className="text-[8px] font-medium mt-0.5">Classes</span>
                </div>
                <div className="flex flex-col items-center text-slate-400">
                  <CreditCard className="h-4 w-4" />
                  <span className="text-[8px] font-medium mt-0.5">Fees</span>
                </div>
                <div className="flex flex-col items-center text-slate-400">
                  <QrCode className="h-4 w-4" />
                  <span className="text-[8px] font-medium mt-0.5">ID Card</span>
                </div>
              </div>

              {/* iPhone Centered Home Indicator Bar */}
              <div className="flex justify-center pt-2">
                <div className="h-1 w-24 rounded-full bg-slate-400/80" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}