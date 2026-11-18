import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowUpRight, Smartphone } from 'lucide-react';
import { navLinks } from '../data/campoData';
import { CampoLogo } from './CampoLogo';

export function Navbar({ onRequestDemo, currentPath = '/', onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('#home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (currentPath !== '/') return undefined;

    const sections = [
      { id: 'contact', href: '#contact' },
      { id: 'pricing', href: '#pricing' },
      { id: 'about', href: '#about' },
      { id: 'features', href: '#features' },
      { id: 'solutions', href: '#solutions' },
      { id: 'platform', href: '#platform' },
      { id: 'home', href: '#home' },
    ];

    const handleScrollSpy = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // When near very top, activate Home
      if (scrollY < 120) {
        setActiveHref('#home');
        return;
      }

      // When near bottom of document, activate Contact
      if (scrollY + windowHeight >= documentHeight - 80) {
        setActiveHref('#contact');
        return;
      }

      // Check sections from bottom to top
      const triggerThreshold = windowHeight * 0.35;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerThreshold) {
            setActiveHref(section.href);
            break;
          }
        }
      }
    };

    handleScrollSpy();
    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    window.addEventListener('resize', handleScrollSpy, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScrollSpy);
      window.removeEventListener('resize', handleScrollSpy);
    };
  }, [currentPath]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    setActiveHref(href);
    if (currentPath !== '/') {
      onNavigate?.('/', href);
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDemoClick = () => {
    setMobileOpen(false);
    onRequestDemo?.();
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || currentPath !== '/'
          ? 'border-b border-slate-200/80 bg-white/95 py-3 shadow-[0_1px_3px_rgba(7,28,70,0.04)] backdrop-blur-md'
          : 'border-b border-transparent bg-transparent py-4'
      }`}
    >
      <nav
        aria-label="Primary Navigation"
        className="container-campo flex items-center justify-between gap-4"
      >
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onNavigate?.('/');
          }}
          className="inline-flex items-center rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-campo-teal focus-visible:ring-offset-2"
          aria-label="Campo Home"
        >
          <CampoLogo variant="dark" />
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = activeHref === link.href && currentPath === '/';
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-campo-navy'
                    : 'text-slate-600 hover:text-campo-navy'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-underline"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-campo-teal-dark"
                  />
                )}
              </a>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="/download"
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.('/download');
            }}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all duration-200 ${
              currentPath === '/download'
                ? 'border-campo-teal bg-teal-50 text-campo-teal-dark shadow-sm'
                : 'border-slate-200 bg-white text-campo-navy hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5 text-campo-teal-dark" />
            <span>Download App</span>
          </a>

          <button
            type="button"
            onClick={handleDemoClick}
            className="group inline-flex items-center gap-2 rounded-xl bg-campo-navy px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-campo-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-campo-teal focus-visible:ring-offset-2"
          >
            Request a Demo
            <ArrowUpRight className="h-4 w-4 text-campo-teal transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-campo-navy transition-colors hover:bg-slate-50 lg:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-slate-200 bg-white shadow-elevated lg:hidden"
          >
            <div className="container-campo flex flex-col gap-1 py-4">
              {navLinks.map((link) => {
                const isActive = activeHref === link.href && currentPath === '/';
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-campo-light text-campo-navy'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-campo-navy'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-campo-teal-dark" />
                    )}
                  </a>
                );
              })}

              <a
                href="/download"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileOpen(false);
                  onNavigate?.('/download');
                }}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                  currentPath === '/download'
                    ? 'bg-campo-light text-campo-navy'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-campo-navy'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Smartphone className="h-4 w-4 text-campo-teal-dark" />
                  <span>Download Mobile App</span>
                </div>
                <span className="rounded-md bg-teal-50 px-2 py-0.5 text-[10px] font-semibold text-campo-teal-dark">
                  Android &amp; iOS
                </span>
              </a>
              <div className="mt-3 border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={handleDemoClick}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-campo-navy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-campo-secondary"
                >
                  Request a Demo
                  <ArrowUpRight className="h-4 w-4 text-campo-teal" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
