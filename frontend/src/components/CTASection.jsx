import React from 'react';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { CampoLogo } from './CampoLogo';
import { Reveal } from './MotionPrimitives';
import campusHeroImg from '../assets/campus-hero.webp';

export function CTASection({ onRequestDemo, onContactUs }) {
  return (
    <section className="border-t border-slate-200/80 bg-white py-14 sm:py-20">
      <div className="container-campo">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-campo-secondary bg-campo-navy p-7 text-white shadow-workspace sm:p-12 lg:p-16">
            {/* Background Image Vignette with lighter color overlay so the photo displays clearly */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
              <img
                src={campusHeroImg}
                alt="Modern university campus architecture"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover opacity-45 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-campo-deep/90 via-campo-navy/75 to-campo-navy/40" />
            </div>

            <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <CampoLogo variant="light" size="sm" />
                  <span aria-hidden="true" className="h-4 w-px bg-white/20" />
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-campo-teal backdrop-blur-xs">
                    <Sparkles className="h-3 w-3" />
                    AI-Powered Campus Operating System
                  </span>
                </div>

                <div className="mb-2 inline-block">
                  <span className="text-xs font-bold uppercase tracking-wider text-campo-teal">
                    The AI notices first. You decide what happens next.
                  </span>
                </div>

                <h2 className="font-display text-2xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
                  See Campo on your campus.
                </h2>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-200">
                  Campo reads what is already happening across your campus and flags what is out of place, so you stop being last to know. Book a short demo, or start free with full access for 90 days.
                </p>
              </div>

              <div className="flex flex-col gap-3.5 sm:flex-row lg:shrink-0">
                <button
                  type="button"
                  onClick={onRequestDemo}
                  className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 rounded-xl bg-campo-teal px-7 py-3.5 text-sm font-bold text-campo-deep shadow-card transition-all duration-200 hover:bg-[#19d6c6] hover:shadow-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:text-base"
                >
                  Book a Demo
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                <button
                  type="button"
                  onClick={onContactUs}
                  className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 sm:text-base"
                >
                  Start Free
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
