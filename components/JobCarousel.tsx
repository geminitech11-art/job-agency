'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { jobs, getJobTitle, getJobLocation, getJobStartDate, type Locale } from '@/lib/jobs';

interface JobCarouselProps {
  locale: string;
}

export default function JobCarousel({ locale }: JobCarouselProps) {
  const t = useTranslations('jobs');
  const [currentIndex, setCurrentIndex] = useState(0);
  const jobsToShow = jobs.slice(0, 5);
  const visibleJobs = 3;
  const loc = (locale || 'en') as Locale;

  const getCountryFlag = (country: string) => {
    return country === 'Germany' ? '🇩🇪' : '🇦🇹';
  };

  const getLocalizedPath = useMemo(() => (path: string) => path, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + visibleJobs >= jobsToShow.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev - 1 < 0 ? Math.max(0, jobsToShow.length - visibleJobs) : prev - 1
    );
  };

  return (
    <div className="relative">
      {/* Navigation Arrows */}
      <div className="flex items-center justify-end gap-2 mb-4">
        <button
          onClick={prevSlide}
          className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
          aria-label="Previous"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
          aria-label="Next"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Job Cards Container */}
      <div className="overflow-hidden">
        <div className="flex gap-6">
          {jobsToShow.map((job) => {
            const locationStr = getJobLocation(job, loc);
            const locationParts = locationStr.split(',');
            const countryName = loc === 'sk'
              ? (job.country === 'Germany' ? 'Nemecko' : 'Rakúsko')
              : loc === 'de'
              ? (job.country === 'Germany' ? 'Deutschland' : 'Österreich')
              : job.country;
            const city = locationParts.length > 1 ? locationParts[1].trim() : locationParts[0].trim();

            return (
              <div
                key={job.id}
                className="flex-shrink-0 bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition-shadow p-6"
                style={{ minWidth: '300px', width: '300px' }}
              >
                <Link href={getLocalizedPath(`/jobs/${job.slug}`)} className="block">
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="text-2xl flex-shrink-0"
                      role="img"
                      aria-label={job.country}
                      style={{ fontSize: '1.5rem', lineHeight: '1', display: 'inline-block' }}
                    >
                      {getCountryFlag(job.country)}
                    </span>
                    <span className="font-semibold text-gray-700">
                      {countryName}{city && city !== countryName ? `, ${city}` : ''}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-2">
                    {getJobTitle(job, loc)}
                  </h3>
                  <div className="border-t border-gray-200 pt-4 mb-4">
                    <div className="text-base text-gray-900 mb-2">
                      <span className="font-semibold">{t('salary')}: </span>
                      <span className="font-bold ml-2">{job.salary}</span>
                    </div>
                    <div className="text-base text-gray-900">
                      <span className="font-semibold">{t('startDate')}: </span>
                      <span className="font-bold ml-2">{getJobStartDate(job, loc)}</span>
                    </div>
                  </div>
                  <div className="text-blue-600 font-semibold flex items-center gap-1 hover:text-blue-700">
                    {t('moreInfo')}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

