import {
  UserPlus,
  Users,
  BookOpen,
  Library,
  Wallet,
  ClipboardCheck,
  Briefcase,
  Bus,
  Building2,
  Package,
  UserCheck,
  Wrench,
  Layers,
  DatabaseZap,
  Repeat,
  Clock,
  EyeOff,
  GitBranch,
  ShieldCheck,
  Activity,
  Network,
  KeyRound,
  BellRing,
  Cpu,
  Sparkles,
  Lock,
  TrendingUp,
  Workflow,
  Compass,
} from 'lucide-react';

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Platform', href: '#platform' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Features', href: '#features' },
  { label: 'About Us', href: '#about' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export const problemItems = [
  {
    id: 'multiple-apps',
    icon: Layers,
    title: 'Multiple Disconnected Apps',
    description: 'Separate portals for admissions, academics, finance, and HR.',
  },
  {
    id: 'scattered-info',
    icon: DatabaseZap,
    title: 'Scattered Institutional Data',
    description: 'Student and staff records duplicated across isolated sheets.',
  },
  {
    id: 'repetitive-work',
    icon: Repeat,
    title: 'Repetitive Manual Processes',
    description: 'Teams re-enter the same data across campus workflows.',
  },
  {
    id: 'delayed-decisions',
    icon: Clock,
    title: 'Delayed Decision-Making',
    description: 'Leadership waits days for compiled cross-department reports.',
  },
  {
    id: 'limited-visibility',
    icon: EyeOff,
    title: 'Limited Cross-Team Visibility',
    description: 'Departments operate without a shared real-time overview.',
  },
  {
    id: 'campus-coordination',
    icon: GitBranch,
    title: 'Fragmented Campus Operations',
    description: 'Hostels, transport, and workforce run outside core systems.',
  },
];

export const ecosystemHighlights = [
  {
    icon: Compass,
    title: 'Centralized Operations',
    description: 'Academic, administrative, and campus workflows on one foundation.',
  },
  {
    icon: Network,
    title: 'Connected Applications',
    description: 'Fully integrated campus modules sharing one institutional data model.',
  },
  {
    icon: KeyRound,
    title: 'Unified Access',
    description: 'Single directory across leadership, faculty, and campus teams.',
  },
  {
    icon: ShieldCheck,
    title: 'Permission-Based Access',
    description: 'Every record and AI query honors strict user role scopes.',
  },
  {
    icon: Activity,
    title: 'Real-Time Visibility',
    description: 'Admissions, fees, and rosters reflect updates immediately.',
  },
  {
    icon: BellRing,
    title: 'Intelligent Insights',
    description: 'Operational answers grounded directly in connected data.',
  },
];

export const ecosystemPillars = [
  {
    id: 'academics-operation',
    label: 'Academics Operations',
    modules: [
      'Academics',
      'Examination',
      'Library',
      'CRT & Placement Training',
    ],
    sharedData: 'Lesson Plans, Faculty Substitutions, Hall Tickets, Placement Batches',
    alertQuote: 'Low attendance found when it is too late? Exam clashes at the last minute?',
    description:
      'Campo alerts you to a slipping section, an absent teacher, timetable clashes, and missing marks early—so classes run on time and results go out without last-minute delays.',
  },
  {
    id: 'administrative-operations',
    label: 'Administrative Operations',
    modules: [
      'Admissions',
      'Fees',
      'Staff Recruitment',
      'HRMS & Payroll',
    ],
    sharedData: 'Enquiry Leads, Fee Dues, Staff Records, Payroll Ledgers',
    alertQuote: 'Fee dues piling up and nobody chasing? Enquiries lost and staff records scattered?',
    description:
      'Campo keeps every fee due in one place and sends reminders automatically. Assigns each enquiry to a counsellor and manages employee leave, vacancies, and payroll in one record.',
  },
  {
    id: 'campus-operations',
    label: 'Campus Operations',
    modules: [
      'Hostels',
      'Transport',
      'Stationary Store',
      'Inventory',
      'Maintenance',
    ],
    sharedData: 'Bus Fleet & GPS, Hostel Curfew, Store Stock, Maintenance Tickets',
    alertQuote: 'Fuel, food and stock costs keep rising? Repairs reported late as complaints?',
    description:
      'Campo tracks every bus route, meal count, and stock level so waste drops. Logs each facility maintenance request and tracks it until it is verified and closed.',
  },
  {
    id: 'student-management-engagement',
    label: 'Student Engagement',
    modules: [
      'Student Records',
      'Student Clubs',
      'Student & Parent Mobile App',
    ],
    sharedData: 'Verified Student ID, Club Rosters, Multi-Channel Broadcasts, Bus Live Map',
    alertQuote: 'Parents keep calling to ask where the bus is? Circulars do not reach everyone?',
    description:
      'Campo shows the live bus location in the parent app along with fees, attendance, and results. Sends each official notice by SMS, WhatsApp, and app together with delivery confirmation.',
  },
];

export const applications = [
  {
    id: 'admissions-crm',
    name: 'Admissions CRM',
    category: 'Student & Academics',
    icon: UserPlus,
    description: 'Track student enquiries, verify applications, and streamline campus enrolment.',
    connectsTo: ['Student Records', 'Fees & Payments'],
    roles: ['Admissions Team', 'Counsellors', 'Director / Principal'],
    workflows: [
      'Enquiry capture and multi-stage follow-up tracking',
      'Application verification and merit/seat allocation',
      'Seamless conversion into verified student enrollment records',
    ],
  },
  {
    id: 'student-data',
    name: 'Student Records',
    category: 'Student & Academics',
    icon: Users,
    description: 'Centralize student profiles, verified documents, and full academic progression.',
    connectsTo: ['Academics', 'Hostel'],
    roles: ['Registrar', 'Administrative Office', 'Department Heads'],
    workflows: [
      'Unified institutional student directory and document vault',
      'Cohort, program, and academic status progression',
      'Cross-module student identity shared with campus services',
    ],
  },
  {
    id: 'academic-management',
    name: 'Academics',
    category: 'Student & Academics',
    icon: BookOpen,
    description: 'Manage curriculum planning, lecture timetables, and faculty workload allocations.',
    connectsTo: ['Student Records', 'Examinations'],
    roles: ['Dean of Academics', 'Heads of Department', 'Faculty'],
    workflows: [
      'Curriculum structure, semester planning, and course allocation',
      'Timetable scheduling and classroom/lab coordination',
      'Departmental academic governance and attendance tracking',
    ],
  },
  {
    id: 'library-management',
    name: 'Library',
    category: 'Student & Academics',
    icon: Library,
    description: 'Catalog books, track issue-return circulation, and monitor overdue fines.',
    connectsTo: ['Student Records', 'Fees & Payments'],
    roles: ['Chief Librarian', 'Library Staff', 'Students & Faculty'],
    workflows: [
      'Barcode and RFID book issue, renewal, and return tracking',
      'Automated overdue fine computation linked to student fee ledgers',
      'Digital OPAC book search, reservations, and accession registers',
    ],
  },
  {
    id: 'fee-management',
    name: 'Fees & Payments',
    category: 'Administration & Finance',
    icon: Wallet,
    description: 'Automate institutional fee collections, installment receipts, and balance dues.',
    connectsTo: ['Admissions CRM', 'Student Records'],
    roles: ['Finance Officer', 'Accounts Team', 'Management / Chairman'],
    workflows: [
      'Structured fee heads, installment schedules, and receipts',
      'Transparent concession approvals and audit trails',
      'Real-time reconciliation across tuition, hostel, and transport',
    ],
  },
  {
    id: 'examination-management',
    name: 'Examinations',
    category: 'Student & Academics',
    icon: ClipboardCheck,
    description: 'Schedule semester exams, generate hall tickets, and publish verified grades.',
    connectsTo: ['Academics', 'Student Records'],
    roles: ['Controller of Examinations', 'Registrar', 'Faculty'],
    workflows: [
      'Exam scheduling, eligibility verification, and seating plans',
      'Internal and external assessment mark compilation',
      'Consolidated academic performance and result workflows',
    ],
  },
  {
    id: 'hrms',
    name: 'HRMS',
    category: 'Administration & Finance',
    icon: Briefcase,
    description: 'Centralize faculty service profiles, biometric attendance, and staff payroll.',
    connectsTo: ['Staff Recruitment', 'Academics'],
    roles: ['HR Manager', 'Principal / Director', 'Department Heads'],
    workflows: [
      'Centralized faculty and non-teaching staff service profiles',
      'Daily attendance, leave workflows, and shift tracking',
      'Departmental staffing visibility across campus units',
    ],
  },
  {
    id: 'transport-management',
    name: 'Campus Transport',
    category: 'Campus Operations',
    icon: Bus,
    description: 'Coordinate campus bus routes, fleet tracking, and student transport passes.',
    connectsTo: ['Student Records', 'Fees & Payments'],
    roles: ['Transport Coordinator', 'Campus Operations', 'Finance Team'],
    workflows: [
      'Bus route planning, stop mapping, and fleet assignment',
      'Student and staff transport pass allocation',
      'Transport fee linkage with unified student ledgers',
    ],
  },
  {
    id: 'hostel-management',
    name: 'Hostel',
    category: 'Campus Operations',
    icon: Building2,
    description: 'Manage room inventory, resident check-ins, and recurring hostel dues.',
    connectsTo: ['Student Records', 'Fees & Payments'],
    roles: ['Chief Warden', 'Hostel Supervisors', 'Administration'],
    workflows: [
      'Block, room, and bed inventory allocation for residents',
      'Resident check-in/out records linked to student profiles',
      'Hostel fee and facility tracking integrated with finance',
    ],
  },
  {
    id: 'stationery-management',
    name: 'Stationery',
    category: 'Campus Operations',
    icon: Package,
    description: 'Track campus store stock, student semester kits, and departmental orders.',
    connectsTo: ['Student Records', 'Fees & Payments'],
    roles: ['Store Manager', 'Administrative Staff', 'Accounts Team'],
    workflows: [
      'Stock ledger tracking for institutional kits and supplies',
      'Departmental and student distribution records',
      'Reorder visibility and inventory accountability',
    ],
  },
  {
    id: 'staff-recruitment',
    name: 'Staff Recruitment',
    category: 'Administration & Finance',
    icon: UserCheck,
    description: 'Manage recruitment requisitions, candidate interviews, and onboarding.',
    connectsTo: ['HRMS', 'Academics'],
    roles: ['HR Team', 'Selection Committee', 'Chairman / Director'],
    workflows: [
      'Requisition, applicant screening, and interview scheduling',
      'Panel evaluation tracking across academic & admin roles',
      'Direct onboarding handoff into HRMS employee records',
    ],
  },
  {
    id: 'maintenance-management',
    name: 'Maintenance',
    category: 'Campus Operations',
    icon: Wrench,
    description: 'Log campus maintenance tickets and track fast resolution across facilities.',
    connectsTo: ['Hostel', 'Student Records'],
    roles: ['Campus Supervisor', 'Maintenance Staff', 'Students & Faculty'],
    workflows: [
      'Simple complaint lodging for hostels, labs, and classrooms',
      'Direct ticket assignment to campus maintenance staff',
      'Resolution verification and real-time status updates',
    ],
  },
];

export const applicationCategories = [
  'All Modules',
  'Student & Academics',
  'Administration & Finance',
  'Campus Operations',
];

export const aiCapabilities = [
  {
    title: 'Institutional Q&A',
    status: 'Available Now',
    statusTone: 'implemented',
    icon: Sparkles,
    description: 'Ask natural-language questions over connected institutional records.',
  },
  {
    title: 'Permission-Based Access',
    status: 'Available Now',
    statusTone: 'implemented',
    icon: Lock,
    description: 'Every answer strictly respects user role and department scope.',
  },
  {
    title: 'Decision Support',
    status: 'Available Now',
    statusTone: 'implemented',
    icon: Cpu,
    description: 'Faster cross-department clarity without manual spreadsheet exports.',
  },
  {
    title: 'Context-Aware Notifications',
    status: 'Roadmap',
    statusTone: 'configurable',
    icon: BellRing,
    description: 'Configurable operational alerts across admissions and finance.',
  },
  {
    title: 'Cross-Application Insights',
    status: 'Roadmap',
    statusTone: 'configurable',
    icon: TrendingUp,
    description: 'Configurable institutional trend visibility across departments.',
  },
];

export const howItWorksSteps = [
  {
    step: '01',
    title: 'Connect',
    subtitle: 'Unify Applications',
    description: 'Bring admissions, academics, finance, HR, and campus services onto one shared data layer.',
    highlights: ['Integrated campus modules', 'Single directory', 'Zero duplicate entry'],
  },
  {
    step: '02',
    title: 'Understand',
    subtitle: 'Scoped Visibility',
    description: 'View connected cross-department status and query existing data within your role.',
    highlights: ['Department clarity', 'Role-enforced access', 'Grounded answers'],
  },
  {
    step: '03',
    title: 'Act',
    subtitle: 'Operate With Speed',
    description: 'Coordinate leadership, administration, and campus execution from one source of truth.',
    highlights: ['Faster decisions', 'Coordinated teams', 'Scalable governance'],
  },
];

export const whyCampoFeatures = [
  {
    icon: Network,
    title: 'One Connected Institutional Ecosystem',
    description:
      'Built as an interconnected suite rather than separate point tools stitched together with spreadsheets.',
    featured: true,
  },
  {
    icon: Activity,
    title: 'Centralized Visibility',
    description: 'Track admissions, academics, finance, and operations in one place.',
  },
  {
    icon: Workflow,
    title: 'Integrated Workflows',
    description: 'Student data flows cleanly from enquiry to exams, hostel, and transport.',
  },
  {
    icon: ShieldCheck,
    title: 'Role-Based Security',
    description: 'Granular permissions govern every module, report, and AI query.',
  },
  {
    icon: Layers,
    title: 'Scalable Governance',
    description: 'Supports growing campuses and multi-department operations cleanly.',
  },
  {
    icon: Cpu,
    title: 'Data-Driven Operations',
    description: 'Turns institutional records into immediate, actionable answers.',
  },
  {
    icon: GitBranch,
    title: 'Reduced Fragmentation',
    description: 'Aligns registrars, deans, finance, HR, and campus teams.',
  },
];

export const footerColumns = {
  platform: [
    { label: 'Overview', href: '#platform' },
    { label: 'Applications', href: '#solutions' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing Plans', href: '#pricing' },
    { label: 'Download App', href: '/download' },
  ],
  solutions: [
    { label: 'Admissions', href: '#solutions' },
    { label: 'Academics', href: '#solutions' },
    { label: 'Finance', href: '#solutions' },
    { label: 'Administration', href: '#solutions' },
    { label: 'Campus Operations', href: '#solutions' },
  ],
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Contact Us', href: '#contact' },
    { label: 'Request a Demo', href: '#contact' },
    { label: 'Admin Login', href: '/admin/login' },
  ],
};

// =========================================================================
// PRICING CONFIGURATION (From Campo 2026 Brochure)
// =========================================================================
export const pricingPlans = [
  {
    id: 'core',
    name: 'Core',
    price: '200',
    billingPeriod: 'per student, per year',
    popular: false,
    badge: 'Core Foundation',
    summary: 'Students, classes, admissions and staff in one place.',
    buttonText: 'Start Core Plan',
    categories: [
      {
        name: 'Academics Operations',
        modules: 'Academics, Examinations, Library',
      },
      {
        name: 'Administrative Operations',
        modules: 'Admissions, Fees, Lab Management, HRMS and Payroll',
      },
      {
        name: 'Student Management and Engagement',
        modules: 'Student Management, Student Clubs, Communications, Student and Parent App',
      },
    ],
  },
  {
    id: 'campus',
    name: 'Campus',
    price: '300',
    billingPeriod: 'per student, per year',
    popular: true,
    badge: 'Most campuses choose this',
    summary: 'Adds buses, hostels, store and upkeep.',
    buttonText: 'Start Campus Plan',
    categories: [
      {
        name: 'Academics Operations',
        modules: 'Academics, Examinations, Library',
      },
      {
        name: 'Administrative Operations',
        modules: 'Admissions, Fees, Lab Management, HRMS and Payroll',
      },
      {
        name: 'Student Management and Engagement',
        modules: 'Student Management, Student Clubs, Communications, Student and Parent App',
      },
      {
        name: 'Campus Operations',
        modules: 'Hostel, Transport, Stationery Store, Maintenance',
      },
    ],
  },
  {
    id: 'campus-ai',
    name: 'Campus AI',
    price: '400',
    billingPeriod: 'per student, per year',
    popular: false,
    badge: 'Enterprise Intelligence',
    summary: 'Adds placement, recruitment, inventory and AI alerts.',
    buttonText: 'Start Campus AI Plan',
    categories: [
      {
        name: 'Academics Operations',
        modules: 'Academics, Examinations, Library, CRT and Placement Hub',
      },
      {
        name: 'Administrative Operations',
        modules: 'Admissions, Fees, Lab Management, Staff Recruitment, HRMS and Payroll',
      },
      {
        name: 'Student Management and Engagement',
        modules: 'Student Management, Student Clubs, Communications, Student and Parent App',
      },
      {
        name: 'Campus Operations',
        modules: 'Hostel, Transport, Stationery Store, Inventory, Maintenance',
      },
      {
        name: 'Intelligent AI Alerts',
        modules: 'AI alerts across every area',
        isAi: true,
      },
    ],
  },
];

export const integrationHighlights = {
  title: 'Connecting your tools costs nothing.',
  description:
    'Biometric devices, WhatsApp, bulk SMS and payment gateways are set up and supported by us, with no integration charge.',
  tools: [
    'Biometric Devices',
    'WhatsApp Business API',
    'Bulk SMS Gateways',
    'Online Payment Gateways',
    'Zero Integration Charges',
  ],
};

export const pickPlugPlaySteps = [
  {
    tag: 'Pick',
    title: 'Pick',
    description: 'Any one feature, or as many as you like.',
  },
  {
    tag: 'Plug',
    title: 'Plug',
    description: 'It connects with the software and APIs you already use.',
  },
  {
    tag: 'Play',
    title: 'Play',
    description: 'Ask us for a quote, and add more modules whenever you’re ready.',
  },
];

export const campusImpactMetrics = [
  { value: '500K+', label: 'Messages delivered to parents & students' },
  { value: '15K+', label: 'Students & parents actively using it' },
  { value: '12%', label: 'Mileage saving on campus transport' },
  { value: '15%', label: 'Food saving in campus hostels' },
  { value: '50%', label: 'Lower processing fee than others' },
  { value: '8%', label: 'Increase in admission enrolment' },
];


