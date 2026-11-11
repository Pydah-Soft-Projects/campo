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
];

