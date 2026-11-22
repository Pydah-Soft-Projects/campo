import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Calendar,
  Building2,
  Lock,
  FileText,
  UserCheck,
  ChevronRight,
  ExternalLink,
  Mail,
  Phone,
  AlertTriangle,
  Info,
  CheckCircle2,
  Smartphone,
  Eye,
  Database,
  ArrowLeft,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { siteConfig } from '../config/siteConfig';

const SECTIONS = [
  { id: 'introduction', title: '1. Introduction' },
  { id: 'about-campo-pydahsoft', title: '2. About Campo and PydahSoft' },
  { id: 'scope', title: '3. Scope of This Privacy Policy' },
  { id: 'information-we-collect', title: '4. Information We Collect' },
  { id: 'personal-student-info', title: '5. Personal & Student Information' },
  { id: 'academic-info', title: '6. Academic Information' },
  { id: 'attendance-exam-info', title: '7. Attendance & Examination Information' },
  { id: 'fee-payment-info', title: '8. Fee & Payment Information' },
  { id: 'transport-info', title: '9. Transport Information' },
  { id: 'hostel-info', title: '10. Hostel Information' },
  { id: 'device-technical-info', title: '11. Device & Technical Information' },
  { id: 'camera-storage-qr', title: '12. Camera, Storage & QR Scanning' },
  { id: 'location-info', title: '13. Location Information' },
  { id: 'push-notifications', title: '14. Push Notifications' },
  { id: 'how-we-use-info', title: '15. How We Use Information' },
  { id: 'institutional-access', title: '16. Institutional Data Access & Permissions' },
  { id: 'data-sharing-third-parties', title: '17. Data Sharing & Third-Party Services' },
  { id: 'storage-security', title: '18. Data Storage & Security' },
  { id: 'data-retention', title: '19. Data Retention' },
  { id: 'children-student-protection', title: '20. Children\'s Privacy & Student Protection' },
  { id: 'user-rights-correction', title: '21. User Rights & Data Correction' },
  { id: 'account-deletion', title: '22. Account Deletion' },
  { id: 'cookies-technologies', title: '23. Cookies & Website Technologies' },
  { id: 'changes-to-policy', title: '24. Changes to This Privacy Policy' },
  { id: 'contact-information', title: '25. Contact Information' },
];

export function PrivacyPolicyPage({ onNavigate }) {
  const [activeSection, setActiveSection] = useState('introduction');

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
        title="Privacy Policy — Campo Institutional Management Platform"
        description="Official Privacy Policy for Campo and the Campo Buddy Android application (com.pydahsoft.campobuddy), developed and maintained by PydahSoft. Learn how student and institutional data is processed and protected."
        keywords="Campo privacy policy, Campo Buddy privacy policy, com.pydahsoft.campobuddy, PydahSoft privacy, student data privacy, DPDP Act 2023 education, college ERP privacy India"
        canonical="https://campo.co.in/privacy-policy"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Campo Privacy Policy',
          url: 'https://campo.co.in/privacy-policy',
          description: 'Official Privacy Policy for Campo and the Campo Buddy Android application, developed and maintained by PydahSoft.',
          publisher: {
            '@type': 'Organization',
            name: 'PydahSoft',
            url: 'https://pydahsoft.in',
            logo: 'https://campo.co.in/og-image.png?v=2',
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
            <ShieldCheck className="h-4 w-4" />
            <span>Legal Notice &amp; Compliance</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
            Campo Privacy Policy
          </h1>

          <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
            Transparency, role-scoped institutional data governance, and rigorous student privacy protections for the Campo platform and Android application.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-campo-teal" />
              <span>Owner &amp; Developer: <strong>PydahSoft</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-campo-teal" />
              <span>Android Package: <code className="text-campo-teal bg-white/10 px-1.5 py-0.5 rounded text-xs">com.pydahsoft.campobuddy</code></span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-campo-teal" />
              <span>Last Updated: <strong>November 20, 2026</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout with Sticky Table of Contents */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container-campo py-10 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Desktop Table of Contents Sidebar */}
            <aside className="lg:col-span-4 hidden lg:block sticky top-24 bg-white rounded-2xl border border-slate-200 p-5 shadow-card max-h-[calc(100vh-120px)] overflow-y-auto no-scrollbar">
              <h2 className="font-display text-xs font-bold uppercase tracking-wider text-campo-navy flex items-center gap-2 pb-3 border-b border-slate-100">
                <FileText className="h-4 w-4 text-campo-teal" />
                Table of Contents
              </h2>
              <nav className="mt-3 space-y-1" aria-label="Privacy Policy Sections">
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
                <p className="font-medium text-slate-700">Need specific assistance?</p>
                <button
                  type="button"
                  onClick={() => onNavigate?.('/contact')}
                  className="w-full text-center py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-campo-navy font-semibold transition-colors"
                >
                  Contact Data Protection Officer
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate?.('/delete-account')}
                  className="w-full text-center py-2 px-3 rounded-lg border border-rose-200 bg-rose-50/50 hover:bg-rose-100/60 text-rose-700 font-semibold transition-colors"
                >
                  Account Deletion Request
                </button>
              </div>
            </aside>

            {/* Policy Article Body */}
            <article className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-card space-y-12 text-slate-700 leading-relaxed text-sm sm:text-base">
              
              {/* Section 1 */}
              <section id="introduction" className="scroll-mt-24 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Section 1</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  1. Introduction
                </h2>
                <p>
                  Welcome to <strong>Campo</strong>, an institutional student and campus operations ecosystem developed, owned, and maintained by <strong>PydahSoft</strong> (&ldquo;PydahSoft&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). This Privacy Policy explains our practices regarding the collection, processing, storage, sharing, retention, and protection of information obtained through the Campo web platform (available at <a href="https://campo.co.in" className="text-campo-teal underline hover:text-campo-navy">https://campo.co.in</a>) and the Campo Android mobile application (Android Package Name: <code className="bg-slate-100 px-1 py-0.5 rounded text-xs font-mono text-campo-navy">com.pydahsoft.campobuddy</code>).
                </p>
                <p>
                  We are deeply committed to protecting the privacy of educational institutions, students, parents, faculty members, and campus administrative staff. We operate Campo primarily as an institutional data processor / data fiduciary intermediary for educational institutions (universities, colleges, polytechnics, and schools) that license the platform.
                </p>
                <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4 text-xs sm:text-sm text-blue-900 flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Institutional Governance Notice:</strong>
                    Campo accounts are provisioned pursuant to institutional enrollment or employment. Most student records displayed within Campo are managed and maintained by your educational institution.
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section id="about-campo-pydahsoft" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <Building2 className="h-4 w-4" />
                  <span>Section 2</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  2. About Campo and PydahSoft
                </h2>
                <p>
                  <strong>Campo</strong> is an enterprise-grade, integrated institutional management ecosystem that connects admissions CRM, academic management, examinations, attendance, fee collections, campus transport, hostels, library, student engagement, and permission-scoped administration into a unified database.
                </p>
                <p>
                  <strong>PydahSoft</strong> is the technology company responsible for the design, architecture, intellectual property, programming, deployment, server infrastructure, and ongoing technical maintenance of Campo.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs space-y-1.5">
                    <span className="font-bold text-campo-navy block">Company Details:</span>
                    <div><strong>Legal Entity:</strong> PydahSoft Pvt Ltd</div>
                    <div><strong>Corporate Office:</strong> Kakinada Yanam Road, Kakinada District, Andhra Pradesh, India</div>
                    <div><strong>Official Company Portal:</strong> <a href="https://pydahsoft.in" target="_blank" rel="noopener noreferrer" className="text-campo-teal underline">https://pydahsoft.in</a></div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs space-y-1.5">
                    <span className="font-bold text-campo-navy block">Product &amp; App Details:</span>
                    <div><strong>Product Platform:</strong> Campo Institutional Platform</div>
                    <div><strong>Official Website:</strong> <a href="https://campo.co.in" className="text-campo-teal underline">https://campo.co.in</a></div>
                    <div><strong>Android Application:</strong> Campo (Campo Buddy)</div>
                    <div><strong>Android Package:</strong> <code className="font-mono">com.pydahsoft.campobuddy</code></div>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section id="scope" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <FileText className="h-4 w-4" />
                  <span>Section 3</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  3. Scope of This Privacy Policy
                </h2>
                <p>
                  This Privacy Policy applies to:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>The <strong>Campo Buddy Android Application</strong> (<code className="text-xs bg-slate-100 px-1 py-0.5 rounded">com.pydahsoft.campobuddy</code>) downloaded via Google Play Store or distributed through institutional mobile portals.</li>
                  <li>The <strong>Campo Web Portal</strong> and marketing website located at <a href="https://campo.co.in" className="text-campo-teal underline">https://campo.co.in</a>.</li>
                  <li>Inquiries, demo requests, account deletion submissions, and technical support requests submitted via the Campo platform.</li>
                  <li>Application Programming Interfaces (APIs) and backend services powering student attendance, fee receipts, timetables, and campus notifications.</li>
                </ul>
                <p className="text-xs text-slate-500 italic">
                  Note: This policy does not apply to non-Campo third-party websites or services that an institution may link to independently outside our application infrastructure.
                </p>
              </section>

              {/* Section 4 */}
              <section id="information-we-collect" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <Database className="h-4 w-4" />
                  <span>Section 4</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  4. Information We Collect
                </h2>
                <p>
                  We collect and process only the minimal data necessary to fulfill legitimate institutional education operations, maintain system security, comply with regulatory requirements, and deliver campus updates to students and authorized parents.
                </p>
                <div className="rounded-xl border border-slate-200 overflow-hidden">
                  <div className="bg-slate-100 px-4 py-2 text-xs font-bold text-campo-navy uppercase tracking-wider">
                    Core Data Collection Categories
                  </div>
                  <div className="divide-y divide-slate-200 text-xs sm:text-sm">
                    <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <strong>Institutional Identity &amp; Profile</strong>
                        <p className="text-slate-500 text-xs">Name, admission number, roll number, course, branch, semester, student photo.</p>
                      </div>
                      <span className="shrink-0 font-semibold text-campo-navy bg-slate-100 px-2 py-1 rounded text-xs">Provided by Institution</span>
                    </div>
                    <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <strong>Academic &amp; Attendance Records</strong>
                        <p className="text-slate-500 text-xs">Daily period attendance, timetable, exam eligibility, academic circulars.</p>
                      </div>
                      <span className="shrink-0 font-semibold text-campo-navy bg-slate-100 px-2 py-1 rounded text-xs">Mandatory for Portal Access</span>
                    </div>
                    <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <strong>Financial &amp; Fee Receipts</strong>
                        <p className="text-slate-500 text-xs">Fee breakdown, payment status, online transaction IDs, digital receipts.</p>
                      </div>
                      <span className="shrink-0 font-semibold text-campo-navy bg-slate-100 px-2 py-1 rounded text-xs">Institutional Accounting</span>
                    </div>
                    <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <strong>Device Telemetry &amp; Push Tokens</strong>
                        <p className="text-slate-500 text-xs">Expo push token, FCM token, OS version, app version, session timestamps.</p>
                      </div>
                      <span className="shrink-0 font-semibold text-campo-navy bg-slate-100 px-2 py-1 rounded text-xs">Optional / User-Granted</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 5 */}
              <section id="personal-student-info" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <UserCheck className="h-4 w-4" />
                  <span>Section 5</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  5. Personal and Student Information
                </h2>
                <p>
                  When a student or parent logs into Campo Buddy, the app accesses and displays personal student profile details synchronized from the institution’s official database (Student Data Management System / SDMS):
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li><strong>Full Legal Name</strong> of student and father / mother / guardian.</li>
                  <li><strong>Institutional Identifiers:</strong> Admission Number, University Roll Number, PIN number, Batch, College, Course, Branch, Year, Semester, and Section.</li>
                  <li><strong>Contact Details:</strong> Student email address, student mobile number, and parent/guardian phone number (used for login verification and SMS/OTP delivery).</li>
                  <li><strong>Demographic Information:</strong> Gender, Date of Birth, and statutory admission categories (Caste category, Quota) as officially maintained in college admission registers.</li>
                  <li><strong>Profile Photograph:</strong> Digital photograph for the digital student ID card, uploaded during admission and verified by college administrative authorities.</li>
                </ul>
                <p className="text-xs text-slate-600">
                  <em>Purpose:</em> To generate digital student credentials, maintain campus directory records, verify student identity during classes, examinations, library transactions, and bus boarding.
                </p>
              </section>

              {/* Section 6 */}
              <section id="academic-info" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <FileText className="h-4 w-4" />
                  <span>Section 6</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  6. Academic Information
                </h2>
                <p>
                  Campo processes academic curriculum information to keep students informed of their course progression:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                  <li>Course syllabi, enrolled subjects, elective selections, and section schedules.</li>
                  <li>Weekly period timetables and faculty assignment information.</li>
                  <li>Official campus circulars, holiday calendars, academic notices, and workshop announcements.</li>
                  <li>Campus placement training (CRT) records, internship modules, and student club memberships.</li>
                </ul>
              </section>

              {/* Section 7 */}
              <section id="attendance-exam-info" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Section 7</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  7. Attendance and Examination Information
                </h2>
                <p>
                  To fulfill institutional transparency and statutory university attendance mandates:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li><strong>Daily Attendance Logs:</strong> Period-wise and day-wise attendance status (&lsquo;Present&rsquo;, &lsquo;Absent&rsquo;, &lsquo;On-Duty&rsquo;, &lsquo;Holiday&rsquo;), cumulative attendance percentage, and shortage warning notices.</li>
                  <li><strong>Examinations:</strong> Internal assessment marks, midterm test schedules, hall ticket eligibility status, semester exam timetables, and university result summaries.</li>
                </ul>
                <p className="text-xs text-slate-500">
                  Institutional attendance and exam grades are read-only for students and parents; they can only be created and authenticated by verified faculty and authorized exam branch officers.
                </p>
              </section>

              {/* Section 8 */}
              <section id="fee-payment-info" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <Lock className="h-4 w-4" />
                  <span>Section 8</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  8. Fee and Payment Information
                </h2>
                <p>
                  Campo provides transparent fee tracking and digital payment receipting for students and parents:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li><strong>Fee Structures Displayed:</strong> Tuition fees, transport fees, hostel fees, examination fees, scholarship concessions, amounts paid, and pending balances.</li>
                  <li><strong>Payment Transactions:</strong> Digital receipt numbers, transaction dates, amounts, and settlement status.</li>
                </ul>
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 text-xs sm:text-sm text-emerald-950 flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Payment Gateway Compliance &amp; Zero Sensitive Card Storage:</strong>
                    Online fee payments are handled directly by RBI-licensed payment aggregators (such as Razorpay and Pydah Payment Gateway / PPG). <strong>Campo does NOT collect, receive, process, or store credit card numbers, debit card numbers, CVVs, card expiry dates, or Net Banking credentials.</strong> All online payment interactions occur in secure tokenized payment windows certified under PCI-DSS Level 1.
                  </div>
                </div>
              </section>

              {/* Section 9 */}
              <section id="transport-info" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <Info className="h-4 w-4" />
                  <span>Section 9</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  9. Transport Information
                </h2>
                <p>
                  For students and parents enrolled in college bus transport:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                  <li>Assigned bus route number, route name, driver contact number, and designated pickup / drop-off stop.</li>
                  <li>Scheduled morning pickup times and evening campus departure timings.</li>
                  <li>Live College Bus Telemetry: Displays real-time location pings generated by GPS tracker hardware installed on institutional fleet buses.</li>
                </ul>
                <p className="text-xs text-slate-600 bg-slate-100 p-3 rounded-lg">
                  <strong>Important Notice on Vehicle GPS:</strong> The transport map displays the vehicle’s telemetry sent from the college fleet device. The Campo Android application does NOT read or transmit the student’s personal mobile device GPS coordinates to track buses.
                </p>
              </section>

              {/* Section 10 */}
              <section id="hostel-info" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <Building2 className="h-4 w-4" />
                  <span>Section 10</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  10. Hostel Information
                </h2>
                <p>
                  Where licensed and activated by the institution, Campo maintains hostel room allocations, block names, warden emergency contact details, mess menus, and out-pass / gate-pass verification logs for residential campus students.
                </p>
              </section>

              {/* Section 11 */}
              <section id="device-technical-info" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <Smartphone className="h-4 w-4" />
                  <span>Section 11</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  11. Device and Technical Information
                </h2>
                <p>
                  To secure API requests and prevent unauthorized account takeover, our backend automatically logs basic technical parameters during authenticated mobile sessions:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                  <li>Operating system name and version (e.g. Android 14).</li>
                  <li>Device client type indicator (<code className="text-xs bg-slate-100 px-1 py-0.5 rounded">X-Client-Type: mobile</code>).</li>
                  <li>Unique Expo Push Token and Firebase Cloud Messaging (FCM) registration token.</li>
                  <li>IP address from which API calls originate (used for rate-limiting, DDoS prevention, and brute-force mitigation).</li>
                  <li>App build version to verify compatibility with backend schema updates.</li>
                </ul>
              </section>

              {/* Section 12 */}
              <section id="camera-storage-qr" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Section 12</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  12. Camera, Storage and QR Scanning
                </h2>
                <div className="space-y-3">
                  <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-2">
                    <strong className="block text-campo-navy font-semibold">Camera Access:</strong>
                    <p className="text-xs sm:text-sm text-slate-600">
                      The standard Campo Buddy Android application (com.pydahsoft.campobuddy) does <strong>NOT</strong> request or require runtime Camera permissions (<code className="font-mono text-xs">android.permission.CAMERA</code>). Student photographs and document verifications are provisioned directly by institution administrators via secure administrative desktop portals.
                    </p>
                  </div>
                  <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-2">
                    <strong className="block text-campo-navy font-semibold">Local Storage &amp; Cache:</strong>
                    <p className="text-xs sm:text-sm text-slate-600">
                      The application uses sandbox-isolated local device storage (<code className="font-mono text-xs">AsyncStorage</code>) exclusively to store encrypted JWT authentication tokens, active user role state, and notification preference flags. It does not request broad external storage access (<code className="font-mono text-xs">READ_EXTERNAL_STORAGE</code> or <code className="font-mono text-xs">WRITE_EXTERNAL_STORAGE</code>) on user devices.
                    </p>
                  </div>
                  <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-2">
                    <strong className="block text-campo-navy font-semibold">Digital ID &amp; QR Display:</strong>
                    <p className="text-xs sm:text-sm text-slate-600">
                      The application generates a digital Student ID Card containing a display-only verification QR code. This allows campus security or library staff to verify enrollment using institutional gate scanners. The student mobile app displays this code on screen; it does not require camera scanning permissions.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 13 */}
              <section id="location-info" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Section 13</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  13. Location Information
                </h2>
                <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4 text-xs sm:text-sm text-blue-950">
                  <strong className="font-semibold block mb-1">Zero Device Location Tracking Policy:</strong>
                  The Campo Buddy Android application does <strong>NOT</strong> request Android Location permissions (<code className="font-mono text-xs">ACCESS_FINE_LOCATION</code> or <code className="font-mono text-xs">ACCESS_COARSE_LOCATION</code>). We do NOT track, record, or store the real-time geographical GPS location of students, parents, or staff members using their mobile phones.
                </div>
                <p className="text-xs sm:text-sm text-slate-600 pt-2">
                  When viewing the Campus Transport map, live bus positions are fetched directly from authorized hardware GPS units installed on the college buses themselves, rendering vehicle telemetry without accessing user device GPS sensors.
                </p>
              </section>

              {/* Section 14 */}
              <section id="push-notifications" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <Smartphone className="h-4 w-4" />
                  <span>Section 14</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  14. Push Notifications
                </h2>
                <p>
                  On Android 13 (API Level 33) and higher, Campo Buddy explicitly requests the <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">android.permission.POST_NOTIFICATIONS</code> runtime permission.
                </p>
                <p>
                  Push notifications are used exclusively to deliver critical institutional alerts, including:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                  <li>Urgent campus circulars, emergency closures, and storm/weather advisories.</li>
                  <li>Daily attendance alerts (informing parents and students of absent marks).</li>
                  <li>Fee payment due reminders and verified receipt notifications.</li>
                  <li>Exam timetable updates, hall ticket release alerts, and academic schedules.</li>
                </ul>
                <p className="text-xs text-slate-500">
                  Users may disable push notifications at any time via Android System Settings (Settings &gt; Apps &gt; Campo Buddy &gt; Notifications).
                </p>
              </section>

              {/* Section 15 */}
              <section id="how-we-use-info" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <FileText className="h-4 w-4" />
                  <span>Section 15</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  15. How We Use Information
                </h2>
                <p>
                  PydahSoft processes institutional data strictly to fulfill educational service agreements. We use the collected information for:
                </p>
                <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li><strong>Authenticating Users:</strong> Verifying student identity, roll numbers, and parental OTPs during login.</li>
                  <li><strong>Delivering Academic Services:</strong> Displaying individualized timetables, attendance percentages, exam schedules, and library ledgers.</li>
                  <li><strong>Facilitating Institutional Communications:</strong> Sending official college notices, circulars, and event announcements.</li>
                  <li><strong>Maintaining Institutional Compliance:</strong> Providing accurate attendance and examination audit trails required by affiliating universities and regulatory councils.</li>
                  <li><strong>Security &amp; System Health:</strong> Protecting against unauthorized access, malicious brute-force attempts, and service disruptions.</li>
                </ol>
                <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-4 text-xs sm:text-sm text-rose-950 font-medium">
                  <strong>Strict Non-Commercialization Guarantee:</strong> We do NOT sell, rent, monetize, or trade student personal information to advertisers, data brokers, or commercial marketing firms under any circumstances.
                </div>
              </section>

              {/* Section 16 */}
              <section id="institutional-access" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <Lock className="h-4 w-4" />
                  <span>Section 16</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  16. Institutional Data Access and Permissions
                </h2>
                <p>
                  Campo enforces strict <strong>Role-Based Access Control (RBAC)</strong> across all modules and APIs:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                  <li><strong>Students:</strong> Can access only their own individual profile, attendance records, timetable, fee dues, and general campus circulars. Students cannot access another student’s academic records.</li>
                  <li><strong>Parents:</strong> Authenticate via their registered mobile number and can view only the records of their enrolled children.</li>
                  <li><strong>Faculty / Teachers:</strong> Can record attendance and marks only for classes and subjects officially assigned to them by the college administration.</li>
                  <li><strong>Administrative Officers &amp; Deans:</strong> Access modules (such as Finance, Transport, Hostel, Examinations) strictly according to administrative privileges configured by the institution’s Super Administrator.</li>
                </ul>
              </section>

              {/* Section 17 */}
              <section id="data-sharing-third-parties" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <ExternalLink className="h-4 w-4" />
                  <span>Section 17</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  17. Data Sharing and Third-Party Services
                </h2>
                <p>
                  We share information only with trusted third-party service providers necessary to operate the application infrastructure under strict confidentiality agreements:
                </p>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                    <strong className="block text-campo-navy font-semibold">1. Google Firebase Cloud Messaging (FCM v1) &amp; Expo:</strong>
                    <span className="text-slate-600 block mt-1">Used to dispatch OS-level push notifications to student and parent devices. Data shared: device push token and notification message title/body.</span>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                    <strong className="block text-campo-navy font-semibold">2. Authorized Payment Aggregators (Razorpay / PPG):</strong>
                    <span className="text-slate-600 block mt-1">Used when a student or parent pays college fees online. Data shared: Student Name, Admission Number, Amount, and Order ID. Payment processors operate under their own independent RBI and PCI-DSS compliance frameworks.</span>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                    <strong className="block text-campo-navy font-semibold">3. Cloud Hosting &amp; Database Infrastructure:</strong>
                    <span className="text-slate-600 block mt-1">Dedicated enterprise cloud servers located in secure Indian data center facilities meeting ISO/IEC 27001 standards.</span>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                    <strong className="block text-campo-navy font-semibold">4. Legal &amp; Statutory Compliance:</strong>
                    <span className="text-slate-600 block mt-1">We may disclose information if required to comply with court orders, applicable Indian laws (such as the IT Act, 2000 and DPDP Act, 2023), or lawful requests by university accreditation or government educational bodies.</span>
                  </div>
                </div>
              </section>

              {/* Section 18 */}
              <section id="storage-security" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <Lock className="h-4 w-4" />
                  <span>Section 18</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  18. Data Storage and Security
                </h2>
                <p>
                  We implement robust technical and organizational security controls designed to safeguard educational records against unauthorized access, alteration, disclosure, or destruction:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li><strong>Encryption in Transit:</strong> All web and mobile communications between client applications and backend APIs utilize Transport Layer Security (TLS 1.2 / TLS 1.3) with HTTPS encryption.</li>
                  <li><strong>JWT Bearer Authentication:</strong> API access is governed by cryptographically signed, expiring JSON Web Tokens validated on every request.</li>
                  <li><strong>Database Access Scoping:</strong> Production databases are hosted behind VPC firewalls with isolated subnets and strict IP allowlisting.</li>
                  <li><strong>Password Hashing:</strong> User passwords are never stored in plaintext; all administrative and student credentials are salted and hashed using bcrypt.</li>
                  <li><strong>Rate Limiting &amp; Monitoring:</strong> Backend endpoints incorporate automated rate limiting to protect against brute-force credential stuffing and unauthorized automated scraping.</li>
                </ul>
              </section>

              {/* Section 19 */}
              <section id="data-retention" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <Calendar className="h-4 w-4" />
                  <span>Section 19</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  19. Data Retention
                </h2>
                <p>
                  PydahSoft retains institutional data in accordance with the service contract executed with the licensing educational institution and applicable Indian educational and taxation statutes:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li><strong>Active Academic Records:</strong> Retained for the duration of a student&rsquo;s active enrollment at the institution.</li>
                  <li><strong>Permanent Academic Transcripts:</strong> Universities and colleges are legally required by UGC and state accreditation boards to permanently maintain student enrollment, graduation, and degree conferral records.</li>
                  <li><strong>Financial &amp; Fee Ledgers:</strong> Transaction receipts and fee payment histories are retained for at least 7 (seven) years to comply with statutory accounting and Indian taxation regulations.</li>
                  <li><strong>Mobile Session Tokens &amp; App Cache:</strong> Expired immediately upon user logout or account deactivation.</li>
                </ul>
              </section>

              {/* Section 20 */}
              <section id="children-student-protection" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Section 20</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  20. Children&rsquo;s Privacy and Student Protection
                </h2>
                <p>
                  Campo is designed for higher education institutions (universities, colleges, polytechnics) and secondary schools. When used in educational institutions where students may be minors (under 18 years of age):
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>Account creation is managed exclusively by the educational institution pursuant to parental admission enrollment consent.</li>
                  <li>The platform does NOT engage in behavioral advertising, psychological profiling, tracking across third-party websites, or commercial targeted marketing toward students.</li>
                  <li>Parents and legal guardians are granted direct visibility into their child&rsquo;s attendance, circulars, and fee records through verified mobile OTP authentication.</li>
                </ul>
                <p className="text-xs text-slate-500">
                  This framework complies with child protection provisions under the Digital Personal Data Protection Act, 2023 (DPDP Act, India).
                </p>
              </section>

              {/* Section 21 */}
              <section id="user-rights-correction" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <UserCheck className="h-4 w-4" />
                  <span>Section 21</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  21. User Rights and Data Correction
                </h2>
                <p>
                  Under the Digital Personal Data Protection Act, 2023 (DPDP Act) and applicable guidelines, students and authorized parents enjoy the following rights:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li><strong>Right to Access:</strong> View all personal, academic, attendance, and fee information stored in your account through the Campo mobile app and portal.</li>
                  <li><strong>Right to Correction:</strong> If personal information (such as spelling of name, mobile number, or address) contains an error, students can submit a correction request through their college administrative office / registrar or via our <a href="/contact" className="text-campo-teal underline">Contact Page</a>.</li>
                  <li><strong>Right to Grievance Redressal:</strong> Submit privacy concerns directly to our Data Protection Officer for prompt investigation and resolution.</li>
                </ul>
              </section>

              {/* Section 22 */}
              <section id="account-deletion" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Section 22</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  22. Account Deletion and App Deactivation
                </h2>
                <p>
                  In accordance with Google Play Store policies and user privacy rights, Campo provides a dedicated, publicly accessible web mechanism for users to request account deletion and mobile app profile deactivation:
                </p>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-campo-navy text-sm">Dedicated Account Deletion Page:</span>
                    <button
                      type="button"
                      onClick={() => onNavigate?.('/delete-account')}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-campo-teal hover:underline"
                    >
                      <span>Visit campo.co.in/delete-account</span>
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-600">
                    Users can submit an account deletion or login deactivation request directly without requiring an active app session. You may request deactivation of mobile login credentials, purge of push notification tokens, and removal of non-statutory mobile telemetry.
                  </p>
                  <p className="text-xs text-slate-500 italic">
                    <em>Statutory Retentions:</em> Please note that statutory academic records (such as completed semester marks, official degree award registers, and fee audit tax receipts) cannot be destroyed unilaterally by software deletion requests, as educational institutions are legally mandated to retain permanent student registers under state and central educational laws.
                  </p>
                </div>
              </section>

              {/* Section 23 */}
              <section id="cookies-technologies" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <Eye className="h-4 w-4" />
                  <span>Section 23</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  23. Cookies and Website Technologies
                </h2>
                <p>
                  On the Campo marketing website (<a href="https://campo.co.in" className="text-campo-teal underline">https://campo.co.in</a>), we use only essential and functional storage mechanisms (such as <code className="font-mono text-xs">localStorage</code>) to maintain administrative dashboard authentication and user display preferences.
                </p>
                <p>
                  We do NOT employ third-party cross-site advertising cookies or behavioral tracking pixels.
                </p>
              </section>

              {/* Section 24 */}
              <section id="changes-to-policy" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <Calendar className="h-4 w-4" />
                  <span>Section 24</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  24. Changes to This Privacy Policy
                </h2>
                <p>
                  PydahSoft reserves the right to update or amend this Privacy Policy periodically to reflect technological enhancements, operational changes, or evolving regulatory requirements under Indian law and Google Play policies.
                </p>
                <p>
                  When material changes are made, we will update the &ldquo;Last Updated&rdquo; date at the top of this page and, where appropriate, issue an in-app notice or website circular informing users of the revisions. Continued use of Campo after notice of changes signifies acceptance of the updated terms.
                </p>
              </section>

              {/* Section 25 */}
              <section id="contact-information" className="scroll-mt-24 space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <Mail className="h-4 w-4" />
                  <span>Section 25</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-campo-navy">
                  25. Contact Information &amp; Data Protection Officer
                </h2>
                <p>
                  If you have questions, inquiries, complaints, or grievance redressal requests regarding this Privacy Policy or Campo data processing, please contact us through any of the following official channels:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs sm:text-sm">
                    <strong className="block font-semibold text-campo-navy">Data Protection &amp; Privacy Desk:</strong>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-campo-teal shrink-0" />
                      <a href={`mailto:${siteConfig.contact.privacyEmail}`} className="text-campo-teal hover:underline">{siteConfig.contact.privacyEmail}</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-campo-teal shrink-0" />
                      <a href={`mailto:${siteConfig.contact.email}`} className="text-campo-teal hover:underline">{siteConfig.contact.email}</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-campo-teal shrink-0" />
                      <span>{siteConfig.contact.phone}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs sm:text-sm">
                    <strong className="block font-semibold text-campo-navy">Company Corporate Office:</strong>
                    <p className="text-slate-600">
                      <strong>PydahSoft Pvt Ltd</strong><br />
                      Kakinada Yanam Road, Kakinada District,<br />
                      Andhra Pradesh, India.
                    </p>
                    <p className="text-xs text-slate-500 pt-1">
                      Website: <a href="https://pydahsoft.in" target="_blank" rel="noopener noreferrer" className="text-campo-teal underline">https://pydahsoft.in</a>
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-xs font-semibold text-campo-teal hover:underline"
                  >
                    ↑ Back to top
                  </button>
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                    <button type="button" onClick={() => onNavigate?.('/terms')} className="hover:text-campo-navy">Terms &amp; Conditions</button>
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
