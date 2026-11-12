import React from 'react';
import { Globe, Linkedin, Share2 } from 'lucide-react';
import { footerColumns } from '../data/campoData';
import { siteConfig } from '../config/siteConfig';
import { CampoLogo } from './CampoLogo';
import { BrandCornerWave } from './MotionPrimitives';

const socialIconMap = {
  linkedin: Linkedin,
  x: Share2,
  globe: Globe,
};

export function Footer({ onRequestDemo, onOpenLegal }) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e, label, href) => {
    if (label === 'Request a Demo') {
      e.preventDefault();
      onRequestDemo?.();
      return;
    }
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-campo-secondary bg-gradient-to-br from-campo-navy via-campo-navy to-campo-deep text-white">
      <BrandCornerWave className="h-32 w-72 opacity-80 sm:h-40 sm:w-[420px]" />

      <div className="container-campo relative z-10 py-11 sm:py-16">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, 'Home', '#home')}
              className="inline-flex items-center rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-campo-teal"
            >
              <CampoLogo variant="light" />
            </a>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300">
              {siteConfig.brand.description}
            </p>

            {/* Social Media Placeholders */}
            <div className="mt-6 flex items-center gap-2.5">
              {siteConfig.social.map((item) => {
                const Icon = socialIconMap[item.id] || Globe;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    aria-label={item.label}
                    title={item.label}
                    onClick={(e) => handleLinkClick(e, item.label, item.href)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-slate-300 transition-colors duration-200 hover:border-campo-teal/70 hover:bg-white/10 hover:text-campo-teal"
                  >
                    <Icon className="h-4 w-4" />
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
