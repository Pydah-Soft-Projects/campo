/**
 * Application Route Registry
 *
 * Central registry of all indexable routes for SEO, sitemap generation, and routing.
 * When new pages or routes are added to the application, add their configuration here.
 *
 * Fields:
 * - path: URL path relative to domain root (e.g. '/', '/about', '/admissions')
 * - name: Human-readable name for logging / navigation
 * - priority: Priority from 0.0 to 1.0 (sitemaps.org standard)
 * - changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
 * - sourceFile: Path relative to frontend/ root used to dynamically detect last modified date
 */
export const routes = [
  {
    path: '/',
    name: 'Home',
    priority: 1.0,
    changefreq: 'weekly',
    sourceFile: 'src/App.jsx',
  },
  {
    path: '/download',
    name: 'Download App',
    priority: 0.9,
    changefreq: 'monthly',
    sourceFile: 'src/pages/DownloadAppPage.jsx',
  },
  {
    path: '/admin/login',
    name: 'Admin Portal Login',
    priority: 0.3,
    changefreq: 'yearly',
    sourceFile: 'src/pages/AdminLoginPage.jsx',
  },
  {
    path: '/applications/admissions-crm',
    name: 'Admissions CRM',
    priority: 0.8,
    changefreq: 'monthly',
    sourceFile: 'src/pages/ApplicationDetailPage.jsx',
  },
  {
    path: '/applications/student-data',
    name: 'Student Data Management & Engagement',
    priority: 0.8,
    changefreq: 'monthly',
    sourceFile: 'src/pages/ApplicationDetailPage.jsx',
  },
  {
    path: '/applications/fee-management',
    name: 'Fee Management System',
    priority: 0.8,
    changefreq: 'monthly',
    sourceFile: 'src/pages/ApplicationDetailPage.jsx',
  },
  {
    path: '/applications/transport-management',
    name: 'Transport Management System',
    priority: 0.8,
    changefreq: 'monthly',
    sourceFile: 'src/pages/ApplicationDetailPage.jsx',
  },
  {
    path: '/applications/academic-management',
    name: 'Academic Management System',
    priority: 0.8,
    changefreq: 'monthly',
    sourceFile: 'src/pages/ApplicationDetailPage.jsx',
  },
  {
    path: '/applications/examination-management',
    name: 'Examination Management System',
    priority: 0.8,
    changefreq: 'monthly',
    sourceFile: 'src/pages/ApplicationDetailPage.jsx',
  },
  {
    path: '/applications/hrms',
    name: 'HRMS & Payroll System',
    priority: 0.8,
    changefreq: 'monthly',
    sourceFile: 'src/pages/ApplicationDetailPage.jsx',
  },
  {
    path: '/applications/staff-recruitment',
    name: 'Staff Recruitment System',
    priority: 0.8,
    changefreq: 'monthly',
    sourceFile: 'src/pages/ApplicationDetailPage.jsx',
  },
  {
    path: '/applications/hostel-management',
    name: 'Hostel Management System',
    priority: 0.8,
    changefreq: 'monthly',
    sourceFile: 'src/pages/ApplicationDetailPage.jsx',
  },
  {
    path: '/applications/stationery-management',
    name: 'Stationery Management System',
    priority: 0.8,
    changefreq: 'monthly',
    sourceFile: 'src/pages/ApplicationDetailPage.jsx',
  },
  {
    path: '/applications/maintenance-management',
    name: 'Maintenance Management System',
    priority: 0.8,
    changefreq: 'monthly',
    sourceFile: 'src/pages/ApplicationDetailPage.jsx',
  },
  {
    path: '/applications/library-management',
    name: 'Library Management System',
    priority: 0.8,
    changefreq: 'monthly',
    sourceFile: 'src/pages/ApplicationDetailPage.jsx',
  },
];
