import React, { useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CampoIntroduction } from './components/CampoIntroduction';
import { CampusStatsSection } from './components/CampusStatsSection';
import { IntelligenceSection } from './components/IntelligenceSection';
import { PricingSection } from './components/PricingSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import { ScrollProgressBar } from './components/MotionPrimitives';
import { DownloadAppPage } from './pages/DownloadAppPage';
import { ApplicationDetailPage } from './pages/ApplicationDetailPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { CampusHealthPage } from './pages/CampusHealthPage';
import { SEO } from './components/SEO';

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

  const scrollToHashElement = (hash) => {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) {
      const navHeight = 68;
      const targetRect = el.getBoundingClientRect();
      const offsetPosition = targetRect.top + window.pageYOffset - navHeight;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigate = (path, hash) => {
    const normalizedPath = (path || '/').replace(/\/+$/, '') || '/';
    if (normalizedPath !== currentPath) {
      window.history.pushState({}, '', normalizedPath + (hash || ''));
      setCurrentPath(normalizedPath);
      if (hash) {
        setTimeout(() => {
          scrollToHashElement(hash);
        }, 120);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (hash) {
      scrollToHashElement(hash);
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
    scrollToHashElement('#contact');
  };

  const isAppDetail = currentPath.startsWith('/applications/');
  const currentAppId = isAppDetail ? currentPath.replace('/applications/', '').split('/')[0] : null;
  const isAdminLogin = currentPath === '/admin/login';
  const isAdminDashboard = currentPath.startsWith('/admin') && !isAdminLogin;
  const isCampusHealth = currentPath === '/campus-health' || currentPath === '/health-check';

  if (isCampusHealth) {
    return (
      <MotionConfig reducedMotion="user">
        <CampusHealthPage onNavigateHome={() => navigate('/')} />
      </MotionConfig>
    );
  }

  if (isAdminLogin) {
    return (
      <MotionConfig reducedMotion="user">
        <AdminLoginPage onNavigate={navigate} />
      </MotionConfig>
    );
  }

  if (isAdminDashboard) {
    return (
      <MotionConfig reducedMotion="user">
        <AdminDashboardPage onNavigate={navigate} />
      </MotionConfig>
    );
  }

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
              onContactUs={() => navigateToContact('General Inquiry')}
            />
          ) : isAppDetail ? (
            <ApplicationDetailPage
              appId={currentAppId}
              onNavigate={navigate}
              onRequestDemo={() => navigateToContact('Demo Request')}
            />
          ) : (
            <>
              <SEO
                title="Campo — Unified Institutional Management Ecosystem"
                description="Campo brings admissions, academics, finance, HRMS, campus operations, and permission-scoped institutional intelligence together in one connected platform."
                keywords="Campo, institutional management platform, campus ERP, admissions CRM, fee management, academic management, HRMS, LMS, campus operations, college ERP India"
                canonical="https://campo.co.in/"
                structuredData={{
                  '@context': 'https://schema.org',
                  '@graph': [
                    {
                      '@type': 'Organization',
                      name: 'Campo',
                      url: 'https://campo.co.in/',
                      logo: 'https://campo.co.in/og-image.png?v=2',
                      description: 'Unified institutional management ecosystem connecting campus ERP, admissions, academics, and operations.',
                    },
                    {
                      '@type': 'WebSite',
                      name: 'Campo',
                      url: 'https://campo.co.in/',
                    },
                    {
                      '@type': 'SoftwareApplication',
                      name: 'Campo Institutional Platform',
                      applicationCategory: 'EducationalApplication',
                      operatingSystem: 'Web, Android, iOS',
                      url: 'https://campo.co.in/',
                      description: 'Campo brings admissions, academics, finance, HRMS, campus operations, and permission-scoped institutional intelligence together in one connected platform.',
                      offers: {
                        '@type': 'Offer',
                        price: '0',
                        priceCurrency: 'INR',
                      },
                    },
                  ],
                }}
              />
              <HeroSection
                onRequestDemo={() => navigateToContact('Demo Request')}
              />
              <CampoIntroduction onNavigate={navigate} />
              <CampusStatsSection />
              <IntelligenceSection />
              <PricingSection
                onRequestDemo={(plan) => navigateToContact(plan ? `Pricing Inquiry: ${plan}` : 'Demo Request')}
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
