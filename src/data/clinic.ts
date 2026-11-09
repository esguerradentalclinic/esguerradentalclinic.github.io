/**
 * Single source of truth for clinic information shown across the site.
 * Values marked DEMO are placeholders for presentation and should be replaced
 * with real data before launch.
 */
import type { DayHours, Weekday } from '../lib/time'

export const CLINIC = {
  name: 'Esguerra Dental Clinic',
  shortName: 'Esguerra',
  tagline: 'Prevent. Restore. Smile.',
  motto: 'Healthy habits first, repairs when needed, and a smile you are proud to share.',
  address: 'Bangkok, Thailand',
  /** IANA time zone used for "open now" and appointment slot calculations. */
  timeZone: 'Asia/Bangkok',
  /** DEMO: placeholder founding date. */
  establishedYear: 2019,
  establishedMonth: 'May',
  /** DEMO: placeholder founding story. */
  story:
    'Esguerra Dental Clinic was established in May 2019 for Filipino and expatriate families in Bangkok who kept arriving with the same story: a small problem ignored until it became a painful, expensive one. We built the clinic around three words, prevent, restore and smile, so that every patient knows the order we work in. Prevention comes first, repairs are done only when needed and always at a price range agreed in advance, and the smile is the result we measure ourselves by.',
  doctor: {
    fullName: 'Johanna B. Esguerra',
    title: 'DMD',
    role: 'Doctor of Dental Medicine · General Dentist',
    /** DEMO: placeholder biography for presentation. */
    bio: 'Dr. Esguerra is a general dentist who believes the best treatment is the one you never need. She spends her consultations on prevention and plain-language explanations, keeps a gentle pace for anxious patients, and quotes a price range before any work begins.',
  },
  contact: {
    phoneDisplay: '0908 765 4321',
    phoneHref: 'tel:+639087654321',
    /** Supplied with a space; written here as a valid address. */
    email: 'esguerradental@clinic.com',
  },
} as const

/**
 * Weekly opening hours in minutes from midnight (clinic local time).
 * `null` means closed for the whole day. 0 = Sunday … 6 = Saturday.
 */
export const WEEKLY_HOURS: Readonly<Record<Weekday, DayHours | null>> = {
  0: null,
  1: { open: 9 * 60 + 30, close: 18 * 60 + 30, breakStart: 12 * 60 + 30, breakEnd: 13 * 60 + 30 },
  2: { open: 9 * 60 + 30, close: 18 * 60 + 30, breakStart: 12 * 60 + 30, breakEnd: 13 * 60 + 30 },
  3: { open: 9 * 60 + 30, close: 18 * 60 + 30, breakStart: 12 * 60 + 30, breakEnd: 13 * 60 + 30 },
  4: { open: 9 * 60 + 30, close: 18 * 60 + 30, breakStart: 12 * 60 + 30, breakEnd: 13 * 60 + 30 },
  5: { open: 9 * 60 + 30, close: 18 * 60 + 30, breakStart: 12 * 60 + 30, breakEnd: 13 * 60 + 30 },
  6: { open: 9 * 60, close: 14 * 60 },
}

/** Human-readable summary of the break, shown next to the hours. */
export const BREAK_NOTE = 'Lunch break 12:30 – 1:30 PM on weekdays'

/** Appointment slot granularity in minutes. */
export const SLOT_STEP_MINUTES = 30
/** Earliest same-day booking lead time in minutes. */
export const BOOKING_LEAD_MINUTES = 60
/** How far ahead patients may book, in days. */
export const BOOKING_HORIZON_DAYS = 60

export type ServiceCategory = 'Preventive' | 'Restorative' | 'Cosmetic' | 'Kids'

export interface Service {
  id: string
  name: string
  category: ServiceCategory
  /** Price range in Philippine pesos. DEMO values. */
  priceMin: number
  priceMax: number
  /** Appended to the price, e.g. "per tooth". */
  priceUnit?: string
  /** Appointment length in minutes; used to block slots. */
  durationMinutes: number
  description: string
  icon: ServiceIcon
  popular?: boolean
}

export type ServiceIcon =
  | 'tooth'
  | 'sparkle'
  | 'shield'
  | 'drill'
  | 'crown'
  | 'braces'
  | 'xray'
  | 'root'
  | 'extract'
  | 'implant'
  | 'denture'
  | 'child'

export const SERVICE_CATEGORIES: readonly ServiceCategory[] = [
  'Preventive',
  'Restorative',
  'Cosmetic',
  'Kids',
]

/** Short description shown on each category group header. */
export const CATEGORY_BLURBS: Readonly<Record<ServiceCategory, string>> = {
  Preventive: 'Prevent — keep small problems from ever starting.',
  Restorative: 'Restore — repair what needs repairing, at an agreed range.',
  Cosmetic: 'Smile — brighten what is already healthy.',
  Kids: 'Little smiles — gentle first visits for children.',
}

/** DEMO: general-dentistry services with indicative peso price ranges. */
export const SERVICES: readonly Service[] = [
  {
    id: 'consultation',
    name: 'Consultation & Oral Exam',
    category: 'Preventive',
    priceMin: 500,
    priceMax: 800,
    durationMinutes: 30,
    description: 'A full look at teeth, gums and bite, then a plan with a price range before anything begins.',
    icon: 'tooth',
  },
  {
    id: 'cleaning',
    name: 'Oral Prophylaxis (Cleaning)',
    category: 'Preventive',
    priceMin: 1100,
    priceMax: 1600,
    durationMinutes: 45,
    description: 'Gentle scaling and polishing that lifts plaque, tartar and everyday stains.',
    icon: 'sparkle',
    popular: true,
  },
  {
    id: 'fluoride',
    name: 'Fluoride Treatment',
    category: 'Preventive',
    priceMin: 700,
    priceMax: 1000,
    durationMinutes: 20,
    description: 'A protective varnish that hardens enamel and helps stop decay between visits.',
    icon: 'shield',
  },
  {
    id: 'sealants',
    name: 'Pit & Fissure Sealants',
    category: 'Preventive',
    priceMin: 800,
    priceMax: 1200,
    priceUnit: 'per tooth',
    durationMinutes: 30,
    description: 'A thin coating over the grooves of back teeth, where cavities most often begin.',
    icon: 'shield',
  },
  {
    id: 'xray',
    name: 'Digital X-ray',
    category: 'Preventive',
    priceMin: 500,
    priceMax: 800,
    durationMinutes: 20,
    description: 'Low-dose imaging that shows what sits between and beneath the teeth.',
    icon: 'xray',
  },
  {
    id: 'filling',
    name: 'Tooth-coloured Filling',
    category: 'Restorative',
    priceMin: 1500,
    priceMax: 3200,
    priceUnit: 'per tooth',
    durationMinutes: 60,
    description: 'Composite fillings matched to your tooth shade. The range follows the size of the cavity.',
    icon: 'drill',
    popular: true,
  },
  {
    id: 'extraction',
    name: 'Simple Tooth Extraction',
    category: 'Restorative',
    priceMin: 1500,
    priceMax: 3600,
    priceUnit: 'per tooth',
    durationMinutes: 45,
    description: 'Careful removal of a damaged or loose tooth under local anaesthesia, with written aftercare.',
    icon: 'extract',
  },
  {
    id: 'root-canal',
    name: 'Root Canal Therapy',
    category: 'Restorative',
    priceMin: 8000,
    priceMax: 15000,
    priceUnit: 'per tooth',
    durationMinutes: 90,
    description: 'Relieves pain and saves an infected tooth. Front teeth sit low in the range, molars higher.',
    icon: 'root',
  },
  {
    id: 'crown',
    name: 'Dental Crown',
    category: 'Restorative',
    priceMin: 12000,
    priceMax: 20000,
    priceUnit: 'per tooth',
    durationMinutes: 90,
    description: 'A custom cap that restores a weakened tooth. The range reflects the material you choose.',
    icon: 'crown',
  },
  {
    id: 'dentures',
    name: 'Partial & Complete Dentures',
    category: 'Restorative',
    priceMin: 16000,
    priceMax: 36000,
    durationMinutes: 60,
    description: 'Comfortable, natural-looking replacements for missing teeth, fitted over a few short visits.',
    icon: 'denture',
  },
  {
    id: 'night-guard',
    name: 'Custom Night Guard',
    category: 'Restorative',
    priceMin: 4000,
    priceMax: 6500,
    durationMinutes: 30,
    description: 'A made-to-measure guard that protects against grinding and eases jaw tension overnight.',
    icon: 'shield',
  },
  {
    id: 'whitening',
    name: 'Teeth Whitening',
    category: 'Cosmetic',
    priceMin: 12000,
    priceMax: 18000,
    durationMinutes: 90,
    description: 'In-clinic professional whitening for a visibly brighter smile in one visit.',
    icon: 'sparkle',
    popular: true,
  },
  {
    id: 'kids-checkup',
    name: 'Kids Check-up & Cleaning',
    category: 'Kids',
    priceMin: 800,
    priceMax: 1200,
    durationMinutes: 40,
    description: 'A friendly first visit: gentle cleaning, a look at growing teeth and a prize for bravery.',
    icon: 'child',
  },
]

export function findService(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id)
}

const pesoFormatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  maximumFractionDigits: 0,
})

export function formatPeso(amount: number): string {
  return pesoFormatter.format(amount)
}

/** "₱1,000 – ₱1,500" or a single figure when min and max match. */
export function formatPriceRange(service: Pick<Service, 'priceMin' | 'priceMax'>): string {
  if (service.priceMin === service.priceMax) return formatPeso(service.priceMin)
  return `${formatPeso(service.priceMin)} – ${formatPeso(service.priceMax)}`
}
