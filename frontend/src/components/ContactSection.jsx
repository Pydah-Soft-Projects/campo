import React, { useEffect, useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Send,
  AlertCircle,
  CheckCircle2,
  Info,
  Copy,
  Check,
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { submitContactInquiry } from '../services/contactService';
import { Reveal, SectionBackground } from './MotionPrimitives';

const initialFormState = {
  fullName: '',
  institutionName: '',
  email: '',
  phone: '',
  designation: '',
  message: '',
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactSection({ inquiryIntent = 'General Inquiry' }) {
  const [formData, setFormData] = useState(initialFormState);
  const [selectedIntent, setSelectedIntent] = useState(inquiryIntent);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [submitError, setSubmitError] = useState('');
  const [copiedPayload, setCopiedPayload] = useState(false);

  useEffect(() => {
    setSelectedIntent(inquiryIntent);
  }, [inquiryIntent]);

  const validate = (values) => {
    const nextErrors = {};

    if (!values.fullName.trim() || values.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }

    if (
      !values.institutionName.trim() ||
      values.institutionName.trim().length < 2
    ) {
      nextErrors.institutionName = 'Please enter your institution name.';
    }

    if (!values.email.trim() || !emailRegex.test(values.email.trim())) {
      nextErrors.email = 'Please enter a valid official email address.';
    }

    const digitsOnly = values.phone.replace(/\D/g, '');
    if (!values.phone.trim() || digitsOnly.length < 7) {
      nextErrors.phone = 'Please enter a valid contact phone number.';
    }

    if (!values.designation.trim()) {
      nextErrors.designation = 'Please specify your role or designation.';
    }

    if (!values.message.trim() || values.message.trim().length < 10) {
      nextErrors.message =
        'Please share a brief note about your institutional requirements (at least 10 characters).';
    }

    return nextErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmissionResult(null);

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const result = await submitContactInquiry({
        ...formData,
        inquiryType: selectedIntent,
      });
      setSubmissionResult(result);
      if (result.delivered) {
        setFormData(initialFormState);
      }
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Unable to submit inquiry right now. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopySummary = async () => {
    if (!submissionResult?.payload) return;
    try {
      await navigator.clipboard.writeText(
        JSON.stringify(submissionResult.payload, null, 2)
      );
      setCopiedPayload(true);
      setTimeout(() => setCopiedPayload(false), 2000);
    } catch {
      // Clipboard may be unavailable in restricted contexts
    }
  };

  const contactItems = [
    {
      icon: Mail,
      label: 'Official Email',
      value: siteConfig.contact.email,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: siteConfig.contact.phone,
    },
    {
      icon: MapPin,
      label: 'Office Address',
      value: siteConfig.contact.address,
    },
    {
      icon: Globe,
      label: 'Website',
      value: siteConfig.contact.website,
    },
  ];

  const inputBaseClass =
    'mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-sm text-campo-ink placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:ring-2';

  const getFieldClass = (fieldName) =>
    `${inputBaseClass} ${
      errors[fieldName]
        ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
        : 'border-slate-200 focus:border-campo-teal focus:ring-campo-teal/25'
    }`;

  return (
    <section
      id="contact"
      className="section-padding relative overflow-hidden border-t border-slate-200/80 bg-white"
    >
      <SectionBackground variant="flipY" opacityClass="opacity-85" />
      <div className="container-campo relative z-10">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Heading + Configurable Contact Placeholders */}
          <Reveal className="lg:col-span-5">
            <div className="mb-3 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-campo-teal-dark">
              <span className="font-mono text-campo-navy/45">07</span>
              <span className="h-px w-5 bg-slate-300" />
              <span>Get in Touch</span>
            </div>

            <h2 className="font-display text-3xl font-bold tracking-tight text-campo-navy sm:text-4xl lg:leading-[1.15]">
              Let&apos;s Build a More Connected Institution.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Whether you are evaluating Campo for a single campus or a multi-institution
              group, share your institutional context and our team will prepare a
              tailored platform walkthrough.
            </p>

            <div className="mt-8 space-y-3">
              {contactItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-card"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-campo-surface text-campo-navy">
                      <Icon className="h-[18px] w-[18px] text-campo-teal-dark" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {item.label}
                      </p>
                      <p className="mt-0.5 break-words text-sm font-semibold text-campo-navy">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* Right Column: Institutional Inquiry & Demo Form */}
          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-workspace sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
                <div>
                  <h3 className="font-display text-xl font-bold text-campo-navy">
                    Institutional Inquiry Form
                  </h3>
                  <p className="mt-1 text-xs text-campo-muted">
                    All fields are validated before submission.
                  </p>
                </div>

                {/* Inquiry Type Switcher */}
                <div className="inline-flex rounded-xl bg-campo-light p-1">
                  {['Demo Request', 'General Inquiry'].map((intent) => (
                    <button
                      key={intent}
                      type="button"
                      onClick={() => setSelectedIntent(intent)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                        selectedIntent === intent
                          ? 'bg-campo-navy text-white shadow-sm'
                          : 'text-campo-muted hover:text-campo-navy'
                      }`}
                    >
                      {intent}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-semibold uppercase tracking-wider text-campo-ink"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.fullName)}
                      placeholder="Dr. Rajesh Sharma"
                      className={getFieldClass('fullName')}
                    />
                    {errors.fullName && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="institutionName"
                      className="block text-xs font-semibold uppercase tracking-wider text-campo-ink"
                    >
                      Institution Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="institutionName"
                      name="institutionName"
                      type="text"
                      value={formData.institutionName}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.institutionName)}
                      placeholder="Your College or University"
                      className={getFieldClass('institutionName')}
                    />
                    {errors.institutionName && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        {errors.institutionName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold uppercase tracking-wider text-campo-ink"
                    >
                      Official Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.email)}
                      placeholder="director@institution.edu"
                      className={getFieldClass('email')}
                    />
                    {errors.email && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-semibold uppercase tracking-wider text-campo-ink"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.phone)}
                      placeholder="+91 98765 43210"
                      className={getFieldClass('phone')}
                    />
                    {errors.phone && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="designation"
                    className="block text-xs font-semibold uppercase tracking-wider text-campo-ink"
                  >
                    Designation <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="designation"
                    name="designation"
                    type="text"
                    value={formData.designation}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.designation)}
                    placeholder="Director, Chairman, Registrar, Principal, or Administrator"
                    className={getFieldClass('designation')}
                  />
                  {errors.designation && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      {errors.designation}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold uppercase tracking-wider text-campo-ink"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.message)}
                    placeholder="Tell us which institutional modules or workflows you would like to explore..."
                    className={getFieldClass('message')}
                  />
                  {errors.message && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {submitError && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
                  >
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                    <div>{submitError}</div>
                  </div>
                )}

                {submissionResult && (
                  <div
                    role="status"
                    className={`rounded-2xl border p-4 text-sm ${
                      submissionResult.delivered
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                        : 'border-campo-teal/40 bg-campo-teal/10 text-campo-navy'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {submissionResult.delivered ? (
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                      ) : (
                        <Info className="mt-0.5 h-5 w-5 shrink-0 text-campo-teal-dark" />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold">
                          {submissionResult.delivered
                            ? 'Inquiry Submitted'
                            : 'Validated & Ready for Backend Integration'}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed opacity-90">
                          {submissionResult.message}
                        </p>

                        {!submissionResult.delivered && (
                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={handleCopySummary}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-campo-navy/15 bg-white px-3 py-1.5 text-xs font-semibold text-campo-navy transition-colors hover:bg-slate-50"
                            >
                              {copiedPayload ? (
                                <>
                                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                                  Copied Inquiry JSON
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3.5 w-3.5" />
                                  Copy Inquiry Details
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-campo-navy px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-campo-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-campo-teal focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
                  >
                    <Send className="h-4 w-4" />
                    {submitting
                      ? 'Preparing Inquiry...'
                      : selectedIntent === 'Demo Request'
                        ? 'Request Institutional Demo'
                        : 'Submit Inquiry'}
                  </button>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

