import React, { useEffect, useState, useCallback } from 'react';
import {
  ShieldCheck,
  LogOut,
  ExternalLink,
  Search,
  Filter,
  RefreshCw,
  Mail,
  Phone,
  Building2,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  Trash2,
  MessageSquare,
  X,
  Send,
  Loader2,
  ChevronDown,
  Inbox,
  UserCheck
} from 'lucide-react';
import {
  getInquiries,
  getDashboardStats,
  updateInquiryStatus,
  addInquiryNote,
  deleteInquiry,
  logoutAdmin,
  isAuthenticated,
  testWhatsAppMessage,
  getWhatsAppConfig,
} from '../services/api';
import { CampoLogo } from '../components/CampoLogo';

const STATUS_OPTIONS = ['New', 'Contacted', 'Demo Scheduled', 'Closed'];

const STATUS_BADGE_STYLES = {
  New: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20',
  Contacted: 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/20',
  'Demo Scheduled': 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/20',
  Closed: 'bg-slate-100 text-slate-700 border-slate-200 ring-slate-500/20',
};

export function AdminDashboardPage({ onNavigate }) {
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, demoScheduled: 0, closed: 0 });
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeInquiry, setActiveInquiry] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [noteSubmitting, setNoteSubmitting] = useState(false);
  const [statusUpdatingId, setStatusUpdatingId] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  // WhatsApp Testing & Diagnosis State
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [waConfig, setWaConfig] = useState(null);
  const [waConfigLoading, setWaConfigLoading] = useState(false);
  const [waTesting, setWaTesting] = useState(false);
  const [waTestTab, setWaTestTab] = useState('raw'); // 'raw' (Provider / Postman JSON) or 'form'
  const buildTemplateJson = (name = '', withVariables = false) => {
    const templateName = (name || '').trim() || 'TEMPLATE_NAME';
    if (withVariables) {
      return JSON.stringify(
        {
          type: 'template',
          template: {
            language: {
              policy: 'deterministic',
              code: 'en',
            },
            name: templateName,
            components: [
              {
                type: 'body',
                parameters: [
                  { type: 'text', text: 'Dr. Rajesh Sharma' },
                  { type: 'text', text: '78' },
                  { type: 'text', text: '22' },
                  { type: 'text', text: '20' },
                  { type: 'text', text: '16' },
                  { type: 'text', text: '20' },
                  { type: 'text', text: 'Campus Operations' },
                  {
                    type: 'text',
                    text: 'Campo automates bus fleet tracking, gate security, and hostel asset management to close this gap.',
                  },
                  { type: 'text', text: "St. Xavier's Engineering College" },
                ],
              },
            ],
          },
        },
        null,
        2
      );
    }
    return JSON.stringify(
      {
        type: 'template',
        template: {
          language: {
            policy: 'deterministic',
            code: 'en',
          },
          name: templateName,
          components: [],
        },
      },
      null,
      2
    );
  };

  const [waRawJson, setWaRawJson] = useState(() => buildTemplateJson('', false));
  const [waForm, setWaForm] = useState({
    to: '9392604899',
    templateName: '',
    content: 'Campo Campus Health Check: Your institutional assessment report is ready.',
    sendContentAsVar: false,
    mode: 'template',
  });
  const [waResult, setWaResult] = useState(null);

  const loadWhatsAppConfig = async () => {
    setWaConfigLoading(true);
    try {
      const res = await getWhatsAppConfig();
      setWaConfig(res);
      if (res?.templateName) {
        setWaRawJson((prev) => {
          if (!prev || prev.includes('TEMPLATE_NAME')) {
            return buildTemplateJson(res.templateName, false);
          }
          return prev;
        });
      }
    } catch (err) {
      console.warn('Failed to load WhatsApp config:', err);
    } finally {
      setWaConfigLoading(false);
    }
  };

  const handleOpenWhatsAppModal = (prefill = null) => {
    setWaResult(null);
    if (prefill) {
      setWaForm((prev) => ({
        ...prev,
        to: prefill.phone || prev.to,
      }));
    }
    setShowWhatsAppModal(true);
    loadWhatsAppConfig();
  };

  const handleSendTestWhatsApp = async (e) => {
    e.preventDefault();
    if (!waForm.to.trim()) {
      showFeedback('Please enter a recipient mobile number', 'error');
      return;
    }

    setWaTesting(true);
    setWaResult(null);
    try {
      const payload =
        waTestTab === 'raw'
          ? {
              to: waForm.to.trim(),
              mode: 'raw',
              rawPayload: waRawJson,
            }
          : {
              to: waForm.to.trim(),
              templateName: waForm.templateName.trim() || undefined,
              content: waForm.content.trim(),
              sendContentAsVar: waForm.sendContentAsVar,
              mode: waForm.mode,
            };

      const res = await testWhatsAppMessage(payload);

      setWaResult(res);
      if (res.success) {
        showFeedback('WhatsApp message dispatched successfully!');
      } else if (res.skipped) {
        showFeedback(res.reason || 'WhatsApp skipped (check credentials in .env)', 'error');
      } else {
        showFeedback('Failed to send WhatsApp message. See details below.', 'error');
      }
    } catch (err) {
      setWaResult({
        success: false,
        error: err.data?.message || err.message || 'Request execution error',
      });
      showFeedback(err.message || 'Error executing WhatsApp test', 'error');
    } finally {
      setWaTesting(false);
    }
  };

  // Authentication check
  useEffect(() => {
    if (!isAuthenticated()) {
      onNavigate?.('/admin/login');
    }
  }, [onNavigate]);

  const showFeedback = (text, type = 'success') => {
    setFeedbackMessage({ text, type });
    setTimeout(() => {
      setFeedbackMessage(null);
    }, 3500);
  };

  const loadData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const [statsRes, inquiriesRes] = await Promise.all([
        getDashboardStats().catch(() => ({ stats: {} })),
        getInquiries({
          status: selectedStatus,
          search: searchQuery,
        }).catch(() => ({ inquiries: [] })),
      ]);

      if (statsRes.stats) {
        setStats(statsRes.stats);
      }
      if (inquiriesRes.inquiries) {
        setInquiries(inquiriesRes.inquiries);
      }
    } catch (err) {
      if (err.status === 401) {
        logoutAdmin();
        onNavigate?.('/admin/login');
      } else {
        showFeedback(err.message || 'Error fetching records', 'error');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedStatus, searchQuery, onNavigate]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleLogout = () => {
    logoutAdmin();
    onNavigate?.('/admin/login');
  };

  const handleStatusChange = async (inquiryId, newStatus) => {
    setStatusUpdatingId(inquiryId);
    try {
      const updated = await updateInquiryStatus(inquiryId, newStatus);
      setInquiries((prev) =>
        prev.map((item) => (item._id === inquiryId ? updated.inquiry : item))
      );
      if (activeInquiry?._id === inquiryId) {
        setActiveInquiry(updated.inquiry);
      }
      showFeedback(`Status updated to "${newStatus}"`);
      // Update stats summary in background
      getDashboardStats().then((res) => {
        if (res.stats) setStats(res.stats);
      });
    } catch (err) {
      showFeedback(err.message || 'Failed to update status', 'error');
    } finally {
      setStatusUpdatingId(null);
    }
  };

  const handleDelete = async (inquiryId, institutionName) => {
    if (!window.confirm(`Are you sure you want to delete inquiry from "${institutionName}"?`)) {
      return;
    }

    try {
      await deleteInquiry(inquiryId);
      setInquiries((prev) => prev.filter((item) => item._id !== inquiryId));
      if (activeInquiry?._id === inquiryId) {
        setActiveInquiry(null);
      }
      showFeedback('Inquiry successfully deleted');
      getDashboardStats().then((res) => {
        if (res.stats) setStats(res.stats);
      });
    } catch (err) {
      showFeedback(err.message || 'Failed to delete inquiry', 'error');
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim() || !activeInquiry) return;

    setNoteSubmitting(true);
    try {
      const res = await addInquiryNote(activeInquiry._id, noteText.trim());
      setActiveInquiry(res.inquiry);
      setInquiries((prev) =>
        prev.map((item) => (item._id === res.inquiry._id ? res.inquiry : item))
      );
      setNoteText('');
      showFeedback('Administrative note saved');
    } catch (err) {
      showFeedback(err.message || 'Failed to add note', 'error');
    } finally {
      setNoteSubmitting(false);
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return '—';
    try {
      const date = new Date(isoString);
      return new Intl.DateTimeFormat('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(date);
    } catch {
      return isoString;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CampoLogo />
            <div className="h-5 w-px bg-slate-200 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-campo-navy/5 text-campo-navy border border-campo-navy/10 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-campo-teal" />
                Admin Inquiries Portal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => handleOpenWhatsAppModal()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors shadow-xs"
              title="Test sending WhatsApp template message"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>Test WhatsApp API</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate?.('/')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-campo-navy rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Website</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 hover:text-red-700 rounded-lg border border-red-200/80 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Floating feedback toast */}
      {feedbackMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm shadow-lg border transition-all duration-200 ${
            feedbackMessage.type === 'error'
              ? 'bg-red-600 text-white border-red-700'
              : 'bg-campo-navy text-white border-campo-navy/90'
          }`}
        >
          {feedbackMessage.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-white" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-campo-teal" />
          )}
          <span>{feedbackMessage.text}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Metrics Summary Bar */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5 mb-8">
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Received</span>
              <Inbox className="w-4 h-4 text-slate-400" />
            </div>
            <p className="mt-2 text-2xl font-bold text-campo-navy">{stats.total || 0}</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">New</span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="mt-2 text-2xl font-bold text-emerald-700">{stats.new || 0}</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Contacted</span>
              <UserCheck className="w-4 h-4 text-blue-500" />
            </div>
            <p className="mt-2 text-2xl font-bold text-blue-700">{stats.contacted || 0}</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Demo Scheduled</span>
              <Calendar className="w-4 h-4 text-amber-500" />
            </div>
            <p className="mt-2 text-2xl font-bold text-amber-700">{stats.demoScheduled || 0}</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Closed</span>
              <CheckCircle2 className="w-4 h-4 text-slate-400" />
            </div>
            <p className="mt-2 text-2xl font-bold text-slate-700">{stats.closed || 0}</p>
          </div>
        </div>

        {/* Search, Filter & Action Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {['All', ...STATUS_OPTIONS].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  selectedStatus === status
                    ? 'bg-campo-navy text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Search Box + Refresh */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, institution, email..."
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-campo-teal"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => loadData(true)}
              disabled={refreshing}
              title="Refresh Records"
              className="p-2 text-slate-600 hover:text-campo-navy border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-campo-teal' : ''}`} />
            </button>
          </div>
        </div>

        {/* Inquiries Table Card */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-campo-teal mb-3" />
              <p className="text-sm">Loading institutional inquiries from MongoDB...</p>
            </div>
          ) : inquiries.length === 0 ? (
            <div className="py-16 text-center px-4">
              <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-slate-700">No inquiries found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                {searchQuery || selectedStatus !== 'All'
                  ? 'No records match the active filters. Try resetting the search or filter.'
                  : 'Contact submissions from the website will automatically appear here.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">Timestamp</th>
                    <th className="py-3 px-4">Institution & Contact</th>
                    <th className="py-3 px-4">Inquiry Type</th>
                    <th className="py-3 px-4">Contact Info</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inquiries.map((inquiry) => (
                    <tr
                      key={inquiry._id}
                      className="hover:bg-slate-50/70 transition-colors group"
                    >
                      {/* Date */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{formatDate(inquiry.createdAt)}</span>
                        </div>
                      </td>

                      {/* Institution & Contact */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900 text-sm">
                          {inquiry.institutionName}
                        </div>
                        <div className="text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <span className="font-medium text-slate-700">{inquiry.fullName}</span>
                          <span>•</span>
                          <span className="text-slate-500">{inquiry.designation}</span>
                        </div>
                      </td>

                      {/* Inquiry Type */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200/80">
                          {inquiry.inquiryType || 'General Enquiry'}
                        </span>
                        {inquiry.studentCount && (
                          <div className="mt-1">
                            <span className="inline-flex items-center text-[10px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                              {inquiry.studentCount}
                            </span>
                          </div>
                        )}
                      </td>

                      {/* Contact Info */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          <a
                            href={`mailto:${inquiry.email}`}
                            className="inline-flex items-center gap-1 text-slate-600 hover:text-campo-navy transition-colors"
                          >
                            <Mail className="w-3 h-3 text-slate-400" />
                            <span>{inquiry.email}</span>
                          </a>
                          <a
                            href={`tel:${inquiry.phone}`}
                            className="inline-flex items-center gap-1 text-slate-600 hover:text-campo-navy transition-colors font-mono"
                          >
                            <Phone className="w-3 h-3 text-slate-400" />
                            <span>{inquiry.phone}</span>
                          </a>
                        </div>
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="relative inline-block text-left">
                          <select
                            value={inquiry.status}
                            disabled={statusUpdatingId === inquiry._id}
                            onChange={(e) => handleStatusChange(inquiry._id, e.target.value)}
                            className={`text-[11px] font-semibold rounded-md px-2.5 py-1 border transition-colors cursor-pointer appearance-none pr-6 focus:outline-none focus:ring-1 focus:ring-campo-teal ${
                              STATUS_BADGE_STYLES[inquiry.status] || STATUS_BADGE_STYLES['New']
                            }`}
                          >
                            {STATUS_OPTIONS.map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2 pointer-events-none" />
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-right">
                        <div className="inline-flex items-center gap-1">
                          {inquiry.phone && (
                            <button
                              type="button"
                              onClick={() => handleOpenWhatsAppModal(inquiry)}
                              className="p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-md transition-colors"
                              title="Test sending WhatsApp message to this contact"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => setActiveInquiry(inquiry)}
                            className="p-1.5 text-slate-600 hover:text-campo-navy hover:bg-slate-100 rounded-md transition-colors"
                            title="View Full Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(inquiry._id, inquiry.institutionName)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Inquiry Detail Modal */}
      {activeInquiry && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-campo-teal">
                  Inquiry Details
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                  {activeInquiry.institutionName}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Submitted on {formatDate(activeInquiry.createdAt)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveInquiry(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-4 space-y-4">
              {/* Requester Profile Grid */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/70 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Primary Contact</span>
                  <span className="font-semibold text-slate-800">{activeInquiry.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Role / Designation</span>
                  <span className="font-semibold text-slate-800">{activeInquiry.designation}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Email Address</span>
                  <a
                    href={`mailto:${activeInquiry.email}`}
                    className="font-medium text-campo-navy hover:underline flex items-center gap-1 mt-0.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    {activeInquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Contact Phone</span>
                  <a
                    href={`tel:${activeInquiry.phone}`}
                    className="font-medium text-campo-navy hover:underline flex items-center gap-1 mt-0.5 font-mono"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {activeInquiry.phone}
                  </a>
                </div>
                {activeInquiry.studentCount && (
                  <div className="col-span-2">
                    <span className="text-slate-400 block text-[11px]">Students Count</span>
                    <span className="font-semibold text-slate-800">{activeInquiry.studentCount}</span>
                  </div>
                )}
              </div>

              {/* Requirement / Message */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Institutional Requirements / Message
                </h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {activeInquiry.message}
                </div>
              </div>

              {/* Status Selector in Modal */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-semibold text-slate-700">Workflow Status:</span>
                <div className="flex items-center gap-1.5">
                  {STATUS_OPTIONS.map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(activeInquiry._id, st)}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-md border transition-colors ${
                        activeInquiry.status === st
                          ? STATUS_BADGE_STYLES[st] + ' shadow-xs font-bold'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Administrative Notes Thread */}
              <div className="pt-2 border-t border-slate-100">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-campo-teal" />
                  Internal Administrative Notes ({activeInquiry.notes?.length || 0})
                </h4>

                <div className="space-y-2 max-h-40 overflow-y-auto mb-3 pr-1">
                  {activeInquiry.notes && activeInquiry.notes.length > 0 ? (
                    activeInquiry.notes.map((note, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/60 text-xs"
                      >
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                          <span className="font-semibold text-slate-600">{note.addedBy}</span>
                          <span>{formatDate(note.createdAt)}</span>
                        </div>
                        <p className="text-slate-700">{note.text}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 italic">No internal notes added yet.</p>
                  )}
                </div>

                {/* Add Note Form */}
                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Add an internal follow-up note..."
                    className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-campo-teal"
                  />
                  <button
                    type="submit"
                    disabled={noteSubmitting || !noteText.trim()}
                    className="px-3 py-1.5 bg-campo-navy text-white text-xs font-semibold rounded-lg hover:bg-campo-navy/90 disabled:opacity-50 flex items-center gap-1 transition-colors"
                  >
                    {noteSubmitting ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                    Add
                  </button>
                </form>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              {activeInquiry.phone ? (
                <button
                  type="button"
                  onClick={() => {
                    handleOpenWhatsAppModal(activeInquiry);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  Test WhatsApp Message
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={() => setActiveInquiry(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Template Message Tester Modal */}
      {showWhatsAppModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    WhatsApp Message Tester
                  </h3>
                  <p className="text-xs text-slate-500">
                    Test live template message dispatch via Meta / WAPost API
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowWhatsAppModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Config Status Banner */}
            <div className="my-4 p-3.5 rounded-xl border text-xs bg-slate-50 border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-slate-700">API Connection Status:</span>
                {waConfigLoading ? (
                  <span className="inline-flex items-center gap-1 text-slate-400">
                    <Loader2 className="w-3 h-3 animate-spin" /> Checking .env...
                  </span>
                ) : waConfig?.configured ? (
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Ready (Keys Detected)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    <AlertCircle className="w-3.5 h-3.5" /> Keys Missing in backend/.env
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 pt-1 border-t border-slate-200/60 font-mono">
                <div>
                  <span className="text-slate-400 block font-sans">Phone Number ID:</span>
                  <span className="text-slate-700">{waConfig?.phoneNumberIdMasked || 'Not Set'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-sans">Template Name:</span>
                  <span className="text-slate-700">{waConfig?.templateName || 'Not Set in .env'}</span>
                </div>
              </div>
            </div>

            {/* Tab Selector */}
            <div className="flex border-b border-slate-200 mb-3.5">
              <button
                type="button"
                onClick={() => setWaTestTab('raw')}
                className={`pb-2 px-3 text-xs font-semibold border-b-2 transition-colors ${
                  waTestTab === 'raw'
                    ? 'border-emerald-600 text-emerald-700'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                Raw Provider / Postman JSON (Recommended)
              </button>
              <button
                type="button"
                onClick={() => setWaTestTab('form')}
                className={`pb-2 px-3 text-xs font-semibold border-b-2 transition-colors ${
                  waTestTab === 'form'
                    ? 'border-emerald-600 text-emerald-700'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                Simple Form Builder
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSendTestWhatsApp} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Recipient Mobile (WhatsApp Number) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={waForm.to}
                  onChange={(e) => setWaForm({ ...waForm, to: e.target.value })}
                  placeholder="e.g. 9392604899 or 919392604899"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                />
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  10-digit Indian numbers automatically receive +91 country prefix.
                </span>
              </div>

              {waTestTab === 'raw' ? (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block font-semibold text-slate-700">
                      Template JSON Payload (from Provider Dashboard or Postman)
                    </label>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setWaRawJson(buildTemplateJson(waConfig?.templateName, false))}
                        className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200"
                      >
                        Static Template (0 Vars)
                      </button>
                      <button
                        type="button"
                        onClick={() => setWaRawJson(buildTemplateJson(waConfig?.templateName, true))}
                        className="text-[11px] font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200"
                      >
                        Expo Report Template (9 Vars)
                      </button>
                    </div>
                  </div>
                  <textarea
                    rows={12}
                    value={waRawJson}
                    onChange={(e) => setWaRawJson(e.target.value)}
                    className="w-full p-2.5 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-lg border border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-snug"
                    placeholder="Paste the ready-made JSON body for your approved template here..."
                  />
                  <p className="mt-1 text-[11px] text-slate-500">
                    Paste the exact ready-made JSON from your WAPost dashboard. The "to" phone number above will automatically replace the recipient.
                  </p>
                </div>
              ) : (
                <>
                  {/* Template Name & Mode */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Template Name <span className="font-normal text-slate-400">(from .env)</span>
                      </label>
                      <input
                        type="text"
                        value={waForm.templateName}
                        onChange={(e) => setWaForm({ ...waForm, templateName: e.target.value })}
                        placeholder={waConfig?.templateName || 'e.g. your_template_name'}
                        disabled={waForm.mode === 'text'}
                        className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-xs disabled:bg-slate-100 disabled:text-slate-400"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Send Mode
                      </label>
                      <select
                        value={waForm.mode}
                        onChange={(e) => setWaForm({ ...waForm, mode: e.target.value })}
                        className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs bg-white"
                      >
                        <option value="template">Template Message (Official)</option>
                        <option value="text">Direct Text Message (No Template)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message / Template Content */}
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Message Content
                    </label>
                    <textarea
                      rows={3}
                      value={waForm.content}
                      onChange={(e) => setWaForm({ ...waForm, content: e.target.value })}
                      placeholder="Enter message content to test..."
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs leading-relaxed"
                    />
                  </div>

                  {/* Variable Setting (Zero Vars by Default) */}
                  {waForm.mode === 'template' && (
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                      <div className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          id="sendContentAsVarCheck"
                          checked={waForm.sendContentAsVar}
                          onChange={(e) => setWaForm({ ...waForm, sendContentAsVar: e.target.checked })}
                          className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <label htmlFor="sendContentAsVarCheck" className="text-[11px] text-slate-600 cursor-pointer">
                          <b>Send content as variable {"{{1}}"}:</b> Leave <u>unchecked</u> for testing with <b>no variables</b>.
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Live JSON Payload Preview */}
                  <div className="p-2.5 bg-slate-900 rounded-lg text-slate-300 text-[10px] font-mono overflow-x-auto">
                    <div className="text-[9px] uppercase tracking-wider text-slate-400 font-sans mb-1 font-semibold">
                      API Request Body Preview (WAPost / Meta Cloud API):
                    </div>
                    <pre className="whitespace-pre-wrap leading-tight text-emerald-400">
                      {JSON.stringify(
                        waForm.mode === 'text'
                          ? {
                              to: waForm.to ? `91${waForm.to.replace(/\D/g, '').replace(/^91/, '')}` : 'RECEIVER_NUMBER',
                              recipient_type: 'individual',
                              type: 'text',
                              text: { body: waForm.content || 'Test message' },
                            }
                          : {
                              to: waForm.to ? `91${waForm.to.replace(/\D/g, '').replace(/^91/, '')}` : 'RECEIVER_NUMBER',
                              recipient_type: 'individual',
                              type: 'template',
                              template: {
                                language: { policy: 'deterministic', code: waConfig?.templateLang || 'en' },
                                name: waForm.templateName.trim() || waConfig?.templateName || 'TEMPLATE_NAME',
                                ...(waForm.sendContentAsVar && waForm.content.trim()
                                  ? {
                                      components: [
                                        {
                                          type: 'body',
                                          parameters: [{ type: 'text', text: waForm.content.trim() }],
                                        },
                                      ],
                                    }
                                  : {}),
                              },
                            },
                        null,
                        2
                      )}
                    </pre>
                  </div>
                </>
              )}

              {/* Result Preview Box */}
              {waResult && (
                <div
                  className={`p-3.5 rounded-xl border text-xs animate-in fade-in duration-150 ${
                    waResult.success
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : waResult.skipped
                      ? 'bg-amber-50 border-amber-200 text-amber-900'
                      : 'bg-red-50 border-red-200 text-red-900'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold mb-1">
                    {waResult.success ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>WhatsApp Message Sent Successfully!</span>
                      </>
                    ) : waResult.skipped ? (
                      <>
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        <span>Sending Skipped</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <span>Message Sending Failed</span>
                      </>
                    )}
                  </div>

                  {waResult.success && (
                    <div className="mt-1.5 space-y-1 font-mono text-[11px]">
                      <div>Recipient: <b className="font-sans">{waResult.recipient}</b></div>
                      <div>Message ID: <span className="text-emerald-700 break-all">{waResult.messageId}</span></div>
                    </div>
                  )}

                  {waResult.error && (
                    <div className="mt-1.5 text-[11px] leading-relaxed">
                      <div className="font-semibold">Provider Error:</div>
                      <pre className="mt-1 p-2 bg-white/80 rounded border border-red-200 overflow-x-auto text-[10px] whitespace-pre-wrap font-mono">
                        {typeof waResult.error === 'object'
                          ? JSON.stringify(waResult.error, null, 2)
                          : String(waResult.error)}
                      </pre>
                      <p className="mt-2 text-slate-600">
                        <b>Hint:</b> Verify that your <code className="bg-red-100 px-1 py-0.5 rounded font-mono">WHATSAPP_ACCESS_TOKEN</code> is valid and not expired, that your <code className="bg-red-100 px-1 py-0.5 rounded font-mono">WHATSAPP_PHONE_NUMBER_ID</code> is correct, and that the template exists in your WAPost dashboard.
                      </p>
                    </div>
                  )}

                  {waResult.skipped && (
                    <p className="mt-1 text-[11px]">
                      {waResult.reason || 'Missing credentials in backend/.env'}. Please add <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">WHATSAPP_ACCESS_TOKEN</code> and <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">WHATSAPP_PHONE_NUMBER_ID</code>.
                    </p>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setShowWhatsAppModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={waTesting}
                  className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {waTesting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Test Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
