import {
  UserPlus,
  Users,
  CheckCircle2,
  FileCheck,
  ShieldCheck,
  TrendingUp,
  Clock,
  Sparkles,
  Link2,
  Layers,
  ArrowRight,
  Database,
  Search,
  Filter,
  CreditCard,
  Building,
  GraduationCap,
  Award,
  Wallet,
  Receipt,
  PieChart,
  Bus,
  MapPin,
  QrCode,
  Fuel,
  Wrench,
  BookOpen,
  Calendar,
  ClipboardList,
  FileSpreadsheet,
  Briefcase,
  UserCheck,
  Building2,
  Bed,
  Utensils,
  Package,
  ShoppingCart,
  AlertTriangle,
  Library,
  BookMarked,
  Sliders,
  DollarSign,
  Truck,
  FileText,
  BadgeAlert,
  Smartphone,
  MessageSquare,
  BellRing,
  Zap,
} from 'lucide-react';

import admissionsBanner from '../assets/Module-Card-Bgs/Modern Admissions Campus Hero.webp';
import studentDataBanner from '../assets/Module-Card-Bgs/Student Data Management Banner.webp';
import feeBanner from '../assets/Module-Card-Bgs/Fee Management Banner.webp';
import transportBanner from '../assets/Module-Card-Bgs/Transport Module Banner.webp';
import academicBanner from '../assets/Module-Card-Bgs/Academic Portal Banner.webp';
import examBanner from '../assets/Module-Card-Bgs/Exam Module Banner.webp';
import hrmsBanner from '../assets/Module-Card-Bgs/Modern HR Payroll Workspace.webp';
import staffRecruitmentBanner from '../assets/Module-Card-Bgs/Staff Recruitement Module Banner.webp';
import hostelBanner from '../assets/Module-Card-Bgs/Modern Hostel Management Campus.webp';
import stationeryBanner from '../assets/Module-Card-Bgs/Stationary module Banner.webp';
import maintenanceBanner from '../assets/Module-Card-Bgs/Maintenance Module.webp';
import libraryBanner from '../assets/Module-Card-Bgs/Modern Library Study Banner.webp';

export const applicationDetails = {
  // 1. Admissions CRM
  'admissions-crm': {
    id: 'admissions-crm',
    name: 'Admissions CRM',
    shortName: 'Admissions',
    category: 'Student & Academics',
    pillText: 'Core Intake Engine',
    tagline: 'From First Inquiry to Confirmed Enrollment — Completely Connected.',
    headline: 'Accelerate campus admissions with automated enquiry registration, counsellor allocation, rank management, and instant document verification.',
    bannerImage: admissionsBanner,
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    accentColor: 'text-emerald-600',
    overview:
      'Campo Admissions CRM eliminates the chaos of physical enquiry registers, scattered spreadsheets, and long counseling queues. Designed specifically for Indian universities and autonomous colleges, it tracks student enquiries, coordinates counsellor allocations, automates multi-stage follow-ups, and streamlines application processing with instant SMS and WhatsApp notifications.',
    metrics: [
      { value: '3x Faster', label: 'Counseling Cycle', note: 'Instant document & seat verification' },
      { value: '100% Digital', label: 'Paperless Intake', note: 'Secure digital document vault' },
      { value: '0 Double Bookings', label: 'Seat Quota Sync', note: 'Real-time category & branch ledger' },
      { value: '< 1 Second', label: 'Roll Number Creation', note: 'Direct promotion to master student directory' },
    ],
    capabilities: [
      {
        icon: UserPlus,
        title: 'Lead Generation & Enquiry Registration',
        description:
          'Capture prospective student enquiries from campus walk-ins, digital admission portals, education fairs, and outreach campaigns into one live dashboard.',
        benefit: 'Complete lead pipeline tracking',
      },
      {
        icon: Users,
        title: 'Lead Assignment to Admission Counsellors',
        description:
          'Automatically distribute incoming student leads among designated admission counsellors based on course specialization, region, or intake quotas.',
        benefit: 'Balanced counsellor workload and fast response',
      },
      {
        icon: Clock,
        title: 'Follow-Up Scheduling & Lead-Status Tracking',
        description:
          'Schedule multi-touch follow-ups, telephone reminder queues, and track applicant stages (Cold, Contacted, Counseling, Applied, Admitted).',
        benefit: 'Zero lost leads or missed counseling deadlines',
      },
      {
        icon: TrendingUp,
        title: 'Counsellor Performance & Conversion Analytics',
        description:
          'Track counselor call volumes, conversion rates by branch, and application turnaround times to optimize institutional admission strategy.',
        benefit: 'Real-time intake visibility for leadership',
      },
      {
        icon: FileCheck,
        title: 'Application Processing & Document Verification',
        description:
          'Review uploaded 10th/12th marksheets, transfer certificates, and category proofs with online verification stamps and rejection flags.',
        benefit: 'Tamper-proof, paperless document workflows',
      },
      {
        icon: Award,
        title: 'Course, Branch & Rank-Data Management',
        description:
          'Allocate seats based on entrance examination ranks (EAMCET, JEE, NEET, ICET) and management/merit quotas with live matrix updates.',
        benefit: 'Transparent, dispute-free seat allotment',
      },
      {
        icon: MessageSquare,
        title: 'Automated SMS & Parent Communication',
        description:
          'Send automated SMS and WhatsApp alerts for counseling appointments, fee due dates, provisional allotment orders, and welcome letters.',
        benefit: 'Instant communication with students & guardians',
      },
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Inquiry Capture',
        description: 'Prospective students register via walk-in kiosk, web portal, or counsellor entry.',
      },
      {
        step: '02',
        title: 'Counsellor Assignment',
        description: 'Leads are automatically routed to counsellors for interviews and status tracking.',
      },
      {
        step: '03',
        title: 'Rank & Document Audit',
        description: 'Entrance ranks and qualification certificates are audited against quota norms.',
      },
      {
        step: '04',
        title: 'Seat Allotment & SMS',
        description: 'Seat locked, fee collected, and instant confirmation SMS sent to parents.',
      },
    ],
    stakeholders: [
      {
        role: 'Admissions Director',
        responsibility: 'Monitors branch-wise conversion rates, quota filling, and daily revenue intake.',
      },
      {
        role: 'Admission Counsellors',
        responsibility: 'Manages candidate interviews, tracks follow-up calls, and verifies eligibility.',
      },
      {
        role: 'Accounts & Cashier Desk',
        responsibility: 'Collects admission fee installments and issues instant digital tax receipts.',
      },
      {
        role: 'Students & Parents',
        responsibility: 'Submits documents online, tracks merit status, and receives instant admission letters.',
      },
    ],
    connectedModules: [
      {
        name: 'Student Records (SDMS)',
        desc: 'Directly pushes confirmed candidate profiles, verified certificates, and personal details.',
      },
      {
        name: 'Fee Management System',
        desc: 'Syncs token deposits, scholarship concessions, and tuition installment schedules.',
      },
      {
        name: 'Hostel Management (HMS)',
        desc: 'Allows immediate reservation of hostel beds during the admission counseling session.',
      },
      {
        name: 'Transport Management',
        desc: 'Assigns bus route passes and pickup stops right when student enrollment is finalized.',
      },
    ],
  },

  // 2. SDMS – Student Data Management & Engagement
  'student-data': {
    id: 'student-data',
    name: 'Student Data Management & Engagement (SDMS)',
    shortName: 'Student Records',
    category: 'Student & Academics',
    pillText: 'Master Identity Directory',
    tagline: 'One Student. One Record. Complete Campus Engagement.',
    headline: 'Centralize every student and parent record, generate instant smart ID cards, manage online service requests, and drive active campus club engagement.',
    bannerImage: studentDataBanner,
    badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    accentColor: 'text-cyan-600',
    overview:
      'Campo SDMS is the unified student records and engagement backbone for your institution. It replaces fragmented departmental spreadsheets with a single, immutable student profile that stays synchronized across all 4 years. From instant photo ID card generation to online Bonafide/NOC certificates, campus circulars, and student club management, SDMS connects administration directly with student life.',
    metrics: [
      { value: '100% Unified', label: 'Single Student ID', note: 'Universal ID across all campus modules' },
      { value: 'Instant Print', label: 'ID Card Generation', note: 'Pre-formatted barcode/QR smart badges' },
      { value: '< 2 Hours', label: 'Certificate Processing', note: 'Online Bonafide, NOC & document requests' },
      { value: 'Multi-Channel', label: 'Parent Engagement', note: 'Integrated SMS, WhatsApp & In-App push' },
    ],
    capabilities: [
      {
        icon: Users,
        title: 'Student, Parent & Guardian Records Management',
        description:
          'Comprehensive master profiles storing demographics, address, emergency contacts, local guardian profiles, and verified identity documents in one secure directory.',
        benefit: 'Zero record duplication or lost contact details',
      },
      {
        icon: QrCode,
        title: 'Instant Student ID Card Generation & Printing',
        description:
          'Generate high-resolution printable student smart ID cards with dynamic photo cropping, QR verification code, library barcodes, and blood group details.',
        benefit: 'Issue verified campus badges in minutes on day one',
      },
      {
        icon: MessageSquare,
        title: 'Multi-Channel Parent & Student Communication',
        description:
          'Send unified messages through SMS, WhatsApp, and in-app notifications for emergency campus alerts, fee reminders, holiday advisories, and exam dates.',
        benefit: 'High-delivery communication without third-party tools',
      },
      {
        icon: FileText,
        title: 'Online Service Requests (Bonafide, NOC & Certificates)',
        description:
          'Students submit online requests for Bonafide certificates, NOCs, bus pass endorsements, and character certificates with automated digital approvals.',
        benefit: 'No queuing at administrative office counters',
      },
      {
        icon: Sparkles,
        title: 'Student Engagement & Activities (Events & Polls)',
        description:
          'Foster vibrant campus culture with interactive student opinion polls, cultural event registrations, hackathons, and feedback surveys.',
        benefit: 'Active campus community and student engagement',
      },
      {
        icon: BellRing,
        title: 'Circular & Notice Management with Instant Notifications',
        description:
          'Publish official institutional circulars, academic calendars, and departmental notices with instant push alerts to targeted year, branch, or section groups.',
        benefit: 'Eliminates printed paper circular notice boards',
      },
      {
        icon: Building,
        title: 'Club Membership, Activities & Hall Booking',
        description:
          'Manage student technical and cultural club registrations, member directories, activity calendars, and book campus seminar halls / auditoriums online.',
        benefit: 'Streamlined extracurricular facility management',
      },
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Master Profile Creation',
        description: 'New enrollee automatically inherits master roll number and official campus directory profile.',
      },
      {
        step: '02',
        title: 'ID Card Batch Printing',
        description: 'Instant generation of verified digital & plastic smart ID cards with barcode and QR tags.',
      },
      {
        step: '03',
        title: 'Online Request & Approvals',
        description: 'Students request Bonafide, NOC, and certificate clearances through their companion portal.',
      },
      {
        step: '04',
        title: 'Active Campus Engagement',
        description: 'Participate in student clubs, campus event registrations, polls, and instant notice feeds.',
      },
    ],
    stakeholders: [
      {
        role: 'Registrar & Administrative Office',
        responsibility: 'Maintains master student directory, approves certificate requests, and issues official circulars.',
      },
      {
        role: 'Dean of Student Affairs',
        responsibility: 'Coordinates student clubs, extracurricular events, hall allocations, and campus surveys.',
      },
      {
        role: 'Department Heads & Mentors',
        responsibility: 'Accesses parent contact records and sends batch notifications regarding academic discipline.',
      },
      {
        role: 'Students & Parents',
        responsibility: 'Requests official documents, tracks club memberships, and receives verified push notices.',
      },
    ],
    connectedModules: [
      {
        name: 'Academic Management',
        desc: 'Provides class rosters, subject registrations, and student mentor-mentee mapping.',
      },
      {
        name: 'Examination Management (EMS)',
        desc: 'Supplies hall ticket eligibility, verified marks records, and grade point calculations.',
      },
      {
        name: 'Fee Management System',
        desc: 'Connects student registration status directly with semester fee clearance ledgers.',
      },
      {
        name: 'Hostel & Transport',
        desc: 'Maintains live residential status and bus boarding permits tied to the student profile.',
      },
    ],
  },

  // 3. Fee Management System
  'fee-management': {
    id: 'fee-management',
    name: 'Fee Management System',
    shortName: 'Fees & Finance',
    category: 'Administration & Finance',
    pillText: 'Financial Operating System',
    tagline: 'End-to-End Fee Structuring, Concessions, Online Gateway & Ledger Control.',
    headline: 'Eliminate revenue leakage with flexible course fee structuring, online payments, concession approvals, scholarship tracking, and live collection analytics.',
    bannerImage: feeBanner,
    badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
    accentColor: 'text-teal-600',
    overview:
      'Campo Fee Management System is a specialized higher education financial operating system. It handles the full complexity of Indian institutional fee structures: multi-year course fees, quota-specific pricing, management quotas, scholarship releases, government welfare reimbursements, and automated installment reminders. With integrated online payment gateways and instant bank reconciliation, accounts teams maintain 100% accurate ledgers with zero manual spreadsheet work.',
    metrics: [
      { value: '100% Live', label: 'Reconciliation', note: 'Direct bank statement & gateway match' },
      { value: 'Zero', label: 'Revenue Leakage', note: 'Every installment linked to student ID' },
      { value: 'Multi-Year', label: 'Fee Structuring', note: 'Full course duration flexible plans' },
      { value: 'Real-Time', label: 'Executive Analytics', note: 'Daily collection & pending due reports' },
    ],
    capabilities: [
      {
        icon: Wallet,
        title: 'Fee Collection & Pending Dues Tracking',
        description:
          'Monitor real-time fee collections across tuition, laboratory, library, exam, hostel, and transport accounts. Instantly filter students with pending balances by batch and branch.',
        benefit: 'Complete visibility of institutional dues',
      },
      {
        icon: CheckCircle2,
        title: 'Fee Concession Management & Approval Workflows',
        description:
          'Configure multi-level approval hierarchies (Principal, Chairman, Trustee) for fee concessions, merit waivers, and sibling discounts with complete audit documentation.',
        benefit: 'Prevents unauthorized fee discounts',
      },
      {
        icon: Sliders,
        title: 'Flexible Course-Wise & Student-Wise Fee Structuring',
        description:
          'Set up granular fee heads for the entire 3 or 4-year course duration. Differentiate fee structures by admission quota (Convenor, Management, NRI, Lateral Entry).',
        benefit: 'Handles multi-tier institutional pricing effortlessly',
      },
      {
        icon: CreditCard,
        title: 'Online Payment Gateway & Instant Reconciliation',
        description:
          'Enable UPI, NetBanking, debit/credit cards, and NEFT/RTGS challans. Payments automatically generate numbered GST-compliant digital receipts and update student ledgers.',
        benefit: 'Zero cashier counter queues during peak fee deadlines',
      },
      {
        icon: MessageSquare,
        title: 'Automated Parent Communication & Follow-Ups',
        description:
          'Schedule automated SMS, WhatsApp, and in-app payment reminders with secure one-click payment links directly to parents as installment due dates approach.',
        benefit: 'Drastically improves on-time fee realization',
      },
      {
        icon: Award,
        title: 'Scholarship Tracking (Releases, Rejections & Dues)',
        description:
          'Track government social welfare scholarships (e-Pass, JVD, Post-Matric) and corporate trusts. Record released amounts, rejected claims, and pending student balances.',
        benefit: 'Accurate reconciliation of government reimbursements',
      },
      {
        icon: PieChart,
        title: 'Collection Analytics & Financial Audit Reports',
        description:
          'Generate comprehensive daily collection summaries, head-wise income reports, defaulter lists, and exportable financial audits for chartered accountants.',
        benefit: 'Audit-ready reports at the click of a button',
      },
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Fee Structure Setup',
        description: 'Configure course-wise, year-wise, and quota-wise fee heads for incoming batches.',
      },
      {
        step: '02',
        title: 'Challan & Link Generation',
        description: 'Semester fee demands are posted to student accounts with online payment links.',
      },
      {
        step: '03',
        title: 'Gateway & Bank Reconciliation',
        description: 'Online & offline payments reconcile automatically with instant numbered receipts.',
      },
      {
        step: '04',
        title: 'Dues & Clearance Gate',
        description: 'Real-time financial clearance passes directly to Exam hall ticket and No-Dues systems.',
      },
    ],
    stakeholders: [
      {
        role: 'Trustees & Management',
        responsibility: 'Monitors total cash flow, scholarship recoveries, and trust-wide fee realization.',
      },
      {
        role: 'Finance Officer / Chief Accountant',
        responsibility: 'Configures fee heads, approves concessions, and audits daily bank reconciliations.',
      },
      {
        role: 'Cashier & Counter Staff',
        responsibility: 'Collects offline payments, verifies NEFT counterfoils, and prints official receipts.',
      },
      {
        role: 'Parents & Guardians',
        responsibility: 'Pays fees online via mobile UPI/cards, downloads tax receipts, and tracks dues.',
      },
    ],
    connectedModules: [
      {
        name: 'Admissions CRM',
        desc: 'Captures enrollment token payments and applies scholarship concessions on admission.',
      },
      {
        name: 'Examination Management (EMS)',
        desc: 'Enforces fee-clearance eligibility before allowing exam registration or hall ticket generation.',
      },
      {
        name: 'Hostel & Transport Management',
        desc: 'Consolidates hostel room charges and bus fees into a single student payment statement.',
      },
      {
        name: 'Student Records (SDMS)',
        desc: 'Issues automated No-Dues clearance for Bonafide, Transfer, and Convocation certificates.',
      },
    ],
  },

  // 4. Transport Management System
  'transport-management': {
    id: 'transport-management',
    name: 'Campus Transport Management System',
    shortName: 'Campus Transport',
    category: 'Campus Operations',
    pillText: 'Fleet & Logistics Engine',
    tagline: 'Smart Fleet Tracking, Route Optimization, Fuel Control & QR Verification.',
    headline: 'Manage campus vehicles, track fuel & maintenance expenses, optimize routes, verify student bus passes offline via QR, and track GPS in real-time.',
    bannerImage: transportBanner,
    badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
    accentColor: 'text-sky-600',
    overview:
      'Campo Transport Management System streamlines institutional fleet operations across university buses, vans, and staff cars. It solves the critical operational pain points of college transport: spiraling fuel costs, route inefficiencies, unauthorized riders, and student safety. With real-time GPS tracking, vehicle-wise mileage records, offline QR verification, driver compliance, and automated night-stay alerts, campus transport runs smoothly and securely.',
    metrics: [
      { value: '15-20%', label: 'Fuel Savings', note: 'Route optimization & mileage audits' },
      { value: 'Offline QR', label: 'Pass Verification', note: 'Catch unauthorized travelers instantly' },
      { value: 'Live GPS', label: 'Geofenced Tracking', note: 'Real-time vehicle location & speed' },
      { value: '100% Safe', label: 'Compliance & Safety', note: 'Driver licenses, insurance & fitness alerts' },
    ],
    capabilities: [
      {
        icon: Truck,
        title: 'Vehicle & Fleet Management',
        description:
          'Maintain complete digital profiles for all institutional buses, vans, and official cars — RC copies, seating capacities, pollution certificates, insurance, and road tax.',
        benefit: 'Never miss an RTO compliance or fitness renewal',
      },
      {
        icon: Fuel,
        title: 'Fuel & Expense Management (Mileage Tracking)',
        description:
          'Log diesel fills, maintenance costs, toll charges, and calculate vehicle-wise kilometer-per-liter (km/l) mileage performance to identify fuel theft or engine degradation.',
        benefit: 'Strict financial accountability on fuel budgets',
      },
      {
        icon: UserCheck,
        title: 'Driver & Transport Staff Management',
        description:
          'Maintain driver licenses, badge validations, contact numbers, background verification, route allocations, and attendance logs.',
        benefit: 'Ensures qualified, verified drivers on campus roads',
      },
      {
        icon: Users,
        title: 'Student Transport & Route Management',
        description:
          'Map students to designated bus routes, morning pickup stops, and evening drop points. Manage fee categories based on travel distance slabs.',
        benefit: 'Balanced passenger load across all buses',
      },
      {
        icon: MapPin,
        title: 'Route Optimization & Planning',
        description:
          'Analyze overlapping bus routes and underutilized vehicles to consolidate stops, reduce travel times, and minimize empty dead-mileage.',
        benefit: 'Lowers operational fleet overhead significantly',
      },
      {
        icon: QrCode,
        title: 'Offline QR-Based Student Bus Pass Verification',
        description:
          'Bus in-charges scan student passes using the mobile app even without active internet connection to instantly flag students traveling on invalid or unpaid passes.',
        benefit: 'Zero unauthorized travel on institutional buses',
      },
      {
        icon: ShieldCheck,
        title: 'GPS Tracking, Geofencing & Night-Stay SMS Alerts',
        description:
          'Monitor live vehicle coordinates, over-speeding alerts, and automated SMS notices to parents when students board buses or when vehicles are delayed for night stay.',
        benefit: 'Complete peace of mind for parents and college management',
      },
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Route & Stop Mapping',
        description: 'Define campus routes, pickup stops, timing schedules, and vehicle assignments.',
      },
      {
        step: '02',
        title: 'Student Pass Allocation',
        description: 'Students enroll in routes, pay transport fees, and receive a digital QR bus pass.',
      },
      {
        step: '03',
        title: 'Daily Boarding & QR Scan',
        description: 'Bus in-charges scan passes with offline verification and attendance logs.',
      },
      {
        step: '04',
        title: 'Fuel & Maintenance Audit',
        description: 'Drivers log odometer readings and fuel bills for vehicle-wise mileage tracking.',
      },
    ],
    stakeholders: [
      {
        role: 'Transport Manager',
        responsibility: 'Oversees vehicle maintenance, RTO fitness renewals, driver rosters, and route optimization.',
      },
      {
        role: 'Bus Drivers & Coordinators',
        responsibility: 'Conducts daily trips, scans student QR passes, and reports fuel fills and maintenance issues.',
      },
      {
        role: 'Accounts Office',
        responsibility: 'Audits fuel expenditure against mileage and collects distance-based transport fees.',
      },
      {
        role: 'Students & Parents',
        responsibility: 'Tracks bus GPS location, views scheduled timings, and carries QR passes on mobile app.',
      },
    ],
    connectedModules: [
      {
        name: 'Fee Management System',
        desc: 'Syncs route-based bus fees and blocks pass issuance for pending transportation balances.',
      },
      {
        name: 'Student Records (SDMS)',
        desc: 'Maps student pickup addresses directly to nearest bus route stops upon admission.',
      },
      {
        name: 'Maintenance Management',
        desc: 'Generates automated workshop work orders for vehicle repairs, oil changes, and tire renewals.',
      },
      {
        name: 'Campus Gate Security',
        desc: 'Validates bus entry/exit timestamps through RFID gate barriers automatically.',
      },
    ],
  },

  // 5. Academic Management System
  'academic-management': {
    id: 'academic-management',
    name: 'Academic Management System',
    shortName: 'Academics',
    category: 'Student & Academics',
    pillText: 'Curriculum & Governance Hub',
    tagline: 'Timetables, Faculty Workloads, Lesson Plans & Academic Dashboards.',
    headline: 'Streamline semester curriculum planning, dynamic faculty substitution, lesson tracking, internal assessments, and administrative governance dashboards.',
    bannerImage: academicBanner,
    badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
    accentColor: 'text-purple-600',
    overview:
      'Campo Academic Management System is the comprehensive engine for institutional academic planning and execution. Designed for Deans, HODs, and Faculty, it automates semester timetable construction, tracks lecture completion against syllabus lesson plans, manages faculty substitutions during leave, and correlates student attendance with continuous internal assessments (CIA). Real-time dashboards provide multi-tier visibility from university leadership down to subject teachers.',
    metrics: [
      { value: '1-Click', label: 'Faculty Substitution', note: 'Instant adjustment during teacher leave' },
      { value: '100% Tracked', label: 'Syllabus Progress', note: 'Lesson planning vs actual delivered' },
      { value: 'Multi-Tier', label: 'Role Dashboards', note: 'Principal, HOD, Mentor & Subject views' },
      { value: 'Automated', label: 'CIA Calculation', note: 'Assignments, quizzes & internal tests' },
    ],
    capabilities: [
      {
        icon: Calendar,
        title: 'Timetable & Workload Management',
        description:
          'Construct conflict-free master timetables for current and upcoming semesters. Allocate classroom lecture hours, laboratory sessions, and audit faculty weekly workloads.',
        benefit: 'Optimized campus room utilization and balanced faculty teaching hours',
      },
      {
        icon: UserCheck,
        title: 'Easy Faculty Substitution & Timetable Adjustments',
        description:
          'When a faculty member applies for leave, the system recommends available qualified teachers and reallocates classes with instant notifications to students.',
        benefit: 'Zero unmonitored free periods or lost lecture hours',
      },
      {
        icon: BookOpen,
        title: 'Lesson Planning & Syllabus Completion Monitoring',
        description:
          'Faculty submit semester lesson plans with target dates. Daily teaching logs track syllabus coverage against academic calendar milestones.',
        benefit: 'Ensures timely completion of syllabus before examinations',
      },
      {
        icon: TrendingUp,
        title: 'Faculty & Academic Performance Monitoring',
        description:
          'Evaluate departmental academic output, pass percentages, student feedback ratings, and research contributions across autonomous departments.',
        benefit: 'Objective academic appraisal data for institutional governance',
      },
      {
        icon: ClipboardList,
        title: 'Student Subject-Wise Academic Performance',
        description:
          'Record and calculate continuous internal assessments (CIA) including unit tests, mid-term exams, seminar presentations, lab records, and homework assignments.',
        benefit: 'Early identification of weak students for remedial tutoring',
      },
      {
        icon: ShieldCheck,
        title: 'Attendance & Academic Discipline Tracking',
        description:
          'Subject teachers mark attendance on mobile devices. Identify cumulative shortage trends and trigger automated parent advisories before exam eligibility cutoffs.',
        benefit: 'Maintains strict compliance with university attendance norms',
      },
      {
        icon: Layers,
        title: 'Administrative Dashboards (Principal, HOD, Teacher)',
        description:
          'Tailored role dashboards giving Principals college-wide trends, HODs departmental lecture status, Class Teachers section progress, and Subject Teachers gradebooks.',
        benefit: 'Every academic stakeholder sees what matters to them',
      },
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Curriculum & Timetable Setup',
        description: 'Map courses, syllabi, faculty workloads, and generate semester timetable grids.',
      },
      {
        step: '02',
        title: 'Lesson Plan & Daily Logs',
        description: 'Faculty log completed topics and take mobile attendance for each scheduled period.',
      },
      {
        step: '03',
        title: 'Continuous Assessment',
        description: 'Record internal mid-terms, assignment scores, and practical laboratory rubrics.',
      },
      {
        step: '04',
        title: 'Eligibility & Review',
        description: 'Calculate final internal marks and attendance eligibility for semester end exams.',
      },
    ],
    stakeholders: [
      {
        role: 'Dean of Academics & Principals',
        responsibility: 'Monitors institutional academic calendar, syllabus progress, and departmental pass rates.',
      },
      {
        role: 'Heads of Department (HODs)',
        responsibility: 'Approves timetables, manages faculty lesson plans, and handles daily substitutions.',
      },
      {
        role: 'Faculty & Lab Instructors',
        responsibility: 'Delivers lectures, marks period attendance, and records internal assessment scores.',
      },
      {
        role: 'Students & Guardians',
        responsibility: 'Views daily timetables, tracks subject-wise attendance, and reviews internal marks.',
      },
    ],
    connectedModules: [
      {
        name: 'Examination Management (EMS)',
        desc: 'Exports consolidated internal assessment (CIA) marks and verified attendance eligibility.',
      },
      {
        name: 'Student Records (SDMS)',
        desc: 'Fetches student section allocations and maps mentor-mentee counseling batches.',
      },
      {
        name: 'HRMS & Payroll',
        desc: 'Syncs faculty attendance and substitution history with monthly leave and teaching workloads.',
      },
      {
        name: 'Library Management',
        desc: 'Recommends required course textbook accessions and syllabus reading material.',
      },
    ],
  },

  // 6. EMS – Examination Management System
  'examination-management': {
    id: 'examination-management',
    name: 'Examination Management System (EMS)',
    shortName: 'Examinations',
    category: 'Student & Academics',
    pillText: 'Assessment & Grading Engine',
    tagline: 'Timetables, Hall Tickets, Confidential Marks & Result Publishing.',
    headline: 'Coordinate institutional examination activities, automate hall ticket eligibility, manage internal marks, process grading, and publish university transcripts.',
    bannerImage: examBanner,
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    accentColor: 'text-emerald-700',
    overview:
      'Campo EMS coordinates all internal and semester-end examination activities with strict academic integrity and confidentiality. From exam scheduling, seating arrangement generation, and hall-ticket clearance checks to double-blind marks entry, moderation, CGPA processing, and online result publication, EMS guarantees seamless exam cell operations for autonomous colleges and universities.',
    metrics: [
      { value: '1-Click', label: 'Hall Ticket Issuance', note: 'Automated fee & attendance clearance' },
      { value: '100% Secure', label: 'Confidential Marks Entry', note: 'Role-scoped encrypted grading logs' },
      { value: 'Instant', label: 'Result Publication', note: 'Student portal & SMS publishing' },
      { value: 'Complete', label: 'Academic History', note: 'Full backlog & transcript ledger' },
    ],
    capabilities: [
      {
        icon: Calendar,
        title: 'Examination Scheduling & Timetable Management',
        description:
          'Create semester exam datesheets, schedule internal mid-terms, and configure exam sessions without overlapping subject conflicts across branches.',
        benefit: 'Error-free, synchronized institutional exam timetables',
      },
      {
        icon: QrCode,
        title: 'Student Exam Registration & Hall-Ticket Management',
        description:
          'Automate examination registration workflows. Verify fee clearance and attendance cutoffs before issuing printable digital hall tickets with QR security.',
        benefit: 'Prevents ineligible or fee-defaulting candidates from sitting exams',
      },
      {
        icon: ClipboardList,
        title: 'Internal Examination Management',
        description:
          'Manage internal tests, practical exams, viva-voce schedules, and laboratory continuous evaluations with standardized rubrics.',
        benefit: 'Smooth coordination of internal assessment timelines',
      },
      {
        icon: ShieldCheck,
        title: 'Confidential Marks Entry & Processing',
        description:
          'Secure multi-tier marks entry (Evaluator, Chief Examiner, Moderation) with support for barcode dummy numbers to ensure unbiased grading.',
        benefit: 'Guarantees absolute confidentiality and examination integrity',
      },
      {
        icon: Sparkles,
        title: 'Result Publication & Grade Card Generation',
        description:
          'Calculate SGPA/CGPA under absolute or relative grading systems automatically. Publish results to the student portal and generate verified grade cards.',
        benefit: 'Publishes university examination results in record time',
      },
      {
        icon: Database,
        title: 'Student Examination History & Backlog Tracking',
        description:
          'Maintain an immutable record of attempts, supplementary exams, grade improvements, and revaluation histories across all semesters.',
        benefit: 'Instant verification for provisional certificates and convocation',
      },
      {
        icon: FileSpreadsheet,
        title: 'Examination Reports & Performance Analytics',
        description:
          'Generate institutional pass percentages, subject-wise failure distributions, rank lists, and accreditation reports formatted for regulatory bodies.',
        benefit: 'In-depth academic quality audit data for management',
      },
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Exam Notification & Schedule',
        description: 'Publish exam datesheet and open examination enrollment on student portals.',
      },
      {
        step: '02',
        title: 'Eligibility & Hall Tickets',
        description: 'Automated verification of fee dues and attendance before digital hall ticket generation.',
      },
      {
        step: '03',
        title: 'Marks Entry & Moderation',
        description: 'Secure, dummy-number enabled evaluation and internal mark moderation.',
      },
      {
        step: '04',
        title: 'Result Publication & SGPA',
        description: 'Automatic GPA calculation, online result publishing, and digital grade card download.',
      },
    ],
    stakeholders: [
      {
        role: 'Controller of Examinations (COE)',
        responsibility: 'Oversees examination scheduling, confidential paper evaluation, and result processing.',
      },
      {
        role: 'Chief Superintendents & Invigilators',
        responsibility: 'Manages exam hall seating arrangements, attendance registers, and answer script packets.',
      },
      {
        role: 'Faculty Evaluators',
        responsibility: 'Enters internal assessments and semester end examination marks securely.',
      },
      {
        role: 'Students',
        responsibility: 'Registers for exams, downloads hall tickets, and views semester grade reports.',
      },
    ],
    connectedModules: [
      {
        name: 'Academic Management',
        desc: 'Imports continuous internal assessments (CIA) and semester course curriculum structures.',
      },
      {
        name: 'Fee Management System',
        desc: 'Verifies tuition and examination fee clearance before issuing examination hall tickets.',
      },
      {
        name: 'Student Records (SDMS)',
        desc: 'Archives final CGPA scores and updates graduation/convocation eligibility.',
      },
      {
        name: 'Library Management',
        desc: 'Checks library book returns and outstanding fines prior to semester exam clearance.',
      },
    ],
  },

  // 7. HRMS & Payroll
  'hrms': {
    id: 'hrms',
    name: 'HRMS & Payroll System',
    shortName: 'HRMS & Payroll',
    category: 'Administration & Finance',
    pillText: 'Workforce Operating Engine',
    tagline: 'Employee Records, Biometrics, Leave, Compliances & Automated Payroll.',
    headline: 'Unified human resource management covering faculty records, biometric attendance, leave policies, automated salary processing, and statutory compliance.',
    bannerImage: hrmsBanner,
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
    accentColor: 'text-blue-600',
    overview:
      'Campo HRMS & Payroll is tailored specifically for colleges, polytechnics, and multi-institution educational trusts. It unifies the complete faculty and non-teaching staff lifecycle: service books, qualifications, biometric attendance tracking, leave sanctioning, automated salary computation with PF/ESI/TDS statutory deductions, and payslip distribution. Campus leadership gains real-time visibility over staff productivity and workforce budgets.',
    metrics: [
      { value: '100% Automated', label: 'Payroll Processing', note: 'One-click salary disbursement calculation' },
      { value: 'Biometric Live', label: 'Attendance Sync', note: 'Direct gate & fingerprint machine integration' },
      { value: 'Zero Errors', label: 'Statutory Compliance', note: 'PF, ESI, TDS, PT calculations verified' },
      { value: 'Self-Service', label: 'Employee Portal', note: 'Mobile leave application & payslip download' },
    ],
    capabilities: [
      {
        icon: UserCheck,
        title: 'Employee Records & Service Administration',
        description:
          'Comprehensive digital service books storing faculty educational qualifications, research publications, AICTE/UGC credentials, salary grades, and appointment history.',
        benefit: 'Complete faculty profile repository ready for NAAC/NBA inspections',
      },
      {
        icon: Clock,
        title: 'Attendance & Leave Management',
        description:
          'Direct integration with biometric fingerprint and facial recognition terminals. Automate casual leave (CL), earned leave (EL), medical leave, and maternity leave quotas with approval workflows.',
        benefit: 'Zero manual attendance register collation at month-end',
      },
      {
        icon: CreditCard,
        title: 'Payroll & Salary Management',
        description:
          'One-click automated monthly payroll calculation based on actual biometric presence. Handles basic pay, DA, HRA, special allowances, and overtime calculations.',
        benefit: 'Disburse accurate staff salaries punctually every month',
      },
      {
        icon: ShieldCheck,
        title: 'Statutory Compliance & Financial Management',
        description:
          'Automate statutory deductions for Provident Fund (PF), Employee State Insurance (ESI), Professional Tax (PT), and Income Tax TDS calculations with exportable bank transfer sheets.',
        benefit: '100% compliance with government labor and tax regulations',
      },
      {
        icon: Users,
        title: 'Recruitment & Employee Lifecycle',
        description:
          'Manage onboarding, probationary evaluations, annual increments, promotions, retirement gratuity, and full-and-final settlement clearances seamlessly.',
        benefit: 'Transparent staff progression and retention governance',
      },
      {
        icon: PieChart,
        title: 'HR Operations & Management Control',
        description:
          'Executive dashboards tracking department-wise staff-to-student ratios, faculty attrition trends, leave utilization, and institutional salary budget expenditure.',
        benefit: 'Empowers trustees with clear human resource expenditure analytics',
      },
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Onboarding & Service Record',
        description: 'New faculty profiles configured with salary band, teaching department, and bio-ID.',
      },
      {
        step: '02',
        title: 'Daily Biometric Tracking',
        description: 'Gate biometric punches log real-time attendance and automatically calculate late arrivals.',
      },
      {
        step: '03',
        title: 'Leave & Substitution',
        description: 'Staff apply for leave on mobile; approvals trigger academic substitution alerts.',
      },
      {
        step: '04',
        title: 'Automated Payroll & Slips',
        description: 'Monthly payroll processed, bank payment file generated, and payslips released to app.',
      },
    ],
    stakeholders: [
      {
        role: 'Trustees & Principals',
        responsibility: 'Approves annual faculty increments, reviews department staffing, and monitors payroll budget.',
      },
      {
        role: 'HR Director / Administrative Officer',
        responsibility: 'Manages employee service books, oversees leave approvals, and monitors attendance.',
      },
      {
        role: 'Accounts & Payroll Officer',
        responsibility: 'Runs monthly payroll, verifies tax and PF deductions, and releases bank transfer files.',
      },
      {
        role: 'Teaching & Non-Teaching Staff',
        responsibility: 'Punches daily biometrics, applies for leave online, and accesses monthly payslips.',
      },
    ],
    connectedModules: [
      {
        name: 'Academic Management',
        desc: 'Links faculty attendance and approved leave directly with daily lecture substitution schedules.',
      },
      {
        name: 'Staff Recruitment System (SRS)',
        desc: 'Transfers selected candidate resumes and appointment documents directly into employee profiles.',
      },
      {
        name: 'Fee & Finance Management',
        desc: 'Pushes consolidated monthly salary expenditure into the central campus financial ledger.',
      },
      {
        name: 'Campus Gate Security',
        desc: 'Syncs employee smart ID card credentials with turnstile gates and barrier entry systems.',
      },
    ],
  },

  // 8. SRS – Staff Recruitment System
  'staff-recruitment': {
    id: 'staff-recruitment',
    name: 'Staff Recruitment System (SRS)',
    shortName: 'Staff Recruitment',
    category: 'Administration & Finance',
    pillText: 'Talent Acquisition Engine',
    tagline: 'Vacancies, Candidate Portals, Interview Scheduling & Shortlisting.',
    headline: 'Manage recruitment workflows for teaching and non-teaching positions with vacancy publishing, resume parsing, interview scheduling, and selection reports.',
    bannerImage: staffRecruitmentBanner,
    badgeColor: 'bg-orange-50 text-orange-800 border-orange-200',
    accentColor: 'text-orange-600',
    overview:
      'Campo SRS streamlines institutional hiring for professors, assistant professors, lab assistants, and administrative staff. It replaces cluttered email inboxes and manual candidate folders with a structured talent acquisition engine. From publishing recruitment notifications and capturing structured candidate applications to resume screening, interview committee scoring, and offer letter generation, SRS ensures your institution recruits top academic talent quickly.',
    metrics: [
      { value: '50% Faster', label: 'Hiring Turnaround', note: 'Streamlined candidate screening' },
      { value: '100% Digital', label: 'Resume & Doc Vault', note: 'Online publication & certificate review' },
      { value: 'Multi-Member', label: 'Interview Panels', note: 'Standardized evaluation rubrics' },
      { value: 'Instant', label: 'HRMS Handover', note: 'Direct promotion to active employee record' },
    ],
    capabilities: [
      {
        icon: Briefcase,
        title: 'Recruitment Notifications & Vacancy Management',
        description:
          'Publish job openings by department, designation, and qualification requirements (Ph.D., NET/SET, minimum teaching experience) with customizable application deadlines.',
        benefit: 'Targeted academic vacancy campaigns',
      },
      {
        icon: UserPlus,
        title: 'Candidate Registration & Profile Management',
        description:
          'Prospective faculty register on the institutional career portal, providing educational qualifications, API scores, research citations, and prior teaching experience.',
        benefit: 'Structured candidate profiles ready for automated evaluation',
      },
      {
        icon: FileCheck,
        title: 'Resume & Supporting-Document Uploads',
        description:
          'Secure cloud storage for applicant CVs, Ph.D. degree certificates, Scopus/UGC publication proofs, and experience letters with instant PDF preview.',
        benefit: 'Eliminates paper resumes and missing application files',
      },
      {
        icon: Filter,
        title: 'Application Tracking & Candidate Shortlisting',
        description:
          'Filter applicant pools by academic qualification, years of experience, and specialization. Move candidates through screening stages with automated status tags.',
        benefit: 'Quickly surface the most qualified candidates for interviews',
      },
      {
        icon: Calendar,
        title: 'Interview Scheduling & Panel Evaluation',
        description:
          'Schedule interview rounds with internal selection committees and external university experts. Panel members enter evaluation scores and recommendation notes directly.',
        benefit: 'Standardized, transparent interview scoring rubrics',
      },
      {
        icon: CheckCircle2,
        title: 'Selection / Rejection Status Management & Offers',
        description:
          'Issue formal appointment offer letters to selected candidates and trigger automated courteous status update emails to non-selected applicants.',
        benefit: 'Professional institutional candidate communication',
      },
      {
        icon: FileSpreadsheet,
        title: 'Recruitment Reports & Compliance Documentation',
        description:
          'Generate comprehensive hiring audit reports, roster reservation compliance summaries, and applicant statistics formatted for university inspection boards.',
        benefit: 'Complete compliance documentation for institutional audits',
      },
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Vacancy Requisition',
        description: 'HODs post departmental faculty vacancies and management approves position requisitions.',
      },
      {
        step: '02',
        title: 'Career Portal Applications',
        description: 'Candidates apply online, upload resumes, and document credentials on the career portal.',
      },
      {
        step: '03',
        title: 'Shortlisting & Interviews',
        description: 'Selection committee reviews profiles, schedules interviews, and scores candidate demonstrations.',
      },
      {
        step: '04',
        title: 'Offer & HRMS Onboarding',
        description: 'Appointment letter issued and candidate profile converts directly into an employee record.',
      },
    ],
    stakeholders: [
      {
        role: 'Selection Committee & Trustees',
        responsibility: 'Approves faculty positions, conducts final interviews, and finalizes salary negotiations.',
      },
      {
        role: 'Heads of Department (HODs)',
        responsibility: 'Reviews subject specialization, screens technical resumes, and conducts teaching demos.',
      },
      {
        role: 'HR & Recruitment Officer',
        responsibility: 'Publishes notifications, coordinates interview schedules, and verifies candidate documents.',
      },
      {
        role: 'Applicants',
        responsibility: 'Registers online, uploads credentials, tracks application status, and accepts offers.',
      },
    ],
    connectedModules: [
      {
        name: 'HRMS & Payroll System',
        desc: 'Converts selected candidates into active employee service records with pre-loaded documents.',
      },
      {
        name: 'Academic Management',
        desc: 'Maps new faculty hires directly into departmental course allocations and timetable grids.',
      },
      {
        name: 'Campus Gate Security',
        desc: 'Generates visitor gate passes for candidates attending scheduled in-person interviews.',
      },
      {
        name: 'Executive Reporting',
        desc: 'Provides leadership with faculty hiring timelines, candidate pipelines, and cost-per-hire analytics.',
      },
    ],
  },

  // 9. Hostel Management System (HMS)
  'hostel-management': {
    id: 'hostel-management',
    name: 'Hostel Management System (HMS)',
    shortName: 'Hostel',
    category: 'Campus Operations',
    pillText: 'Residential Governance Hub',
    tagline: 'Room Allocation, Mess, Electricity Billing & OTP Student Leaves.',
    headline: 'Centralized hostel infrastructure management, room allocation, mess billing, biometric night attendance, room electricity metering, and OTP-based student leaves.',
    bannerImage: hostelBanner,
    badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
    accentColor: 'text-rose-600',
    overview:
      'Campo Hostel Management System (HMS) brings security, comfort, and operational control to student residential campus life. It manages multi-block boys and girls hostels: building-floor-room-bed hierarchies, room allocations, transfers, mess food management, and category-wise hostel fee configuration. Advanced safety features including biometric night-curfew attendance, OTP-based parent verified gate passes, and room-wise electricity bill tracking make campus hostels secure and self-sustaining.',
    metrics: [
      { value: '100% Live', label: 'Occupancy Tracking', note: 'Real-time bed availability matrix' },
      { value: 'OTP-Verified', label: 'Student Outings', note: 'Parent mobile approval before gate exit' },
      { value: 'Room-Wise', label: 'Electricity Billing', note: 'Accurate consumption bill splitting' },
      { value: 'Biometric', label: 'Night Curfew Sync', note: 'Daily 9:00 PM attendance audit' },
    ],
    capabilities: [
      {
        icon: Building2,
        title: 'Hostel Infrastructure Management',
        description:
          'Centralized configuration of campus hostel buildings, blocks, floors, room types (AC, Non-AC, Deluxe, Attached Bath), and specific bed numbering.',
        benefit: 'Complete visual map of institutional housing assets',
      },
      {
        icon: Bed,
        title: 'Student Registration, Bed Allocation & Transfers',
        description:
          'Allocate beds during admission counseling or academic term beginnings. Manage student room transfer requests and end-of-year reallocations smoothly.',
        benefit: 'Eliminates room disputes and double-allotment errors',
      },
      {
        icon: Users,
        title: 'Guest & Short-Term Stay Management',
        description:
          'Manage guest room accommodations for visiting parents, guest lecturers, conference delegates, and examiners with daily tariff billing.',
        benefit: 'Monetize surplus residential capacity transparently',
      },
      {
        icon: Zap,
        title: 'Room-Wise Electricity Bill Management',
        description:
          'Record monthly meter readings per room and divide excess electricity consumption charges equally among room occupants on their fee statements.',
        benefit: 'Prevents wasteful hostel energy consumption',
      },
      {
        icon: FileCheck,
        title: 'Hostel NOC & Vacating Management',
        description:
          'Automated room inspection check (furniture, keys, electrical fixtures) before issuing digital Hostel No-Dues clearance for final-year students.',
        benefit: 'Ensures zero campus property damage or unpaid room dues',
      },
      {
        icon: Clock,
        title: 'Biometric Night Attendance Tracking',
        description:
          'Track evening hostel roll-call using biometric fingerprint/facial recognition terminals. Absent students are instantly flagged to hostel wardens.',
        benefit: 'Strict residential safety and discipline enforcement',
      },
      {
        icon: QrCode,
        title: 'OTP-Based Student Leave & Outing Gate Passes',
        description:
          'Students apply for home leaves or weekend outings. Automated SMS/WhatsApp OTP is sent to parents for approval before security turnstiles unlock.',
        benefit: 'Guaranteed parental consent for every student outing',
      },
      {
        icon: Utensils,
        title: 'Food & Mess Management',
        description:
          'Weekly breakfast, lunch, and dinner meal plan scheduling. Track student mess attendance, guest meals, and cafeteria catering inventory.',
        benefit: 'Minimizes food waste and ensures hygienic catering standards',
      },
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Bed Allotment & Room Setup',
        description: 'Assign student to room & bed category with live inventory verification.',
      },
      {
        step: '02',
        title: 'Mess & Fee Integration',
        description: 'Hostel fee demands and food mess charges post directly to the student ledger.',
      },
      {
        step: '03',
        title: 'Daily Curfew & Outings',
        description: 'Biometric night attendance and parent-verified OTP passes for campus outings.',
      },
      {
        step: '04',
        title: 'Vacating & Digital NOC',
        description: 'Room inspection logged and automated Hostel No-Dues issued on year-end vacating.',
      },
    ],
    stakeholders: [
      {
        role: 'Chief Warden & Hostel Committee',
        responsibility: 'Oversees residential discipline, room allotment policies, and warden staffing.',
      },
      {
        role: 'Floor Wardens & Supervisors',
        responsibility: 'Conducts daily night roll-call, verifies leaves, and oversees cafeteria food quality.',
      },
      {
        role: 'Campus Security',
        responsibility: 'Validates digital gate passes on turnstile screens before permitting students to leave.',
      },
      {
        role: 'Hostel Residents & Parents',
        responsibility: 'Approves outing OTPs, pays hostel fees online, and tracks room electricity bills.',
      },
    ],
    connectedModules: [
      {
        name: 'Fee Management System',
        desc: 'Directly bills room tariffs, mess deposits, and excess electricity charges onto student ledgers.',
      },
      {
        name: 'Admissions CRM',
        desc: 'Allows prospective candidates to reserve hostel rooms at counseling confirmation.',
      },
      {
        name: 'Campus Gate Security',
        desc: 'Syncs student leave approvals with turnstile scanners to control campus exit gates.',
      },
      {
        name: 'Maintenance Management',
        desc: 'Allows students to lodge plumbing, electrical, and carpentry complaints directly to technicians.',
      },
    ],
  },

  // 10. Stationery Management System
  'stationery-management': {
    id: 'stationery-management',
    name: 'Stationery Management System',
    shortName: 'Stationery & Stores',
    category: 'Administration & Finance',
    pillText: 'Inventory & Procurement Engine',
    tagline: 'Inventory Stock, Procurement, Department Pending Reports & Store Billing.',
    headline: 'Track campus stationery, lab consumables, uniform kits, purchase orders, department-wise student pending reports, and point-of-sale store fee collections.',
    bannerImage: stationeryBanner,
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    accentColor: 'text-amber-600',
    overview:
      'Campo Stationery Management System centralizes institutional supplies, textbooks, laboratory record manuals, uniforms, and office consumables. Designed for central stores and academic departments, it manages vendor purchase orders, tracks stock levels across multiple godowns, automates student kit distributions, and provides dedicated counter collection portals with day-end reconciliation reports.',
    metrics: [
      { value: '100% Tracked', label: 'Stock Inventory', note: 'Real-time item count across store godowns' },
      { value: 'Auto-Alert', label: 'Low Stock Warnings', note: 'Triggers purchase requisitions automatically' },
      { value: 'Dept-Wise', label: 'Pending Dues Reports', note: 'Track uncollected student kit fees' },
      { value: 'Instant', label: 'POS Receipting', note: 'Dedicated counter fee collection portal' },
    ],
    capabilities: [
      {
        icon: Package,
        title: 'Inventory & Stock Management',
        description:
          'Maintain real-time item registries for exam answer booklets, student lab manuals, uniforms, apron kits, library stationery, and office paper stock across campus warehouses.',
        benefit: 'Complete visibility of institutional physical assets',
      },
      {
        icon: ShoppingCart,
        title: 'Purchase & Procurement Management',
        description:
          'Create purchase requisitions, compare vendor quotes, issue approved Purchase Orders (POs), and record Good Receipt Notes (GRN) against delivery challans.',
        benefit: 'Transparent vendor procurement with complete audit trails',
      },
      {
        icon: FileSpreadsheet,
        title: 'Institution & Department-Wise Pending Reports',
        description:
          'Generate comprehensive reports identifying which students or departments have received stationery kits but have outstanding fee balances.',
        benefit: 'Prevents distribution of stationery without fee recovery',
      },
      {
        icon: CreditCard,
        title: 'Dedicated Fee Collection Portal',
        description:
          'Specialized point-of-sale store counter screen allowing quick barcode scanning of kits, cash/online payments, and instant printed thermal receipts.',
        benefit: 'Rapid student distribution during first-week semester rush',
      },
      {
        icon: TrendingUp,
        title: 'Day-End & Month-End Financial Reports',
        description:
          'Automated daily store cashier closing sheets matching collected cash against physical stock deductions for seamless handover to the central accounts department.',
        benefit: 'Zero cashier discrepancies at end of day',
      },
      {
        icon: AlertTriangle,
        title: 'Low-Stock Monitoring & Reorder Level Alerts',
        description:
          'Configure safety buffer thresholds for essential supplies. Receive automated alerts when exam answer booklets or blue books dip below minimum levels.',
        benefit: 'Never run out of critical exam and laboratory stationery',
      },
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Procurement & Stock Inward',
        description: 'Vendor goods received, verified against purchase order, and added to store inventory.',
      },
      {
        step: '02',
        title: 'Kit Configuration',
        description: 'Bundle semester uniforms, books, and lab manuals into course-specific student kits.',
      },
      {
        step: '03',
        title: 'Counter Distribution & Billing',
        description: 'Scan student ID barcode, collect payment or debit student account, and issue supplies.',
      },
      {
        step: '04',
        title: 'Day-End Reconciliation',
        description: 'Store sales and remaining stock reconcile automatically with central finance accounts.',
      },
    ],
    stakeholders: [
      {
        role: 'Central Store Manager',
        responsibility: 'Maintains stock ledgers, manages warehouse goods inward, and monitors reorder levels.',
      },
      {
        role: 'Store Cashier & Counter Staff',
        responsibility: 'Issues student kits, collects store fees, and generates day-end closing reconciliations.',
      },
      {
        role: 'Department Heads & Lab In-Charges',
        responsibility: 'Requisitions lab record books, answer sheets, and department stationery bundles.',
      },
      {
        role: 'Accounts & Audit Officers',
        responsibility: 'Audits vendor procurement bills and reconciles store cash flow with bank balances.',
      },
    ],
    connectedModules: [
      {
        name: 'Fee Management System',
        desc: 'Links stationery kit charges directly into the student consolidated semester fee ledger.',
      },
      {
        name: 'Student Records (SDMS)',
        desc: 'Scans student smart cards at store counters to confirm batch, branch, and fee eligibility.',
      },
      {
        name: 'Examination Management (EMS)',
        desc: 'Supplies secure serialized answer booklets and tracks distribution during semester exams.',
      },
      {
        name: 'Maintenance Management',
        desc: 'Supplies spare parts, cleaning materials, and hardware tools to campus maintenance teams.',
      },
    ],
  },

  // 11. Maintenance Management System
  'maintenance-management': {
    id: 'maintenance-management',
    name: 'Maintenance Management System',
    shortName: 'Maintenance',
    category: 'Campus Operations',
    pillText: 'Facility Asset Operations',
    tagline: 'Ticketing, Work Orders, Technician Allocation & Asset Repair History.',
    headline: 'Track institutional maintenance requests, department-wise task allocation, technician scheduling, repair expenses, and approval workflows across campus facilities.',
    bannerImage: maintenanceBanner,
    badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
    accentColor: 'text-teal-700',
    overview:
      'Campo Maintenance Management System coordinates campus facilities, infrastructure upkeep, and technical repair workflows. Covering civil works, electrical, plumbing, carpentry, air conditioning, and IT networking, it replaces informal phone calls and lost complaint registers with a transparent service desk. Department heads, faculty, and hostel students register service tickets online, which are automatically assigned to technicians with SLA resolution tracking and expense logging.',
    metrics: [
      { value: '< 4 Hours', label: 'Average Response Time', note: 'Rapid technician task assignment' },
      { value: '100% Tracked', label: 'Ticket Resolution', note: 'Every complaint logged with photo proof' },
      { value: 'Zero', label: 'Unresolved Complaints', note: 'Automated escalation to facility manager' },
      { value: 'Complete', label: 'Repair History', note: 'Asset lifecycle & expense accountability' },
    ],
    capabilities: [
      {
        icon: Wrench,
        title: 'Maintenance Request & Complaint Registration',
        description:
          'Faculty, staff, and hostel residents log maintenance tickets via web or mobile app with room location, complaint category, severity tag, and photo attachments.',
        benefit: 'Centralized institutional helpdesk for all campus facilities',
      },
      {
        icon: Filter,
        title: 'Department-Wise Request Tracking & Prioritization',
        description:
          'Categorize requests into Electrical, Plumbing, HVAC, Carpentry, Civil, and IT Hardware. Prioritize urgent issues (classroom projector down, lab water pipe burst).',
        benefit: 'Ensures critical academic infrastructure is repaired first',
      },
      {
        icon: UserCheck,
        title: 'Task Assignment & Technician Allocation',
        description:
          'Facility supervisors assign tickets to in-house electricians, plumbers, or external AMC contractors with SMS task alerts and target resolution deadlines.',
        benefit: 'Clear technician accountability and reduced downtime',
      },
      {
        icon: Clock,
        title: 'Request Status Tracking & Maintenance Scheduling',
        description:
          'Real-time status updates (Open, Assigned, In-Progress, Work Complete, Verified). Complainants receive SMS alerts when work is finished and confirm satisfaction.',
        benefit: 'Complete transparency between staff and facility teams',
      },
      {
        icon: Database,
        title: 'Repair History & Maintenance Expense Records',
        description:
          'Log parts replaced, labor charges, and external contractor invoices against specific campus assets (generators, RO water plants, air conditioners, elevators).',
        benefit: 'Evaluates equipment longevity and optimizes replacement budgets',
      },
      {
        icon: ShieldCheck,
        title: 'Approval Workflows & Maintenance Audit Reports',
        description:
          'High-value repair quotations route automatically to Principals or Trust Engineers for digital approval before procurement or technician engagement.',
        benefit: 'Strict financial governance over campus repair spending',
      },
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Ticket Lodging',
        description: 'Staff or student registers issue with location, category, and photo evidence.',
      },
      {
        step: '02',
        title: 'Supervisor Triage & Assign',
        description: 'Facility supervisor reviews priority and assigns task to available technician.',
      },
      {
        step: '03',
        title: 'Repair & Parts Inward',
        description: 'Technician executes repair, logs replaced parts from stores, and marks work completed.',
      },
      {
        step: '04',
        title: 'User Verification & Close',
        description: 'Complainant tests repair, rates technician service, and ticket closes automatically.',
      },
    ],
    stakeholders: [
      {
        role: 'Campus Estate Manager / Chief Engineer',
        responsibility: 'Monitors overall facility upkeep, approves major repair estimates, and manages AMC contracts.',
      },
      {
        role: 'Maintenance Supervisors',
        responsibility: 'Triages daily tickets, schedules technician shifts, and verifies work completion on-site.',
      },
      {
        role: 'Technicians (Electricians, Plumbers, IT)',
        responsibility: 'Receives task assignments on mobile app, conducts repairs, and logs parts utilized.',
      },
      {
        role: 'Faculty, Staff & Students',
        responsibility: 'Logs service complaints online, tracks resolution progress, and confirms sign-off.',
      },
    ],
    connectedModules: [
      {
        name: 'Stationery & Stores Management',
        desc: 'Requisitions plumbing spares, electrical switches, and hardware tools directly from central stores.',
      },
      {
        name: 'Hostel Management (HMS)',
        desc: 'Enables hostel students and wardens to report room plumbing and electrical issues seamlessly.',
      },
      {
        name: 'Academic Management',
        desc: 'Fast-tracks classroom and seminar hall audiovisual/projector repair requests during exam terms.',
      },
      {
        name: 'Transport Management',
        desc: 'Coordinates mechanical workshop repairs, oil changes, and fleet servicing schedules.',
      },
    ],
  },

  // 12. Library Management System
  'library-management': {
    id: 'library-management',
    name: 'Library Management System',
    shortName: 'Library',
    category: 'Student & Academics',
    pillText: 'Knowledge & Circulation Engine',
    tagline: 'Book Cataloging, Barcodes, Circulation, Fines & Digital OPAC.',
    headline: 'Comprehensive campus library administration covering book inventory, automated barcode issue/return, fine collections, student/faculty access, and online reservations.',
    bannerImage: libraryBanner,
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    accentColor: 'text-indigo-600',
    overview:
      'Campo Library Management System transforms academic and central libraries into modern digital learning centers. Supporting universal cataloging standards (Dewey Decimal / DDC), it manages books, journals, project dissertations, and digital e-resources. With barcode and RFID smart card integration, circulation counters process check-outs and returns in seconds, automatically calculating overdue fines and enforcing borrowing limits based on student or faculty roles.',
    metrics: [
      { value: '< 5 Seconds', label: 'Circulation Speed', note: 'Barcode & RFID card issue/return' },
      { value: '100% Digital', label: 'Online Book Reservation', note: 'Remote catalog search (OPAC)' },
      { value: 'Automated', label: 'Fine Calculation', note: 'Direct link to student payment ledger' },
      { value: 'Accreditation', label: 'Library Analytics', note: 'Pre-formatted NAAC / NBA accession logs' },
    ],
    capabilities: [
      {
        icon: Library,
        title: 'Book Inventory & Stock Management',
        description:
          'Catalog books, references, bound journals, e-books, and CDs with ISBN, accession numbers, author, publisher, edition, rack location, and Dewey classification.',
        benefit: 'Instant location of any book across multi-floor library stacks',
      },
      {
        icon: BookMarked,
        title: 'Automated Book Issue & Return Circulation',
        description:
          'Scan student smart cards and book barcodes at circulation desks for rapid check-outs, returns, and renewals with automated due-date stamping.',
        benefit: 'Zero manual register handwriting or long library queues',
      },
      {
        icon: Users,
        title: 'Student & Faculty Custom Borrowing Policies',
        description:
          'Configure borrowing quotas and lending duration rules by category (e.g. Undergraduates: 3 books for 14 days, Faculty: 8 books for 60 days).',
        benefit: 'Enforces equitable access to high-demand academic reference titles',
      },
      {
        icon: DollarSign,
        title: 'Fine & Transaction Management',
        description:
          'Automatically calculate per-day overdue penalties for delayed book returns. Students pay library fines at the counter or clear dues online through the portal.',
        benefit: 'Encourages prompt book returns and automates fine collection',
      },
      {
        icon: Search,
        title: 'Online Book Reservation & OPAC Catalog Access',
        description:
          'Online Public Access Catalog (OPAC) allows students and teachers to search titles from anywhere, check real-time shelf availability, and place hold reservations.',
        benefit: 'Self-service catalog discovery from mobile phones and laptops',
      },
      {
        icon: FileSpreadsheet,
        title: 'Library Resources & Accreditation Analytics',
        description:
          'Generate gate footfall reports, circulation statistics, most-read book analytics, lost book records, and book acquisition data ready for NAAC SSR Criterion 4.',
        benefit: 'Audit-ready library metrics for accreditation boards',
      },
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Accession & Barcoding',
        description: 'New books accessioned with Dewey classification and serialized barcode stickers.',
      },
      {
        step: '02',
        title: 'OPAC Search & Hold',
        description: 'Students search catalog online and reserve copies from their companion portal.',
      },
      {
        step: '03',
        title: 'Counter Barcode Issue',
        description: 'Scan student smart card and book barcode for instant checkout with due date SMS.',
      },
      {
        step: '04',
        title: 'Return & Auto Fine',
        description: 'Scan on return; system checks book condition and automatically posts overdue fines if late.',
      },
    ],
    stakeholders: [
      {
        role: 'Chief Librarian',
        responsibility: 'Oversees book procurement, accession registers, journal subscriptions, and NAAC reporting.',
      },
      {
        role: 'Circulation Desk Staff',
        responsibility: 'Handles book issues, returns, shelf renewals, and collects overdue library fines.',
      },
      {
        role: 'Faculty & Researchers',
        responsibility: 'Requisitions curriculum reference books, reserves research journals, and accesses e-vaults.',
      },
      {
        role: 'Students',
        responsibility: 'Searches OPAC catalog, reserves textbooks, and monitors return deadlines on mobile.',
      },
    ],
    connectedModules: [
      {
        name: 'Student Records (SDMS)',
        desc: 'Fetches student smart card barcodes and verifies active enrollment status before issuing books.',
      },
      {
        name: 'Fee Management System',
        desc: 'Connects overdue library fines directly to student accounts for integrated semester payment.',
      },
      {
        name: 'Examination Management (EMS)',
        desc: 'Enforces library No-Dues clearance before permitting exam hall ticket generation.',
      },
      {
        name: 'Academic Management',
        desc: 'Aligns library book procurement with recommended textbook syllabi and reading lists.',
      },
    ],
  },
};
