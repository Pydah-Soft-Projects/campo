import React, { useState, useEffect, useRef } from 'react';
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
  ChevronLeft,
  BookOpen,
  MapPin,
  GraduationCap,
  Users,
  PhoneCall,
  FileText,
  Play,
  Pause,
} from 'lucide-react';
import { CampoLogo } from '../CampoLogo';
import studentAppScreen from '../../assets/campo-buddy-student-screen-2x.webp';
import parentAppScreen from '../../assets/campo-parent-app-screen-2x.webp';

export function MobileAppMockup({
  screens = [],
  screen = 'dashboard',
  activeSide: controlledActiveSide,
  defaultSide = 'student',
  onSideChange,
  autoScroll = true,
  autoScrollInterval = 4500,
  className = '',
  colorTheme = 'default',
}) {
  const isNavy = colorTheme === 'navy';
  const isScreenSlideshow = Array.isArray(screens) && screens.length > 0;

  // Normalized screens for slideshow mode
  const normalizedScreens = isScreenSlideshow
    ? screens.map((item, index) => {
      if (typeof item === 'string') {
        return { src: item, title: `Screen ${index + 1}` };
      }
      return {
        src: item.src,
        title: item.title || `Screen ${index + 1}`,
        description: item.description,
        alt: item.alt || item.title || `Screen ${index + 1}`,
      };
    })
    : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoScroll);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const hasMultiple = normalizedScreens.length > 1;
  const currentScreen = normalizedScreens[currentIndex] || null;

  useEffect(() => {
    if (!isScreenSlideshow || !hasMultiple || !isPlaying || isHovered) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % normalizedScreens.length);
    }, autoScrollInterval);

    return () => clearInterval(timer);
  }, [isScreenSlideshow, hasMultiple, isPlaying, isHovered, normalizedScreens.length, autoScrollInterval]);

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

  const onTouchStart = (e) => {
    if (!isScreenSlideshow) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e) => {
    if (!isScreenSlideshow) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const [internalSide, setInternalSide] = useState(defaultSide);
  const activeSide = controlledActiveSide !== undefined ? controlledActiveSide : internalSide;

  return (
    <div
      className={`relative mx-auto w-full select-none [transform-style:preserve-3d] ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Outside Left & Right Navigation Buttons for Screen Slideshow */}
      {isScreenSlideshow && hasMultiple && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous screen"
            className="hidden sm:flex absolute -left-7 md:-left-10 lg:-left-12 top-1/2 -translate-y-1/2 z-30 h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white text-slate-700 shadow-elevated border border-slate-200 transition-all duration-200 hover:bg-slate-50 hover:text-campo-navy hover:scale-110 hover:border-campo-teal/50 active:scale-95 cursor-pointer"
            title="Previous Screen"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next screen"
            className="hidden sm:flex absolute -right-7 md:-right-10 lg:-right-12 top-1/2 -translate-y-1/2 z-30 h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white text-slate-700 shadow-elevated border border-slate-200 transition-all duration-200 hover:bg-slate-50 hover:text-campo-navy hover:scale-110 hover:border-campo-teal/50 active:scale-95 cursor-pointer"
            title="Next Screen"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

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
              <div className={`h-1.5 w-1.5 rounded-full ${isNavy ? 'bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.8)]' : 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]'}`} />
              <div className={`h-2 w-0.5 rounded-full ${isNavy ? 'bg-blue-300' : 'bg-campo-teal'} animate-pulse`} />
            </div>
          </div>

          {/* Screen Display Area - Ultra-Crisp High-Definition OLED Display */}
          <div className={`relative overflow-hidden rounded-[40px] sm:rounded-[44px] bg-[#F8FAFC] text-slate-800 shadow-inner antialiased [text-rendering:optimizeLegibility] ${
            isScreenSlideshow
              ? 'aspect-[9/18.2] flex flex-col bg-white'
              : screen === 'alerts'
              ? 'aspect-[9/19.2] flex flex-col bg-[#071C46]'
              : ''
          }`}>
            {/* Subtle Edge Reflection */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/10 to-transparent z-40"
            />

            {/* Mobile Status Bar */}
            <div className={`relative z-30 flex items-center justify-between px-6 pt-3.5 pb-2 text-[11px] font-bold ${screen === 'alerts' ? 'text-white' : 'text-slate-900'} shrink-0`}>
              {screen === 'alerts' ? (
                <span className="opacity-0">09:41</span>
              ) : (
                <span className="tracking-tight font-extrabold">09:41</span>
              )}
              <div className="flex items-center gap-1.5">
                {/* 4-Bar Cellular Signal */}
                <div className="flex items-end gap-0.5 h-2.5">
                  <div className={`w-0.5 h-1 rounded-2xs ${screen === 'alerts' ? 'bg-white' : 'bg-slate-900'}`} />
                  <div className={`w-0.5 h-1.5 rounded-2xs ${screen === 'alerts' ? 'bg-white' : 'bg-slate-900'}`} />
                  <div className={`w-0.5 h-2 rounded-2xs ${screen === 'alerts' ? 'bg-white' : 'bg-slate-900'}`} />
                  <div className={`w-0.5 h-2.5 rounded-2xs ${screen === 'alerts' ? 'bg-white' : 'bg-slate-900'}`} />
                </div>
                {/* 5G Label */}
                <span className={`text-[10px] font-black tracking-tighter ${screen === 'alerts' ? 'text-white' : 'text-slate-900'}`}>5G</span>
                {/* Battery with 94% fill */}
                <div className={`relative h-2.5 w-4 rounded-xs border ${screen === 'alerts' ? 'border-white' : 'border-slate-900'} p-0.5 flex items-center`}>
                  <div className={`h-full w-[90%] ${screen === 'alerts' ? 'bg-white' : 'bg-slate-900'} rounded-2xs`} />
                  <div className={`absolute -right-0.5 h-1 w-0.5 rounded-r-xs ${screen === 'alerts' ? 'bg-white' : 'bg-slate-900'}`} />
                </div>
              </div>
            </div>

            {/* CASE 0: Reference Alert Notifications Lock Screen View */}
            {screen === 'alerts' ? (
              <div className="relative w-full flex-1 bg-[#071C46] px-3.5 pb-4 pt-1 text-white flex flex-col justify-between">
                {/* Lock Screen Clock & Date */}
                <div className="mt-1 mb-2 sm:mb-3.5 text-center">
                  <p className="font-outfit text-xs font-medium text-slate-300">
                    Thursday, 19 November
                  </p>
                  <p className="mt-0.5 sm:mt-1 font-outfit text-4xl xs:text-5xl font-bold tracking-tight text-white sm:text-6xl">
                    9:41
                  </p>
                </div>

                {/* 4 Reference Alert Cards with Smooth Stagger Animation & Zero Green */}
                <div className="space-y-2 sm:space-y-3">
                  {[
                    {
                      category: 'ACADEMICS',
                      time: 'now',
                      title: 'Attendance is slipping',
                      desc: 'Section B is below the usual level this week.',
                    },
                    {
                      category: 'ADMINISTRATIVE',
                      time: '2m',
                      title: 'Fee dues overdue',
                      desc: 'A group of students has pending fees. Reminders are queued.',
                    },
                    {
                      category: 'CAMPUS',
                      time: '5m',
                      title: 'Bus 6 is running late',
                      desc: 'About 15 minutes behind on its route. Parents notified.',
                    },
                    {
                      category: 'STUDENTS',
                      time: '9m',
                      title: 'Notice delivered',
                      desc: 'The circular reached every parent and student app.',
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.category}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.2 + index * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={{ scale: 1.02 }}
                      className="rounded-xl sm:rounded-2xl border border-white/80 bg-white/95 p-2.5 xs:p-3 sm:p-3.5 shadow-md backdrop-blur-md transition-all duration-200"
                    >
                      {/* Alert Header Row */}
                      <div className="flex items-center gap-1.5">
                        <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-campo-navy font-outfit text-[9px] font-bold text-white">
                          C
                        </div>
                        <span className="font-outfit text-[10px] font-bold tracking-wider text-campo-navy uppercase">
                          CAMPO · {item.category}
                        </span>
                        <span className="ml-auto font-outfit text-[10px] font-medium text-slate-400">
                          {item.time}
                        </span>
                      </div>

                      {/* Alert Title (Main Heading) */}
                      <h4 className="mt-1 font-outfit text-xs font-bold text-slate-900 sm:text-[13px] leading-tight">
                        {item.title}
                      </h4>

                      {/* Alert Message: hidden on mobile to show all 4 main headings, visible on desktop */}
                      <p className="hidden sm:block mt-0.5 font-sans text-[11px] leading-snug text-slate-600 sm:text-xs">
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Smartphone Home Indicator Bar */}
                <div className="mx-auto mt-3 sm:mt-5 h-1 w-28 rounded-full bg-white/70 shrink-0" />
              </div>
            ) : isScreenSlideshow ? (
              <>
                <div className="relative w-full flex-1 overflow-hidden bg-white flex items-center justify-center">
                  <AnimatePresence initial={false} mode="wait">
                    <motion.div
                      key={currentScreen.src}
                      initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full h-full flex items-center justify-center overflow-hidden"
                    >
                      <img
                        src={currentScreen.src}
                        alt={currentScreen.alt}
                        className="w-full h-full object-contain object-top"
                        loading="eager"
                        decoding="sync"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* iPhone Centered Home Indicator Bar */}
                <div className="relative z-30 h-4 w-full flex items-center justify-center shrink-0 bg-white">
                  <div className="h-1 w-24 rounded-full bg-slate-900/30" />
                </div>
              </>
            ) : (
              /* CASE B: Interactive Student vs Parent App View (for Download page) */
              <AnimatePresence mode="wait" initial={false}>
                {activeSide === 'student' ? (
                  <motion.div
                    key="student-side"
                    initial={{ opacity: 0, x: -24, filter: 'blur(2px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: 24, filter: 'blur(2px)' }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full flex flex-col bg-white overflow-hidden -mt-9 sm:-mt-10"
                  >
                    <img
                      src={studentAppScreen}
                      alt="Campo Buddy Student Mobile App"
                      loading="eager"
                      decoding="sync"
                      className="w-full h-auto object-contain block select-none"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="parent-side"
                    initial={{ opacity: 0, x: 24, filter: 'blur(2px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: -24, filter: 'blur(2px)' }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full flex flex-col bg-white overflow-hidden"
                  >
                    <img
                      src={parentAppScreen}
                      alt="Campo Parent Mobile App"
                      loading="eager"
                      decoding="sync"
                      className="w-full h-auto object-contain block select-none"
                    />
                    {/* iPhone Centered Home Indicator Bar */}
                    <div className="relative z-30 h-3.5 w-full flex items-center justify-center shrink-0 bg-white pb-1 pt-0.5">
                      <div className="h-1 w-24 rounded-full bg-slate-900/30" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>

      {/* Outside Bottom Controls Bar for Slideshow Mode */}
      {isScreenSlideshow && hasMultiple && (
        <div className="mt-6 flex flex-col items-center gap-3 px-2">
          {/* Active Screen Title & Counter */}
          <div className="flex items-center gap-2 text-center">
            <span className={`flex h-2 w-2 rounded-full ${isNavy ? 'bg-campo-navy' : 'bg-campo-teal'} animate-pulse shrink-0`} />
            <span className="text-xs font-bold text-campo-navy truncate max-w-[240px] sm:max-w-[300px]">
              {currentScreen.title}
            </span>
            <span className="text-[11px] font-medium text-slate-500 bg-slate-200/80 px-2 py-0.5 rounded-md shrink-0">
              {currentIndex + 1} of {normalizedScreens.length}
            </span>
          </div>

          {/* Dots & Play/Pause & Arrows */}
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
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${dotIdx === currentIndex
                    ? `w-7 ${isNavy ? 'bg-campo-navy' : 'bg-campo-teal'} shadow-xs`
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                  aria-label={`Go to screen ${dotIdx + 1}`}
                  title={normalizedScreens[dotIdx].title}
                />
              ))}
            </div>

            <span className="h-4 w-px bg-slate-300" />

            {/* Play/Pause Toggle */}
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-[11px] font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-campo-navy transition-colors cursor-pointer"
              title={isPlaying ? 'Pause Slideshow' : 'Resume Slideshow'}
            >
              {isPlaying ? (
                <>
                  <Pause className="h-3 w-3 text-slate-500" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className={`h-3 w-3 ${isNavy ? 'text-campo-navy fill-campo-navy' : 'text-campo-teal-dark fill-campo-teal-dark'}`} />
                  <span>Auto-play</span>
                </>
              )}
            </button>

            {/* Quick Prev / Next Buttons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrev}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-campo-navy active:scale-95 transition-all cursor-pointer"
                title="Previous Screen"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-campo-navy active:scale-95 transition-all cursor-pointer"
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
