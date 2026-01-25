'use client';

import { NextIntlClientProvider } from 'next-intl';
import Navigation from './Navigation';
import Footer from './Footer';

interface ClientProvidersProps {
  messages: any;
  locale: string;
  children: React.ReactNode;
}

export default function ClientProviders({ messages, locale, children }: ClientProvidersProps) {
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}

