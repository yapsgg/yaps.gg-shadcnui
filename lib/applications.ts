import { NOTION_PAGES, notionUrl } from './notion'

/** Public library of 100+ opportunities (scholarships, fellowships, grants, ...). */
export const APPLICATIONS_LIBRARY_URL = 'https://yaps.gg/applications'

export type ApplicationCategory =
  | 'Scholarship'
  | 'Fellowship'
  | 'Grant'
  | 'Leadership'
  | 'Hackathon'
  | 'Internship'
  | 'Accelerator'
  | 'Conference'
  | 'Competition'

export type ApplicationMode = 'Online' | 'Hybrid' | 'In-person'

export type ApplicationStatus =
  | 'open'
  | 'closing-soon'
  | 'coming-soon'
  | 'closed'

export type Application = {
  /** Root path segment, e.g. "irena-youth-forum-2027" -> /irena-youth-forum-2027 */
  slug: string
  name: string
  organizer: string
  category: ApplicationCategory
  location: string
  mode: ApplicationMode
  /** ISO date the application window opens. Omit if already open. */
  opensAt?: string
  /** ISO date the application window closes. */
  deadline: string
  blurb: string
  tags: string[]
  /** Where the "fill out the application" button points. */
  applyUrl: string
  emoji: string
  featured?: boolean
}

function notionApplication(path: string): string {
  const id = NOTION_PAGES[path]
  return id ? notionUrl(id) : APPLICATIONS_LIBRARY_URL
}

export const APPLICATIONS: Application[] = [
  {
    slug: 'irena-youth-forum-2027',
    name: 'IRENA Youth Forum 2027',
    organizer: 'International Renewable Energy Agency',
    category: 'Leadership',
    location: 'Abu Dhabi, UAE',
    mode: 'In-person',
    opensAt: '2026-10-01',
    deadline: '2027-01-20',
    blurb:
      'Join 200 young leaders shaping the global energy transition. Delegates get access to the IRENA Assembly, high-level networking and a fully-funded seat for the flagship youth forum.',
    tags: ['Energy', 'Climate', 'Fully funded', 'Youth'],
    applyUrl: notionApplication('applications/irena-youth-forum'),
    emoji: '⚡',
    featured: true,
  },
  {
    slug: 'global-leadership-challenge-2026',
    name: 'Global Leadership Challenge 2026',
    organizer: 'Oxford Character Project',
    category: 'Leadership',
    location: 'Oxford, United Kingdom',
    mode: 'Hybrid',
    deadline: '2026-10-15',
    blurb:
      'A week-long leadership programme for exceptional emerging leaders, blending in-person sessions at Oxford with a global cohort of change-makers.',
    tags: ['Leadership', 'Oxford', 'Networking'],
    applyUrl: notionApplication('applications/glc-application-2026'),
    emoji: '🌍',
  },
  {
    slug: 'the-bridge-accelerator-winter-27',
    name: "The Bridge Accelerator — Winter '27",
    organizer: 'The Bridge',
    category: 'Accelerator',
    location: 'Global',
    mode: 'Online',
    deadline: '2026-11-01',
    blurb:
      'An 8-week accelerator helping early-stage founders turn a prototype into a funded product with mentorship, weekly sprints and demo day.',
    tags: ['Startups', 'Pre-seed', 'Mentorship'],
    applyUrl: notionApplication('applications/the-bridge-application-winter-27'),
    emoji: '🌉',
  },
  {
    slug: 'kaust-mewc-2026',
    name: 'KAUST Middle East Water Challenge 2026',
    organizer: 'KAUST',
    category: 'Grant',
    location: 'Thuwal, Saudi Arabia',
    mode: 'Hybrid',
    deadline: '2026-11-30',
    blurb:
      'A global challenge funding bold solutions to water scarcity, with research grants and a residency at one of the world’s most funded science campuses.',
    tags: ['Research', 'Water', 'Grants'],
    applyUrl: notionApplication('applications/kaust-mewc-2026'),
    emoji: '💧',
  },
  {
    slug: 'hpair-harvard-conference-2026',
    name: 'HPAIR Harvard Conference 2026',
    organizer: 'Harvard Project for Asian and International Relations',
    category: 'Conference',
    location: 'Cambridge, USA',
    mode: 'In-person',
    deadline: '2026-10-05',
    blurb:
      'One of the largest student-run conferences, connecting thousands of delegates with world leaders, workshops and a competitive scholarship track.',
    tags: ['Harvard', 'Scholarship', 'Asia'],
    applyUrl: notionApplication(
      'applications/hpair-harvard-conference-2026-application',
    ),
    emoji: '🎓',
  },
  {
    slug: 'openai-residency-2026',
    name: 'OpenAI Residency 2026',
    organizer: 'OpenAI',
    category: 'Fellowship',
    location: 'San Francisco, USA',
    mode: 'In-person',
    deadline: '2026-11-15',
    blurb:
      'A six-month, fully salaried programme for exceptional people from non-traditional backgrounds to transition into full-time AI research.',
    tags: ['AI', 'Research', 'Paid'],
    applyUrl: notionApplication('applications/openai-residency-2026'),
    emoji: '🤖',
  },
  {
    slug: 'oist-research-internship',
    name: 'OIST Research Internship',
    organizer: 'Okinawa Institute of Science and Technology',
    category: 'Internship',
    location: 'Okinawa, Japan',
    mode: 'In-person',
    deadline: '2026-10-31',
    blurb:
      'A fully funded research internship in Japan across neuroscience, quantum, marine and computer science labs — no Japanese required.',
    tags: ['Japan', 'Research', 'Fully funded'],
    applyUrl: notionApplication(
      'applications/oist-research-internship-application',
    ),
    emoji: '🔬',
  },
  {
    slug: 'mbzuai-ml-winter-school-2026',
    name: 'MBZUAI ML Winter School 2026',
    organizer: 'Mohamed bin Zayed University of AI',
    category: 'Fellowship',
    location: 'Abu Dhabi, UAE',
    mode: 'In-person',
    deadline: '2026-12-05',
    blurb:
      'An intensive winter school on representation learning and generative AI, taught by leading faculty with full scholarships for top applicants.',
    tags: ['Machine Learning', 'GenAI', 'Scholarship'],
    applyUrl: notionApplication(
      'applications/mbzuai-machine-learning-winter-school-2026-representation-learning-and-genai',
    ),
    emoji: '🧠',
  },
  {
    slug: 'seeds-for-the-future-global-ambassador-2027',
    name: 'Seeds for the Future Global Ambassador 2027',
    organizer: 'Huawei',
    category: 'Fellowship',
    location: 'Shenzhen, China',
    mode: 'Hybrid',
    deadline: '2026-09-30',
    blurb:
      'A tech and cross-cultural exchange programme for top students, culminating in a global ambassador selection with a fully sponsored China trip.',
    tags: ['Tech', 'China', 'Ambassador'],
    applyUrl: notionApplication(
      'applications/seeds-for-the-future-global-ambassador-election',
    ),
    emoji: '🌱',
  },
  {
    slug: 'kaist-ee-summer-program-2027',
    name: 'KAIST EE Summer Program 2027',
    organizer: 'KAIST',
    category: 'Scholarship',
    location: 'Daejeon, South Korea',
    mode: 'In-person',
    opensAt: '2026-12-01',
    deadline: '2027-02-01',
    blurb:
      'A paid summer research programme in electrical engineering with KAIST faculty, generous stipend and on-campus housing.',
    tags: ['Engineering', 'Korea', 'Stipend'],
    applyUrl: notionApplication(
      'applications/kaist-ee-summer-program-application',
    ),
    emoji: '📡',
  },
  {
    slug: 'a-star-scholarship-singapore-2027',
    name: 'A*STAR Scholarship Singapore 2027',
    organizer: 'A*STAR',
    category: 'Scholarship',
    location: 'Singapore',
    mode: 'In-person',
    opensAt: '2026-12-15',
    deadline: '2027-03-01',
    blurb:
      'Singapore’s flagship research scholarship covering full tuition, monthly allowance and attachment at A*STAR research institutes.',
    tags: ['Singapore', 'Research', 'Full ride'],
    applyUrl: notionApplication(
      'applications/a-star-scholarship-application-singapore',
    ),
    emoji: '🦁',
  },
  {
    slug: 'zhongguancun-tech-competition-2027',
    name: 'Zhongguancun Tech Competition 2027',
    organizer: 'Zhongguancun Forum',
    category: 'Competition',
    location: 'Beijing, China',
    mode: 'Hybrid',
    opensAt: '2026-11-01',
    deadline: '2027-01-10',
    blurb:
      'An overseas innovation competition for founders and researchers, with cash prizes, incubation and fast-track access to Chinese venture capital.',
    tags: ['Innovation', 'Prizes', 'China'],
    applyUrl: notionApplication(
      'applications/8th-zhongguancun-tech-competition-overseas-application',
    ),
    emoji: '🏆',
  },
]

export function getApplicationBySlug(slug: string): Application | undefined {
  return APPLICATIONS.find((application) => application.slug === slug)
}

export function getApplicationStatus(
  application: Application,
  now: Date = new Date(),
): ApplicationStatus {
  if (application.opensAt && now < new Date(application.opensAt)) {
    return 'coming-soon'
  }

  const deadline = new Date(application.deadline)
  const daysLeft = Math.ceil(
    (deadline.getTime() - now.getTime()) / 86_400_000,
  )

  if (daysLeft < 0) return 'closed'
  if (daysLeft <= 14) return 'closing-soon'
  return 'open'
}

export function getDaysLeft(
  application: Application,
  now: Date = new Date(),
): number {
  return Math.ceil(
    (new Date(application.deadline).getTime() - now.getTime()) / 86_400_000,
  )
}

export function formatDeadline(deadline: string): string {
  return new Date(deadline).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/** Applications that are open now, closing soon, or opening in the future. */
export function getActiveApplications(now: Date = new Date()): Application[] {
  return APPLICATIONS.filter(
    (application) => getApplicationStatus(application, now) !== 'closed',
  ).sort(
    (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
  )
}

type StatusMeta = {
  label: string
  className: string
  dotClassName: string
}

export const STATUS_META: Record<ApplicationStatus, StatusMeta> = {
  open: {
    label: 'Open',
    className: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500',
    dotClassName: 'bg-emerald-500',
  },
  'closing-soon': {
    label: 'Closing soon',
    className: 'border-amber-500/30 bg-amber-500/10 text-amber-500',
    dotClassName: 'bg-amber-500',
  },
  'coming-soon': {
    label: 'Coming soon',
    className: 'border-sky-500/30 bg-sky-500/10 text-sky-500',
    dotClassName: 'bg-sky-500',
  },
  closed: {
    label: 'Closed',
    className: 'border-border bg-muted text-muted-foreground',
    dotClassName: 'bg-muted-foreground',
  },
}
