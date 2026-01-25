'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { jobs } from '@/lib/jobs';

interface JobCarouselProps {
  locale: string;
}

export default function JobCarousel({ locale }: JobCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const jobsToShow = jobs.slice(0, 5); // Show first 5 jobs
  const visibleJobs = 3; // Number of jobs visible at once

  const getCountryFlag = (country: string) => {
    return country === 'Germany' ? '🇩🇪' : '🇦🇹';
  };

  const getLocalizedPath = useMemo(() => {
    const pathFn = (path: string) => {
      return `/${locale}${path}`;
    };
    return pathFn;
  }, [locale]);

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
            const locationParts = job.location.split(',');
            const countryName = locale === 'sk' 
              ? (job.country === 'Germany' ? 'Nemecko' : 'Rakúsko')
              : locale === 'de'
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
                    {job.title}
                  </h3>
                  <div className="border-t border-gray-200 pt-4 mb-4">
                    <div className="text-base text-gray-900 mb-2">
                      <span className="font-semibold">
                        {locale === 'sk' ? 'Odmena' : locale === 'de' ? 'Vergütung' : 'Salary'}: 
                      </span>
                      <span className="font-bold ml-2">{job.salary}</span>
                    </div>
                    <div className="text-base text-gray-900">
                      <span className="font-semibold">
                        {locale === 'sk' ? 'Začiatok' : locale === 'de' ? 'Start' : 'Start Date'}: 
                      </span>
                      <span className="font-bold ml-2">{job.startDate}</span>
                    </div>
                  </div>
                  <div className="text-blue-600 font-semibold flex items-center gap-1 hover:text-blue-700">
                    {locale === 'sk' ? 'Viac informácií' : locale === 'de' ? 'Mehr Informationen' : 'More Information'}
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

