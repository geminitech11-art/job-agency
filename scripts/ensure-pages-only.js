/**
 * Remove app/ before build so Next.js only builds Pages Router.
 * Prevents Vercel prerender errors from next-intl App Router usage (headers).
 * Run as "prebuild" before "next build".
 */
const fs = require('fs');
const path = require('path');

const appDir = path.join(process.cwd(), 'app');

if (fs.existsSync(appDir)) {
  try {
    fs.rmSync(appDir, { recursive: true });
    console.log('[ensure-pages-only] Removed app/ to avoid App Router build.');
  } catch (err) {
    console.error('[ensure-pages-only] Failed to remove app/:', err.message);
    process.exit(1);
  }
}

if (fs.existsSync(appDir)) {
  console.error('[ensure-pages-only] app/ still exists after cleanup. Aborting build.');
  process.exit(1);
}

console.log('[ensure-pages-only] Pages-only build OK (no app/).');
