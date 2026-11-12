import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { CampoLogo } from './CampoLogo';
import { BrandCornerWave, Reveal } from './MotionPrimitives';

export function CTASection({ onRequestDemo, onContactUs }) {
  return (
    <section className="border-t border-slate-200/80 bg-white py-16 sm:py-20">
      <div className="container-campo">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-campo-secondary bg-gradient-to-br from-campo-navy via-campo-navy to-campo-deep p-8 text-white shadow-workspace sm:p-12 lg:p-14">
            <BrandCornerWave className="h-32 w-72 opacity-90 sm:h-44 sm:w-[440px]" />
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 z-10 w-1.5 bg-campo-teal"
            />

            <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <div className="mb-5 flex flex-wrap items-center gap-4">
                  <CampoLogo variant="light" size="sm" />
                  <span aria-hidden="true" className="h-4 w-px bg-white/20" />
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-campo-teal">
                    Connected Institutional Leadership
                  </p>
                </div>

                <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:leading-[1.12]">
                  Your Institution Deserves a More Connected Future.
                </h2>
                <p className="mt-3.5 text-base leading-relaxed text-slate-300 sm:text-lg">
                  Discover how Campo can simplify operations, connect
                  departments, and bring your entire institution into one
                  intelligent ecosystem.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
                <button
                  type="button"
                  onClick={onRequestDemo}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-campo-teal px-7 py-3.5 text-sm font-semibold text-campo-deep shadow-card transition-all duration-200 hover:bg-[#19d6c6] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-campo-navy sm:text-base"
                >
                  Request a Demo
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                <button
                  type="button"
                  onClick={onContactUs}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white/40 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-campo-teal focus-visible:ring-offset-2 focus-visible:ring-offset-campo-navy sm:text-base"
                >
                  Contact Us
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
