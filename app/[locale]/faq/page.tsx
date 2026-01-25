'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQPage() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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
    },
    {
      category: 'before',
      question: t('items.before.q1.question'),
      answer: t('items.before.q1.answer')
    },
    {
      category: 'before',
      question: t('items.before.q2.question'),
      answer: t('items.before.q2.answer')
    },
    {
      category: 'before',
      question: t('items.before.q3.question'),
      answer: t('items.before.q3.answer')
    },
    {
      category: 'before',
      question: t('items.before.q4.question'),
      answer: t('items.before.q4.answer')
    },
    {
      category: 'before',
      question: t('items.before.q5.question'),
      answer: t('items.before.q5.answer')
    },
    {
      category: 'payment',
      question: t('items.payment.q1.question'),
      answer: t('items.payment.q1.answer')
    },
    {
      category: 'payment',
      question: t('items.payment.q2.question'),
      answer: t('items.payment.q2.answer')
    },
    {
      category: 'work',
      question: t('items.work.q1.question'),
      answer: t('items.work.q1.answer')
    },
    {
      category: 'work',
      question: t('items.work.q2.question'),
      answer: t('items.work.q2.answer')
    },
    {
      category: 'work',
      question: t('items.work.q3.question'),
      answer: t('items.work.q3.answer')
    },
    {
      category: 'work',
      question: t('items.work.q4.question'),
      answer: t('items.work.q4.answer')
    }
  ];

  const categories = [
    { id: 'all', label: t('categories.all') },
    { id: 'general', label: t('categories.general') },
    { id: 'before', label: t('categories.before') },
    { id: 'payment', label: t('categories.payment') },
    { id: 'work', label: t('categories.work') }
  ];

  const filteredFAQs = selectedCategory === 'all' 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            {t('subtitle')}
          </p>
          <p className="text-lg text-blue-600 font-semibold italic">
            {t('tagline')}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setOpenIndex(null);
              }}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((item, index) => {
            const globalIndex = faqData.findIndex(faq => faq === item);
            const isOpen = openIndex === globalIndex;
            
            return (
              <div
                key={globalIndex}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <button
                  onClick={() => toggleFAQ(globalIndex)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-blue-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4 flex-1">
                    {item.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <svg
                      className={`w-6 h-6 text-blue-600 transition-transform duration-300 ${
                        isOpen ? 'transform rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-5 pt-2 border-t border-gray-100">
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white shadow-xl">
          <h2 className="text-2xl font-bold mb-3">
            {t('cta.title')}
          </h2>
          <p className="text-blue-100 mb-6">
            {t('cta.description')}
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
          >
            {t('cta.button')}
          </a>
        </div>
      </div>
    </div>
  );
}
