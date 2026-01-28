// Shared jobs data - this would come from a database in a real app
export const jobs = [
  {
    id: 'DE2025043',
    slug: 'elektrikari-nemecko',
    title: 'Elektrikári Nemecko',
    location: 'Nemecko, Braunschweig',
    salary: '23-24€/hod',
    startDate: '1.2.2026',
    country: 'Germany',
    profession: 'Elektrikár',
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
    title: 'Zabehnutá partia, šikovných elektrikárov - dvaja alebo štyria',
    location: 'Nemecko, Braunschweig',
    salary: '23-24€/hod',
    startDate: '1.2.2026',
    country: 'Germany',
    profession: 'Elektrikár',
    isOpen: false
  },
  {
    id: 'AT2025073',
    slug: 'elektrikari-rakusko-au',
    title: 'Elektrikári Rakúsko Au, rekonštrukcia hotela plus prístavba novej časti hotela',
    location: 'Rakúsko, Au, 6883',
    salary: '23-24€/hod',
    startDate: '31.03.2025',
    country: 'Austria',
    profession: 'Elektrikár',
    isOpen: false
  },
  {
    id: 'DE2025039',
    slug: 'elektrikari-bad-breisig',
    title: 'Elektrikári (novostavby bytových domov)',
    location: 'Nemecko, Bad Breisig',
    salary: '23-24€/hod',
    startDate: 'Ihneď',
    country: 'Germany',
    profession: 'Elektrikár',
    isOpen: false
  },
  {
    id: 'AT2025071',
    slug: 'elektrikari-rakusko',
    title: 'Zabehnutú dvojica elektrikárov na zákazku do Rakúska',
    location: 'Nemecko, Kerpen',
    salary: '23-24€/hod',
    startDate: 'Čo najskôr',
    country: 'Austria',
    profession: 'Elektrikár',
    isOpen: false
  }
];

export function getOpenJobsCount() {
  return jobs.filter(job => job.isOpen).length;
}

