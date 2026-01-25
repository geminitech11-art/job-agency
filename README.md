# Gemini Bau - Job Agency Website

A modern, multi-language job agency website for Gemini Bau, built with Next.js, TypeScript, and Tailwind CSS. Supports English, Slovak, and German translations.

## Features

- 🌍 **Multi-language Support**: English, Slovak, and German
- 📱 **Responsive Design**: Works perfectly on all devices
- 🎨 **Modern UI**: Clean and professional design with Tailwind CSS
- 🔍 **Job Listings**: Browse and search available positions
- 📧 **Contact Form**: Easy way to get in touch
- 🗺️ **Map Integration**: Google Maps embedded for location

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

The website will automatically detect your browser language or default to English. You can switch languages using the language switcher in the navigation.

## Project Structure

```
JobAgency/
├── app/
│   ├── [locale]/          # Localized routes
│   │   ├── page.tsx       # Home page
│   │   ├── about/         # About page
│   │   ├── jobs/          # Job listings page
│   │   ├── contact/       # Contact page
│   │   └── layout.tsx     # Layout with navigation
│   └── layout.tsx         # Root layout
├── components/
│   └── Navigation.tsx     # Navigation component with language switcher
├── messages/              # Translation files
│   ├── en.json           # English translations
│   ├── sk.json           # Slovak translations
│   └── de.json           # German translations
└── i18n.ts               # i18n configuration
```

## Available Routes

- `/en`, `/sk`, `/de` - Home page (default language)
- `/en/about`, `/sk/about`, `/de/about` - About us page
- `/en/jobs`, `/sk/jobs`, `/de/jobs` - Job listings page
- `/en/contact`, `/sk/contact`, `/de/contact` - Contact page

## Company Information

**Gemini Bau** - Professional job placement agency

## Contact Information

- **Email**: geminitech11@gmail.com
- **Phone**: +421 905 780 967
- **Address**: Zahradnícka 726/24, Prievidza, Slovensko
- **Office Hours**: 
  - Monday - Friday: 9:00 - 18:00
  - Saturday: 10:00 - 16:00

## Building for Production

```bash
npm run build
npm start
```

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **next-intl** - Internationalization

## License

This project is private and proprietary.

