'use client';

import { NextIntlClientProvider } from 'next-intl';
import Navigation from './Navigation';
import Footer from './Footer';

interface ClientProvidersProps {
  messages: any;
  children: React.ReactNode;
}

export default function ClientProviders({ messages, children }: ClientProvidersProps) {
  return (
    <NextIntlClientProvider messages={messages}>
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}

