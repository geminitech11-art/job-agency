import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { getOpenJobsCount } from '../lib/jobs';
import FAQSection from '../components/FAQSection';
import JobCarousel from '../components/JobCarousel';
import ContactFormSection from '../components/ContactFormSection';
import { GetStaticPropsContext } from 'next';

export default function HomePage({ locale }: { locale: string }) {
  const t = useTranslations('home');
  const tJobs = useTranslations('jobs');
  const tJobDetail = useTranslations('jobDetail');
  const openJobsCount = getOpenJobsCount();

  return (
    <div>
      {/* Hero Section - Split Layout */}
      <section className="flex flex-col lg:flex-row bg-gray-100 py-12 lg:py-0 lg:min-h-screen">
        {/* Left Section - Text Content */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-8 lg:px-12 xl:px-16 py-12 lg:py-20 bg-gray-100">
          <div className="max-w-2xl">
            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              {t('hero.title.line1')}
              <br />
              {t('hero.title.line2')}
              <br />
              {t('hero.title.line3')}
            </h1>
            
            {/* Tagline */}
            <p className="text-xl md:text-2xl text-gray-700 mb-8 font-medium">
              {t('hero.tagline')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link 
                href="/jobs" 
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors text-center shadow-lg"
              >
                {t('hero.cta.primary')}
              </Link>
              <Link 
                href="/about" 
                className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-900 hover:bg-gray-50 transition-colors text-center flex items-center justify-center gap-2"
              >
                {t('hero.cta.secondary')}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Section - Image with Overlay */}
        <div className="flex-1 relative min-h-[500px] lg:min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-gray-700">
          {/* Electrician Image */}
          <div className="absolute inset-0">
            <Image
              src="/electrician-working.jpg"
              alt="Electrician working on electrical panel"
              fill
              className="object-cover object-left"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Subtle overlay gradient for better text readability if needed */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10"></div>
          </div>

          {/* Dark Overlay Box */}
          <div className="absolute bottom-8 right-8 bg-gray-900 rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition-transform">
            <Link href="/jobs" className="flex items-center gap-4 text-white">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-gray-400 uppercase">{t('hero.current.title')}</span>
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-1">
                  {openJobsCount}
                </div>
                <div className="text-sm font-medium text-gray-400">
                  {t('hero.current.label')}
                </div>
              </div>
              <svg className="w-8 h-8 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Job Offers Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              {tJobs('title')}
            </h2>
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors"
            >
              {tJobs('subtitle')}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
          <JobCarousel locale={locale} />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              {tJobDetail('benefits.title')}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="w-20 h-20 mb-4 flex items-center justify-center">
                <svg className="w-20 h-20 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15.75h-1.5a.75.75 0 01-.75-.75v-4.5A.75.75 0 0115 13.5h3a.75.75 0 01.75.75v1.5c0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15V6.75z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {t('benefits.benefit1.title')}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t('benefits.benefit1.description')}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="w-20 h-20 mb-4 flex items-center justify-center">
                <svg className="w-20 h-20 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {t('benefits.benefit2.title')}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t('benefits.benefit2.description')}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="w-20 h-20 mb-4 flex items-center justify-center">
                <svg className="w-20 h-20 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {t('benefits.benefit3.title')}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t('benefits.benefit3.description')}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="w-20 h-20 mb-4 flex items-center justify-center">
                <svg className="w-20 h-20 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {t('benefits.benefit4.title')}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t('benefits.benefit4.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactFormSection locale={locale} />

      {/* FAQ Section */}
      <FAQSection locale={locale} />
    </div>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    const messages = (await import(`../messages/${locale}.json`)).default;
    return {
      props: {
        messages,
        locale
      }
    };
  }
