import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamic = 'force-static';

export default async function ProjectsPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  // MUST be called before next-intl APIs
  setRequestLocale(locale);

  const t = await getTranslations('nav');
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            {t('projects')}
          </h1>
          <p className="text-lg text-gray-700">
            Completed projects content coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}

