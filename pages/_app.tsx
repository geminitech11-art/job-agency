import type { AppProps } from 'next/app';
import { NextIntlClientProvider } from 'next-intl';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { defaultLocale } from '../i18n';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  // Ensure locale and messages are always defined
  // For Pages Router, pageProps.locale should be provided by getServerSideProps/getStaticProps
  // If not (e.g., error pages), use defaultLocale and empty messages
  const locale = (pageProps.locale as string | undefined) || defaultLocale;
  
  // Ensure messages is always an object (never undefined or null)
  // NextIntlClientProvider requires a valid object
  const messages = pageProps.messages && typeof pageProps.messages === 'object' 
    ? pageProps.messages 
    : {};

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone="Europe/Bratislava"
    >
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navigation />
        <main className="flex-1">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}

export default MyApp;
