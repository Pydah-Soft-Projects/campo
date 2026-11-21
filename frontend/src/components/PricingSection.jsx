import React, { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Plug,
  Sliders,
  Play,
} from 'lucide-react';
import {
  pricingPlans,
  integrationHighlights,
  pickPlugPlaySteps,
} from '../data/campoData';
import { SectionHeading, revealEase } from './MotionPrimitives';
import campusHeroImg from '../assets/campus-hero.webp';

// 3 Signature Campo Blue Tiers:
// 1st Card: Core (Deep Marine Blue)
// 2nd Card: Campus (Signature Campo Navy Blue - Flagship)
// 3rd Card: Campus AI (Enterprise Midnight Sapphire Blue)
const planColorSchemes = {
  core: {
    // 1st Card: Clean Light Slate (Foundation Tier)
    cardBg: 'bg-white hover:bg-slate-50/50 text-slate-900',
    cardBorder: 'border-2 border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-md',
    textColor: 'text-campo-navy',
    priceColor: 'text-slate-900 font-black',
    subtextColor: 'text-slate-600',
    billingColor: 'text-slate-500 font-semibold',
    borderDivider: 'border-slate-200/80',
    badgeClass: 'bg-slate-100 text-slate-700 border border-slate-200 shadow-xs font-semibold',
    pillText: 'text-slate-600 bg-slate-100 border border-slate-200 font-semibold',
    categoryBox: 'bg-slate-50/80 border border-slate-200/80 hover:bg-slate-100/90 text-slate-700 shadow-xs',
    categoryTitle: 'text-slate-900 font-bold',
    categoryModules: 'text-slate-600',
    checkColor: 'text-slate-500',
    ctaButton: 'bg-campo-navy text-white hover:bg-slate-800 shadow-sm font-bold transition-all',
    peekBadge: 'bg-slate-100 text-slate-700 border border-slate-200',
    peekCheck: 'text-slate-600',
    peekText: 'text-slate-700',
  },
  campus: {
    // 2nd Card: Highlighted Light Campo Teal (Signature Flagship Hero)
    cardBg: 'bg-gradient-to-b from-teal-50 via-white to-white text-slate-900',
    cardBorder: 'border-2 border-campo-teal shadow-[0_12px_36px_-8px_rgba(0,197,181,0.22)] ring-2 ring-campo-teal/20',
    textColor: 'text-campo-navy',
    priceColor: 'text-campo-teal font-black',
    subtextColor: 'text-slate-600',
    billingColor: 'text-teal-700 font-semibold',
    borderDivider: 'border-teal-200/60',
    badgeClass: 'bg-campo-teal text-campo-deep border border-white/60 shadow-sm font-bold',
    pillText: 'text-teal-700 bg-teal-50 border border-teal-200 font-bold',
    categoryBox: 'bg-teal-50/60 border border-teal-200/80 hover:bg-teal-50/95 text-slate-700 shadow-xs',
    categoryTitle: 'text-campo-navy font-bold',
    categoryModules: 'text-slate-600',
    checkColor: 'text-campo-teal',
    ctaButton: 'bg-campo-teal text-campo-deep hover:bg-[#19d6c6] hover:shadow-[0_4px_20px_rgba(0,197,181,0.35)] shadow-md font-black transition-all',
    peekBadge: 'bg-campo-teal text-campo-deep',
    peekCheck: 'text-campo-teal',
    peekText: 'text-teal-700',
  },
  'campus-ai': {
    // 3rd Card: Clean Light Indigo (Enterprise Intelligence)
    cardBg: 'bg-gradient-to-b from-indigo-50 via-white to-white text-slate-900',
    cardBorder: 'border-2 border-indigo-200 hover:border-indigo-300 shadow-sm hover:shadow-md',
    textColor: 'text-campo-navy',
    priceColor: 'text-indigo-600 font-black',
    subtextColor: 'text-slate-600',
    billingColor: 'text-indigo-600/90 font-semibold',
    borderDivider: 'border-indigo-100',
    badgeClass: 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs font-bold',
    pillText: 'text-indigo-700 bg-indigo-50 border border-indigo-200 font-semibold',
    categoryBox: 'bg-indigo-50/50 border border-indigo-100 hover:bg-indigo-50/85 text-slate-700 shadow-xs',
    categoryTitle: 'text-indigo-950 font-bold',
    categoryModules: 'text-slate-600',
    checkColor: 'text-indigo-600',
    ctaButton: 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md font-bold transition-all',
    peekBadge: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
    peekCheck: 'text-indigo-600',
    peekText: 'text-indigo-700',
  },
};

const pricingAmbientStyles = `
/* --- Card Base Elevation & Smooth Interaction --- */
.group {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
}
@media (min-width: 1024px) {
  .group:hover {
    transform: translateY(-5px);
  }
}

/* --- Premium Subtle Edge Lighting for Light Cards --- */
.card-edge-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  transition: opacity 0.5s ease;
}
.edge-core {
  box-shadow: inset 0 1px 2px 0 rgba(255, 255, 255, 0.95);
}
.edge-campus {
  box-shadow: inset 0 1px 2px 0 rgba(255, 255, 255, 0.95), inset 0 0 24px -4px rgba(0, 197, 181, 0.10);
}
.edge-campus-ai {
  box-shadow: inset 0 1px 2px 0 rgba(255, 255, 255, 0.95);
}
.group:hover .card-edge-glow {
  opacity: 1.2;
}

/* --- Ambient Corner Spotlight Pulse --- */
@keyframes aurora-ambient-breathe {
  0%, 100% {
    opacity: 0.55;
    transform: scale(1);
  }
  50% {
    opacity: 0.95;
    transform: scale(1.15);
  }
}

.aurora-ambient-pulse {
  animation: aurora-ambient-breathe 8s ease-in-out infinite alternate;
  will-change: transform, opacity;
}

/* --- Reduced Motion Support --- */
@media (prefers-reduced-motion: reduce) {
  .aurora-ambient-pulse {
    animation: none !important;
  }
  .group:hover {
    transform: none !important;
  }
}
`;

// Color definitions for plan ambient highlights & professional one-line wave on light cards
const oneLineWaveThemes = {
  core: {
    // Refined Slate Sky Blue
    stroke: '#0284C7',
    glow: 'rgba(2, 132, 199, 0.18)',
    feather: 'rgba(2, 132, 199, 0.035)',
    spotlight: 'rgba(2, 132, 199, 0.04)',
    subSpotlight: 'rgba(14, 165, 233, 0.02)',
  },
  campus: {
    // Signature Campo Teal
    stroke: '#0D9488',
    glow: 'rgba(13, 148, 136, 0.22)',
    feather: 'rgba(13, 148, 136, 0.045)',
    spotlight: 'rgba(13, 148, 136, 0.06)',
    subSpotlight: 'rgba(20, 184, 166, 0.03)',
  },
  'campus-ai': {
    // Refined Indigo
    stroke: '#6366F1',
    glow: 'rgba(99, 102, 241, 0.18)',
    feather: 'rgba(99, 102, 241, 0.035)',
    spotlight: 'rgba(99, 102, 241, 0.05)',
    subSpotlight: 'rgba(79, 70, 229, 0.02)',
  },
};

// =========================================================================
// Simple One Line Wave Engine (Hidden per user request)
// =========================================================================
function SimpleOneLineWaveCanvas() {
  return null;
}

// Card Ambient Lighting Component (Soft Edge Glow & Subdued Corner Accents)
function CardAmbientBackground({ planId, petalShape, cardIndex = 1, totalCards = 3 }) {
  const theme = oneLineWaveThemes[planId] || oneLineWaveThemes.campus;

  return (
    <div className={`absolute inset-0 overflow-hidden ${petalShape} pointer-events-none z-0`}>
      {/* Premium Edge Lighting (Subdued internal border glow) */}
      <div className={`card-edge-glow edge-${planId}`} />

      {/* Top Right Subtle Spotlight */}
      <div
        className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none aurora-ambient-pulse"
        style={{
          background: `radial-gradient(circle, ${theme.spotlight} 0%, transparent 68%)`,
          filter: 'blur(36px)',
        }}
      />

      {/* Bottom Left Subtle Accent Spotlight */}
      <div
        className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full pointer-events-none aurora-ambient-pulse"
        style={{
          background: `radial-gradient(circle, ${theme.subSpotlight} 0%, transparent 68%)`,
          filter: 'blur(32px)',
          animationDelay: '-4s',
        }}
      />

      {/* Wave background hidden per user request */}
    </div>
  );
}

export function PricingSection({ onRequestDemo }) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(1); // Default to Campus (Index 1 - Most Popular)
  const lastSwipeTime = useRef(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : pricingPlans.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < pricingPlans.length - 1 ? prev + 1 : 0));
  };

  // Safe debounced swipe trigger to prevent duplicate triggers from simultaneous drag/touch events
  const triggerSwipe = (direction) => {
    const now = Date.now();
    if (now - lastSwipeTime.current < 320) return;
    lastSwipeTime.current = now;
    if (direction === 'next') handleNext();
    else if (direction === 'prev') handlePrev();
  };

  // Touch handlers for mobile screen swipe gestures
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Detect dominant horizontal swipe gesture with minimum threshold (35px)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 35) {
      if (deltaX < 0) {
        triggerSwipe('next');
      } else {
        triggerSwipe('prev');
      }
    }
  };

  return (
    <section id="pricing" className="section-padding relative overflow-hidden bg-white border-y border-slate-200/80">
      <style>{pricingAmbientStyles}</style>
      <div className="container-campo relative z-10">
        <SectionHeading
          index="05"
          label="Institutional Pricing"
          title="Simple pricing, per student per year."
          description="Predictable annual plans designed for institutions of every scale. Full transparency, zero hidden charges, and completely risk-free trial."
          align="center"
        />

        {/* ========================================================
            90-DAY RISK-FREE TRIAL BANNER (Clean Institutional Reassurance)
            ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: revealEase }}
          className="relative mt-8 sm:mt-10 overflow-hidden rounded-3xl bg-campo-navy p-6 sm:p-8 lg:p-10 text-white border border-white/10 shadow-workspace"
        >
          {/* Background Image Vignette with Campus Architecture Photo */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <img
              src={campusHeroImg}
              alt="Modern university campus architecture"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover opacity-45 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-campo-deep/95 via-campo-navy/85 to-campo-navy/55" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              {/* Badge 90 DAYS (Circular Round) */}
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 flex-col items-center justify-center rounded-full aspect-square bg-campo-teal text-campo-deep shadow-elevated">
                <span className="font-display text-2xl sm:text-3xl font-black leading-none">
                  90
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest mt-0.5">
                  Days
                </span>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-campo-teal/20 px-3 py-1 text-xs font-bold text-campo-teal backdrop-blur-xs mb-2">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Guaranteed Zero Risk Setup</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Try Campo, completely free.
                </h3>
                <p className="mt-1.5 text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
                  Full access to every area. If it isn’t making your campus easier to run, walk away with your data. No lock-in, no penalties.
                </p>
              </div>
            </div>

            <div className="w-full sm:w-auto shrink-0">
              <button
                type="button"
                onClick={() => onRequestDemo?.('90-Day Free Trial')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-campo-teal px-6 py-3.5 text-sm font-bold text-campo-deep shadow-elevated transition-all hover:bg-[#19d6c6] hover:shadow-card hover:-translate-y-0.5"
              >
                <span>Start 90-Day Free Trial</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* ========================================================
            1. MOBILE & TABLET: SWIPEABLE CAROUSEL (lg:hidden)
            ======================================================== */}
        <div className="lg:hidden mt-8 sm:mt-10">
          {/* Mobile Plan Selector Tabs */}
          <div className="flex items-center justify-center p-1 rounded-2xl bg-slate-100 border border-slate-200/90 max-w-[340px] sm:max-w-[420px] mx-auto mb-4 sm:mb-6 shadow-xs">
            {pricingPlans.map((plan, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-xl transition-all duration-200 text-center cursor-pointer ${
                    isSelected
                      ? 'bg-white text-campo-navy shadow-sm border border-slate-200/90 font-black'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <span className="truncate block">{plan.name}</span>
                </button>
              );
            })}
          </div>

          <div
            className="relative mx-auto w-full max-w-5xl h-[560px] sm:h-[620px] flex justify-center px-2 sm:px-12 select-none touch-pan-y"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Left Arrow Button (Tablet view) */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Plan"
              className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-40 h-11 w-11 items-center justify-center rounded-full border border-slate-200/90 bg-white text-campo-navy shadow-elevated transition-all duration-200 hover:scale-110 hover:border-campo-teal active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5 text-campo-navy" />
            </button>

            {/* Right Arrow Button (Tablet view) */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Plan"
              className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-40 h-11 w-11 items-center justify-center rounded-full border border-slate-200/90 bg-white text-campo-navy shadow-elevated transition-all duration-200 hover:scale-110 hover:border-campo-teal active:scale-95 cursor-pointer"
            >
              <ChevronRight className="h-5 w-5 text-campo-navy" />
            </button>

            {/* Petal Card Container - Single Clean Active Card on Mobile */}
            <div className="relative w-full max-w-[335px] sm:max-w-[430px] h-full flex justify-center touch-pan-y">
              {pricingPlans.map((plan, idx) => {
                const diff = (idx - activeIndex + 3) % 3;
                const isActive = diff === 0;
                const isRight = diff === 1;
                const isLeft = diff === 2;
                const colorScheme = planColorSchemes[plan.id] || planColorSchemes.core;

                // Flower Petal Organic Asymmetric Contours
                const petalShape =
                  idx === 0
                    ? 'rounded-tl-[44px] rounded-br-[44px] rounded-tr-3xl rounded-bl-3xl'
                    : idx === 1
                    ? 'rounded-[36px]'
                    : 'rounded-tr-[44px] rounded-bl-[44px] rounded-tl-3xl rounded-br-3xl';

                // Slide animation: only the active card is centered and fully visible
                let transformX = '0%';
                let scale = 1;
                let opacity = 1;
                let zIndex = 20;
                let pointerEvents = 'auto';

                if (isLeft) {
                  transformX = '-100%';
                  scale = 0.95;
                  opacity = 0;
                  zIndex = 0;
                  pointerEvents = 'none';
                } else if (isRight) {
                  transformX = '100%';
                  scale = 0.95;
                  opacity = 0;
                  zIndex = 0;
                  pointerEvents = 'none';
                }

                return (
                  <motion.div
                    key={plan.id}
                    drag={isActive ? 'x' : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.16}
                    onDragEnd={(e, { offset, velocity }) => {
                      if (!isActive) return;
                      const swipeConfidenceThreshold = 35;
                      if (offset.x < -swipeConfidenceThreshold || velocity.x < -200) {
                        triggerSwipe('next');
                      } else if (offset.x > swipeConfidenceThreshold || velocity.x > 200) {
                        triggerSwipe('prev');
                      }
                    }}
                    style={{ pointerEvents }}
                    animate={
                      prefersReducedMotion
                        ? { opacity: isActive ? 1 : 0 }
                        : {
                            x: transformX,
                            scale,
                            opacity,
                            zIndex,
                          }
                    }
                    transition={{
                      type: 'spring',
                      stiffness: 240,
                      damping: 26,
                      mass: 0.8,
                    }}
                    className={`group absolute top-0 w-full max-w-[335px] sm:max-w-[430px] h-[550px] sm:h-[610px] flex flex-col justify-between ${petalShape} bg-white ${colorScheme.cardBg} ${colorScheme.textColor} p-4 sm:p-6 transition-shadow duration-300 touch-pan-y ${
                      isActive
                        ? plan.id === 'campus'
                          ? 'border-2 border-campo-teal shadow-[0_12px_36px_-8px_rgba(0,197,181,0.25)] ring-2 ring-campo-teal/30 cursor-grab active:cursor-grabbing'
                          : plan.id === 'core'
                          ? 'border-2 border-slate-300 shadow-[0_12px_36px_-8px_rgba(7,28,70,0.1)] cursor-grab active:cursor-grabbing'
                          : 'border-2 border-indigo-300 shadow-[0_12px_36px_-8px_rgba(99,102,241,0.2)] cursor-grab active:cursor-grabbing'
                        : `${colorScheme.cardBorder} pointer-events-none`
                    }`}
                  >
                    {/* Apple-inspired Ambient Background Animations */}
                    <CardAmbientBackground planId={plan.id} petalShape={petalShape} cardIndex={idx} totalCards={pricingPlans.length} />

                    {/* Badge */}
                    {plan.badge && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-0.5 sm:px-4 sm:py-1 text-[11px] sm:text-xs font-bold whitespace-nowrap shadow-md ${colorScheme.badgeClass}`}
                        >
                          <Sparkles className="h-3 w-3" />
                          <span>{plan.badge}</span>
                        </span>
                      </div>
                    )}

                    {/* Card Header: Cleanly Aligned Name, Price & Subtitle */}
                    <div className="pt-0.5 sm:pt-1 shrink-0 relative z-10">
                      <div className="flex items-baseline justify-between">
                        <h3 className={`font-display text-2xl sm:text-3xl font-black tracking-tight ${colorScheme.textColor}`}>
                          {plan.name}
                        </h3>
                        <div className="flex items-baseline gap-0.5">
                          <span className={`font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${colorScheme.priceColor}`}>
                            ₹{plan.price}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start justify-between gap-2 mt-1">
                        <p className={`text-[11px] sm:text-xs leading-snug max-w-[210px] sm:max-w-[260px] ${colorScheme.subtextColor}`}>
                          {plan.summary}
                        </p>
                        <span className={`text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider shrink-0 text-right pt-0.5 ${colorScheme.billingColor}`}>
                          {plan.billingPeriod}
                        </span>
                      </div>
                    </div>

                    {/* Full Workflows & Operations */}
                    <div className={`flex flex-col justify-between flex-1 mt-2 sm:mt-2.5 pt-2 sm:pt-2.5 border-t ${colorScheme.borderDivider} min-h-0 relative z-10`}>
                      <div className="flex-1 flex flex-col min-h-0">
                        {/* Inline Workflows & Areas Header */}
                        <div className="flex items-center justify-between mb-1.5 sm:mb-2 shrink-0 gap-2">
                          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 truncate">
                            Workflows &amp; Operations
                          </span>
                          <span
                            className={`text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-full border whitespace-nowrap shrink-0 ${colorScheme.pillText}`}
                          >
                            {plan.categories.length} Areas
                          </span>
                        </div>

                        {/* Full-width Category Cards with Consistent Spacings & Heights */}
                        <div className="flex flex-col gap-1.5 sm:gap-2 my-0.5 min-h-0">
                          {plan.categories.map((cat, cIdx) => {
                            const isAi = cat.isAi;
                            return (
                              <div
                                key={cIdx}
                                className={`rounded-xl py-1.5 sm:py-2 px-3 border transition-all flex flex-col justify-center min-h-[48px] sm:min-h-[52px] ${
                                  isAi
                                    ? 'bg-gradient-to-r from-teal-50/90 via-indigo-50/90 to-teal-50/90 border-campo-teal text-slate-800 shadow-xs ring-1 ring-campo-teal/20'
                                    : colorScheme.categoryBox
                                }`}
                              >
                                <div className={`flex items-center gap-2 font-bold text-xs sm:text-[13px] ${colorScheme.categoryTitle}`}>
                                  <CheckCircle2
                                    className={`h-4 w-4 shrink-0 ${
                                      isAi
                                        ? 'text-campo-teal'
                                        : colorScheme.checkColor
                                    }`}
                                  />
                                  <span className="truncate">{cat.name}</span>
                                </div>
                                <p className={`text-[10px] sm:text-[11px] pl-6 mt-0.5 leading-snug ${colorScheme.categoryModules}`}>
                                  {cat.modules}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Card CTA with distinct button styling */}
                      <div className={`pt-2 sm:pt-2.5 border-t ${colorScheme.borderDivider} mt-auto shrink-0 relative z-10`}>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRequestDemo?.(`${plan.name} Plan`);
                          }}
                          className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-2.5 sm:py-3 px-4 text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer ${colorScheme.ctaButton}`}
                        >
                          <span>{plan.buttonText}</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Petal Dots & Mobile Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-5 sm:mt-6">
            {/* Mobile Prev Arrow Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Plan"
              className="sm:hidden flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-campo-navy shadow-xs active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {pricingPlans.map((plan, idx) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to ${plan.name} plan`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx
                      ? 'w-7 sm:w-8 bg-campo-teal'
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            {/* Mobile Next Arrow Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Plan"
              className="sm:hidden flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-campo-navy shadow-xs active:scale-95 cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile Swipe Guidance Hint */}
          <div className="sm:hidden flex items-center justify-center gap-1.5 mt-2 text-xs text-slate-400 font-medium select-none">
            <ChevronLeft className="h-3 w-3 text-campo-teal animate-pulse" />
            <span>Swipe left or right to switch plans</span>
            <ChevronRight className="h-3 w-3 text-campo-teal animate-pulse" />
          </div>
        </div>

        {/* ========================================================
            2. DESKTOP / LARGE SCREENS: ALL 3 CARDS SIDE-BY-SIDE (hidden lg:grid)
            ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: revealEase }}
          className="relative hidden lg:grid lg:grid-cols-3 gap-6 xl:gap-8 max-w-7xl mx-auto mt-10 sm:mt-12 items-stretch"
        >

          {pricingPlans.map((plan, idx) => {
            const colorScheme = planColorSchemes[plan.id] || planColorSchemes.core;
            const isPopular = plan.popular;

            // Organic asymmetrical petal contour
            const petalShape =
              idx === 0
                ? 'rounded-tl-[44px] rounded-br-[44px] rounded-tr-3xl rounded-bl-3xl'
                : idx === 1
                ? 'rounded-[36px]'
                : 'rounded-tr-[44px] rounded-bl-[44px] rounded-tl-3xl rounded-br-3xl';

            return (
              <div
                key={plan.id}
                className={`group relative flex flex-col justify-between ${petalShape} ${colorScheme.cardBg} ${colorScheme.textColor} p-7 xl:p-8 transition-all duration-300 ${
                  isPopular
                    ? 'border-2 border-campo-teal shadow-[0_0_50px_-10px_rgba(0,197,181,0.4)] -translate-y-2 ring-2 ring-campo-teal/40 z-20'
                    : colorScheme.cardBorder
                }`}
              >
                {/* Apple-inspired Ambient Background Animations */}
                <CardAmbientBackground planId={plan.id} petalShape={petalShape} cardIndex={idx} totalCards={pricingPlans.length} />

                {/* Top Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-xs font-bold whitespace-nowrap shadow-md ${colorScheme.badgeClass}`}
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>{plan.badge}</span>
                    </span>
                  </div>
                )}

                {/* Card Header: Cleanly Aligned Name, Price & Subtitle */}
                <div className="pt-1 shrink-0 min-h-[96px] flex flex-col justify-between relative z-10">
                  <div className="flex items-baseline justify-between">
                    <h3 className={`font-display text-2xl xl:text-3xl font-black tracking-tight ${colorScheme.textColor}`}>
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-0.5">
                      <span className={`font-display text-3xl xl:text-4xl font-extrabold tracking-tight ${colorScheme.priceColor}`}>
                        ₹{plan.price}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start justify-between gap-3 mt-1.5">
                    <p className={`text-xs leading-snug max-w-[210px] xl:max-w-[240px] ${colorScheme.subtextColor}`}>
                      {plan.summary}
                    </p>
                    <span className={`text-[11px] font-semibold uppercase tracking-wider shrink-0 text-right pt-0.5 ${colorScheme.billingColor}`}>
                      {plan.billingPeriod}
                    </span>
                  </div>
                </div>

                {/* Workflows & Operations List */}
                <div className={`flex flex-col flex-1 mt-4 pt-3.5 border-t ${colorScheme.borderDivider} min-h-0 relative z-10`}>
                  <div className="flex-1 flex flex-col min-h-0">
                    {/* Inline Workflows & Areas Header (Never 2 Lines) */}
                    <div className="flex items-center justify-between mb-2.5 h-[26px] shrink-0 gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 truncate">
                        Workflows &amp; Operations
                      </span>
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border whitespace-nowrap shrink-0 ${colorScheme.pillText}`}
                      >
                        {plan.categories.length} Areas
                      </span>
                    </div>

                    {/* Category Cards in Campo Colors - Same Spacings & Heights as Card 3 */}
                    <div className="flex flex-col gap-2.5 my-1 min-h-0">
                      {plan.categories.map((cat, cIdx) => {
                        const isAi = cat.isAi;
                        return (
                          <div
                            key={cIdx}
                            className={`rounded-xl px-3.5 py-2.5 border transition-all flex flex-col justify-center min-h-[66px] ${
                              isAi
                                ? 'bg-gradient-to-r from-teal-50/90 via-indigo-50/90 to-teal-50/90 border-campo-teal text-slate-800 shadow-xs ring-1 ring-campo-teal/20'
                                : colorScheme.categoryBox
                            }`}
                          >
                            <div className={`flex items-center gap-2 font-bold text-[13px] ${colorScheme.categoryTitle}`}>
                              <CheckCircle2
                                className={`h-4 w-4 shrink-0 ${
                                  isAi
                                    ? 'text-campo-teal'
                                    : colorScheme.checkColor
                                }`}
                              />
                              <span className="truncate">{cat.name}</span>
                            </div>
                            <p className={`text-[11px] pl-6 mt-0.5 leading-snug ${colorScheme.categoryModules}`}>
                              {cat.modules}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Card CTA - Anchored to bottom with mt-auto */}
                  <div className={`pt-3.5 border-t ${colorScheme.borderDivider} mt-auto shrink-0 relative z-10`}>
                    <button
                      type="button"
                      onClick={() => onRequestDemo?.(`${plan.name} Plan`)}
                      className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-3.5 px-4 text-sm font-bold transition-all shadow-xs cursor-pointer ${colorScheme.ctaButton}`}
                    >
                      <span>{plan.buttonText}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* ========================================================
            CONNECTING YOUR TOOLS COSTS NOTHING (Integration Callout)
            ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: revealEase }}
          className="mt-6 sm:mt-8 rounded-2xl border border-teal-200/80 bg-gradient-to-r from-teal-50/90 via-emerald-50/60 to-teal-50/90 p-4 sm:p-6 shadow-xs"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-campo-teal text-campo-deep shadow-xs mt-0.5">
                <Plug className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div>
                <h4 className="font-display text-sm sm:text-base font-bold text-campo-navy">
                  {integrationHighlights.title}
                </h4>
                <p className="mt-0.5 text-xs text-slate-600 leading-relaxed max-w-2xl">
                  {integrationHighlights.description}
                </p>
              </div>
            </div>

            {/* Badges: Clean 2-column grid on mobile, horizontal flex on desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap items-center gap-1.5 sm:gap-2 w-full lg:w-auto pt-1 sm:pt-0">
              {integrationHighlights.tools.map((tool, idx) => {
                const isHighlight = idx === integrationHighlights.tools.length - 1; // "Zero Integration Charges"
                return (
                  <span
                    key={idx}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold border shadow-2xs ${
                      isHighlight
                        ? 'col-span-2 sm:col-span-1 bg-campo-teal/15 border-campo-teal/40 text-campo-deep font-bold justify-center sm:justify-start'
                        : 'bg-white border-teal-200/70 text-slate-700'
                    }`}
                  >
                    <CheckCircle2 className="h-3 w-3 text-campo-teal shrink-0" />
                    <span className="truncate">{tool}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ========================================================
            PICK. PLUG. PLAY. SECTION
            ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: revealEase }}
          className="mt-8 sm:mt-12 overflow-hidden rounded-2xl sm:rounded-3xl bg-campo-navy p-5 sm:p-8 lg:p-10 text-white shadow-workspace border border-campo-secondary"
        >
          <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-campo-teal mb-1">
              Frictionless Onboarding
            </span>
            <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
              Pick. Plug. Play.
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Zero complicated migration. Modular flexibility tailored to your campus evolution.
            </p>
          </div>

          <div className="grid gap-2.5 sm:gap-6 sm:grid-cols-3">
            {pickPlugPlaySteps.map((step, idx) => {
              const iconMap = [Sliders, Plug, Play];
              const StepIcon = iconMap[idx] || Sliders;
              const stepNum = `0${idx + 1}`;

              return (
                <div
                  key={step.tag}
                  className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 sm:p-5 backdrop-blur-xs transition-colors hover:bg-white/10 hover:border-campo-teal/40"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black tracking-wider text-campo-teal uppercase bg-campo-teal/15 px-1.5 py-0.5 rounded border border-campo-teal/30">
                        Step {stepNum}
                      </span>
                      <span className="font-display text-base font-bold text-white">
                        {step.title}
                      </span>
                    </div>
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-campo-teal">
                      <StepIcon className="h-3.5 w-3.5" />
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300 text-center sm:text-left">
            <span>Need a custom plan for a multi-campus university trust?</span>
            <button
              type="button"
              onClick={() => onRequestDemo?.('Custom Multi-Campus Quote')}
              className="inline-flex items-center gap-1.5 font-bold text-campo-teal hover:underline cursor-pointer"
            >
              <span>Request Custom Institutional Quote</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
