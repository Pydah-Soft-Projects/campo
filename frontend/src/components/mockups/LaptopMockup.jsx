import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Users,
  Calendar,
  Layers,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from 'lucide-react';
import { CampoLogo } from '../CampoLogo';

/**
 * LaptopMockup Component
 * 
 * A photorealistic, responsive ultrabook laptop mockup with:
 * - OUTSIDE next & previous navigation controls (clean unobstructed screen)
 * - Auto-scrolling / auto-advancing slideshow with pause on hover
 * - Outside bottom control bar with dot indicators, active title, and play/pause
 * - Crisp Light-mode UI
 * 
 * Props:
 * - screens: Array<{ src: string, title?: string, description?: string, alt?: string }>
 * - images: Array<string | { src: string, title?: string }>
 * - imageSrc: string (single image fallback)
 * - alt: string
 * - aspectRatio: '16/10' | '16/9' | '16/8.5'
 * - autoScroll: boolean (defaults to true)
 * - autoScrollInterval: number (ms, defaults to 4500)
 * - className: string
 * - showReflection: boolean
 * - showCamera: boolean
 * - appTitle: string
 */
export function LaptopMockup({
  screens = [],
  images = [],
  imageSrc,
  alt = 'Campo Workspace Preview',
  children,
  aspectRatio = '16/8.5',
  autoScroll = true,
  autoScrollInterval = 4500,
  className = '',
  showReflection = true,
  showCamera = true,
  appTitle = 'Campo Institutional Console',
}) {
  // Normalize incoming images/screens into a unified array
  const rawList = screens.length > 0 ? screens : images.length > 0 ? images : imageSrc ? [imageSrc] : [];
  const normalizedScreens = rawList.map((item, index) => {
    if (typeof item === 'string') {
      return { src: item, title: `Screen ${index + 1}`, alt: `${alt} ${index + 1}` };
    }
    return {
      src: item.src,
      title: item.title || `Screen ${index + 1}`,
      description: item.description,
      alt: item.alt || item.title || `${alt} ${index + 1}`,
    };
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoScroll);

  const hasMultiple = normalizedScreens.length > 1;
  const currentScreen = normalizedScreens[currentIndex] || null;

  // Auto-scrolling / auto-advancing timer
  useEffect(() => {
    if (!hasMultiple || !isPlaying || isHovered) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % normalizedScreens.length);
    }, autoScrollInterval);

    return () => clearInterval(timer);
  }, [hasMultiple, isPlaying, isHovered, normalizedScreens.length, autoScrollInterval]);

  const handleNext = () => {
    if (!hasMultiple) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % normalizedScreens.length);
  };

  const handlePrev = () => {
    if (!hasMultiple) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + normalizedScreens.length) % normalizedScreens.length);
  };

  const aspectClass =
    aspectRatio === '16/9'
      ? 'aspect-[16/9]'
      : aspectRatio === '16/8.5'
      ? 'aspect-[16/8.5]'
      : 'aspect-[16/10]';

  return (
    <div
      className={`relative mx-auto w-full select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ========================================================
          OUTSIDE LEFT & RIGHT NAVIGATION CONTROLS (DESKTOP / TABLET)
          ======================================================== */}
      {hasMultiple && (
        <>
          {/* Outside Left Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous screen"
            className="absolute -left-3 sm:-left-6 md:-left-10 lg:-left-14 top-[45%] -translate-y-1/2 z-30 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white text-slate-700 shadow-elevated border border-slate-200 transition-all duration-200 hover:bg-slate-50 hover:text-campo-navy hover:scale-110 hover:border-campo-teal/50 active:scale-95"
            title="Previous Screen"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Outside Right Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next screen"
            className="absolute -right-3 sm:-right-6 md:-right-10 lg:-right-14 top-[45%] -translate-y-1/2 z-30 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white text-slate-700 shadow-elevated border border-slate-200 transition-all duration-200 hover:bg-slate-50 hover:text-campo-navy hover:scale-110 hover:border-campo-teal/50 active:scale-95"
            title="Next Screen"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </>
      )}

      {/* ========================================================
          1. DISPLAY LID / SCREEN HOUSING (PREMIUM SILVER ALUMINUM)
          ======================================================== */}
      <div className="relative mx-auto w-full rounded-t-2xl sm:rounded-t-[22px] bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 p-[3px] sm:p-[4px] shadow-[0_20px_50px_-10px_rgba(15,23,42,0.18),0_0_0_1px_rgba(203,213,225,0.8)]">
        {/* Slim Black Glass Display Bezel */}
        <div className="relative overflow-hidden rounded-t-[14px] sm:rounded-t-[18px] bg-slate-900 p-2 sm:p-2.5 pb-2.5 sm:pb-3 ring-1 ring-slate-800">
          {/* Top Center Camera Housing */}
          {showCamera && (
            <div className="absolute top-1 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-950/90 border border-slate-700/60 shadow-2xs">
              <div className="h-1 w-1 rounded-full bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.8)]" />
              <div className="relative h-2 w-2 rounded-full bg-[#0a0f1d] ring-1 ring-slate-700 flex items-center justify-center">
                <div className="h-0.5 w-0.5 rounded-full bg-indigo-400/90" />
              </div>
            </div>
          )}

          {/* Actual Screen Display Area - 100% UNOBSTRUCTED SCREEN */}
          <div className={`relative w-full overflow-hidden rounded-lg sm:rounded-xl bg-slate-100 text-slate-800 shadow-inner ${aspectClass}`}>
            {/* Top Browser Chrome Navigation Bar */}
            <div className="relative z-20 flex items-center justify-between px-3 sm:px-4 py-2 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                {/* Window Traffic Lights */}
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] border border-black/10" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e] border border-black/10" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#28c840] border border-black/10" />
                </div>

                {/* App / Active Screen Tab */}
                <div className="hidden sm:flex items-center gap-1.5 ml-2 px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[11px] text-slate-700">
                  <CampoLogo variant="dark" size="sm" />
                  <span className="font-semibold text-campo-navy truncate max-w-[220px] lg:max-w-[320px]">
                    {currentScreen?.title || appTitle}
                  </span>
                </div>
              </div>

              {/* Right Status Indicator */}
              <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                {hasMultiple && (
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                    {currentIndex + 1} / {normalizedScreens.length}
                  </span>
                )}
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium">
                  <ShieldCheck className="h-3 w-3 text-emerald-600" />
                  <span className="hidden sm:inline text-[10px]">Campus Cloud Live</span>
                </div>
              </div>
            </div>

            {/* Photorealistic Screen Glass Sheen Overlay */}
            {showReflection && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-y-[60%] -left-[40%] w-[180%] rotate-25 bg-gradient-to-r from-transparent via-white/12 to-transparent z-20"
              />
            )}

            {/* Screen Content Body */}
            {currentScreen ? (
              /* Case A: Screen image is present (No inside navigation covering the image) */
              <div className="relative h-[calc(100%-37px)] w-full overflow-hidden bg-slate-100">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={currentScreen.src}
                    initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="h-full w-full flex items-start justify-center bg-slate-100"
                  >
                    <img
                      src={currentScreen.src}
                      alt={currentScreen.alt}
                      className={`h-full w-full transition-transform duration-500 ${
                        currentScreen.fit === 'contain'
                          ? 'object-contain object-center p-2 sm:p-3'
                          : 'object-cover object-top'
                      }`}
                      loading="lazy"
                      decoding="async"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : children ? (
              /* Case B: Custom React children passed */
              <div className="h-[calc(100%-37px)] w-full overflow-auto bg-slate-50 text-slate-900">
                {children}
              </div>
            ) : (
              /* Case C: Clean, Modern Light-Mode Institutional Dashboard Fallback */
              <div className="h-[calc(100%-37px)] w-full flex flex-col bg-slate-50 font-sans text-xs">
                <div className="flex-1 p-3 sm:p-5 grid grid-cols-12 gap-3 sm:gap-4 overflow-hidden bg-slate-100/60">
                  <div className="hidden md:flex md:col-span-3 flex-col justify-between rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
                    <div className="space-y-1">
                      <div className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-campo-teal-dark">
                        Platform Navigation
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-teal-50 text-campo-teal-dark font-semibold text-[11px] border border-teal-200">
                        <Layers className="h-3.5 w-3.5 text-campo-teal" />
                        <span>Active Module</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 text-[11px]">
                        <Users className="h-3.5 w-3.5 text-slate-400" />
                        <span>Student Profiles</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 text-[11px]">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        <span>Academic Timetable</span>
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 text-[11px]">
                        <TrendingUp className="h-3.5 w-3.5 text-slate-400" />
                        <span>Institutional Reports</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[10px] text-slate-600">
                      <div className="font-bold text-campo-navy flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3 text-campo-teal-dark" />
                        <span>RBAC Governance</span>
                      </div>
                      <div className="text-[9px] text-slate-500 mt-0.5">Role-scoped data access</div>
                    </div>
                  </div>

                  <div className="col-span-12 md:col-span-9 flex flex-col justify-between gap-3">
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      <div className="rounded-xl border border-slate-200 bg-white p-2.5 sm:p-3 shadow-2xs">
                        <span className="text-[10px] font-medium text-slate-500 block">Verified Records</span>
                        <span className="font-display text-base sm:text-xl font-black text-campo-navy mt-0.5 block">12,480+</span>
                        <span className="text-[9px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                          <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600" /> 100% Audit Ready
                        </span>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-white p-2.5 sm:p-3 shadow-2xs">
                        <span className="text-[10px] font-medium text-slate-500 block">Operational Latency</span>
                        <span className="font-display text-base sm:text-xl font-black text-campo-teal-dark mt-0.5 block">0 Sec</span>
                        <span className="text-[9px] text-slate-500 block mt-0.5">Zero Clerical Delay</span>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-white p-2.5 sm:p-3 shadow-2xs">
                        <span className="text-[10px] font-medium text-slate-500 block">System Uptime</span>
                        <span className="font-display text-base sm:text-xl font-black text-emerald-700 mt-0.5 block">99.98%</span>
                        <span className="text-[9px] text-slate-500 block mt-0.5">High-Availability Cloud</span>
                      </div>
                    </div>

                    <div className="flex-1 rounded-xl border border-slate-200 bg-white p-3 sm:p-4 shadow-2xs flex flex-col justify-between">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <span className="text-xs font-bold text-campo-navy flex items-center gap-1.5">
                          <Sparkles className="h-3.5 w-3.5 text-campo-teal-dark" />
                          Institutional Data Flow &amp; Connected Services
                        </span>
                        <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          Automated Sync
                        </span>
                      </div>

                      <div className="my-auto py-2 grid grid-cols-4 gap-2">
                        {[
                          { title: 'Admissions CRM', metric: '100% Converted' },
                          { title: 'Student Records', metric: 'Profiles Verified' },
                          { title: 'Finance & Ledgers', metric: 'Zero Discrepancy' },
                          { title: 'Academic Operations', metric: 'Live Rosters' },
                        ].map((stage, i) => (
                          <div key={stage.title} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                            <span className="text-[10px] font-bold text-campo-navy block truncate">{stage.title}</span>
                            <span className="text-[9px] text-slate-500 block mt-0.5 truncate">{stage.metric}</span>
                            <div className="h-1.5 w-full bg-slate-200 rounded-full mt-2 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-campo-teal to-emerald-500 rounded-full"
                                style={{ width: `${82 + i * 5}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-100">
                        <span>Central Master Database • Zero Duplicate Work</span>
                        <span className="text-emerald-700 font-semibold">Synchronized Across All 12 Modules</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================
          2. LAPTOP HINGE (SILVER FINISH)
          ======================================================== */}
      <div className="relative mx-auto h-2 sm:h-2.5 w-24 sm:w-36 -mt-[1px] rounded-b-md bg-gradient-to-b from-slate-400 via-slate-300 to-slate-400 shadow-inner z-10 border-t border-slate-300" />

      {/* ========================================================
          3. LAPTOP BASE / LOWER CHASSIS (SILVER ALUMINUM LIP)
          ======================================================== */}
      <div className="relative mx-auto w-[105%] -ml-[2.5%] sm:w-[107%] sm:-ml-[3.5%] h-3 sm:h-4 rounded-b-xl sm:rounded-b-2xl bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 border-t border-white shadow-[0_15px_30px_-5px_rgba(15,23,42,0.18)]">
        {/* Front Thumb Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 sm:w-20 h-1 sm:h-1.5 rounded-b-md bg-slate-400/80 shadow-inner" />
        {/* Subtle Chamfer Highlight */}
        <div className="absolute inset-x-0 bottom-0 h-0.5 rounded-b-xl bg-gradient-to-r from-transparent via-white/80 to-transparent" />
      </div>

      {/* ========================================================
          4. DESK CONTACT SHADOW
          ======================================================== */}
      <div
        aria-hidden="true"
        className="mx-auto w-[96%] h-3 sm:h-4 bg-gradient-to-b from-slate-400/25 via-slate-400/10 to-transparent blur-md rounded-full -mt-0.5"
      />

      {/* ========================================================
          5. OUTSIDE BOTTOM CONTROLS & AUTO-SCROLL INDICATOR
          ======================================================== */}
      {hasMultiple && (
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
          {/* Left: Active Screen Title & Counter */}
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 rounded-full bg-campo-teal animate-pulse" />
            <span className="text-xs font-bold text-campo-navy">
              {currentScreen.title}
            </span>
            <span className="text-[11px] font-medium text-slate-500 bg-slate-200/80 px-2 py-0.5 rounded-md">
              {currentIndex + 1} of {normalizedScreens.length}
            </span>
          </div>

          {/* Center / Right: Clickable Dots & Prev/Next & Play/Pause */}
          <div className="flex items-center gap-3">
            {/* Clickable Dots */}
            <div className="flex items-center gap-1.5">
              {normalizedScreens.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => {
                    setDirection(dotIdx > currentIndex ? 1 : -1);
                    setCurrentIndex(dotIdx);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    dotIdx === currentIndex
                      ? 'w-7 bg-campo-teal shadow-xs'
                      : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to screen ${dotIdx + 1}`}
                  title={normalizedScreens[dotIdx].title}
                />
              ))}
            </div>

            <span className="h-4 w-px bg-slate-300" />

            {/* Play/Pause Toggle for Auto-Scroll */}
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-[11px] font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-campo-navy transition-colors"
              title={isPlaying ? 'Pause Auto-scroll' : 'Resume Auto-scroll'}
            >
              {isPlaying ? (
                <>
                  <Pause className="h-3 w-3 text-slate-500" />
                  <span className="hidden sm:inline">Pause</span>
                </>
              ) : (
                <>
                  <Play className="h-3 w-3 text-campo-teal-dark fill-campo-teal-dark" />
                  <span className="hidden sm:inline">Auto-play</span>
                </>
              )}
            </button>

            {/* Quick Prev / Next Buttons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrev}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-campo-navy active:scale-95 transition-all"
                title="Previous Screen"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-campo-navy active:scale-95 transition-all"
                title="Next Screen"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
