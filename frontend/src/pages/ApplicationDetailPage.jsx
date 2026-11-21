import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Layers,
  Calendar,
  Building,
} from 'lucide-react';
import { applicationDetails } from '../data/applicationDetails';
import { revealEase } from '../components/MotionPrimitives';
import { CampoLogo } from '../components/CampoLogo';
import { LaptopMockup } from '../components/mockups/LaptopMockup';
import { MobileAppMockup } from '../components/mockups/MobileAppMockup';
import { SEO } from '../components/SEO';

// Staggered container variants for rock-solid repeatable scroll animations
const staggerGridVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const capabilityCardVariants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.48,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function ApplicationDetailPage({ appId = 'admissions-crm', onNavigate, onRequestDemo }) {
  const prefersReducedMotion = useReducedMotion();

  // Scroll to top when page opens or appId changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [appId]);

  const app = applicationDetails[appId] || applicationDetails['admissions-crm'];

  // Identify next application for quick navigation
  const appKeys = Object.keys(applicationDetails);
  const currentIndex = appKeys.indexOf(app.id);
  const nextAppId = appKeys[(currentIndex + 1) % appKeys.length];
  const nextApp = applicationDetails[nextAppId];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SEO
        title={`${app.name} — Institutional Campus ERP | Campo`}
        description={`${app.headline || app.tagline} Empower your institution with Campo's ${app.name}.`}
        keywords={`${app.name}, Campo ${app.name}, ${app.category}, campus ERP, institutional management software, college management India`}
        canonical={`https://campo.co.in/applications/${app.id}`}
        structuredData={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://campo.co.in/',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Applications',
                  item: 'https://campo.co.in/#applications',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: app.name,
                  item: `https://campo.co.in/applications/${app.id}`,
                },
              ],
            },
            {
              '@type': 'SoftwareApplication',
              name: `Campo ${app.name}`,
              applicationCategory: 'EducationalApplication',
              operatingSystem: 'Web, Android, iOS',
              description: app.headline || app.tagline,
              url: `https://campo.co.in/applications/${app.id}`,
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'INR',
              },
            },
          ],
        }}
      />
      {/* ========================================================
          HERO SECTION: EXPANDED CARD IMAGE BACKGROUND HERO (68-76vh)
          ======================================================== */}
      <section className="relative min-h-[66vh] sm:min-h-[70vh] lg:min-h-[76vh] flex flex-col justify-between overflow-hidden bg-slate-950 text-white pt-24 sm:pt-28 pb-8 sm:pb-14">
        {/* Background Image: The Exact High-Resolution Card Banner Image */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src={app.bannerImage}
            alt={app.name}
            className="h-full w-full object-cover object-right-top sm:object-center opacity-85 transition-transform duration-1000 scale-105"
          />
          {/* Multi-directional gradient wash ensuring high legibility while letting artwork shine */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />
          <div className="absolute inset-y-0 left-0 w-full lg:w-[65%] bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-transparent" />
        </div>

        {/* Top Breadcrumb Navigation Pill */}
        <div className="container-campo relative z-10 w-full mb-6 sm:mb-14">
          <nav aria-label="Breadcrumb" className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-slate-900/60 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs text-slate-300 backdrop-blur-md shadow-xs">
            <span
              className="hover:text-white cursor-pointer transition-colors font-medium"
              onClick={() => onNavigate('/')}
            >
              Home
            </span>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span
              className="hover:text-white cursor-pointer transition-colors font-medium"
              onClick={() => onNavigate('/', '#solutions')}
            >
              Modules
            </span>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className="text-campo-teal font-bold truncate max-w-[140px] sm:max-w-none">{app.name}</span>
          </nav>
        </div>

        {/* Hero Central Narrative: Title, Tagline & Direct Call to Action */}
        <div className="container-campo relative z-10 w-full my-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: revealEase }}
            className="max-w-3xl pt-2 sm:pt-4"
          >
            {/* Application Title */}
            <h1 className="font-display text-2xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              {app.name}
            </h1>

            {/* Tagline */}
            <p className="mt-2.5 sm:mt-3.5 text-sm sm:text-lg lg:text-xl font-medium text-slate-200 leading-snug">
              {app.tagline}
            </p>

            {/* CTAs inside Hero */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5">
              <button
                type="button"
                onClick={onRequestDemo}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-campo-teal px-6 py-3 text-sm font-bold text-campo-deep shadow-elevated transition-all hover:bg-[#19d6c6] hover:shadow-card active:scale-[0.99]"
              >
                <span>Request Live Demo for {app.shortName}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href="#features-section"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/40 active:scale-[0.99]"
              >
                <span>Explore Capabilities</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Floating Bottom Metrics Strip across the bottom of Hero */}
        <div className="container-campo relative z-10 w-full mt-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 pt-4 border-t border-white/15">
            {app.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-white/15 bg-slate-900/60 p-3 sm:p-3.5 backdrop-blur-md"
              >
                <span className="font-display text-lg sm:text-2xl font-black text-campo-teal block">
                  {m.value}
                </span>
                <span className="text-xs font-bold text-white block mt-0.5">
                  {m.label}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5 truncate">
                  {m.note}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          REMAINING HALF: IN-DEPTH DEDICATED CONTENT SECTIONS
          ======================================================== */}

      {/* 1. Executive Overview & Institutional Purpose */}
      <section className="section-padding bg-white border-b border-slate-200/80">
        <div className="container-campo">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-campo-teal-dark">
                Executive Purpose &amp; Impact
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-campo-navy leading-snug">
                {app.headline}
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                {app.overview}
              </p>
            </div>

            <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-slate-50/70 p-6 shadow-card space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                <ShieldCheck className="h-5 w-5 text-campo-teal-dark" />
                <h3 className="font-display text-sm font-bold text-campo-navy">
                  Campus Institutional Standards
                </h3>
              </div>
              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span><strong>Zero Data Duplication:</strong> Shares master records with all 12 modules seamlessly.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span><strong>Strict Role Scoping (RBAC):</strong> Granular permissions by branch, department, and role.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span><strong>Audit-Ready Logs:</strong> Every action is time-stamped for university and NAAC compliance.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Desktop / Mobile Workspace Showcase */}
      <section className="section-padding bg-slate-50/70 border-b border-slate-200/80 relative overflow-hidden">
        <div className="container-campo relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-campo-navy">
              {app.id === 'student-data'
                ? 'Student Portal & Mobile Companion'
                : 'Institutional Desktop Workspace'}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              {app.id === 'student-data'
                ? 'Unified student portal interface designed for real-time attendance, timetables, and fee transparency.'
                : 'High-velocity institutional interface designed for multi-branch autonomy, bulk approvals, and live operational visibility.'}
            </p>
          </div>

          <div className={app.id === 'student-data' ? 'max-w-[340px] sm:max-w-[380px] mx-auto px-2 sm:px-4' : 'max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-6'}>
            {app.id === 'student-data' ? (
              <MobileAppMockup
                screens={app.screens || (app.previewImage ? [app.previewImage] : [])}
                autoScroll={true}
                autoScrollInterval={4500}
              />
            ) : (
              <LaptopMockup
                screens={app.screens || (app.previewImage ? [app.previewImage] : [])}
                alt={`${app.name} Workspace Preview`}
                appTitle={`${app.name} • Institutional Console`}
                aspectRatio="16/8.5"
                autoScroll={true}
                autoScrollInterval={4500}
              />
            )}
          </div>
        </div>
      </section>

      {/* 3. Key Operational Capabilities (6 Focused Cards) */}
      <section id="features-section" className="section-padding bg-slate-50/60 border-b border-slate-200/80">
        <div className="container-campo">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, ease: revealEase }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-campo-teal-dark">
              Core System Capabilities
            </span>
            <h2 className="mt-1.5 font-display text-2xl sm:text-3xl font-extrabold text-campo-navy">
              Engineered for Autonomous Campus Workflows
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Each capability is built to eliminate manual clerical overhead and provide instant verification.
            </p>
          </motion.div>

          <motion.div
            variants={staggerGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {app.capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={`${app.id}-${cap.title}`}
                  variants={capabilityCardVariants}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-card transition-[border-color,box-shadow] duration-200 hover:border-campo-teal/70 hover:shadow-elevated"
                >
                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-campo-navy transition-[border-color,background-color,color] duration-200 group-hover:border-campo-teal/50 group-hover:bg-campo-teal/10 group-hover:text-campo-teal-dark">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-display text-base font-bold text-campo-navy transition-colors duration-200 group-hover:text-campo-secondary">
                      {cap.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-slate-600">
                      {cap.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-campo-teal-dark">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>{cap.benefit}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. Switch to Next Application Card */}
      <section className="py-12 bg-white border-b border-slate-200/80">
        <div className="container-campo">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 to-campo-navy text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-workspace">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-campo-teal block">
                Explore Next Application
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                {nextApp.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                {nextApp.tagline}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate(`/applications/${nextApp.id}`)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-campo-teal px-6 py-3 text-xs sm:text-sm font-bold text-campo-deep shadow-card hover:bg-[#19d6c6] shrink-0"
            >
              <span>View {nextApp.name}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Ready to Modernize - Bottom CTA */}
      <section className="section-padding bg-slate-50 text-center">
        <div className="container-campo max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-xs font-semibold text-slate-600 mb-4 shadow-2xs">
            <CampoLogo variant="dark" size="sm" />
            <span className="h-3 w-px bg-slate-300" />
            <span>Dedicated Implementation Support</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-campo-navy tracking-tight">
            Ready to deploy {app.name} at your institution?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Schedule a personalized walkthrough tailored to your college intake, course structure, and departmental rules.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <button
              type="button"
              onClick={onRequestDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-campo-navy px-7 py-3.5 text-sm font-bold text-white shadow-card hover:bg-campo-secondary transition-all"
            >
              <span>Schedule Live Campus Walkthrough</span>
              <ArrowRight className="h-4 w-4 text-campo-teal" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/', '#solutions')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
            >
              <span>View All 12 Modules</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
