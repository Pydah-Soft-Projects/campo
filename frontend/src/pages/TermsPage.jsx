import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  ShieldCheck,
  Building2,
  Calendar,
  Lock,
  UserCheck,
  ChevronRight,
  ExternalLink,
  Mail,
  Phone,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { siteConfig } from '../config/siteConfig';

const SECTIONS = [
  { id: 'acceptance', title: '1. Acceptance of Terms' },
  { id: 'description-of-services', title: '2. Description of Campo Services' },
  { id: 'user-responsibilities', title: '3. User Responsibilities' },
  { id: 'student-account-usage', title: '4. Student Account Usage' },
  { id: 'institutional-responsibilities', title: '5. Institutional Responsibilities' },
  { id: 'acceptable-usage', title: '6. Acceptable Usage Policy' },
  { id: 'intellectual-property', title: '7. Intellectual Property' },
  { id: 'service-availability', title: '8. Service Availability & Maintenance' },
  { id: 'third-party-services', title: '9. Third-Party Services' },
  { id: 'account-suspension', title: '10. Account Suspension & Termination' },
  { id: 'limitation-of-liability', title: '11. Limitation of Liability' },
  { id: 'changes-to-terms', title: '12. Changes to Terms' },
  { id: 'contact-information', title: '13. Contact Information' },
];

export function TermsPage({ onNavigate }) {
  const [activeSection, setActiveSection] = useState('acceptance');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 88;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <SEO
        title="Terms & Conditions — Campo Institutional Platform"
        description="Official Terms and Conditions governing the use of the Campo institutional management platform and the Campo Buddy Android application, owned and maintained by PydahSoft."
        keywords="Campo terms and conditions, Campo Buddy terms of service, PydahSoft terms, educational software terms India, college ERP legal agreement"
        canonical="https://campo.co.in/terms"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Campo Terms & Conditions',
          url: 'https://campo.co.in/terms',
          description: 'Official Terms and Conditions governing the use of Campo software and mobile services.',
          publisher: {
            '@type': 'Organization',
            name: 'PydahSoft',
            url: 'https://pydahsoft.in',
          },
        }}
      />

      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-campo-navy via-campo-navy to-campo-deep text-white pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="container-campo relative z-10">
          <button
            type="button"
            onClick={() => onNavigate?.('/')}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-campo-teal transition-colors mb-6 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </button>

          <div className="inline-flex items-center gap-2 rounded-full border border-campo-teal/30 bg-campo-teal/10 px-3.5 py-1 text-xs font-semibold text-campo-teal mb-4">
            <FileText className="h-4 w-4" />
            <span>Service Agreement</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
            Terms &amp; Conditions
          </h1>

          <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
            Please read these terms carefully before accessing or using the Campo institutional platform, website, or Android mobile application.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-campo-teal" />
              <span>Owner &amp; Licensor: <strong>PydahSoft Pvt Ltd</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-campo-teal" />
              <span>Effective Date: <strong>November 20, 2026</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container-campo py-10 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Table of Contents Sidebar */}
            <aside className="lg:col-span-4 hidden lg:block sticky top-24 bg-white rounded-2xl border border-slate-200 p-5 shadow-card max-h-[calc(100vh-120px)] overflow-y-auto no-scrollbar">
              <h2 className="font-display text-xs font-bold uppercase tracking-wider text-campo-navy flex items-center gap-2 pb-3 border-b border-slate-100">
                <FileText className="h-4 w-4 text-campo-teal" />
                Table of Contents
              </h2>
              <nav className="mt-3 space-y-1" aria-label="Terms Sections">
                {SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full text-left text-xs px-3 py-2 rounded-lg transition-all flex items-center justify-between ${
                      activeSection === sec.id
                        ? 'bg-campo-navy text-white font-semibold shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-campo-navy'
                    }`}
                  >
                    <span className="truncate">{sec.title}</span>
                    {activeSection === sec.id && (
                      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-campo-teal" />
                    )}
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-2">
                <p className="font-medium text-slate-700">Related Legal Documents:</p>
                <button
                  type="button"
                  onClick={() => onNavigate?.('/privacy-policy')}
                  className="w-full text-center py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-campo-navy font-semibold transition-colors"
                >
                  Privacy Policy
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate?.('/delete-account')}
                  className="w-full text-center py-2 px-3 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold transition-colors"
                >
                  Account Deletion Info
                </button>
              </div>
            </aside>

            {/* Terms Articles Body */}
            <article className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-card space-y-12 text-slate-700 leading-relaxed text-sm sm:text-base">
              
              {/* Section 1 */}
              <section id="acceptance" className="scroll-mt-24 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Section 1</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  1. Acceptance of Terms
                </h2>
                <p>
                  These Terms and Conditions (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you (&ldquo;User&rdquo;, &ldquo;Student&rdquo;, &ldquo;Parent&rdquo;, &ldquo;Faculty&rdquo;, or &ldquo;Institution&rdquo;) and <strong>PydahSoft Pvt Ltd</strong> (&ldquo;PydahSoft&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;).
                </p>
                <p>
                  By creating an account, downloading, accessing, or using the <strong>Campo</strong> web platform (<a href="https://campo.co.in" className="text-campo-teal underline">https://campo.co.in</a>) or the <strong>Campo Buddy Android Application</strong> (<code className="text-xs bg-slate-100 px-1 py-0.5 rounded font-mono">com.pydahsoft.campobuddy</code>), you acknowledge that you have read, understood, and agree to be bound by these Terms and our <a href="/privacy-policy" className="text-campo-teal underline">Privacy Policy</a>. If you do not agree to these Terms, you must immediately discontinue use of the platform and uninstall the application.
                </p>
              </section>

              {/* Section 2 */}
              <section id="description-of-services" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <FileText className="h-4 w-4" />
                  <span>Section 2</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  2. Description of Campo Services
                </h2>
                <p>
                  Campo provides a unified educational management software suite designed to streamline campus operations. Services accessible via web and mobile interfaces include:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>Student identity and digital ID card generation.</li>
                  <li>Academic timetables, syllabus tracking, and campus circular delivery.</li>
                  <li>Daily attendance logs and examination results visibility.</li>
                  <li>Online fee dues viewing and digital payment gateway integration.</li>
                  <li>Campus transport route mapping and vehicle telemetry viewing.</li>
                  <li>Hostel room management and campus event participation.</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section id="user-responsibilities" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <UserCheck className="h-4 w-4" />
                  <span>Section 3</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  3. User Responsibilities
                </h2>
                <p>
                  As an authorized user of Campo, you agree to:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                  <li>Provide accurate, current, and complete information during login and profile verification.</li>
                  <li>Maintain the confidentiality of your login credentials (username, password, and OTPs).</li>
                  <li>Promptly notify your institution&rsquo;s administrative office if you suspect unauthorized access to your account.</li>
                  <li>Use the services solely for authorized academic and institutional purposes.</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section id="student-account-usage" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <Lock className="h-4 w-4" />
                  <span>Section 4</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  4. Student Account Usage
                </h2>
                <p>
                  Student accounts in Campo Buddy are individualized. You may not sell, transfer, share, or assign your account credentials to any third party. Any actions taken through your authenticated student credentials will be attributed to you. Parents logging in via registered mobile numbers are authorized solely to access information concerning their enrolled children.
                </p>
              </section>

              {/* Section 5 */}
              <section id="institutional-responsibilities" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <Building2 className="h-4 w-4" />
                  <span>Section 5</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  5. Institutional Responsibilities
                </h2>
                <p>
                  Educational institutions deploying Campo are responsible for:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>The accuracy, validity, and lawfulness of student admissions, attendance logs, marks, and fee schedules uploaded to the platform.</li>
                  <li>Ensuring lawful basis and student/parent consent under the Digital Personal Data Protection Act, 2023 for student onboarding.</li>
                  <li>Assigning appropriate role-based permissions to faculty and administrative officers.</li>
                  <li>Promptly notifying PydahSoft upon student withdrawal, suspension, or course completion to deactivate credentials.</li>
                </ul>
              </section>

              {/* Section 6 */}
              <section id="acceptable-usage" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Section 6</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  6. Acceptable Usage Policy
                </h2>
                <p>
                  Users may not engage in any of the following prohibited activities:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>Attempting to bypass, reverse engineer, decompile, or tamper with the application or API security controls.</li>
                  <li>Submitting false attendance, forging examination data, or manipulating fee receipt identifiers.</li>
                  <li>Transmitting malicious code, automated bots, scrapers, or disruptive traffic that burdens server resources.</li>
                  <li>Harassing, abusing, or sending unlawful messages through campus feedback or club messaging modules.</li>
                </ul>
              </section>

              {/* Section 7 */}
              <section id="intellectual-property" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Section 7</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  7. Intellectual Property
                </h2>
                <p>
                  All proprietary rights, software code, UI designs, animations, databases, trademarks, logos, and documentation related to Campo are the exclusive intellectual property of <strong>PydahSoft Pvt Ltd</strong>. Users are granted a limited, non-exclusive, non-transferable, revocable license to access and use the software in accordance with these Terms.
                </p>
              </section>

              {/* Section 8 */}
              <section id="service-availability" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <Calendar className="h-4 w-4" />
                  <span>Section 8</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  8. Service Availability &amp; Maintenance
                </h2>
                <p>
                  While PydahSoft strives to provide uninterrupted 24/7 service availability, access may occasionally be suspended or restricted to perform routine maintenance, system updates, or emergency server enhancements. We will endeavor to schedule planned downtime during non-peak campus hours.
                </p>
              </section>

              {/* Section 9 */}
              <section id="third-party-services" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <ExternalLink className="h-4 w-4" />
                  <span>Section 9</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  9. Third-Party Services
                </h2>
                <p>
                  Campo integrates with authorized third-party service providers (such as Google Firebase for push notifications and Razorpay / PPG for fee transactions). PydahSoft is not responsible for the independent uptime, policies, or operations of third-party payment gateways or carrier networks.
                </p>
              </section>

              {/* Section 10 */}
              <section id="account-suspension" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Section 10</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  10. Account Suspension &amp; Termination
                </h2>
                <p>
                  We or your educational institution reserve the right to suspend or terminate account access if:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                  <li>You violate these Terms or the Acceptable Usage Policy.</li>
                  <li>Your student enrollment status is terminated, cancelled, or concluded.</li>
                  <li>Requested by law enforcement or regulatory authorities.</li>
                </ul>
              </section>

              {/* Section 11 */}
              <section id="limitation-of-liability" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Section 11</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  11. Limitation of Liability
                </h2>
                <p>
                  To the maximum extent permitted by applicable Indian law, PydahSoft shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of the use or inability to use the platform. Educational decisions, grading, attendance marks, and fee structures remain the sole responsibility of the respective educational institution.
                </p>
              </section>

              {/* Section 12 */}
              <section id="changes-to-terms" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <Calendar className="h-4 w-4" />
                  <span>Section 12</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  12. Changes to Terms
                </h2>
                <p>
                  We may modify these Terms at any time to reflect software updates, legal revisions, or service offerings. Revisions will be published on this page with an updated &ldquo;Effective Date&rdquo;. Continued use of Campo after revisions constitutes acceptance of the modified Terms.
                </p>
              </section>

              {/* Section 13 */}
              <section id="contact-information" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <Mail className="h-4 w-4" />
                  <span>Section 13</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  13. Contact Information
                </h2>
                <p>
                  For inquiries or questions concerning these Terms and Conditions:
                </p>
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs sm:text-sm">
                  <div><strong>Legal &amp; Compliance Entity:</strong> PydahSoft Pvt Ltd</div>
                  <div><strong>Address:</strong> {siteConfig.contact.address}</div>
                  <div><strong>Email:</strong> <a href={`mailto:${siteConfig.contact.email}`} className="text-campo-teal hover:underline">{siteConfig.contact.email}</a></div>
                  <div><strong>Phone:</strong> {siteConfig.contact.phone}</div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-xs font-semibold text-campo-teal hover:underline"
                  >
                    ↑ Back to top
                  </button>
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                    <button type="button" onClick={() => onNavigate?.('/privacy-policy')} className="hover:text-campo-navy">Privacy Policy</button>
                    <span>•</span>
                    <button type="button" onClick={() => onNavigate?.('/delete-account')} className="hover:text-campo-navy">Account Deletion</button>
                    <span>•</span>
                    <button type="button" onClick={() => onNavigate?.('/contact')} className="hover:text-campo-navy">Contact Us</button>
                  </div>
                </div>
              </section>

            </article>

          </div>
        </div>
      </div>
    </>
  );
}
