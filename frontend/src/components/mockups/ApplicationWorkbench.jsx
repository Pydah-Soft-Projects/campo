import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserPlus,
  BookOpen,
  Wallet,
  Bus,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Filter,
  Users,
  Search,
} from 'lucide-react';
import { revealEase } from '../MotionPrimitives';
import admissionsImg from '../../assets/admissions-counseling.webp';
import studentsLabImg from '../../assets/students-classroom.webp';
import boardroomImg from '../../assets/executive-analytics-boardroom.webp';
import fleetImg from '../../assets/campus-fleet-transport.webp';

const workbenchApps = [
  {
    id: 'admissions',
    name: 'Admissions CRM',
    tag: 'Lead-to-Enrollment Pipeline',
    icon: UserPlus,
    image: admissionsImg,
    imageCaption: 'Counselors guiding prospective students through online merit verification',
    description:
      'Track institutional enquiries, automate document verification, and convert leads into verified student profiles without duplicate data entry.',
    stats: [
      { label: 'Total Inquiries', value: '4,280' },
      { label: 'Conversion Rate', value: '38.4%' },
      { label: 'Verified Seats', value: '1,240' },
    ],
    previewType: 'admissions',
  },
  {
    id: 'academics',
    name: 'Academic & Exam Hub',
    tag: 'Curriculum & Hall Ticket Engine',
    icon: BookOpen,
    image: studentsLabImg,
    imageCaption: 'Students in smart computing lab with live biometric attendance syncing',
    description:
      'Synchronize semester timetables, faculty course allocation, syllabus progression, and automated examination hall ticket generation based on biometric attendance.',
    stats: [
      { label: 'Active Courses', value: '184' },
      { label: 'Exam Eligibility', value: '96.2%' },
      { label: 'Faculty Rosters', value: '350' },
    ],
    previewType: 'academics',
  },
  {
    id: 'finance',
    name: 'Fee Management',
    tag: 'Institutional Financial Reconciliation',
    icon: Wallet,
    image: boardroomImg,
    imageCaption: 'Institutional leadership auditing real-time tuition and hostel fee collections',
    description:
      'Manage multi-head fee structures, automated installment reminders, transparent concession approval trails, and instant digital receipt generation.',
    stats: [
      { label: 'Collected This Term', value: '₹14.8 Cr' },
      { label: 'Online UPI/Gateway', value: '88%' },
      { label: 'Pending Dues', value: '7.6%' },
    ],
    previewType: 'finance',
  },
  {
    id: 'logistics',
    name: 'Campus Logistics & Maintenance',
    tag: 'Fleet, Hostels & Maintenance',
    icon: Bus,
    image: fleetImg,
    imageCaption: 'University transport fleet with real-time GPS tracking across routes',
    description:
      'Real-time GPS tracking for campus bus fleets, biometric hostel resident check-ins, automated stationery inventory, and campus maintenance complaints resolution.',
    stats: [
      { label: 'Fleet Buses Tracked', value: '48 Routes' },
      { label: 'Hostel Residents', value: '2,840' },
      { label: 'Complaints Resolved', value: '98.5%' },
    ],
    previewType: 'logistics',
  },
];

export function ApplicationWorkbench({ onRequestDemo }) {
  const [selectedAppId, setSelectedAppId] = useState('admissions');
  const activeApp = workbenchApps.find((a) => a.id === selectedAppId) || workbenchApps[0];

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-workspace">
      {/* Top Application Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 bg-slate-50/90 px-4 py-3 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {workbenchApps.map((app) => {
            const Icon = app.icon;
            const isSelected = app.id === selectedAppId;
            return (
              <button
                key={app.id}
                type="button"
                onClick={() => setSelectedAppId(app.id)}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all duration-200 ${
                  isSelected
                    ? 'bg-campo-navy text-white shadow-card'
                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-campo-navy border border-slate-200/80'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isSelected ? 'text-campo-teal' : 'text-slate-500'}`} />
                <span>{app.name}</span>
              </button>
            );
          })}
        </div>

        <span className="hidden text-[11px] font-semibold uppercase tracking-wider text-campo-teal-dark lg:inline">
          Live Interactive Module Preview
        </span>
      </div>

      {/* Main Interactive Studio Grid */}
      <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-12 lg:gap-8">
        {/* Left Column: Module Description & Key Metrics */}
        <div className="flex flex-col justify-between lg:col-span-5">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-[10px] font-semibold text-campo-teal-dark">
              <span className="h-1.5 w-1.5 rounded-full bg-campo-teal" />
              {activeApp.tag}
            </div>

            <h3 className="mt-3 font-display text-xl font-bold text-campo-navy sm:text-2xl">
              {activeApp.name}
            </h3>

            <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600">
              {activeApp.description}
            </p>

            {/* Authentic Photographic Card */}
            <div className="relative mt-4 h-40 sm:h-48 w-full overflow-hidden rounded-2xl border border-slate-200 shadow-xs">
              <img
                src={activeApp.image}
                alt={activeApp.name}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <p className="absolute bottom-2.5 left-3 right-3 text-[10px] text-white font-medium">
                {activeApp.imageCaption}
              </p>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 border-y border-slate-100 py-3.5">
              {activeApp.stats.map((s) => (
                <div key={s.label}>
                  <p className="text-[10px] font-medium text-slate-400">{s.label}</p>
                  <p className="mt-0.5 font-display text-sm font-extrabold text-campo-navy sm:text-base">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <button
              type="button"
              onClick={onRequestDemo}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-campo-navy px-4 py-2.5 text-xs font-semibold text-white shadow-card transition-all hover:bg-campo-secondary"
            >
              <span>Schedule Live Walkthrough</span>
              <ArrowRight className="h-3.5 w-3.5 text-campo-teal" />
            </button>
          </div>
        </div>

        {/* Right Column: Live High-Fidelity UI Interface Preview */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-50 p-3.5 sm:p-5 lg:col-span-7 shadow-inner">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeApp.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: revealEase }}
              className="space-y-3.5"
            >
              {/* Top Filter Bar inside preview */}
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-2.5 text-xs shadow-xs">
                <div className="flex items-center gap-2 text-slate-500">
                  <Search className="h-3.5 w-3.5 text-slate-400" />
                  <span className="text-[11px]">Filter institutional records...</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-600">
                  <Filter className="h-3 w-3 text-campo-teal-dark" />
                  <span>Showing: Autumn 2026 Batch</span>
                </div>
              </div>

              {/* Dynamic UI Screen Content depending on active tab */}
              {activeApp.previewType === 'admissions' && (
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  {/* Column 1 */}
                  <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="font-display text-[11px] font-bold text-campo-navy">
                        Enquiry &amp; Lead (48)
                      </span>
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                    </div>
                    <div className="mt-2.5 space-y-2 text-[10px]">
                      <div className="rounded-lg bg-campo-surface/70 p-2 border border-slate-100">
                        <p className="font-bold text-campo-navy">Priyanka Varma</p>
                        <p className="text-slate-500">B.Tech AI-DS • Score: 94.2%</p>
                        <span className="mt-1 inline-block rounded bg-teal-50 px-1.5 py-0.5 text-[9px] font-semibold text-campo-teal-dark">
                          Counseling Scheduled
                        </span>
                      </div>
                      <div className="rounded-lg bg-campo-surface/70 p-2 border border-slate-100">
                        <p className="font-bold text-campo-navy">Rahul Sundaram</p>
                        <p className="text-slate-500">B.Tech ECE • Score: 88.6%</p>
                        <span className="mt-1 inline-block rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold text-slate-600">
                          Follow-up Today
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="font-display text-[11px] font-bold text-campo-navy">
                        Docs Verified (32)
                      </span>
                      <span className="h-2 w-2 rounded-full bg-blue-500" />
                    </div>
                    <div className="mt-2.5 space-y-2 text-[10px]">
                      <div className="rounded-lg bg-campo-surface/70 p-2 border border-slate-100">
                        <p className="font-bold text-campo-navy">Kavya Krishnan</p>
                        <p className="text-slate-500">MBA Finance • Merit Rank: 14</p>
                        <span className="mt-1 inline-block rounded bg-emerald-50 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-700">
                          Documents Approved
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Column 3 */}
                  <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="font-display text-[11px] font-bold text-campo-navy">
                        Enrolled &amp; Synced (128)
                      </span>
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    </div>
                    <div className="mt-2.5 space-y-2 text-[10px]">
                      <div className="rounded-lg bg-emerald-50/50 p-2 border border-emerald-100">
                        <p className="font-bold text-campo-navy">Siddharth N.</p>
                        <p className="text-slate-500">Student ID #PYD-2026-412</p>
                        <span className="mt-1 inline-flex items-center gap-1 text-[9px] font-semibold text-emerald-700">
                          <CheckCircle2 className="h-2.5 w-2.5" /> Synced to Fee Ledger
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeApp.previewType === 'academics' && (
                <div className="space-y-2.5 text-[11px]">
                  <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 font-bold text-campo-navy shadow-xs">
                    <span>Curriculum &amp; Hall Ticket Automation Engine</span>
                    <span className="text-[10px] text-emerald-600 font-semibold">96.4% Biometric Threshold</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between rounded-xl bg-white border border-slate-200 p-3 shadow-xs">
                      <div>
                        <p className="font-bold text-campo-navy">CS-402: Operating Systems</p>
                        <p className="text-[10px] text-slate-500">Prof. R. Ananth • 56 of 60 Lectures Delivered</p>
                      </div>
                      <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-semibold text-campo-teal-dark border border-teal-200/60">
                        Syllabus 93% Done
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-white border border-slate-200 p-3 shadow-xs">
                      <div>
                        <p className="font-bold text-campo-navy">EC-305: Digital Signal Processing</p>
                        <p className="text-[10px] text-slate-500">Dr. M. S. Vani • Hall Tickets Generated</p>
                      </div>
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200">
                        118 Students Eligible
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {activeApp.previewType === 'finance' && (
                <div className="space-y-2.5 rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs text-[11px]">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-bold text-campo-navy">Institutional Fee Ledger</span>
                    <span className="text-[10px] text-campo-teal-dark font-semibold">Real-Time Reconciliation</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                    <div className="rounded-lg bg-slate-50 p-2">
                      <span className="text-slate-400 block">Tuition Received</span>
                      <span className="font-bold text-campo-navy text-xs">₹9.24 Cr</span>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-2">
                      <span className="text-slate-400 block">Hostel &amp; Mess</span>
                      <span className="font-bold text-campo-navy text-xs">₹3.18 Cr</span>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-2">
                      <span className="text-slate-400 block">Transport Dues</span>
                      <span className="font-bold text-campo-navy text-xs">₹2.40 Cr</span>
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-100 bg-teal-50/40 p-2.5 flex items-center justify-between text-[10px]">
                    <span className="text-slate-700 font-medium">Automatic Concession &amp; Merit Scholarship Audit Trail</span>
                    <span className="font-bold text-campo-teal-dark">100% Tax &amp; Audit Compliant</span>
                  </div>
                </div>
              )}

              {activeApp.previewType === 'logistics' && (
                <div className="space-y-2.5 rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs text-[11px]">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-bold text-campo-navy">Campus Fleet GPS &amp; Hostel Matrix</span>
                    <span className="text-[10px] text-emerald-600 font-semibold">All 48 Buses Live GPS</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div className="rounded-lg bg-slate-50 p-2.5">
                      <p className="font-bold text-campo-navy">Route #12: Kakinada Express</p>
                      <p className="text-slate-500">Driver: S. Ramana • 42 Students Aboard</p>
                      <span className="mt-1 inline-block font-semibold text-emerald-600">On Schedule (ETA 8:40 AM)</span>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-2.5">
                      <p className="font-bold text-campo-navy">Hostel Block C: Occupancy</p>
                      <p className="text-slate-500">Capacity: 480 Beds • Occupied: 462</p>
                      <span className="mt-1 inline-block font-semibold text-campo-navy">Biometric Gate Synced</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
