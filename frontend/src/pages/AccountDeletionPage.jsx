import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Trash2,
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Send,
  HelpCircle,
  Building2,
  Smartphone,
  Lock,
  ArrowLeft,
  Mail,
  Phone,
  UserCheck,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { siteConfig } from '../config/siteConfig';
import { submitContactInquiry } from '../services/contactService';

export function AccountDeletionPage({ onNavigate }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    institutionName: '',
    rollNumber: '',
    scope: 'mobile_app_deactivation',
    reason: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full student / user name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid registered email address.';
    }
    const digitsOnly = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim() || digitsOnly.length < 10) {
      errs.phone = 'Please enter your 10-digit registered mobile phone number.';
    }
    if (!formData.institutionName.trim()) {
      errs.institutionName = 'Please enter your college or institution name.';
    }
    if (!formData.rollNumber.trim()) {
      errs.rollNumber = 'Please provide your Student Admission / Roll / PIN Number.';
    }
    if (!formData.reason.trim() || formData.reason.trim().length < 10) {
      errs.reason = 'Please provide a brief reason or details for your request (minimum 10 characters).';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const u = { ...prev };
        delete u[name];
        return u;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const scopeLabel = formData.scope === 'mobile_app_deactivation'
        ? 'Deactivate Mobile App Session & Push Tokens'
        : 'Comprehensive Institutional Account Deletion / Alumnus Deactivation';

      const payload = {
        fullName: formData.fullName,
        institutionName: formData.institutionName || 'Student Account Deletion',
        email: formData.email,
        phone: formData.phone,
        designation: 'Student / User',
        studentCount: '',
        inquiryType: 'Other',
        message: `[ACCOUNT DELETION REQUEST]\nStudent Roll/PIN: ${formData.rollNumber}\nCollege: ${formData.institutionName}\nScope: ${scopeLabel}\nDetails: ${formData.reason}`,
      };

      const res = await submitContactInquiry(payload);
      setSubmissionSuccess(true);
      setReferenceId(res.inquiryId || `CMP-DEL-${Date.now().toString().slice(-6)}`);
    } catch (err) {
      console.error('[Account Deletion] Submission failed:', err);
      setErrorMessage(
        err.message || 'Unable to submit deletion request at this moment. Please check your connection or contact support directly.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Account Deletion & Data Deactivation — Campo Institutional Platform"
        description="Public account deletion and data deactivation request portal for Campo and the Campo Buddy Android app (com.pydahsoft.campobuddy). Review institutional retention guidelines and submit an authenticated deletion request."
        keywords="Campo delete account, Campo Buddy account deletion, com.pydahsoft.campobuddy delete data, student account deactivation PydahSoft, Google Play account deletion Campo"
        canonical="https://campo.co.in/delete-account"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Campo Account Deletion Request',
          url: 'https://campo.co.in/delete-account',
          description: 'Official account deletion and data deactivation portal for the Campo Android application and platform.',
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

          <div className="inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-500/10 px-3.5 py-1 text-xs font-semibold text-rose-300 mb-4">
            <Trash2 className="h-4 w-4 text-rose-400" />
            <span>User Rights &amp; Google Play Compliance</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
            Account Deletion &amp; Data Deactivation
          </h1>

          <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
            Publicly accessible service for students, parents, and users to request mobile app account deactivation, push token purging, or institutional profile deactivation.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-campo-teal" />
              <span>Android App: <strong>Campo Buddy</strong> (<code className="text-xs font-mono text-campo-teal bg-white/10 px-1 py-0.5 rounded">com.pydahsoft.campobuddy</code>)</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-campo-teal" />
              <span>Developer &amp; Operator: <strong>PydahSoft</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container-campo py-10 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left 7 Columns: Deletion Policy, Instructions & Form */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Notice Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-5">
                <h2 className="font-display text-xl font-bold text-campo-navy flex items-center gap-2.5">
                  <UserCheck className="h-5 w-5 text-campo-teal" />
                  Account Deletion Overview
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed">
                  In compliance with Google Play Store User Data Policies and applicable Indian personal data protection standards, users who have registered or logged into the <strong>Campo Buddy</strong> mobile application have the right to request deletion of their mobile app login account and associated app telemetry.
                </p>

                <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs sm:text-sm text-amber-950 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-amber-900">
                    <AlertCircle className="h-4 w-4 text-amber-700 shrink-0" />
                    Important Institutional Retention Notice:
                  </div>
                  <p className="text-xs text-amber-900/90 leading-relaxed">
                    Campo is an institutional campus management system. Your primary academic profile, semester grades, attendance percentage, university roll number, and official tuition fee transaction receipts are maintained as permanent educational records mandated by the university affiliation board, UGC, and applicable statutory laws. <strong>Requesting account deletion deactivates your mobile application access, removes active session credentials, and purges device push notification tokens.</strong> It does not alter, expunge, or destroy statutory academic transcripts or financial audit records legally retained by your institution.
                  </p>
                </div>
              </div>

              {/* Step-by-Step Explanation */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
                <h3 className="font-display text-lg font-bold text-campo-navy">
                  How Account Deletion Works
                </h3>

                <div className="grid grid-cols-1 gap-4 text-xs sm:text-sm">
                  <div className="flex gap-4 items-start p-3.5 rounded-xl border border-slate-100 bg-slate-50">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-campo-navy text-xs font-bold text-white">
                      1
                    </div>
                    <div>
                      <strong className="text-campo-navy block font-semibold">Submit Account Deletion Request</strong>
                      <p className="text-slate-600 mt-0.5">Fill out the verified request form below with your registered student roll/PIN number, college name, and registered contact information.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start p-3.5 rounded-xl border border-slate-100 bg-slate-50">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-campo-navy text-xs font-bold text-white">
                      2
                    </div>
                    <div>
                      <strong className="text-campo-navy block font-semibold">Identity &amp; Enrollment Verification</strong>
                      <p className="text-slate-600 mt-0.5">To prevent unauthorized deletion of another student’s portal access, our compliance desk verifies the request against the registered mobile number and institution database.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start p-3.5 rounded-xl border border-slate-100 bg-slate-50">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-campo-navy text-xs font-bold text-white">
                      3
                    </div>
                    <div>
                      <strong className="text-campo-navy block font-semibold">Session Revocation &amp; Push Token Purge</strong>
                      <p className="text-slate-600 mt-0.5">All active mobile authentication tokens (JWT) are revoked, push notification device tokens are wiped from our database, and your mobile login is deactivated.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start p-3.5 rounded-xl border border-slate-100 bg-slate-50">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-campo-navy text-xs font-bold text-white">
                      4
                    </div>
                    <div>
                      <strong className="text-campo-navy block font-semibold">Timeline &amp; Formal Confirmation</strong>
                      <p className="text-slate-600 mt-0.5">Requests are acknowledged within 48 to 72 hours, with final deactivation completed within 15 to 30 business days pursuant to institutional verification.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Submission Form */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
                <div>
                  <h3 className="font-display text-lg font-bold text-campo-navy">
                    Submit Account Deletion Request
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Please provide accurate information so our verification team can identify your student account.
                  </p>
                </div>

                {submissionSuccess ? (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-6 text-center space-y-4">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <h4 className="font-display text-lg font-bold text-emerald-950">
                      Deletion Request Received Successfully
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-900 max-w-md mx-auto leading-relaxed">
                      Your request has been logged in our secure compliance system. Our data protection team will verify your identity against institutional records and process your deactivation within 15–30 business days.
                    </p>
                    <div className="inline-block bg-white border border-emerald-200 rounded-xl px-4 py-2 text-xs font-mono text-emerald-950">
                      Tracking Reference ID: <strong>{referenceId}</strong>
                    </div>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSubmissionSuccess(false);
                          setFormData({
                            fullName: '',
                            email: '',
                            phone: '',
                            institutionName: '',
                            rollNumber: '',
                            scope: 'mobile_app_deactivation',
                            reason: '',
                          });
                        }}
                        className="text-xs font-semibold text-emerald-700 hover:underline"
                      >
                        Submit another request
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMessage && (
                      <div className="rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-800 flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-campo-navy mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="e.g. Ramesh Kumar"
                          className={`w-full rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-campo-teal ${
                            errors.fullName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                          }`}
                        />
                        {errors.fullName && <p className="text-xs text-rose-600 mt-1">{errors.fullName}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-campo-navy mb-1.5">
                          Student Roll / Admission / PIN No. *
                        </label>
                        <input
                          type="text"
                          name="rollNumber"
                          value={formData.rollNumber}
                          onChange={handleChange}
                          placeholder="e.g. 21B91A0501"
                          className={`w-full rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-campo-teal ${
                            errors.rollNumber ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                          }`}
                        />
                        {errors.rollNumber && <p className="text-xs text-rose-600 mt-1">{errors.rollNumber}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-campo-navy mb-1.5">
                          Registered Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="student@example.com"
                          className={`w-full rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-campo-teal ${
                            errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                          }`}
                        />
                        {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-campo-navy mb-1.5">
                          Registered Mobile Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="10-digit mobile number"
                          className={`w-full rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-campo-teal ${
                            errors.phone ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                          }`}
                        />
                        {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-campo-navy mb-1.5">
                        College / Institution Name *
                      </label>
                      <input
                        type="text"
                        name="institutionName"
                        value={formData.institutionName}
                        onChange={handleChange}
                        placeholder="e.g. Pydah College of Engineering"
                        className={`w-full rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-campo-teal ${
                          errors.institutionName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                        }`}
                      />
                      {errors.institutionName && <p className="text-xs text-rose-600 mt-1">{errors.institutionName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-campo-navy mb-1.5">
                        Requested Deletion Scope
                      </label>
                      <select
                        name="scope"
                        value={formData.scope}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-campo-teal"
                      >
                        <option value="mobile_app_deactivation">
                          Deactivate Mobile App Login &amp; Delete Push Tokens (Recommended for app removal)
                        </option>
                        <option value="alumnus_profile_deactivation">
                          Course Completed / Alumnus Account Deactivation
                        </option>
                        <option value="full_audit_request">
                          Full Personal Data Review &amp; Login Deactivation
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-campo-navy mb-1.5">
                        Reason for Deletion / Additional Instructions *
                      </label>
                      <textarea
                        rows={3}
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        placeholder="Please explain why you wish to delete or deactivate your account (e.g., course completed, transfer to another institution, no longer using mobile app)..."
                        className={`w-full rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-campo-teal ${
                          errors.reason ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                        }`}
                      />
                      {errors.reason && <p className="text-xs text-rose-600 mt-1">{errors.reason}</p>}
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 hover:bg-rose-700 px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-sm transition-colors disabled:opacity-50"
                      >
                        <Send className="h-4 w-4" />
                        <span>{submitting ? 'Submitting Request...' : 'Submit Deletion Request'}</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right 5 Columns: In-App Instructions, Retained Data, Support Contacts */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* In-App Instructions Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-card space-y-4">
                <div className="flex items-center gap-2.5 text-campo-navy font-bold text-sm">
                  <Smartphone className="h-5 w-5 text-campo-teal" />
                  Requesting Inside Android App
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Students using the <strong>Campo Buddy</strong> Android application can also initiate account deactivation from their device:
                </p>
                <ol className="list-decimal pl-4 space-y-2 text-xs text-slate-600">
                  <li>Open <strong>Campo Buddy</strong> on your Android phone.</li>
                  <li>Tap the <strong>Profile Drawer</strong> icon in the top header.</li>
                  <li>Scroll to <strong>Account Settings &amp; Security</strong>.</li>
                  <li>Select <strong>Request Account Deactivation</strong>.</li>
                  <li>Review the scope and tap <strong>Confirm Request</strong>.</li>
                </ol>
                <p className="text-xs text-slate-500 italic pt-1 border-t border-slate-100">
                  Both in-app and web requests are processed through our central PydahSoft compliance desk.
                </p>
              </div>

              {/* Data Retained vs Purged Comparison */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-card space-y-4">
                <div className="flex items-center gap-2.5 text-campo-navy font-bold text-sm">
                  <Lock className="h-5 w-5 text-campo-teal" />
                  What is Purged vs Retained
                </div>

                <div className="space-y-3 text-xs">
                  <div className="rounded-xl border border-rose-100 bg-rose-50/50 p-3">
                    <strong className="text-rose-900 block font-semibold mb-1">Permanently Purged / Deactivated:</strong>
                    <ul className="list-disc pl-4 space-y-1 text-rose-800/90">
                      <li>Mobile App Authentication Tokens (JWT)</li>
                      <li>Firebase &amp; Expo Device Push Tokens</li>
                      <li>Active Mobile Session Caches &amp; Cookies</li>
                      <li>Mobile App User Login Authorization</li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-3">
                    <strong className="text-blue-900 block font-semibold mb-1">Legally Retained by Institution:</strong>
                    <ul className="list-disc pl-4 space-y-1 text-blue-900/90">
                      <li>Official University Transcripts &amp; Grade Registers</li>
                      <li>Graduation &amp; Degree Conferral Records</li>
                      <li>Statutory Attendance Archives</li>
                      <li>Fee Payment Audit &amp; Tax Ledgers (7 years)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Direct Support Contacts */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-card space-y-3 text-xs">
                <span className="font-bold text-campo-navy text-sm block">Direct Privacy Contacts:</span>
                <p className="text-slate-600">
                  Prefer submitting your request via official email? Contact our compliance desk with your student details:
                </p>
                <div className="space-y-1.5 pt-1">
                  <a
                    href={`mailto:${siteConfig.contact.deletionEmail}?subject=Account%20Deletion%20Request`}
                    className="flex items-center gap-2 text-campo-teal hover:underline font-medium"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>{siteConfig.contact.deletionEmail}</span>
                  </a>
                  <a
                    href={`mailto:${siteConfig.contact.privacyEmail}?subject=Data%20Protection%20Query`}
                    className="flex items-center gap-2 text-campo-teal hover:underline font-medium"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>{siteConfig.contact.privacyEmail}</span>
                  </a>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="h-3.5 w-3.5 text-campo-teal" />
                    <span>{siteConfig.contact.phone}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}
