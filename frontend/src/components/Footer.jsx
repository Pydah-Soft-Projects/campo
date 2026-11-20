import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { footerColumns } from '../data/campoData';
import { siteConfig } from '../config/siteConfig';
import { CampoLogo } from './CampoLogo';
import { BrandCornerWave } from './MotionPrimitives';
import { realisticSocialLogos } from './SocialLogos';
import campoWatermark from '../assets/campo-footer-watermark.png';

export function Footer({ onRequestDemo, onOpenLegal, onNavigate }) {
  const currentYear = new Date().getFullYear();
  const shouldReduceMotion = useReducedMotion();

  const handleLinkClick = (e, label, href) => {
    if (label === 'Request a Demo') {
      e.preventDefault();
      onRequestDemo?.();
      return;
    }
    if (href.startsWith('/')) {
      e.preventDefault();
      onNavigate?.(href);
      return;
    }
    if (href.startsWith('#')) {
      e.preventDefault();
      onNavigate?.('/', href);
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-campo-secondary bg-gradient-to-br from-campo-navy via-campo-navy to-campo-deep text-white">
      {/* Background Brand Watermark Effect with Smooth Moving Light Sweep */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden select-none px-4 sm:px-8"
      >
        <div className="relative w-full max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px]">
          {/* Base subtle brand watermark */}
          <img
            src={campoWatermark}
            alt=""
            className="w-full h-auto object-contain opacity-[0.05] sm:opacity-[0.06] select-none pointer-events-none drop-shadow-[0_0_16px_rgba(255,255,255,0.06)]"
            draggable={false}
          />

          {/* Smooth White Light Beam Moving Across the Letters & Swoosh */}
          {!shouldReduceMotion && (
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden select-none"
              style={{
                WebkitMaskImage: `url("${campoWatermark}")`,
                maskImage: `url("${campoWatermark}")`,
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
              }}
            >
              {/* Elegant white light moving beam sweeping continuously from C across to O with no dead gap */}
              <motion.div
                initial={{ left: '-12%' }}
                animate={{ left: '104%' }}
                transition={{
                  duration: 6.0,
                  repeat: Infinity,
                  repeatDelay: 0,
                  ease: 'linear',
                }}
                className="pointer-events-none absolute -bottom-[60%] -top-[60%] w-[14%] sm:w-[10%] -skew-x-[20deg]"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.05) 15%, rgba(255, 255, 255, 0.42) 50%, rgba(255, 255, 255, 0.05) 85%, transparent 100%)',
                }}
              />
            </div>
          )}

          {/* Soft ambient white glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.02] via-transparent to-transparent" />
        </div>
      </div>

      <BrandCornerWave className="h-32 w-72 opacity-80 sm:h-40 sm:w-[420px]" />

      <div className="container-campo relative z-10 py-11 sm:py-16">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate?.('/');
              }}
              className="inline-flex items-center rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-campo-teal"
            >
              <CampoLogo variant="light" />
            </a>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300">
              {siteConfig.brand.description}
            </p>

            {/* Direct Official Contact Channels (Single Line) */}
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-200">
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                className="group inline-flex items-center gap-1.5 font-medium transition-colors hover:text-campo-teal"
              >
                <Phone className="h-3.5 w-3.5 text-campo-teal transition-transform group-hover:scale-110 shrink-0" />
                <span>{siteConfig.contact.phone}</span>
              </a>
              <span className="hidden sm:inline-block h-3 w-px bg-white/20" />
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="group inline-flex items-center gap-1.5 font-medium transition-colors hover:text-campo-teal"
              >
                <Mail className="h-3.5 w-3.5 text-campo-teal transition-transform group-hover:scale-110 shrink-0" />
                <span>{siteConfig.contact.email}</span>
              </a>
            </div>

            {/* Realistic Big Official Social Media Logomarks */}
            <div className="mt-5 flex items-center gap-3 sm:gap-3.5">
              {siteConfig.social.map((item) => {
                const LogoComponent = realisticSocialLogos[item.id];
                if (!LogoComponent) return null;
                const isExternal = item.href.startsWith('http');
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    aria-label={`Campo on ${item.label}`}
                    title={item.label}
                    onClick={(e) => {
                      if (!isExternal) {
                        handleLinkClick(e, item.label, item.href);
                      }
                    }}
                    className="group relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-1 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-campo-teal"
                  >
                    <LogoComponent />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h3 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-campo-teal">
                Platform
              </h3>
              <ul className="mt-4 space-y-2.5">
                {footerColumns.platform.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.label, item.href)}
                      className="text-sm text-slate-300 transition-colors hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-campo-teal">
                Solutions
              </h3>
              <ul className="mt-4 space-y-2.5">
                {footerColumns.solutions.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.label, item.href)}
                      className="text-sm text-slate-300 transition-colors hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-campo-teal">
                Company
              </h3>
              <ul className="mt-4 space-y-2.5">
                {footerColumns.company.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.label, item.href)}
                      className="text-sm text-slate-300 transition-colors hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-slate-400 sm:flex-row">
          <p>
            © {currentYear} {siteConfig.legal.copyrightHolder}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => onOpenLegal?.('privacy')}
              className="transition-colors hover:text-white"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal?.('terms')}
              className="transition-colors hover:text-white"
            >
              Terms &amp; Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
