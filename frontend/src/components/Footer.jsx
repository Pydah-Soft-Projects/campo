import React from 'react';
import { Globe, Linkedin, Share2 } from 'lucide-react';
import { footerColumns } from '../data/campoData';
import { siteConfig } from '../config/siteConfig';
import { CampoLogo } from './CampoLogo';

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
    <footer className="border-t border-slate-200 bg-white text-campo-ink">
      <div className="container-campo py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, 'Home', '#home')}
              className="inline-flex items-center rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-campo-teal"
            >
              <CampoLogo variant="dark" />
            </a>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
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
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-campo-surface text-slate-600 transition-colors duration-200 hover:border-campo-teal/60 hover:bg-white hover:text-campo-navy"
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
              <h3 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-campo-navy">
                Platform
              </h3>
              <ul className="mt-4 space-y-2.5">
                {footerColumns.platform.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.label, item.href)}
                      className="text-sm text-slate-600 transition-colors hover:text-campo-teal-dark"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-campo-navy">
                Solutions
              </h3>
              <ul className="mt-4 space-y-2.5">
                {footerColumns.solutions.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.label, item.href)}
                      className="text-sm text-slate-600 transition-colors hover:text-campo-teal-dark"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-campo-navy">
                Company
              </h3>
              <ul className="mt-4 space-y-2.5">
                {footerColumns.company.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.label, item.href)}
                      className="text-sm text-slate-600 transition-colors hover:text-campo-teal-dark"
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
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>
            © {currentYear} {siteConfig.legal.copyrightHolder}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => onOpenLegal?.('privacy')}
              className="transition-colors hover:text-campo-navy"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal?.('terms')}
              className="transition-colors hover:text-campo-navy"
            >
              Terms &amp; Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
