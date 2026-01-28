import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Link from 'next/link';
import { getOpenJobsCount } from '../lib/jobs';
import { GetServerSidePropsContext } from 'next';

export default function ContactPage() {
  const t = useTranslations('contact');
  const openJobsCount = getOpenJobsCount();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    profession: '',
    startDate: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', phone: '', email: '', profession: '', startDate: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const professions = [
    'Construction Worker',
    'Electrician',
    'Plumber',
    'Carpenter',
    'Painter',
    'Welder',
    'Other'
  ];

  const startDates = [
    'Immediately',
    'Within 1 week',
    'Within 2 weeks',
    'Within 1 month',
    'Flexible'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Section - Contact Form */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              {t('title')}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {t('subtitle')}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('form.phone')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('form.profession')}
                </label>
                <select
                  id="profession"
                  required
                  value={formData.profession}
                  onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">{t('form.profession')}</option>
                  {professions.map((prof) => (
                    <option key={prof} value={prof}>{prof}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('form.startDate')}
                </label>
                <select
                  id="startDate"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">{t('form.startDate')}</option>
                  {startDates.map((date) => (
                    <option key={date} value={date}>{date}</option>
                  ))}
                </select>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('form.sending') : t('form.send')}
              </button>
              
              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                  {t('form.success')}
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                  {t('form.error')}
                </div>
              )}
            </form>
          </div>

          {/* Right Section - Information */}
          <div className="space-y-6">
            {/* Contact Person Card */}
            <div className="relative bg-gradient-to-br from-blue-600 to-blue-500 rounded-3xl p-8 text-white overflow-hidden shadow-2xl">
              {/* Decorative background shape */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"></div>
              
              <div className="relative z-10">
                <div className="flex items-start mb-8">
                  <div className="w-24 h-24 rounded-full bg-white overflow-hidden mr-6 flex-shrink-0 border-4 border-white/30 shadow-lg">
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <svg className="w-14 h-14 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Ing. Marco Sluka</h3>
                    <p className="text-white/90 mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      geminitech11@gmail.com
                    </p>
                    <p className="text-white/90 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      +421 905 780 967
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Projects Card */}
            <Link href="/jobs" className="block group">
              <div className="bg-gray-900 rounded-3xl p-8 text-white relative overflow-hidden transform hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl">
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-5xl font-black mb-2">{openJobsCount} <span className="text-3xl font-normal text-gray-400">{t('current.available')}</span></p>
                      <p className="text-base font-semibold text-gray-400">{t('current.projects')}</p>
                    </div>
                    <svg className="w-10 h-10 text-white flex-shrink-0 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full"></div>
              </div>
            </Link>
            </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
  const currentLocale = locale || 'en';
  const messages = (await import(`../messages/${currentLocale}.json`)).default;
  return {
    props: {
      messages,
      locale: currentLocale
    }
  };
}
