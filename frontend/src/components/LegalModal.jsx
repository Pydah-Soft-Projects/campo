import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ShieldCheck } from 'lucide-react';

const legalContent = {
  privacy: {
    title: 'Privacy Policy (Template Notice)',
    body: [
      'This Privacy Policy notice is a frontend placeholder for the Campo Institutional Platform website. Replace this content with your organization’s approved institutional privacy policy before production launch.',
      'Campo is engineered around role-based access control and permission-scoped institutional data governance. Any contact or demo request submitted after backend integration should only be used to respond to institutional inquiries.',
    ],
  },
  terms: {
    title: 'Terms & Conditions (Template Notice)',
    body: [
      'These Terms and Conditions serve as a frontend placeholder for the Campo Institutional Platform website. Update this text with your legal terms and institutional service agreements prior to deployment.',
      'Platform capabilities described on this site reflect connected institutional modules and permission-aware AI question answering over existing institutional data, alongside clearly labeled configurable or roadmap capabilities.',
    ],
  },
};

export function LegalModal({ openType, onClose }) {
  useEffect(() => {
    if (!openType) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [openType, onClose]);

  const activeDoc = openType ? legalContent[openType] : null;

  return (
    <AnimatePresence>
      {activeDoc && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-campo-navy/25 p-4 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-elevated sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-campo-teal/15 text-campo-navy">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3
                  id="legal-modal-title"
                  className="font-display text-lg font-bold text-campo-navy"
                >
                  {activeDoc.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-campo-navy"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 space-y-3 text-sm leading-relaxed text-campo-muted">
              {activeDoc.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl bg-campo-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-campo-secondary"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

