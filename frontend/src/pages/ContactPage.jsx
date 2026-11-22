import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Building2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  Smartphone,
  ExternalLink,
  ArrowLeft,
  LifeBuoy,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { siteConfig } from '../config/siteConfig';
import { submitContactInquiry } from '../services/contactService';

const CATEGORIES = [
  'General Enquiry',
  'Technical Support',
  'Account Deletion',
  'Privacy Concern',
  'Other',
];

export function ContactPage({ onNavigate }) {
  const [formData, setFormData] = useState(() => {
    // Read category from URL query param if present
    let initialCat = 'General Enquiry';
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category');
      if (catParam && CATEGORIES.includes(catParam)) {
        initialCat = catParam;
      }
    }
    return {
      fullName: '',
      email: '',
      phone: '',
      institutionName: '',
      subject: '',
      category: initialCat,
      message: '',
    };
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
      errs.fullName = 'Please enter your full name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errs.subject = 'Please provide a subject for your enquiry.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide your message (at least 10 characters).';
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
      const payload = {
        fullName: formData.fullName,
        institutionName: formData.institutionName || 'General Contact',
        email: formData.email,
        phone: formData.phone || '+91 0000000000',
        designation: formData.category || 'General User',
        studentCount: '',
        inquiryType: 'General Enquiry',
        message: `[Category: ${formData.category}] [Subject: ${formData.subject}]\n\n${formData.message}`,
      };

      const res = await submitContactInquiry(payload);
      setSubmissionSuccess(true);
      setReferenceId(res.inquiryId || `CMP-${Date.now().toString().slice(-6)}`);
    } catch (err) {
      console.error('[Contact Page] Submission error:', err);
      setErrorMessage(
        err.message || 'Unable to submit your message right now. Please try again or email us directly.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Us — Campo & PydahSoft Institutional Platform"
        description="Official contact page for Campo and PydahSoft. Reach out for general enquiries, technical support, privacy inquiries, and account assistance."
        keywords="Campo contact, PydahSoft contact, Campo support, campus ERP technical support, Campo account deletion help, Kakinada Andhra Pradesh"
        canonical="https://campo.co.in/contact"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact Campo & PydahSoft',
          url: 'https://campo.co.in/contact',
          description: 'Official contact portal for Campo institutional software and PydahSoft.',
          publisher: {
            '@type': 'Organization',
            name: 'PydahSoft',
            url: 'https://pydahsoft.in',
            telephone: siteConfig.contact.phone,
            email: siteConfig.contact.email,
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
            <Mail className="h-4 w-4" />
            <span>Get In Touch</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
            Contact Campo &amp; PydahSoft
          </h1>

          <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
            Have a question about the platform, need technical support, or want to discuss institutional deployment? Our team is here to assist you.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-campo-teal" />
              <span>Developed &amp; Supported by: <strong>PydahSoft Pvt Ltd</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-campo-teal" />
              <span>Support Hours: <strong>Mon – Sat (9:00 AM – 6:30 PM IST)</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Channels Grid */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container-campo py-10 sm:py-16">
          
          {/* Top 4 Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card hover:shadow-elevated transition-shadow">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-campo-teal/15 text-campo-navy mb-3">
                <Mail className="h-5 w-5 text-campo-teal" />
              </div>
              <h3 className="font-display text-sm font-bold text-campo-navy">General Enquiries</h3>
              <p className="text-xs text-slate-500 mt-1 mb-3">Institutional information &amp; partnership queries.</p>
              <a href={`mailto:${siteConfig.contact.email}`} className="text-xs font-semibold text-campo-teal hover:underline block truncate">
                {siteConfig.contact.email}
              </a>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card hover:shadow-elevated transition-shadow">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-3">
                <LifeBuoy className="h-5 w-5" />
              </div>
              <h3 className="font-display text-sm font-bold text-campo-navy">Technical Support</h3>
              <p className="text-xs text-slate-500 mt-1 mb-3">App issues, login errors &amp; integration bugs.</p>
              <a href={`mailto:${siteConfig.contact.supportEmail}`} className="text-xs font-semibold text-campo-teal hover:underline block truncate">
                {siteConfig.contact.supportEmail}
              </a>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card hover:shadow-elevated transition-shadow">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-3">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-display text-sm font-bold text-campo-navy">Privacy &amp; DPDP Desk</h3>
              <p className="text-xs text-slate-500 mt-1 mb-3">Data protection inquiries &amp; rights requests.</p>
              <a href={`mailto:${siteConfig.contact.privacyEmail}`} className="text-xs font-semibold text-campo-teal hover:underline block truncate">
                {siteConfig.contact.privacyEmail}
              </a>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card hover:shadow-elevated transition-shadow">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600 mb-3">
                <Smartphone className="h-5 w-5" />
              </div>
              <h3 className="font-display text-sm font-bold text-campo-navy">Account Deletion</h3>
              <p className="text-xs text-slate-500 mt-1 mb-3">Assistance with mobile app deactivation.</p>
              <a href={`mailto:${siteConfig.contact.deletionEmail}`} className="text-xs font-semibold text-campo-teal hover:underline block truncate">
                {siteConfig.contact.deletionEmail}
              </a>
            </div>

          </div>

          {/* Form & Company Details Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Form Column (7) */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-card space-y-6">
              <div>
                <h2 className="font-display text-xl font-bold text-campo-navy">
                  Send Us a Direct Message
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Fill in the details below. Our team typically responds within 24 business hours.
                </p>
              </div>

              {submissionSuccess ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-6 sm:p-8 text-center space-y-4">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-emerald-950">
                    Thank You! Your Message Has Been Sent.
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-900 max-w-md mx-auto leading-relaxed">
                    We have received your enquiry and registered it in our support desk. A representative will get back to you shortly.
                  </p>
                  <div className="inline-block bg-white border border-emerald-200 rounded-xl px-4 py-2 text-xs font-mono text-emerald-950">
                    Reference ID: <strong>{referenceId}</strong>
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
                          subject: '',
                          category: 'General Enquiry',
                          message: '',
                        });
                      }}
                      className="text-xs font-semibold text-emerald-700 hover:underline"
                    >
                      Send another message
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
                        placeholder="Your full name"
                        className={`w-full rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-campo-teal ${
                          errors.fullName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                        }`}
                      />
                      {errors.fullName && <p className="text-xs text-rose-600 mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-campo-navy mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={`w-full rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-campo-teal ${
                          errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                        }`}
                      />
                      {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-campo-navy mb-1.5">
                        Enquiry Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-campo-teal"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-campo-navy mb-1.5">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 00000 00000"
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-campo-teal"
                      >
                      </input>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-campo-navy mb-1.5">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Brief topic of your inquiry"
                      className={`w-full rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-campo-teal ${
                        errors.subject ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                      }`}
                    />
                    {errors.subject && <p className="text-xs text-rose-600 mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-campo-navy mb-1.5">
                      Institution / College (Optional)
                    </label>
                    <input
                      type="text"
                      name="institutionName"
                      value={formData.institutionName}
                      onChange={handleChange}
                      placeholder="Your institution or college name if applicable"
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-campo-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-campo-navy mb-1.5">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your inquiry, technical support issue, or request in detail..."
                      className={`w-full rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-campo-teal ${
                        errors.message ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                      }`}
                    />
                    {errors.message && <p className="text-xs text-rose-600 mt-1">{errors.message}</p>}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-campo-navy hover:bg-campo-secondary px-8 py-3 text-xs sm:text-sm font-semibold text-white shadow-sm transition-colors disabled:opacity-50"
                    >
                      <Send className="h-4 w-4 text-campo-teal" />
                      <span>{submitting ? 'Sending Message...' : 'Send Message'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Company & Office Column (5) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-campo-teal">
                  <Building2 className="h-4 w-4" />
                  <span>Headquarters &amp; Developer</span>
                </div>

                <div className="space-y-3">
                  <h3 className="font-display text-lg font-bold text-campo-navy">
                    PydahSoft Pvt Ltd
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    PydahSoft is the owner, architect, and software engineering company powering Campo across educational institutions.
                  </p>
                </div>

                <div className="space-y-4 pt-2 border-t border-slate-100 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-campo-teal shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-campo-navy font-semibold">Registered Office Address:</strong>
                      <span className="text-slate-600">{siteConfig.contact.address}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-campo-teal shrink-0" />
                    <div>
                      <strong className="block text-campo-navy font-semibold">Phone Contact:</strong>
                      <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`} className="text-slate-600 hover:text-campo-teal">
                        {siteConfig.contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-campo-teal shrink-0" />
                    <div>
                      <strong className="block text-campo-navy font-semibold">Official Corporate Email:</strong>
                      <a href={`mailto:${siteConfig.contact.email}`} className="text-slate-600 hover:text-campo-teal">
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <ExternalLink className="h-4 w-4 text-campo-teal shrink-0" />
                    <div>
                      <strong className="block text-campo-navy font-semibold">Company Website:</strong>
                      <a href={siteConfig.company.website} target="_blank" rel="noopener noreferrer" className="text-campo-teal hover:underline">
                        {siteConfig.company.website}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-card space-y-3 text-xs">
                <span className="font-bold text-campo-navy text-sm block">Quick Compliance Portals</span>
                <ul className="space-y-2">
                  <li>
                    <button
                      type="button"
                      onClick={() => onNavigate?.('/privacy-policy')}
                      className="text-slate-600 hover:text-campo-navy hover:underline flex items-center justify-between w-full"
                    >
                      <span>Read Campo Privacy Policy</span>
                      <ExternalLink className="h-3 w-3 text-slate-400" />
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => onNavigate?.('/delete-account')}
                      className="text-slate-600 hover:text-campo-navy hover:underline flex items-center justify-between w-full"
                    >
                      <span>Account Deletion &amp; Data Deactivation</span>
                      <ExternalLink className="h-3 w-3 text-slate-400" />
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => onNavigate?.('/terms')}
                      className="text-slate-600 hover:text-campo-navy hover:underline flex items-center justify-between w-full"
                    >
                      <span>Terms &amp; Conditions of Service</span>
                      <ExternalLink className="h-3 w-3 text-slate-400" />
                    </button>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}
