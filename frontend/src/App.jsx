import React, { useState } from 'react';
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

export default function App() {
  const [inquiryIntent, setInquiryIntent] = useState('Demo Request');
  const [legalModalType, setLegalModalType] = useState(null);

  const navigateToContact = (intent) => {
    setInquiryIntent(intent);
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

        <Navbar onRequestDemo={() => navigateToContact('Demo Request')} />

        <main id="main-content">
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
        </main>

        <Footer
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

