import { GetStaticPropsContext, GetServerSidePropsContext } from 'next';
import { defaultLocale } from '../i18n';

/**
 * Helper function to extract locale from Next.js context
 * Works with both getStaticProps and getServerSideProps
 */
export function getLocaleFromContext(
  context: GetStaticPropsContext | GetServerSidePropsContext
): string {
  // Try to get locale from context (set by next-intl middleware or Next.js i18n)
  if (context.locale) {
    return context.locale;
  }
  
  // Fallback to defaultLocale
  return defaultLocale;
}

