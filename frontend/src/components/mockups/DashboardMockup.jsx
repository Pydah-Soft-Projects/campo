import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Users,
  CheckCircle2,
  Wallet,
  Building2,
  Lock,
  TrendingUp,
  Activity,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import { CampoLogo } from '../CampoLogo';
import adminAvatarImg from '../../assets/institutional-leadership.webp';

// Animated Counter Component with Smooth Numeric Count-Up Effect
function AnimatedNumber({ value, prefix = '', suffix = '', decimals = 0, duration = 1.6, delay = 0 }) {
  const [display, setDisplay] = useState(decimals > 0 ? (0).toFixed(decimals) : '0');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!inView) return;

    let timeoutId;
    let animId;

    timeoutId = setTimeout(() => {
      const startTime = performance.now();
      const target = Number(value);

      const update = (now) => {
        const elapsed = (now - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutQuart
        const ease = 1 - Math.pow(1 - progress, 4);
        const current = target * ease;

        if (decimals > 0) {
          setDisplay(current.toFixed(decimals));
        } else {
          setDisplay(Math.round(current).toLocaleString());
        }

        if (progress < 1) {
          animId = requestAnimationFrame(update);
        } else {
          if (decimals > 0) {
            setDisplay(target.toFixed(decimals));
          } else {
            setDisplay(Math.round(target).toLocaleString());
          }
        }
      };

      animId = requestAnimationFrame(update);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animId);
    };
  }, [inView, value, decimals, duration, delay]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export function DashboardMockup({ compact = false }) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-workspace">
      {/* Top Browser Window Header */}
      <div className="flex items-center justify-between border-b border-slate-200/80 bg-slate-100/95 px-3.5 py-2 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#FF5F56] shadow-xs" />
          <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#FFBD2E] shadow-xs" />
          <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-[#27C93F] shadow-xs" />
        </div>

        {/* URL Bar */}
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1 text-[10px] sm:text-[11px] font-medium text-slate-600 shadow-xs max-w-[260px] sm:max-w-xs w-full justify-center">
          <Lock className="h-3 w-3 text-campo-teal-dark shrink-0" />
          <span className="truncate">https://portal.campo.co.in/institution/executive</span>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-campo-teal-dark">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="hidden sm:inline">Active Core</span>
        </div>
      </div>

      {/* Main ERP Application Frame */}
      <div className="grid grid-cols-12 min-h-[420px] text-xs">
        {/* Left ERP Navigation Sidebar */}
        <div className="hidden border-r border-slate-200/80 bg-campo-deep p-3 text-slate-300 md:col-span-3 md:flex md:flex-col md:justify-between">
          <div>
            <div className="flex items-center justify-center border-b border-white/10 pb-2.5">
              <CampoLogo variant="light" size="sm" />
            </div>

            <div className="mt-3.5">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 px-1">
                Management Modules
              </p>
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-2 rounded-lg bg-campo-teal/20 px-2.5 py-1.5 font-bold text-white border-l-2 border-campo-teal">
                  <Activity className="h-3.5 w-3.5 text-campo-teal" />
                  <span className="truncate">Executive Suite</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-slate-300 hover:bg-white/5">
                  <Users className="h-3.5 w-3.5 text-slate-400" />
                  <span className="truncate">Admissions CRM</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-slate-300 hover:bg-white/5">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  <span className="truncate">Academic Hub</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-slate-300 hover:bg-white/5">
                  <Wallet className="h-3.5 w-3.5 text-slate-400" />
                  <span className="truncate">Fee &amp; Finance</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-slate-300 hover:bg-white/5">
                  <Building2 className="h-3.5 w-3.5 text-slate-400" />
                  <span className="truncate">Campus Services</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-1.5 text-[10px]">
            <div className="relative shrink-0">
              <img
                src={adminAvatarImg}
                alt="Campus Admin"
                className="h-7 w-7 rounded-full object-cover ring-1 ring-white/20"
              />
              <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-1 ring-slate-900" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-white truncate text-[10px] leading-tight">Admin</p>
              <p className="text-[8px] text-slate-400 truncate">Campus Governance</p>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="col-span-12 md:col-span-9 bg-[#FAFBFD] p-3 sm:p-4 flex flex-col justify-between">
          <div>
            {/* Header within ERP */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-2.5">
              <div>
                <h4 className="font-display text-xs sm:text-sm font-bold text-campo-navy flex items-center gap-1.5">
                  <span>Autonomous Campus Command Hub</span>
                  <span className="rounded bg-teal-50 px-1.5 py-0.5 text-[9px] font-bold text-campo-teal-dark border border-teal-200/60">
                    AY 2026-27
                  </span>
                </h4>
                <p className="text-[10px] text-slate-500">
                  Engineering, Management &amp; Autonomous Campus Wings
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                All Modules Synced
              </span>
            </div>

            {/* 4 KPI Metric Tiles with Standardized Uniform Heights and Lively Load Effects */}
            <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2">
              {/* Tile 1: Enrolled */}
              <div className="flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-2.5 shadow-2xs h-[78px] hover:border-campo-teal/40 transition-colors">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 truncate">Enrolled</span>
                  <Users className="h-3 w-3 text-campo-navy shrink-0" />
                </div>
                <div className="font-display text-base font-extrabold text-campo-navy">
                  <AnimatedNumber value={8420} duration={1.5} delay={0.1} />
                </div>
                <div className="flex items-center justify-between text-[9px]">
                  <span className="font-bold text-emerald-600 flex items-center gap-0.5">
                    <TrendingUp className="h-2.5 w-2.5" />
                    <AnimatedNumber value={4.8} prefix="+" suffix="%" decimals={1} duration={1.4} delay={0.3} />
                  </span>
                  {/* Animated Mini Sparkline SVG */}
                  <svg className="w-12 h-3.5" viewBox="0 0 50 15" fill="none">
                    <motion.path
                      d="M1 12L12 8L24 10L36 4L49 2"
                      stroke="#00C5B5"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
                    />
                  </svg>
                </div>
              </div>

              {/* Tile 2: Attendance */}
              <div className="flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-2.5 shadow-2xs h-[78px] hover:border-campo-teal/40 transition-colors">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 truncate">Attendance</span>
                  <CheckCircle2 className="h-3 w-3 text-campo-teal-dark shrink-0" />
                </div>
                <div className="font-display text-base font-extrabold text-campo-navy">
                  <AnimatedNumber value={94.6} suffix="%" decimals={1} duration={1.5} delay={0.2} />
                </div>
                <div className="flex items-center justify-between text-[9px]">
                  <span className="font-medium text-slate-500">Live Biometrics</span>
                  {/* Animated Mini Sparkline SVG */}
                  <svg className="w-12 h-3.5" viewBox="0 0 50 15" fill="none">
                    <motion.path
                      d="M1 9L14 4L26 8L38 3L49 5"
                      stroke="#10B981"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                    />
                  </svg>
                </div>
              </div>

              {/* Tile 3: Fee Collection */}
              <div className="flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-2.5 shadow-2xs h-[78px] hover:border-campo-teal/40 transition-colors">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 truncate">Fees Realized</span>
                  <Wallet className="h-3 w-3 text-campo-navy shrink-0" />
                </div>
                <div className="font-display text-base font-extrabold text-campo-navy">
                  <AnimatedNumber value={14.82} prefix="₹" suffix=" Cr" decimals={2} duration={1.6} delay={0.3} />
                </div>
                <div className="flex items-center justify-between text-[9px]">
                  <span className="font-bold text-emerald-600">
                    <AnimatedNumber value={92.4} suffix="% Term" decimals={1} duration={1.4} delay={0.4} />
                  </span>
                  {/* Animated Mini Sparkline SVG */}
                  <svg className="w-12 h-3.5" viewBox="0 0 50 15" fill="none">
                    <motion.path
                      d="M1 13L13 11L25 6L37 4L49 1"
                      stroke="#071C46"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
                    />
                  </svg>
                </div>
              </div>

              {/* Tile 4: Faculty Active */}
              <div className="flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-2.5 shadow-2xs h-[78px] hover:border-campo-teal/40 transition-colors">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 truncate">Staff On-Duty</span>
                  <Building2 className="h-3 w-3 text-campo-teal-dark shrink-0" />
                </div>
                <div className="font-display text-base font-extrabold text-campo-navy">
                  <AnimatedNumber value={348} duration={1.5} delay={0.4} /> / 354
                </div>
                <div className="flex items-center justify-between text-[9px]">
                  <span className="font-medium text-slate-500">
                    <AnimatedNumber value={98.3} suffix="% Active" decimals={1} duration={1.4} delay={0.5} />
                  </span>
                  {/* Animated Mini Sparkline SVG */}
                  <svg className="w-12 h-3.5" viewBox="0 0 50 15" fill="none">
                    <motion.path
                      d="M1 8L15 8L28 5L40 5L49 2"
                      stroke="#00C5B5"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Visual Metrics Graphs Section with Lively Path Draw Animations */}
            <div className="mt-2.5 grid gap-2.5 sm:grid-cols-12">
              {/* Graph 1: Weekly Campus Attendance & Fee Inflow Area Chart */}
              <div className="rounded-xl border border-slate-200/90 bg-white p-3 shadow-2xs sm:col-span-7">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div>
                    <span className="font-display text-[11px] font-bold text-campo-navy block">
                      Weekly Attendance &amp; Fee Flow
                    </span>
                    <span className="text-[9px] text-slate-400">7-Day Biometric &amp; Gateway Reconciliation</span>
                  </div>
                  <div className="flex items-center gap-2 text-[9px]">
                    <span className="flex items-center gap-1 text-campo-navy font-semibold">
                      <span className="h-2 w-2 rounded-full bg-campo-navy" /> Fees
                    </span>
                    <span className="flex items-center gap-1 text-campo-teal-dark font-semibold">
                      <span className="h-2 w-2 rounded-full bg-campo-teal" /> Attendance
                    </span>
                  </div>
                </div>

                {/* Animated SVG Area Graph */}
                <div className="mt-2 relative h-28 w-full">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 340 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00C5B5" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#00C5B5" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="navyGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#071C46" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#071C46" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Subtle grid lines */}
                    <line x1="0" y1="25" x2="340" y2="25" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="0" y1="50" x2="340" y2="50" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="0" y1="75" x2="340" y2="75" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />

                    {/* Navy Fee Flow Area & Animated Stroke */}
                    <motion.path
                      d="M0 75 Q 55 50, 110 58 T 220 30 T 340 18 L 340 95 L 0 95 Z"
                      fill="url(#navyGrad)"
                      initial={{ opacity: 0, scaleY: 0 }}
                      whileInView={{ opacity: 1, scaleY: 1 }}
                      style={{ transformOrigin: 'bottom' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, delay: 0.4, ease: 'easeOut' }}
                    />
                    <motion.path
                      d="M0 75 Q 55 50, 110 58 T 220 30 T 340 18"
                      fill="none"
                      stroke="#071C46"
                      strokeWidth="2.2"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    />

                    {/* Teal Attendance Area & Animated Stroke */}
                    <motion.path
                      d="M0 60 Q 55 35, 110 40 T 220 22 T 340 10 L 340 95 L 0 95 Z"
                      fill="url(#tealGrad)"
                      initial={{ opacity: 0, scaleY: 0 }}
                      whileInView={{ opacity: 1, scaleY: 1 }}
                      style={{ transformOrigin: 'bottom' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, delay: 0.25, ease: 'easeOut' }}
                    />
                    <motion.path
                      d="M0 60 Q 55 35, 110 40 T 220 22 T 340 10"
                      fill="none"
                      stroke="#00C5B5"
                      strokeWidth="2.8"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    />

                    {/* Animated Milestone Dots */}
                    <motion.circle
                      cx="110"
                      cy="40"
                      r="3.5"
                      fill="#00C5B5"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8, type: 'spring', stiffness: 400 }}
                    />
                    <motion.circle
                      cx="220"
                      cy="22"
                      r="3.5"
                      fill="#00C5B5"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.1, type: 'spring', stiffness: 400 }}
                    />
                    <motion.circle
                      cx="340"
                      cy="10"
                      r="4.5"
                      fill="#00C5B5"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: [0, 1.4, 1], opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.4, type: 'spring', stiffness: 350 }}
                    />
                    <motion.circle
                      cx="340"
                      cy="18"
                      r="3.5"
                      fill="#071C46"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: [0, 1.3, 1], opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.5, type: 'spring', stiffness: 350 }}
                    />
                  </svg>
                </div>

                {/* X Axis Labels */}
                <div className="flex justify-between text-[9px] font-semibold text-slate-400 pt-1">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                </div>
              </div>

              {/* Graph 2: Department Intake vs Realization Multi-Bar Chart with Smooth Expanding Bars */}
              <div className="rounded-xl border border-slate-200/90 bg-white p-3 shadow-2xs sm:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-display text-[11px] font-bold text-campo-navy">
                      Branch Realization
                    </span>
                    <span className="text-[9px] text-emerald-600 font-bold">
                      <AnimatedNumber value={94} suffix="% Avg" duration={1.4} delay={0.3} />
                    </span>
                  </div>

                  <div className="mt-2.5 space-y-2">
                    <div>
                      <div className="flex justify-between text-[10px] font-medium">
                        <span className="text-campo-navy font-bold">CSE &amp; AI-DS</span>
                        <span className="text-slate-600 font-bold">
                          <AnimatedNumber value={98} suffix="% (1.2k)" duration={1.4} delay={0.25} />
                        </span>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                        <motion.div
                          initial={{ width: '0%' }}
                          whileInView={{ width: '98%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full rounded-full bg-gradient-to-r from-campo-navy via-campo-secondary to-campo-teal"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] font-medium">
                        <span className="text-campo-navy font-bold">Electronics (ECE)</span>
                        <span className="text-slate-600 font-bold">
                          <AnimatedNumber value={92} suffix="% (840)" duration={1.4} delay={0.4} />
                        </span>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                        <motion.div
                          initial={{ width: '0%' }}
                          whileInView={{ width: '92%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full rounded-full bg-gradient-to-r from-campo-navy via-campo-secondary to-campo-teal"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] font-medium">
                        <span className="text-campo-navy font-bold">Mechanical &amp; Civil</span>
                        <span className="text-slate-600 font-bold">
                          <AnimatedNumber value={86} suffix="% (680)" duration={1.4} delay={0.55} />
                        </span>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                        <motion.div
                          initial={{ width: '0%' }}
                          whileInView={{ width: '86%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.4, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full rounded-full bg-gradient-to-r from-campo-navy via-campo-secondary to-campo-teal"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-500">
                  <span>14,200 Total Capacity</span>
                  <span className="font-bold text-campo-teal-dark">All Seats Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Clean Status Strip */}
          <div className="mt-2.5 flex items-center justify-between border-t border-slate-200/80 pt-2 text-[10px] text-slate-500">
            <span className="flex items-center gap-1.5 font-medium truncate">
              <ShieldCheck className="h-3 w-3 text-campo-teal-dark shrink-0" />
              Institutional Core Directory • 99.98% Service Uptime
            </span>
            <span className="font-bold text-campo-navy shrink-0">Campo Platform</span>
          </div>
        </div>
      </div>
    </div>
  );
}
