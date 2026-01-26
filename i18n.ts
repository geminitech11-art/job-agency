import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'sk', 'de'] as const;
export const defaultLocale = 'en' as const;
export type Locale = (typeof locales)[number];

// For static generation, we need to avoid accessing headers()
// setRequestLocale() in pages/layouts will set the locale context
export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  
  // During static generation with setRequestLocale, locale should be available
  // If not, fallback to default (shouldn't happen if setRequestLocale is called)
  const finalLocale = locale || defaultLocale;
  
  if (!locales.includes(finalLocale as Locale)) notFound();

  return {
    locale: finalLocale,
    messages: (await import(`./messages/${finalLocale}.json`)).default
  };
});

