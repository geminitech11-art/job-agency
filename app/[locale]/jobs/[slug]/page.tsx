'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState, useMemo } from 'react';

// This would come from a database in a real app
const jobs: Record<string, any> = {
  'elektrikari-nemecko': {
    id: 'DE2025043',
    title: 'Elektrikári Nemecko',
    location: 'Nemecko, Braunschweig',
    country: 'Germany',
    salary: '23-24€/hod',
    startDate: '1.2.2026',
    contractType: 'Živnosť',
    description: [
      'Komplet výmena osvetlenia v priemyselných halách.',
      'Mení sa staré osvetlenie za LED',
      'Demontáž a montáž',
      'Práca aj na plošine'
    ],
    requirements: [
      'Potrebné vyučenie a prax v obore',
      'Vlastné auto',
      'Pracovné oblečenie a pracovne topánky',
      'Jeden nemecky hovoriaci',
      'Náradie',
      'Preukazy na plošiny'
    ],
    benefits: [
      {
        icon: 'car',
        title: 'Nástup už do 5 dní',
        description: 'Naša spoločnosť ponúka komplexnú podporu a poradenstvo pred nástupom, aj počas trvania celej spolupráce.'
      },
      {
        icon: 'arrows',
        title: 'Dlhodobá spolupráca',
        description: 'Pri obojstrannej spokojnosti pokračujete v nadväzujúcich projektoch, čo vám zaručuje nepretržitý príjem.'
      },
      {
        icon: 'coins',
        title: 'Férové ohodnotenie',
        description: 'Vaša odmena je pravidelne vyplácaná podľa dohody a vieme poskytnúť možnosť zálohovej platby.'
      },
      {
        icon: 'percent',
        title: 'Hradené ubytovanie',
        description: 'Ubytovanie je starostlivo vyberané tak, aby vyhovovalo vašim potrebám a umožnilo dlhodobý pobyt.'
      }
    ],
    benefitsDetails: [
      {
        title: 'Plne hradené ubytovanie',
        description: 'Ako jeden z mála sprostredkovateľov vám zabezpečíme plne hradené ubytovanie v súkromí, ktoré sa vždy snažíme zabezpečiť vo vzdialenosti do 30 km od miesta výkonu práce.'
      },
      {
        title: 'Dobré platové podmienky',
        description: 'Ponúkame adekvátne platové podmienky odrážajúce skúsenosti a odborné schopnosti našich spolupracovníkov. Našim cieľom je odmeňovať našich spolupracovníkov primerane a férovo.'
      },
      {
        title: 'Možnosť zálohy',
        description: 'V prípade naliehavej finančnej potreby ponúkame možnosť vyplatenia zálohy už po prvom odpracovanom týždni.'
      },
      {
        title: 'Pomoc pri vybavovaní formulára PDA1',
        description: 'Našim spolupracovníkom poskytujeme podporu pri vybavovaní formulára PDA1, ktorý je potrebný na preukázanie zabezpečenia sociálnych a zdravotných odvodov.'
      },
      {
        title: 'Podpora počas celého projektu',
        description: 'Naša podpora nekončí pri nástupe do práce. Počas celého projektu vám radi pomôžeme vyriešiť akékoľvek otázky či problémy, ktoré môžu nastať.'
      },
      {
        title: 'Stabilná a dlhodobá spolupráca',
        description: 'Dlhodobú spoluprácu sa snažíme zabezpečiť na seba nadväzujúcimi zákazkami. Predpokladom úspešnej spolupráce je spokojnosť zahraničného partnera, spoľahlivosť počas celého priebehu zákazky a samozrejme aj vaša spokojnosť.'
      }
    ],
    advantages: [
      'Splatnosť faktúry 14 pracovných dní',
      'Výborné platové podmienky',
      'Možnosť spolupráce na ďalších projektoch',
      'Plne hradené ubytovanie',
      'Možnosť zálohy po prvom týždni'
    ]
  }
};

export default function JobDetailPage({
  params: { slug, locale }
}: {
  params: { slug: string; locale: string };
}) {
  const t = useTranslations('jobDetail');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const job = jobs[slug];

  if (!job) {
    notFound();
  }

  const getLocalizedPath = useMemo(() => {
    return (path: string) => {
      return `/${locale}${path}`;
    };
  }, [locale]);

  const getCountryFlag = (country: string) => {
    return country === 'Germany' ? '🇩🇪' : '🇦🇹';
  };

  const getIcon = (iconName: string) => {
    const icons: Record<string, JSX.Element> = {
      car: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      arrows: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      coins: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      percent: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    };
    return icons[iconName] || icons.car;
  };

  const faqItems = [
    { question: t('faq.q1.question'), answer: t('faq.q1.answer') },
    { question: t('faq.q2.question'), answer: t('faq.q2.answer') },
    { question: t('faq.q3.question'), answer: t('faq.q3.answer') },
    { question: t('faq.q4.question'), answer: t('faq.q4.answer') }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href={getLocalizedPath('/')} className="text-gray-500 hover:text-blue-600">
              {t('breadcrumb.home')}
            </Link>
            <span className="text-gray-400">/</span>
            <Link href={getLocalizedPath('/jobs')} className="text-gray-500 hover:text-blue-600">
              {t('breadcrumb.jobs')}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{job.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Job Header */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {job.title}
              </h1>

              {/* Description List */}
              <ul className="space-y-2 mb-8">
                {job.description.map((item: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Location and Details */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{getCountryFlag(job.country)}</span>
                  <span className="text-xl font-semibold text-gray-700">{job.location}</span>
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-6">
                  {t('team')}
                </div>
                <hr className="mb-6 border-gray-200" />
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-gray-500 mb-2">{t('salary')}</div>
                    <div className="text-2xl font-bold text-gray-900">{job.salary}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-2">{t('startDate')}</div>
                    <div className="text-2xl font-bold text-gray-900">{job.startDate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-2">{t('contractType')}</div>
                    <div className="text-xl font-semibold text-gray-900">{job.contractType}</div>
                  </div>
                </div>

                <Link
                  href={getLocalizedPath('/contact')}
                  className="mt-6 inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
                >
                  {t('apply')}
                </Link>
              </div>
            </div>

            {/* Benefits Section */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                {t('benefits.title')}
              </h2>
              <hr className="mb-8 border-gray-200" />
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {job.benefits.map((benefit: any, index: number) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                      {getIcon(benefit.icon)}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Advantages List */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('benefits.advantages')}</h3>
                <ul className="space-y-3">
                  {job.advantages.map((advantage: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{advantage}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits Details */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('benefits.details')}</h3>
                {job.benefitsDetails.map((benefit: any, index: number) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements Section */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                {t('requirements')}
              </h2>
              <hr className="mb-8 border-gray-200" />
              
              <ul className="space-y-3">
                {job.requirements.map((req: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 text-lg">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ Section - Blue Button Style */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                {t('faq.title')}
              </h2>
              <hr className="mb-8 border-gray-200" />
              
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index}>
                    <button
                      onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                      className="w-full bg-blue-600 text-white rounded-lg p-6 text-left flex items-center justify-between hover:bg-blue-700 transition-colors"
                    >
                      <span className="text-lg font-semibold pr-4">{item.question}</span>
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                          <svg
                            className={`w-5 h-5 transition-transform duration-300 ${
                              openFAQ === index ? 'transform rotate-45' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                      </div>
                    </button>
                    {openFAQ === index && (
                      <div className="bg-blue-50 border border-blue-200 rounded-b-lg p-6 mt-0">
                        <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Form Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('sidebar.contact.title')}
              </h2>
              <p className="text-gray-600 mb-6">
                {t('sidebar.contact.subtitle')}
              </p>
              <Link
                href={getLocalizedPath('/contact')}
                className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
              >
                {t('apply')}
              </Link>
            </div>

            {/* Contact Person Card */}
            <div className="bg-blue-600 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4">{t('sidebar.person.title')}</h3>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-lg mb-1">Ing. Marco Sluka</p>
                  <p className="text-blue-100 text-sm">geminitech11@gmail.com</p>
                  <p className="text-blue-100 text-sm">+421 905 780 967</p>
                </div>
              </div>
              <Link
                href={getLocalizedPath('/contact')}
                className="block w-full bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center mt-4"
              >
                {t('apply')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
