import React, { useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { CampoIntroduction } from './components/CampoIntroduction';
import { ApplicationsSection } from './components/ApplicationsSection';
import { IntelligenceSection } from './components/IntelligenceSection';
import { HowItWorks } from './components/HowItWorks';
import { WhyCampo } from './components/WhyCampo';
import { CTASection } from './components/CTASection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import { ScrollProgressBar } from './components/MotionPrimitives';
import { DownloadAppPage } from './pages/DownloadAppPage';

export default function App() {
  const [inquiryIntent, setInquiryIntent] = useState('Demo Request');
  const [legalModalType, setLegalModalType] = useState(null);
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname.replace(/\/+$/, '') || '/';
      return p;
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname.replace(/\/+$/, '') || '/';
      setCurrentPath(p);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path, hash) => {
    const normalizedPath = (path || '/').replace(/\/+$/, '') || '/';
    if (normalizedPath !== currentPath) {
      window.history.pushState({}, '', normalizedPath + (hash || ''));
      setCurrentPath(normalizedPath);
      if (hash) {
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 120);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateToContact = (intent) => {
    setInquiryIntent(intent);
    if (currentPath !== '/') {
      navigate('/', '#contact');
      return;
    }
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-clip bg-white text-campo-ink">
        <ScrollProgressBar />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-campo-teal focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-campo-deep"
        >
          Skip to main content
        </a>

        <Navbar
          currentPath={currentPath}
          onNavigate={navigate}
          onRequestDemo={() => navigateToContact('Demo Request')}
        />

        <main id="main-content">
          {currentPath === '/download' ? (
            <DownloadAppPage
              onNavigateHome={() => navigate('/')}
              onRequestDemo={() => navigateToContact('Demo Request')}
            />
          ) : (
            <>
              <HeroSection
                onRequestDemo={() => navigateToContact('Demo Request')}
              />
              <ProblemSection />
              <CampoIntroduction />
              <ApplicationsSection
                onRequestDemo={() => navigateToContact('Demo Request')}
              />
              <IntelligenceSection />
              <HowItWorks />
              <WhyCampo />
              <CTASection
                onRequestDemo={() => navigateToContact('Demo Request')}
                onContactUs={() => navigateToContact('General Inquiry')}
              />
              <ContactSection inquiryIntent={inquiryIntent} />
            </>
          )}
        </main>

        <Footer
          onNavigate={navigate}
          onRequestDemo={() => navigateToContact('Demo Request')}
          onOpenLegal={(type) => setLegalModalType(type)}
        />

        <LegalModal
          openType={legalModalType}
          onClose={() => setLegalModalType(null)}
        />
      </div>
    </MotionConfig>
  );
}
