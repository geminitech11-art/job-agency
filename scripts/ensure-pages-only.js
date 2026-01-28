/**
 * Remove app/ before build so Next.js only builds Pages Router.
 * Prevents Vercel prerender errors from next-intl App Router usage (headers).
 * Run as "prebuild" before "next build".
 */
const fs = require('fs');
const path = require('path');

const appDir = path.join(process.cwd(), 'app');
if (fs.existsSync(appDir)) {
  fs.rmSync(appDir, { recursive: true });
  console.log('[ensure-pages-only] Removed app/ to avoid App Router build.');
}
