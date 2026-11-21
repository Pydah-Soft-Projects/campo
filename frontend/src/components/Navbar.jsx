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
      { id: 'features', href: '#features' },
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
    const wasMobileOpen = mobileOpen;
    document.body.style.overflow = '';
    if (wasMobileOpen) {
      setMobileOpen(false);
    }
    setActiveHref(href);

    if (currentPath !== '/') {
      onNavigate?.('/', href);
      return;
    }

    const performScroll = () => {
      document.body.style.overflow = '';
      const target = document.querySelector(href);
      if (target) {
        const navHeight = 68;
        const targetRect = target.getBoundingClientRect();
        const offsetPosition = targetRect.top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth',
        });
      }
    };

    if (wasMobileOpen) {
      setTimeout(performScroll, 60);
    } else {
      performScroll();
    }
  };

  const handleDemoClick = () => {
    document.body.style.overflow = '';
    setMobileOpen(false);
    onRequestDemo?.();
  };

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || currentPath !== '/' || mobileOpen
          ? 'border-b border-slate-200/80 bg-white py-2.5 sm:py-3 shadow-[0_1px_3px_rgba(7,28,70,0.04)] backdrop-blur-md'
          : 'border-b border-transparent bg-transparent py-3.5 sm:py-4'
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
          className="inline-flex items-center rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-campo-navy focus-visible:ring-offset-2"
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
                    ? 'text-campo-navy font-semibold'
                    : 'text-slate-600 hover:text-campo-navy'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-underline"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-campo-navy"
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
                ? 'border-blue-300 bg-blue-50 text-campo-navy shadow-sm'
                : 'border-slate-200 bg-white text-campo-navy hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5 text-campo-navy" />
            <span>Download App</span>
          </a>

          <button
            type="button"
            onClick={handleDemoClick}
            className="group inline-flex items-center gap-2 rounded-xl bg-campo-navy px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-campo-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-campo-navy focus-visible:ring-offset-2 shadow-xs"
          >
            Request a Demo
            <ArrowUpRight className="h-4 w-4 text-blue-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
          <>
            {/* Backdrop Overlay for Mobile Drawer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => {
                document.body.style.overflow = '';
                setMobileOpen(false);
              }}
              className="fixed inset-0 top-[56px] z-40 bg-slate-900/35 backdrop-blur-xs lg:hidden"
              aria-hidden="true"
            />

            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-50 overflow-hidden border-t border-slate-200/90 bg-white shadow-elevated lg:hidden"
            >
              <div className="container-campo flex flex-col gap-0.5 py-2.5 px-3">
                {navLinks.map((link) => {
                  const isActive = activeHref === link.href && currentPath === '/';
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`flex items-center justify-between rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors active:scale-[0.99] ${
                        isActive
                          ? 'bg-campo-light/80 text-campo-navy font-semibold'
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
                    document.body.style.overflow = '';
                    setMobileOpen(false);
                    onNavigate?.('/download');
                  }}
                  className={`mt-0.5 flex items-center justify-between rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors active:scale-[0.99] ${
                    currentPath === '/download'
                      ? 'bg-campo-light/80 text-campo-navy font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-campo-navy'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-3.5 w-3.5 text-campo-teal-dark" />
                    <span>Download Mobile App</span>
                  </div>
                  <span className="rounded bg-teal-50 px-1.5 py-0.5 text-[9px] font-semibold text-campo-teal-dark">
                    Android &amp; iOS
                  </span>
                </a>

                <div className="mt-1.5 border-t border-slate-100 pt-1.5">
                  <button
                    type="button"
                    onClick={handleDemoClick}
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-campo-navy px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-campo-secondary active:scale-[0.99]"
                  >
                    <span>Request a Demo</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-campo-teal" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
