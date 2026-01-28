import { useTranslations } from 'next-intl';
import { GetStaticPropsContext } from 'next';

export default function ReferencesPage() {
  const t = useTranslations('nav');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            {t('references')}
          </h1>
          <p>Coming soon...</p>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const currentLocale = locale || 'en';
  const messages = (await import(`../messages/${currentLocale}.json`)).default;
  return {
    props: {
      messages,
      locale: currentLocale
    }
  };
}
