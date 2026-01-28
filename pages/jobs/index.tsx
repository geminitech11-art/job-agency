import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import Link from 'next/link';
import { jobs, getJobTitle, getJobLocation, getJobStartDate, type Locale } from '../../lib/jobs';
import { GetStaticPropsContext } from 'next';

export default function JobsPage() {
  const t = useTranslations('jobs');
  const locale = (useLocale() || 'en') as Locale;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedProfession, setSelectedProfession] = useState<string>('all');

  const openJobsCount = jobs.filter(job => job.isOpen).length;
  const countries = Array.from(new Set(jobs.map(job => job.country)));
  const professionKeys = Array.from(new Set(jobs.map(job => (job as { professionKey?: string }).professionKey).filter(Boolean))) as string[];

  const filteredJobs = jobs.filter(job => {
    const matchesCountry = selectedCountry === 'all' || job.country === selectedCountry;
    const matchesStatus = selectedStatus === 'all' ||
      (selectedStatus === 'open' && job.isOpen) ||
      (selectedStatus === 'closed' && !job.isOpen);
    const pk = (job as { professionKey?: string }).professionKey;
    const matchesProfession = selectedProfession === 'all' || pk === selectedProfession;
    return matchesCountry && matchesStatus && matchesProfession;
  });

  const getCountryFlag = (country: string) => {
    return country === 'Germany' ? '🇩🇪' : '🇦🇹';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-blue-600">
              {t('breadcrumb.home')}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{t('breadcrumb.jobs')}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('hero.title')}
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              {t('hero.description')}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
            >
              {t('hero.cta')}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="appearance-none pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer text-gray-700 min-w-[180px]"
              >
                <option value="all">{t('filter.allCountries')}</option>
                {countries.map(country => (
                  <option key={country} value={country}>
                    {country === 'Germany' ? t('countries.germany') : t('countries.austria')}
                  </option>
                ))}
              </select>
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer text-gray-700"
              >
                <option value="all">{t('filter.allPositions')}</option>
                <option value="open">{t('open')}</option>
                <option value="closed">{t('closed')}</option>
              </select>
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="relative">
              <select
                value={selectedProfession}
                onChange={(e) => setSelectedProfession(e.target.value)}
                className="appearance-none pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer text-gray-700"
              >
                <option value="all">{t('filter.allProfessions')}</option>
                {professionKeys.map(key => (
                  <option key={key} value={key}>{t(`professions.${key}`)}</option>
                ))}
              </select>
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">{t('noJobs')}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <Link 
                key={job.id}
                href={`/jobs/${job.slug}`}
                className={`block bg-white rounded-t-xl shadow-md transition-shadow border-2 ${
                  job.isOpen
                    ? 'border-blue-600 hover:shadow-xl'
                    : 'border-gray-300 hover:shadow-xl'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="text-3xl flex-shrink-0"
                        role="img"
                        aria-label={job.country}
                        style={{ display: 'inline-block', lineHeight: '1' }}
                      >
                        {getCountryFlag(job.country)}
                      </span>
                      <span className="font-semibold text-gray-700">
                        {getJobLocation(job, locale)}
                      </span>
                    </div>
                    {!job.isOpen && (
                      <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {t('closed')}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-2">
                    {getJobTitle(job, locale)}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div>
                      <span className="font-semibold">{t('salary')}: </span>
                      <span className="text-blue-600 font-bold">{job.salary}</span>
                    </div>
                    <div>
                      <span className="font-semibold">{t('startDate')}: </span>
                      <span>{getJobStartDate(job, locale)}</span>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-lg font-semibold text-center transition-colors ${
                    job.isOpen
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}>
                    {job.isOpen ? t('moreInfo') : t('details')}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    const currentLocale = locale || 'en';
    const messages = (await import(`../../messages/${currentLocale}.json`)).default;
    return {
        props: {
            messages,
            locale: currentLocale
        }
    };
}
