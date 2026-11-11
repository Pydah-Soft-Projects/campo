import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import heroCampusBg from '../assets/hero-campus-bg.jpg';
import { Reveal } from './MotionPrimitives';

export function CTASection({ onRequestDemo, onContactUs }) {
  return (
    <section className="border-t border-slate-200/80 bg-white py-16 sm:py-20">
      <div className="container-campo">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-campo-surface p-8 shadow-card sm:p-12 lg:p-14">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <img
                src={heroCampusBg}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover object-center opacity-35"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-campo-surface/80 backdrop-blur-[1px]" />
            </div>

            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 z-10 w-1.5 bg-campo-teal"
            />

            <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-campo-teal-dark">
                  Connected Institutional Leadership
                </p>
                <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-campo-navy sm:text-4xl lg:leading-[1.12]">
                  Your Institution Deserves a More Connected Future.
                </h2>
                <p className="mt-3.5 text-base leading-relaxed text-slate-600 sm:text-lg">
                  Discover how Campo can simplify operations, connect
                  departments, and bring your entire institution into one
                  intelligent ecosystem.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
                <button
                  type="button"
                  onClick={onRequestDemo}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-campo-navy px-7 py-3.5 text-sm font-semibold text-white shadow-card transition-all duration-200 hover:bg-campo-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-campo-teal focus-visible:ring-offset-2 sm:text-base"
                >
                  Request a Demo
                  <ArrowUpRight className="h-4 w-4 text-campo-teal transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                <button
                  type="button"
                  onClick={onContactUs}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-campo-navy transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-campo-teal focus-visible:ring-offset-2 sm:text-base"
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
