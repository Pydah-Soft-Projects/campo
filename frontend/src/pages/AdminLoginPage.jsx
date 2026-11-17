import React, { useEffect, useState } from 'react';
import { Lock, Mail, ArrowLeft, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { loginAdmin, isAuthenticated } from '../services/api';
import { CampoLogo } from '../components/CampoLogo';

export function AdminLoginPage({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If already logged in, redirect straight to dashboard
    if (isAuthenticated()) {
      onNavigate?.('/admin/dashboard');
    }
  }, [onNavigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please provide both administrator email and password.');
      return;
    }

    setLoading(true);
    try {
      await loginAdmin(email.trim(), password);
      onNavigate?.('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid administrator credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#0e2a47_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      {/* Back to Home Link */}
      <div className="absolute top-6 left-6 z-10">
        <button
          type="button"
          onClick={() => onNavigate?.('/')}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-campo-navy transition-colors bg-white/80 backdrop-blur-sm px-3.5 py-1.5 rounded-lg border border-slate-200/80 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Campo Portal
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
          <CampoLogo />
        </div>
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-campo-navy/5 text-campo-navy text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-campo-teal" />
            Institutional Administration
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-campo-navy">
            Admin Management Console
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Sign in to access inbound institutional inquiries and contact submissions
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/60 rounded-2xl sm:px-10 border border-slate-200/80">
          {error && (
            <div className="mb-6 rounded-lg bg-red-50 p-3.5 border border-red-200 text-sm text-red-700 flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Administrator Email
              </label>
              <div className="mt-1.5 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="admin-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@campo.co.in"
                  className="block w-full pl-9 pr-3 py-2.5 sm:text-sm border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-campo-teal focus:border-campo-teal transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Password
              </label>
              <div className="mt-1.5 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="admin-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-9 pr-3 py-2.5 sm:text-sm border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-campo-teal focus:border-campo-teal transition-colors"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-campo-navy hover:bg-campo-navy/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-campo-teal disabled:opacity-60 transition-all duration-150"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  'Sign In to Admin Portal'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
