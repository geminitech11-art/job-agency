import { useTranslations } from 'next-intl';
import { GetStaticPropsContext } from 'next';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            {t('description')}
          </p>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">
              {t('mission')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('missionText')}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">
              {t('values')}
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">{t('value1')}</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">{t('value2')}</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">{t('value3')}</span>
              </li>
            </ul>
          </div>
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
