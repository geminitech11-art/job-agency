'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQSection({ locale }: { locale: string }) {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      category: 'general',
      question: t('items.general.q1.question'),
      answer: t('items.general.q1.answer')
    },
    {
      category: 'general',
      question: t('items.general.q2.question'),
      answer: t('items.general.q2.answer')
    },
    {
      category: 'general',
      question: t('items.general.q3.question'),
      answer: t('items.general.q3.answer')
    },
    {
      category: 'general',
      question: t('items.general.q4.question'),
      answer: t('items.general.q4.answer')
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-purple-100/20 to-orange-100/20 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Panel - Title and Description */}
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('title')}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {t('subtitle')}
            </p>
            <Link
              href={`/${locale}/faq`}
              className="inline-flex items-center gap-2 border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors"
            >
              {locale === 'sk' ? 'Všetky otázky' : locale === 'de' ? 'Alle Fragen' : 'All Questions'}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Right Panel - FAQ Items */}
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-blue-600 rounded-xl p-6 cursor-pointer transition-all hover:bg-blue-700 shadow-lg"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold text-lg pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center">
                    <svg
                      className={`w-5 h-5 text-blue-600 transition-transform ${
                        openIndex === index ? 'rotate-45' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                </div>
                {openIndex === index && (
                  <div className="mt-4 pt-4 border-t border-blue-500">
                    <p className="text-blue-100 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

