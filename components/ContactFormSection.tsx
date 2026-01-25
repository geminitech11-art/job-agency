'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Image from 'next/image';

interface ContactFormSectionProps {
  locale: string;
}

export default function ContactFormSection({ locale }: ContactFormSectionProps) {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    profession: '',
    startDate: '',
    groupType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [consent, setConsent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    
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
        setFormData({ name: '', phone: '', email: '', profession: '', startDate: '', groupType: '' });
        setConsent(false);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const professions = locale === 'sk' 
    ? ['Elektrikár', 'Zámočník', 'Inštalatér', 'Stavbár', 'Maliar', 'Zvárač', 'Iné']
    : locale === 'de'
    ? ['Elektriker', 'Schlosser', 'Installateur', 'Bauarbeiter', 'Maler', 'Schweißer', 'Andere']
    : ['Electrician', 'Locksmith', 'Plumber', 'Construction Worker', 'Painter', 'Welder', 'Other'];

  const startDates = locale === 'sk'
    ? ['Ihneď', 'Do týždňa', 'Do 2 týždňov', 'Do mesiaca', 'Flexibilné']
    : locale === 'de'
    ? ['Sofort', 'Innerhalb einer Woche', 'Innerhalb von 2 Wochen', 'Innerhalb eines Monats', 'Flexibel']
    : ['Immediately', 'Within 1 week', 'Within 2 weeks', 'Within 1 month', 'Flexible'];

  const groupTypes = locale === 'sk'
    ? ['Sám', 'Partia']
    : locale === 'de'
    ? ['Allein', 'Gruppe']
    : ['Alone', 'Group'];

  return (
    <section className="relative py-20 min-h-[600px] lg:min-h-[700px] overflow-hidden">
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/worker.jpg"
          alt="Worker"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {/* Dark overlay for better form readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-center lg:justify-start lg:pl-8 xl:pl-16 items-center min-h-[600px] lg:min-h-[700px]">
          {/* Form Overlay - Positioned on the left */}
          <div className="w-full lg:w-[500px] xl:w-[550px] bg-blue-600 rounded-2xl p-8 lg:p-12 text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              {locale === 'sk' ? 'Mám záujem o prácu v zahraničí' : locale === 'de' ? 'Ich interessiere mich für Arbeit im Ausland' : 'I am interested in working abroad'}
            </h2>
            <p className="text-blue-100 mb-8">
              {locale === 'sk' ? 'Vyplňte a odošlite formulár a my sa vám ozveme.' : locale === 'de' ? 'Füllen Sie das Formular aus und senden Sie es ab, wir melden uns bei Ihnen.' : 'Fill out and submit the form and we will get back to you.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  {t('form.name')}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-blue-500 bg-white text-gray-900 focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  {t('form.phone')}
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-blue-500 bg-white text-gray-900 focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  {t('form.email')}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-blue-500 bg-white text-gray-900 focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  {t('form.profession')}
                </label>
                <div className="relative">
                  <select
                    required
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    className="w-full px-4 py-3 pr-10 rounded-lg border border-blue-500 bg-white text-gray-900 focus:ring-2 focus:ring-blue-300 focus:border-transparent appearance-none"
                  >
                    <option value="">{locale === 'sk' ? 'Vybrať profesiu' : locale === 'de' ? 'Beruf auswählen' : 'Select profession'}</option>
                    {professions.map(profession => (
                      <option key={profession} value={profession}>{profession}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  {t('form.startDate')}
                </label>
                <div className="relative">
                  <select
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-3 pr-10 rounded-lg border border-blue-500 bg-white text-gray-900 focus:ring-2 focus:ring-blue-300 focus:border-transparent appearance-none"
                  >
                    <option value="">{locale === 'sk' ? 'Vybrať termín' : locale === 'de' ? 'Termin auswählen' : 'Select date'}</option>
                    {startDates.map(date => (
                      <option key={date} value={date}>{date}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  {locale === 'sk' ? 'Ste sám alebo partia?*' : locale === 'de' ? 'Sind Sie allein oder eine Gruppe?*' : 'Are you alone or a group?*'}
                </label>
                <div className="relative">
                  <select
                    required
                    value={formData.groupType}
                    onChange={(e) => setFormData({ ...formData, groupType: e.target.value })}
                    className="w-full px-4 py-3 pr-10 rounded-lg border border-blue-500 bg-white text-gray-900 focus:ring-2 focus:ring-blue-300 focus:border-transparent appearance-none"
                  >
                    <option value="">{locale === 'sk' ? 'Vybrať' : locale === 'de' ? 'Auswählen' : 'Select'}</option>
                    {groupTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="consent"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="consent" className="text-sm text-blue-100">
                  {locale === 'sk' 
                    ? 'Súhlasím so spracovaním osobných údajov, a vyhlasujem, že som sa oboznámil so zásadami ochrany osobných údajov'
                    : locale === 'de'
                    ? 'Ich stimme der Verarbeitung personenbezogener Daten zu und erkläre, dass ich die Datenschutzrichtlinien gelesen habe'
                    : 'I agree to the processing of personal data, and I declare that I have read the principles of personal data protection'}
                </label>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-500 text-white p-3 rounded-lg text-sm">
                  {t('form.success')}
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-500 text-white p-3 rounded-lg text-sm">
                  {t('form.error')}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !consent}
                className="w-full bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('form.sending') : (locale === 'sk' ? 'Odoslať' : locale === 'de' ? 'Senden' : 'Submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

