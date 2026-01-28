// Pages Router configuration for next-intl
// Messages are loaded via getStaticProps in each page
export const locales = ['en', 'sk', 'de'] as const;
export const defaultLocale = 'en' as const;
export type Locale = (typeof locales)[number];

