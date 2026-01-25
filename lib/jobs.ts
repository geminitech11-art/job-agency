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
    isOpen: true
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

