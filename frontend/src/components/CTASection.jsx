import React from 'react';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { CampoLogo } from './CampoLogo';
import { Reveal } from './MotionPrimitives';
import campusHeroImg from '../assets/campus-hero.webp';

export function CTASection({ onRequestDemo, onContactUs }) {
  return (
    <section className="border-t border-slate-200/80 bg-white py-10 sm:py-16 lg:py-20">
      <div className="container-campo">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-campo-secondary bg-campo-navy p-5 sm:p-10 lg:p-16 text-white shadow-workspace">
            {/* Background Image Vignette with lighter color overlay so the photo displays clearly */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
              <img
                src={campusHeroImg}
                alt="Modern university campus architecture"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover opacity-45 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-campo-deep/95 via-campo-navy/85 to-campo-navy/50" />
            </div>

            <div className="relative z-10 flex flex-col justify-between gap-6 sm:gap-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <CampoLogo variant="light" size="sm" />
                  <span aria-hidden="true" className="h-3.5 sm:h-4 w-px bg-white/20 shrink-0" />
                  <span className="inline-flex shrink-0 items-center gap-1 sm:gap-1.5 rounded-full bg-white/10 px-2 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-xs font-semibold uppercase tracking-wider text-campo-teal backdrop-blur-xs">
                    <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    <span className="hidden sm:inline">AI-Powered Campus Operating System</span>
                    <span className="sm:hidden">AI-Powered Campus OS</span>
                  </span>
                </div>

                <div className="mb-1.5 sm:mb-2 inline-block">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-campo-teal">
                    The AI notices first. You decide what happens next.
                  </span>
                </div>

                <h2 className="font-display text-xl sm:text-3xl lg:text-5xl font-extrabold leading-[1.18] sm:leading-[1.15] tracking-tight text-white">
                  See Campo on your campus.
                </h2>
                <p className="mt-2.5 sm:mt-4 text-xs sm:text-base leading-relaxed text-slate-200">
                  Campo reads what is already happening across your campus and flags what is out of place, so you stop being last to know. Book a short demo, or start free with full access for 90 days.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:gap-3.5 lg:shrink-0 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onRequestDemo}
                  className="group inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-campo-teal px-3 py-2.5 sm:px-7 sm:py-3.5 text-xs sm:text-sm md:text-base font-bold text-campo-deep shadow-card transition-all duration-200 hover:bg-[#19d6c6] hover:shadow-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>Book a Demo</span>
                  <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                </button>

                <button
                  type="button"
                  onClick={onContactUs}
                  className="group inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 sm:px-7 sm:py-3.5 text-xs sm:text-sm md:text-base font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
                >
                  <span>Start Free</span>
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-200 group-hover:translate-x-0.5 shrink-0" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
