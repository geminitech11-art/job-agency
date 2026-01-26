import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'sk', 'de'] as const;
export const defaultLocale = 'en' as const;
export type Locale = (typeof locales)[number];

// For Next.js 14.2.35 + next-intl 3.5.0 static generation
// We use requestLocale but handle the case where it might access headers()
export default getRequestConfig(async ({ requestLocale }) => {
  let locale: string | undefined;
  
  // Try to get locale from requestLocale (set by setRequestLocale)
  // If it fails during static generation, it will fallback gracefully
  try {
    locale = await requestLocale;
  } catch {
    // During static generation, if requestLocale isn't set yet,
    // we'll use default. setRequestLocale in layout will override this.
    locale = defaultLocale;
  }
  
  // Ensure we have a valid locale
  const finalLocale = locale || defaultLocale;
  
  if (!locales.includes(finalLocale as Locale)) notFound();

  return {
    locale: finalLocale,
    messages: (await import(`./messages/${finalLocale}.json`)).default
  };
});

