import React from 'react';
import { motion } from 'framer-motion';
import {
  Smartphone,
  CheckCircle2,
  Calendar,
  CreditCard,
  UserCheck,
  Bell,
  ArrowRight,
} from 'lucide-react';
import { downloadConfig } from '../config/downloadConfig';
import {
  BrandCornerWave,
  Reveal,
  SectionBackground,
  SectionHeading,
  revealEase,
} from '../components/MotionPrimitives';
import { CampoLogo } from '../components/CampoLogo';

// Official Apple vector icon
function AppleIcon({ className = 'h-6 w-6' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 1.01-2.87-.96.04-2.1.65-2.77 1.42-.55.63-.99 1.66-.94 2.7.99.08 2.09-.5 2.7-1.25z" />
    </svg>
  );
}

// Crisp Android vector robot icon
function AndroidIcon({ className = 'h-6 w-6' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.4116 13.8533 8 12 8s-3.5902.4116-5.1367.9497L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396" />
    </svg>
  );
}

const studentFeatures = [
  {
    icon: CreditCard,
    title: 'Fees & Payment Receipts',
    description:
      'View pending semester dues, breakdown of tuition fees, and download verified digital receipts instantly.',
  },
  {
    icon: CheckCircle2,
    title: 'Real-Time Attendance',
    description:
      'Monitor daily subject-wise attendance, percentage cut-offs, biometric timestamps, and shortage warnings.',
  },
  {
    icon: Calendar,
    title: 'Timetables & Class Schedules',
    description:
      'Access your daily lecture schedule, faculty details, classroom numbers, and upcoming exam timetables.',
  },
  {
    icon: UserCheck,
    title: 'Student Profile & Digital ID',
    description:
      'View your institutional identity profile, enrolled courses, academic records, and live campus notifications.',
  },
];

const setupSteps = [
  {
    number: '01',
    title: 'Download & Install',
    description: 'Get the official Campo Student App on your Android or iOS device.',
  },
  {
    number: '02',
    title: 'Enter Institutional ID',
    description: 'Provide your unique campus code and your student registration number.',
  },
  {
    number: '03',
    title: 'Access Student Portal',
    description: 'Sign in to instantly access your fees, attendance, timetables, and campus profile.',
  },
];

export function DownloadAppPage({ onNavigateHome, onRequestDemo }) {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#F7FCFD] to-[#E8F8FA] pb-10 pt-24 sm:pb-16 sm:pt-36">
        <SectionBackground variant="default" opacityClass="opacity-75" />

        <div className="container-campo relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: revealEase }}
              className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-campo-teal-dark sm:gap-2 sm:px-3.5 sm:text-xs"
            >
              <Smartphone className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span>Campo Student App</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: revealEase }}
              className="mt-3 font-display text-2xl font-extrabold tracking-tight text-campo-navy xs:text-3xl sm:mt-4 sm:text-4xl md:text-5xl"
            >
              Your Campus Life in Your Pocket<span className="text-campo-teal">.</span>
            </motion.h1>
          </div>

          {/* Download Platforms Grid */}
          <div className="mx-auto mt-6 grid max-w-5xl gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2 lg:gap-8">
            {/* Android Card */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: revealEase }}
              className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-workspace transition-all duration-300 hover:border-campo-teal/40 xs:p-5 sm:rounded-3xl sm:p-7 md:p-8"
            >
              <BrandCornerWave className="h-24 w-48 opacity-30 sm:h-28 sm:w-56 sm:opacity-40" />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-3 sm:gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-campo-navy text-campo-teal shadow-card xs:h-12 xs:w-12 sm:h-14 sm:w-14 sm:rounded-2xl">
                    <AndroidIcon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <div className="flex flex-col items-end gap-1 text-right sm:gap-1.5">
                    <span className="rounded-full border border-teal-200 bg-teal-50 px-2 py-0.5 text-[10px] font-semibold text-campo-teal-dark sm:px-3 sm:py-1 sm:text-[11px]">
                      {downloadConfig.android.minOs}
                    </span>
                    <span className="text-[10px] font-medium text-slate-400 sm:text-[11px]">
                      Version {downloadConfig.android.version} • {downloadConfig.android.fileSize}
                    </span>
                  </div>
                </div>

                <div className="mt-3.5 flex items-center gap-2 sm:mt-5">
                  <h2 className="font-display text-lg font-bold text-campo-navy xs:text-xl sm:text-2xl">
                    {downloadConfig.android.name}
                  </h2>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-600 sm:text-xs">
                    Android
                  </span>
                </div>

                <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:mt-2 sm:text-sm">
                  The official mobile companion for students. Access fee payments, institutional profiles,
                  real-time attendance, daily timetables, and campus notifications directly on Android.
                </p>

                <ul className="mt-4 space-y-2 border-t border-slate-100 pt-3.5 sm:mt-5 sm:space-y-2.5 sm:pt-5">
                  <li className="flex items-start gap-2 text-xs font-medium text-slate-700 sm:gap-2.5 sm:text-sm">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-campo-teal-dark sm:h-4 sm:w-4" />
                    <span className="leading-snug">Fee dues tracking, online payments &amp; instant receipts</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs font-medium text-slate-700 sm:gap-2.5 sm:text-sm">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-campo-teal-dark sm:h-4 sm:w-4" />
                    <span className="leading-snug">Real-time attendance percentages &amp; shortage alerts</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs font-medium text-slate-700 sm:gap-2.5 sm:text-sm">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-campo-teal-dark sm:h-4 sm:w-4" />
                    <span className="leading-snug">Daily lecture timetables, room schedules &amp; exam notices</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs font-medium text-slate-700 sm:gap-2.5 sm:text-sm">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-campo-teal-dark sm:h-4 sm:w-4" />
                    <span className="leading-snug">Student profile, digital campus identity &amp; notifications</span>
                  </li>
                </ul>
              </div>

              {/* Android Action Button */}
              <div className="relative z-10 mt-5 border-t border-slate-100 pt-4 sm:mt-7 sm:pt-5">
                <a
                  href={downloadConfig.android.directApkUrl || downloadConfig.android.playStoreUrl || '#'}
                  download={downloadConfig.android.apkFileName || true}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-campo-navy px-4 py-3 text-xs font-semibold text-white shadow-card transition-all duration-200 hover:bg-campo-secondary hover:shadow-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-campo-teal sm:gap-3 sm:rounded-2xl sm:px-6 sm:py-3.5 sm:text-sm"
                >
                  <AndroidIcon className="h-4 w-4 shrink-0 text-campo-teal transition-transform duration-200 group-hover:scale-110 sm:h-5 sm:w-5" />
                  <span className="font-bold tracking-wide text-white">Try Beta Version</span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-campo-teal transition-transform duration-200 group-hover:translate-x-1 sm:h-4 sm:w-4" />
                </a>
              </div>
            </motion.div>

            {/* iOS Card */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: revealEase }}
              className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-workspace transition-all duration-300 hover:border-campo-teal/40 xs:p-5 sm:rounded-3xl sm:p-7 md:p-8"
            >
              <BrandCornerWave className="h-24 w-48 opacity-30 sm:h-28 sm:w-56 sm:opacity-40" />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-3 sm:gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-campo-navy text-white shadow-card xs:h-12 xs:w-12 sm:h-14 sm:w-14 sm:rounded-2xl">
                    <AppleIcon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <div className="flex flex-col items-end gap-1 text-right sm:gap-1.5">
                    <span className="rounded-full border border-teal-200 bg-teal-50 px-2 py-0.5 text-[10px] font-semibold text-campo-teal-dark sm:px-3 sm:py-1 sm:text-[11px]">
                      {downloadConfig.ios.minOs}
                    </span>
                    <span className="text-[10px] font-medium text-slate-400 sm:text-[11px]">
                      Version {downloadConfig.ios.version} • {downloadConfig.ios.fileSize}
                    </span>
                  </div>
                </div>

                <div className="mt-3.5 flex items-center gap-2 sm:mt-5">
                  <h2 className="font-display text-lg font-bold text-campo-navy xs:text-xl sm:text-2xl">
                    {downloadConfig.ios.name}
                  </h2>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-600 sm:text-xs">
                    iOS
                  </span>
                </div>

                <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:mt-2 sm:text-sm">
                  The official mobile companion for students on iOS. Access fee payments, institutional profiles,
                  real-time attendance, daily timetables, and campus notifications with FaceID security.
                </p>

                <ul className="mt-4 space-y-2 border-t border-slate-100 pt-3.5 sm:mt-5 sm:space-y-2.5 sm:pt-5">
                  <li className="flex items-start gap-2 text-xs font-medium text-slate-700 sm:gap-2.5 sm:text-sm">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-campo-teal-dark sm:h-4 sm:w-4" />
                    <span className="leading-snug">Fee dues tracking, online payments &amp; instant receipts</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs font-medium text-slate-700 sm:gap-2.5 sm:text-sm">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-campo-teal-dark sm:h-4 sm:w-4" />
                    <span className="leading-snug">Real-time attendance percentages &amp; shortage alerts</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs font-medium text-slate-700 sm:gap-2.5 sm:text-sm">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-campo-teal-dark sm:h-4 sm:w-4" />
                    <span className="leading-snug">Daily lecture timetables, room schedules &amp; exam notices</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs font-medium text-slate-700 sm:gap-2.5 sm:text-sm">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-campo-teal-dark sm:h-4 sm:w-4" />
                    <span className="leading-snug">Student profile, digital campus identity &amp; notifications</span>
                  </li>
                </ul>
              </div>

              {/* iOS Action Button */}
              <div className="relative z-10 mt-5 border-t border-slate-100 pt-4 sm:mt-7 sm:pt-5">
                <div className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-xs font-semibold text-slate-600 shadow-sm select-none sm:gap-3 sm:rounded-2xl sm:px-6 sm:py-3.5 sm:text-sm">
                  <AppleIcon className="h-4 w-4 shrink-0 text-slate-500 sm:h-5 sm:w-5" />
                  <span className="font-bold text-slate-700">Coming Soon</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4 Key Student Capabilities Grid */}
      <section className="section-padding relative overflow-hidden border-y border-slate-200/80 bg-campo-surface">
        <SectionBackground variant="flipX" opacityClass="opacity-75" />

        <div className="container-campo relative z-10 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            index="01"
            label="Student Mobile Portal"
            title="Everything You Need for Campus Academic Life."
            description="Fee status, attendance records, lecture timetables, and campus notifications directly on your mobile screen."
            align="center"
          />

          <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {studentFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.16 }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.06,
                    ease: revealEase,
                  }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-campo-teal/40 hover:shadow-elevated sm:rounded-2xl sm:p-6"
                >
                  <BrandCornerWave className="h-16 w-36 opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
                  <div className="relative z-10">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-campo-navy text-campo-teal shadow-sm transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11 sm:rounded-xl">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <h3 className="mt-4 font-display text-base font-bold text-campo-navy sm:mt-5 sm:text-lg">
                      {feat.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:mt-2 sm:text-sm">
                      {feat.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3 Step Setup Guide */}
      <section className="section-padding relative overflow-hidden bg-white">
        <div className="container-campo relative z-10 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            index="02"
            label="Getting Started"
            title="Three Simple Steps to Get Connected."
            description="Log in with your institution code and student roll number to access your academic records."
            align="center"
          />

          <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-3">
            {setupSteps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.16 }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.1,
                  ease: revealEase,
                }}
                className="relative rounded-xl border border-slate-200 bg-campo-surface p-4 shadow-card transition-all duration-300 hover:border-campo-teal/40 sm:rounded-2xl sm:p-7 md:p-8"
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-campo-navy font-display text-xs font-extrabold text-campo-teal shadow-sm sm:h-10 sm:w-10 sm:rounded-xl sm:text-sm">
                  {step.number}
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-campo-navy sm:mt-5 sm:text-xl">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:mt-2.5 sm:text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Deployment Banner */}
      <section className="border-t border-slate-200/80 bg-white py-10 sm:py-16">
        <div className="container-campo px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-campo-secondary bg-gradient-to-br from-campo-navy via-campo-navy to-campo-deep p-6 text-white shadow-workspace sm:rounded-3xl sm:p-10 lg:p-14">
              <BrandCornerWave className="h-28 w-60 opacity-80 sm:h-44 sm:w-[440px] sm:opacity-90" />
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 z-10 w-1.5 bg-campo-teal"
              />

              <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                <div className="max-w-2xl">
                  <div className="mb-3 flex flex-wrap items-center gap-2.5 sm:mb-4 sm:gap-3">
                    <CampoLogo variant="light" size="sm" />
                    <span aria-hidden="true" className="h-4 w-px bg-white/20" />
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-campo-teal sm:text-xs">
                      Institution-Wide Rollout
                    </p>
                  </div>

                  <h2 className="font-display text-xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
                    Deploy the Campo Student App for Your Entire Institution
                  </h2>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:mt-3 sm:text-sm lg:text-base">
                    Empower your students with seamless fee tracking, digital identity, live attendance,
                    and timetables. Fully connected with Campo's administrative backend.
                  </p>
                </div>

                <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3 lg:shrink-0">
                  <button
                    type="button"
                    onClick={onRequestDemo}
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-campo-teal px-5 py-3 text-xs font-semibold text-campo-deep shadow-card transition-all duration-200 hover:bg-[#19d6c6] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-campo-navy sm:px-6 sm:py-3.5 sm:text-sm"
                  >
                    Request Institutional Demo
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 sm:h-4 sm:w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={onNavigateHome}
                    className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-xs font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white/40 hover:bg-white/15 sm:px-6 sm:py-3.5 sm:text-sm"
                  >
                    Back to Platform Overview
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
