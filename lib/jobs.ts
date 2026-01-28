export type Locale = 'en' | 'sk' | 'de';

function pickLocale<T extends Record<string, unknown>>(
  obj: T,
  locale: Locale,
  key: string
): string {
  const k = key + (locale === 'sk' ? 'Sk' : locale === 'de' ? 'De' : 'En');
  const v = obj[k as keyof T];
  return typeof v === 'string' ? v : (obj[(key + 'Sk') as keyof T] as string) || '';
}

export function getJobTitle(job: Record<string, unknown>, locale: Locale): string {
  return pickLocale(job as Record<string, unknown>, locale, 'title');
}

export function getJobLocation(job: Record<string, unknown>, locale: Locale): string {
  return pickLocale(job as Record<string, unknown>, locale, 'location');
}

export function getJobStartDate(job: Record<string, unknown>, locale: Locale): string {
  return pickLocale(job as Record<string, unknown>, locale, 'startDate');
}

// Shared jobs data - this would come from a database in a real app
export const jobs = [
  {
    id: 'DE2025043',
    slug: 'elektrikari-nemecko',
    titleSk: 'Elektrikári Nemecko',
    titleEn: 'Electricians Germany',
    titleDe: 'Elektriker Deutschland',
    locationSk: 'Nemecko, Braunschweig',
    locationEn: 'Germany, Braunschweig',
    locationDe: 'Deutschland, Braunschweig',
    salary: '23-24€/hod',
    startDateSk: '1.2.2026',
    startDateEn: '1 Feb 2026',
    startDateDe: '1.2.2026',
    country: 'Germany',
    professionKey: 'electrician' as const,
    isOpen: true,
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
  },
  {
    id: 'DE2025070',
    slug: 'elektrikari-braunschweig',
    titleSk: 'Zabehnutá partia, šikovných elektrikárov - dvaja alebo štyria',
    titleEn: 'Established team of skilled electricians - two or four',
    titleDe: 'Eingespieltes Team von Elektrikern - zwei oder vier',
    locationSk: 'Nemecko, Braunschweig',
    locationEn: 'Germany, Braunschweig',
    locationDe: 'Deutschland, Braunschweig',
    salary: '23-24€/hod',
    startDateSk: '1.2.2026',
    startDateEn: '1 Feb 2026',
    startDateDe: '1.2.2026',
    country: 'Germany',
    professionKey: 'electrician' as const,
    isOpen: false
  },
  {
    id: 'AT2025073',
    slug: 'elektrikari-rakusko-au',
    titleSk: 'Elektrikári Rakúsko Au, rekonštrukcia hotela plus prístavba novej časti hotela',
    titleEn: 'Electricians Austria Au, hotel renovation plus new section',
    titleDe: 'Elektriker Österreich Au, Hotelrenovierung plus Neubau',
    locationSk: 'Rakúsko, Au, 6883',
    locationEn: 'Austria, Au, 6883',
    locationDe: 'Österreich, Au, 6883',
    salary: '23-24€/hod',
    startDateSk: '31.03.2025',
    startDateEn: '31 Mar 2025',
    startDateDe: '31.03.2025',
    country: 'Austria',
    professionKey: 'electrician' as const,
    isOpen: false
  },
  {
    id: 'DE2025039',
    slug: 'elektrikari-bad-breisig',
    titleSk: 'Elektrikári (novostavby bytových domov)',
    titleEn: 'Electricians (residential new builds)',
    titleDe: 'Elektriker (Wohnungsneubauten)',
    locationSk: 'Nemecko, Bad Breisig',
    locationEn: 'Germany, Bad Breisig',
    locationDe: 'Deutschland, Bad Breisig',
    salary: '23-24€/hod',
    startDateSk: 'Ihneď',
    startDateEn: 'Immediately',
    startDateDe: 'Sofort',
    country: 'Germany',
    professionKey: 'electrician' as const,
    isOpen: false
  },
  {
    id: 'AT2025071',
    slug: 'elektrikari-rakusko',
    titleSk: 'Zabehnutú dvojica elektrikárov na zákazku do Rakúska',
    titleEn: 'Established pair of electricians for Austria',
    titleDe: 'Eingespieltes Elektriker-Duo für Österreich',
    locationSk: 'Nemecko, Kerpen',
    locationEn: 'Germany, Kerpen',
    locationDe: 'Deutschland, Kerpen',
    salary: '23-24€/hod',
    startDateSk: 'Čo najskôr',
    startDateEn: 'As soon as possible',
    startDateDe: 'So schnell wie möglich',
    country: 'Austria',
    professionKey: 'electrician' as const,
    isOpen: false
  }
];

export function getOpenJobsCount() {
  return jobs.filter(job => job.isOpen).length;
}

