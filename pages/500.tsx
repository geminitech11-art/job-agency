import Link from 'next/link';
import { defaultLocale } from '../i18n';
import { GetStaticPropsContext } from 'next';

export default function Custom500({ locale }: { locale: string }) {
  const currentLocale = locale || defaultLocale;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">500</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {currentLocale === 'sk'
            ? 'Chyba servera'
            : currentLocale === 'de'
            ? 'Serverfehler'
            : 'Server Error'}
        </h2>
        <p className="text-gray-600 mb-8">
          {currentLocale === 'sk'
            ? 'Ospravedlňujeme sa za nepríjemnosti. Skúste to znova neskôr.'
            : currentLocale === 'de'
            ? 'Entschuldigung für die Unannehmlichkeiten. Bitte versuchen Sie es später erneut.'
            : 'Sorry for the inconvenience. Please try again later.'}
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          {currentLocale === 'sk' ? 'Späť na domov' : currentLocale === 'de' ? 'Zurück zur Startseite' : 'Back to Home'}
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

