export type CareerRole = {
  slug: 'growth-partnerships-intern-la' | 'growth-partnerships-intern-ny'
  applySource: 'careers-la' | 'careers-ny'
  title: string
  city: 'Los Angeles' | 'New York'
  shortCity: 'LA' | 'NY'
  location: string
  schools: string
  team: string
  compensation: string
  hours: string
}

export const careerRoles: CareerRole[] = [
  {
    slug: 'growth-partnerships-intern-la',
    applySource: 'careers-la',
    title: 'Growth & Partnerships Intern',
    city: 'Los Angeles',
    shortCity: 'LA',
    location: 'Los Angeles, California, United States (Remote)',
    schools: 'UCLA, USC, or a similar school',
    team: 'Go-to-Market',
    compensation: '$18–$25/hr',
    hours: '10–15 hrs/wk',
  },
  {
    slug: 'growth-partnerships-intern-ny',
    applySource: 'careers-ny',
    title: 'Growth & Partnerships Intern',
    city: 'New York',
    shortCity: 'NY',
    location: 'New York, United States (Remote)',
    schools: 'NYU, Columbia, Baruch, FIT, Cornell Tech, Fordham, or a similar school',
    team: 'Go-to-Market',
    compensation: '$18–$25/hr',
    hours: '10–15 hrs/wk',
  },
]

export function getRoleBySlug(slug: string): CareerRole | undefined {
  return careerRoles.find((r) => r.slug === slug)
}

export function whatYoullDo(city: CareerRole['shortCity']): string[] {
  return [
    `Research ${city === 'LA' ? 'LA' : 'NY'}-based DTC and ecommerce brands in beauty, apparel, fashion, home, lifestyle, pet, wellness, outdoor, and consumer products.`,
    'Identify decision-makers — founders, Heads of Ecommerce, VP Growth, Marketing Directors, Retention Leads, CRM Leads, agency founders.',
    'Build lead lists with company name, website, LinkedIn profiles, role, location, ecommerce stack clues, and personalized notes.',
    'Reach out via LinkedIn, email, campus networks, and local ecommerce communities.',
    'Book short 15-minute discovery calls with qualified ecommerce operators.',
    'Help invite local operators to small private dinners, coffee meetups, or roundtables hosted by Convertive.',
    `Map Shopify, Klaviyo, CRO, paid media, and retention agencies in ${city}.`,
    'Visit selected brand showrooms, pop-ups, or local retail locations only when useful to identify the right ecommerce/digital contact.',
    'Track outreach, replies, objections, meetings, and notes in a shared CRM or spreadsheet.',
    `Share weekly feedback on what messaging gets replies and what ${city} ecommerce brands care about.`,
  ]
}

export function idealCandidate(role: CareerRole): string[] {
  return [
    `Current student or recent graduate from ${role.schools}.`,
    'Strong written communication skills.',
    'Interested in startups, ecommerce, AI, DTC brands, sales, marketing, or growth.',
    'Comfortable reaching out to founders and ecommerce operators.',
    'Organized and able to maintain clean lead lists.',
    'Comfortable attending local ecommerce/networking events if needed.',
    'Bonus: experience in sales, campus ambassador work, ecommerce, retail, marketing, startups, or event organizing.',
    ...(role.shortCity === 'NY' ? ['Background in marketing, business development, or a related field is preferred.'] : []),
  ]
}

export const perks = [
  'Bonus per qualified meeting booked',
  'Bonus if a meeting becomes a serious pilot conversation',
  'Bonus if a company becomes a paid pilot/customer',
]
