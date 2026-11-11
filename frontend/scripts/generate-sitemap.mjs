/**
 * Dynamic XML Sitemap Generator for Campo
 *
 * Conforms to the sitemaps.org protocol (0.9 schema):
 * https://www.sitemaps.org/protocol.html
 *
 * Generates frontend/public/sitemap.xml dynamically from active application routes.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { routes as defaultRoutes } from '../src/config/routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.resolve(PROJECT_ROOT, 'public');
const DIST_DIR = path.resolve(PROJECT_ROOT, 'dist');

const DEFAULT_BASE_URL = 'https://www.campo.co.in';

const VALID_CHANGEFREQS = new Set([
  'always',
  'hourly',
  'daily',
  'weekly',
  'monthly',
  'yearly',
  'never',
]);

/**
 * Escapes characters for XML compliance.
 */
function escapeXml(unsafeStr) {
  return String(unsafeStr).replace(/[<>&'"]/g, (char) => {
    switch (char) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case '\'':
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return char;
    }
  });
}

/**
 * Retrieves the last modified date for a route in YYYY-MM-DD format.
 * Checks git commit history first, then filesystem mtime, then falls back to current date.
 */
function getRouteLastMod(sourceFile) {
  const today = new Date().toISOString().split('T')[0];

  if (!sourceFile) {
    return today;
  }

  const absoluteSourcePath = path.resolve(PROJECT_ROOT, sourceFile);

  // 1. Try git commit date
  try {
    const gitDate = execSync(`git log -1 --format=%cs -- "${absoluteSourcePath}"`, {
      cwd: PROJECT_ROOT,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'ignore'],
    }).trim();

    if (gitDate && /^\d{4}-\d{2}-\d{2}$/.test(gitDate)) {
      return gitDate;
    }
  } catch {
    // Git unavailable or file untracked, fall through
  }

  // 2. Try file stat modification time
  try {
    if (fs.existsSync(absoluteSourcePath)) {
      const stats = fs.statSync(absoluteSourcePath);
      return stats.mtime.toISOString().split('T')[0];
    }
  } catch {
    // Stat failed, fall through
  }

  // 3. Fallback to current build date
  return today;
}

/**
 * Generates standard sitemaps.org compliant XML string.
 */
export function buildSitemapXml({ baseUrl = DEFAULT_BASE_URL, routes = defaultRoutes } = {}) {
  const normalizedBaseUrl = baseUrl.replace(/\/+$/, '');
  const today = new Date().toISOString().split('T')[0];

  const urlEntries = routes.map((route) => {
    const routePath = route.path.startsWith('/') ? route.path : `/${route.path}`;
    const fullUrl = `${normalizedBaseUrl}${routePath === '/' ? '/' : routePath}`;
    const lastmod = getRouteLastMod(route.sourceFile) || today;

    const changefreq =
      route.changefreq && VALID_CHANGEFREQS.has(route.changefreq)
        ? route.changefreq
        : 'weekly';

    const rawPriority = typeof route.priority === 'number' ? route.priority : 0.5;
    const priority = Math.min(Math.max(rawPriority, 0.0), 1.0).toFixed(1);

    return `  <url>
    <loc>${escapeXml(fullUrl)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join('\n')}
</urlset>
`;
}

/**
 * Main routine: generates sitemap.xml and saves to public/ (and dist/ if present).
 */
export function generateSitemap(options = {}) {
  const baseUrl = options.baseUrl || process.env.SITE_URL || DEFAULT_BASE_URL;
  const routes = options.routes || defaultRoutes;

  const xmlContent = buildSitemapXml({ baseUrl, routes });

  // Ensure public directory exists
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  const publicSitemapPath = path.resolve(PUBLIC_DIR, 'sitemap.xml');
  fs.writeFileSync(publicSitemapPath, xmlContent, 'utf-8');
  console.log(`[sitemap] Successfully generated sitemap at: ${publicSitemapPath}`);
  console.log(`[sitemap] Base URL: ${baseUrl} (${routes.length} active route${routes.length === 1 ? '' : 's'})`);

  // If dist directory exists (e.g. during or after build), also keep it synced
  if (fs.existsSync(DIST_DIR)) {
    const distSitemapPath = path.resolve(DIST_DIR, 'sitemap.xml');
    fs.writeFileSync(distSitemapPath, xmlContent, 'utf-8');
    console.log(`[sitemap] Synced sitemap copy to: ${distSitemapPath}`);
  }

  return { publicSitemapPath, xmlContent };
}

// Allow direct execution via CLI
const isDirectExecution =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(__filename);

if (isDirectExecution) {
  try {
    generateSitemap();
  } catch (err) {
    console.error('[sitemap] Failed to generate sitemap:', err);
    process.exit(1);
  }
}
