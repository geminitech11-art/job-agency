/** @type {import('next').NextConfig} */
const nextConfig = {
  // For Pages Router, use Next.js built-in i18n
  // This provides locale to getStaticProps and handles routing
  i18n: {
    locales: ['en', 'sk', 'de'],
    defaultLocale: 'en',
    localeDetection: true, // Enable browser locale detection
  },
};
  
module.exports = nextConfig;

