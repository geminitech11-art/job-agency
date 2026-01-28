'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useMemo } from 'react';
import TopBar from './TopBar';

export default function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // For Pages Router with Next.js i18n, router.locale is automatically handled
  // Links should be relative - Next.js will add locale prefix automatically
  const getLocalizedPath = useMemo(() => {
    return (path: string) => {
      // Next.js i18n automatically adds locale prefix, so just return the path
      return path;
    };
  }, []);

  const switchLocale = (newLocale: string) => {
    // Get current path and switch locale
    const path = router.asPath || '/';
    // Remove current locale prefix if present
    const pathWithoutLocale = path.replace(/^\/(en|sk|de)/, '') || '/';
    // Use router.push with locale option
    router.push(pathWithoutLocale, pathWithoutLocale, { locale: newLocale });
  };

  const navItems = [
    { href: '/jobs', label: t('jobs') },
    { href: '/faq', label: t('faq') },
    { href: '/contact', label: t('contact') },
    { href: '/about', label: t('about') },
  ];

  const isActive = (href: string) => {
    return router.asPath?.includes(href) || false;
  };

  return (
    <>
      <TopBar />
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link href={getLocalizedPath('/')} className="text-3xl font-bold">
                <span className="text-blue-600">Gemini</span>
                <span className="text-gray-900"> Bau</span>
              </Link>
            </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={getLocalizedPath(item.href)}
                className={`transition-colors font-medium ${
                  isActive(item.href)
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Language Switcher */}
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-300">
              <button
                onClick={() => switchLocale('en')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  locale === 'en'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => switchLocale('sk')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  locale === 'sk'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                SK
              </button>
              <button
                onClick={() => switchLocale('de')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  locale === 'de'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                DE
              </button>
            </div>
          </div>

          {/* Phone Button */}
          <div className="hidden md:flex items-center">
            <a
              href="tel:+421905780967"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +421 905 780 967
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={getLocalizedPath(item.href)}
                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-300">
              <button
                onClick={() => switchLocale('en')}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  locale === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => switchLocale('sk')}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  locale === 'sk' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                SK
              </button>
              <button
                onClick={() => switchLocale('de')}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  locale === 'de' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                DE
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
    </>
  );
}

