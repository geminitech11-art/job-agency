import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextIntlClientProvider } from 'next-intl';
import { defaultLocale } from '../i18n';
import { GetStaticPropsContext } from 'next';

export default function Custom404() {
  const router = useRouter();
  const locale = (router.locale as string) || defaultLocale;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {locale === 'sk'
            ? 'Stránka sa nenašla'
            : locale === 'de'
            ? 'Seite nicht gefunden'
            : 'Page Not Found'}
        </h2>
        <p className="text-gray-600 mb-8">
          {locale === 'sk'
            ? 'Stránka, ktorú hľadáte, neexistuje.'
            : locale === 'de'
            ? 'Die Seite, die Sie suchen, existiert nicht.'
            : 'The page you are looking for does not exist.'}
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          {locale === 'sk' ? 'Späť na domov' : locale === 'de' ? 'Zurück zur Startseite' : 'Back to Home'}
        </Link>
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const messages = (await import(`../messages/${locale || defaultLocale}.json`)).default;
  return {
    props: {
      messages,
      locale: locale || defaultLocale
    }
  };
}

