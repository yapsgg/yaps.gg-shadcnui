import type { Metadata } from 'next'
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Flame,
  Github,
  Mail,
  PenLine,
  PhoneCall,
  Skull,
  Sparkles,
  Users,
  X,
} from 'lucide-react'

import { TextEffect } from '@/components/motion-primitives/text-effect'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  BOOK_A_CALL_URL,
  EMAIL_URL_LINK,
  LINKEDIN_URL,
  REPO_URL_STAR,
  X_URL,
} from '@/lib/constants'
import { NOTION_PAGES, notionUrl } from '@/lib/notion'
import { PactButton, ShareButton } from './pact'

export const metadata: Metadata = {
  title: 'fuck the 9-5. build something great. | Yaps World',
  description:
    'No CS background. Quit the 9-5. $5M coin mcap, a $1.2M hackathon organized solo, 2,200+ builders mentored. The cringe manifesto on how to stop larping "someday" and start shipping — free to steal.',
  alternates: {
    canonical: '/fuck-9-5-build-something-great',
  },
}

const badIdeas = [
  "what's the salary?",
  'wait for permission',
  'but what if it fails?',
  "i'll start monday",
  'look busy',
  'protect the weekend',
]

const builderBrain = [
  "what's the upside?",
  'publish anyway',
  'good. failing is data',
  'shipping tonight, v2 tomorrow',
  'look cringe, go viral',
  'every day is yours',
]

const playbook = [
  {
    n: '0',
    title: 'founder mode',
    body: "YOU. hands-on everything. if it's broken, it's yours now. if it's not yours, adopt it.",
  },
  {
    n: '1',
    title: 'be delusional',
    body: "i announced a $5,000 prize pool with $0 in the bank. then it became $200k. then $1.2M. money shows up after belief does. it's fine ;)",
  },
  {
    n: '2',
    title: 'no plan, just confidence',
    body: 'plans are for people who need permission. what you need is momentum and a deadline you invented.',
  },
  {
    n: '3',
    title: 'ship fast, stay cringe',
    body: "done > perfect. post the ugly v1. you can't go viral from the drafts folder. cringe is load-bearing.",
  },
  {
    n: '4',
    title: 'bet on yourself first',
    body: 'YC rejected me 6 times. so did 50 other programs. i kept applying. eventually someone says yes — make sure you already did.',
  },
  {
    n: '5',
    title: "touch grass (it's a strategy)",
    body: "i found my best idea in a village: farming, cooking, simple routines. your next product is hiding inside somebody's ordinary day.",
  },
  {
    n: '6',
    title: 'open the door behind you',
    body: 'microgrants, warm intros, free tutorials. a ladder only matters if the next builder can climb it.',
  },
  {
    n: '7',
    title: 'repeat',
    body: "until the receipts don't fit in a screenshot.",
  },
]

type Tone = 'plain' | 'dim' | 'win' | 'fail' | 'hot'

const toneClass: Record<Tone, string> = {
  plain: 'text-zinc-200',
  dim: 'text-zinc-500',
  win: 'text-emerald-400',
  fail: 'text-rose-400',
  hot: 'text-amber-300',
}

const terminalLines: { text: string; tone?: Tone }[] = [
  { text: '>be me', tone: 'dim' },
  { text: '>no cs background' },
  { text: '>wanted to make money online' },
  { text: '>dropshipping lasted short' },
  { text: ">launched nfts, didn't work out" },
  { text: '>plan b: university, full scholarship' },
  { text: '>found coding seems fun' },
  { text: '>programming academies are totally scam', tone: 'fail' },
  { text: '>locked in 24/7 instead' },
  { text: '>70 hackathons → 23 wins', tone: 'win' },
  { text: '>mentored at 6 communities (500k+ students between them)' },
  { text: '>joined startups that raised millions' },
  { text: '>"you need something yours"' },
  { text: '>founded Open Community' },
  { text: '>get 9/5 job' },
  { text: '>hate it', tone: 'fail' },
  { text: '>drop out', tone: 'hot' },
  { text: '>book a flight to shenzhen' },
  { text: '>build AI robotic arm that plays chess' },
  { text: '>wtf are meme coins' },
  { text: '>accidentally launch a coin' },
  { text: '>$5M mcap in minutes', tone: 'win' },
  { text: '>get featured on times square', tone: 'win' },
  { text: '>write 6 papers, because why not' },
  { text: '>organize a hackathon, bc why not' },
  { text: '>$1.2M in prizes. solo. #1 in the world.', tone: 'win' },
  { text: '>get a $100k offer from VCs' },
  { text: '>reject it. bootstrap instead', tone: 'hot' },
  { text: '>go to the village' },
  { text: '>spend a month' },
  { text: '>build Venaz so farm life pays' },
  { text: '>apply YC. fail 6 times. apply again.', tone: 'fail' },
  { text: '>still shipping', tone: 'win' },
  { text: '' },
  { text: '>be you', tone: 'hot' },
  { text: '>same playbook. zero gatekeeping.' },
  { text: '>steal it tonight' },
  { text: '>ship something this week', tone: 'win' },
  { text: '>maybe make your mom confused too' },
]

export default function Fuck95Page() {
  return (
    <div className='mx-auto w-full max-w-5xl space-y-8 py-6'>
      {/* ── hero ─────────────────────────────────────────────── */}
      <section className='relative overflow-hidden rounded-2xl border bg-card p-6 sm:p-10'>
        <div
          aria-hidden
          className='pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-rose-500/15 blur-3xl'
        />
        <div
          aria-hidden
          className='pointer-events-none absolute -bottom-32 -left-16 size-72 rounded-full bg-amber-500/10 blur-3xl'
        />
        <div className='relative space-y-6'>
          <Badge variant='outline' className='gap-1.5'>
            <Flame className='size-3.5 text-rose-400' />a yaps manifesto ·
            certified cringe · read it out loud, it hits harder
          </Badge>

          <h1 className='text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl'>
            <TextEffect
              as='span'
              per='word'
              preset='fade-in-blur'
              className='block'
            >
              fuck the 9-5.
            </TextEffect>
            <TextEffect
              as='span'
              per='word'
              preset='fade-in-blur'
              delay={0.3}
              className='block bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent'
            >
              build something great.
            </TextEffect>
          </h1>

          <p className='max-w-2xl text-muted-foreground'>
            i&apos;m abdibrokhim. no cs background. no plan. i quit the 9/5,
            flew to shenzhen, accidentally launched a coin to $5M mcap,
            solo-organized a $1.2M hackathon across 5 continents, and somehow
            mentored 2,200+ builders along the way. this page is everything i
            know — written down while yapping. steal it. ship something. make
            your mom confused about what you actually do.
          </p>

          <div className='flex flex-wrap items-center gap-3'>
            <Button asChild className='cursor-pointer gap-2 rounded-full'>
              <a href='#playbook'>
                steal the playbook
                <ArrowDown className='size-4' />
              </a>
            </Button>
            <Button
              asChild
              variant='outline'
              className='cursor-pointer gap-2 rounded-full'
            >
              <a href={BOOK_A_CALL_URL} target='_blank' rel='noreferrer'>
                <PhoneCall className='size-4' />
                book a free call
              </a>
            </Button>
            <Button
              asChild
              variant='ghost'
              className='cursor-pointer gap-2 rounded-full'
            >
              <a
                href={notionUrl(NOTION_PAGES['open-community'])}
                target='_blank'
                rel='noreferrer'
              >
                join open community
                <ArrowUpRight className='size-4' />
              </a>
            </Button>
          </div>

          <p className='font-mono text-xs text-muted-foreground'>
            no email wall. no gatekeeping. no funnel. just receipts and cringe.
          </p>
        </div>
      </section>

      {/* ── receipts ─────────────────────────────────────────── */}
      <section className='space-y-4'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>
            be me: the whole cringe arc
          </h2>
          <p className='text-sm text-muted-foreground'>
            terminal-certified. every line actually happened. unfortunately.
          </p>
        </div>

        <div className='overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-sm'>
          <div className='flex items-center gap-2 border-b border-zinc-800 px-4 py-3'>
            <span className='size-3 rounded-full bg-rose-500/80' />
            <span className='size-3 rounded-full bg-amber-400/80' />
            <span className='size-3 rounded-full bg-emerald-500/80' />
            <span className='ml-2 font-mono text-xs text-zinc-500'>
              abdibrokhim@yaps:~$ cat manifest.txt
            </span>
          </div>
          <div className='overflow-x-auto px-4 py-5 sm:px-6'>
            <pre className='font-mono text-[13px] leading-relaxed whitespace-pre sm:text-sm'>
              {terminalLines.map((line, i) => (
                <div key={i} className={toneClass[line.tone ?? 'plain']}>
                  {line.text || '\u00A0'}
                </div>
              ))}
              <div className='mt-2 text-emerald-400'>
                <span className='animate-pulse'>▌</span>
              </div>
            </pre>
          </div>
        </div>
      </section>

      {/* ── the villain ──────────────────────────────────────── */}
      <section className='space-y-4'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>
            the 9-5 isn&apos;t evil. the larp is.
          </h2>
        </div>
        <div className='rounded-2xl border bg-card p-6 sm:p-8'>
          <p className='text-muted-foreground'>
            lots of great builders hold a job. the job pays rent — it
            doesn&apos;t have to pay with your dreams. the real enemy is the
            larp: the very convincing story where <em>someday</em> you&apos;ll
            build the thing, while your calendar gets eaten in 15-minute
            increments and your idea dies politely in the drafts folder.
          </p>
          <p className='mt-4 text-muted-foreground'>
            <span className='font-medium text-foreground'>someday</span> has a
            perfect pitch deck, four million prayers, and zero shipped code.
            you can keep the job. you cannot keep the someday.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
          {[
            'your 9-5 has a pension plan. your dream has a deadline.',
            'nobody is coming to hand you your dream. not even you — if you keep waiting on you.',
            'you don’t need to quit tomorrow. you need to start tonight.',
          ].map((quote) => (
            <div
              key={quote}
              className='rounded-2xl border bg-gradient-to-br from-card to-muted/40 p-5 text-sm'
            >
              <Sparkles className='mb-3 size-4 text-amber-400' />
              <p className='text-muted-foreground'>&ldquo;{quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── playbook ─────────────────────────────────────────── */}
      <section className='scroll-mt-20 space-y-4' id='playbook'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>
            the delulu playbook
          </h2>
          <p className='text-sm text-muted-foreground'>
            8 rules. steal them in order, or out of order. bc why not.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {playbook.map((rule) => (
            <div
              key={rule.n}
              className='group relative overflow-hidden rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg'
            >
              <span
                aria-hidden
                className='pointer-events-none absolute -top-6 -right-2 font-mono text-7xl font-semibold text-muted-foreground/10'
              >
                {rule.n}
              </span>
              <p className='font-mono text-xs text-muted-foreground'>
                rule_{rule.n}
              </p>
              <h3 className='mt-2 text-lg font-semibold'>{rule.title}</h3>
              <p className='mt-1 text-sm text-muted-foreground'>{rule.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── two brains ───────────────────────────────────────── */}
      <section className='space-y-4'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>
            two brains. pick one.
          </h2>
          <p className='text-sm text-muted-foreground'>
            you can only scroll with one of them.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div className='rounded-2xl border bg-card p-6'>
            <div className='mb-4 flex items-center gap-2'>
              <div className='flex size-9 items-center justify-center rounded-xl border bg-background'>
                <Skull className='size-4 text-rose-400' />
              </div>
              <h3 className='font-mono text-sm text-muted-foreground'>
                the 9-5 brain
              </h3>
            </div>
            <ul className='space-y-3'>
              {badIdeas.map((item) => (
                <li key={item} className='flex items-start gap-2 text-sm'>
                  <X className='mt-0.5 size-4 shrink-0 text-rose-400' />
                  <span className='text-muted-foreground'>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className='relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 via-card to-card p-6'>
            <div className='mb-4 flex items-center gap-2'>
              <div className='flex size-9 items-center justify-center rounded-xl border bg-background'>
                <Flame className='size-4 text-emerald-400' />
              </div>
              <h3 className='font-mono text-sm text-muted-foreground'>
                the builder brain
              </h3>
            </div>
            <ul className='space-y-3'>
              {builderBrain.map((item) => (
                <li key={item} className='flex items-start gap-2 text-sm'>
                  <Check className='mt-0.5 size-4 shrink-0 text-emerald-400' />
                  <span className='text-muted-foreground'>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── cringe tax ───────────────────────────────────────── */}
      <section className='relative overflow-hidden rounded-2xl border bg-card p-6 sm:p-10'>
        <div
          aria-hidden
          className='pointer-events-none absolute -top-24 -left-16 size-72 rounded-full bg-rose-500/10 blur-3xl'
        />
        <div className='relative space-y-4'>
          <h2 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
            the cringe tax
          </h2>
          <p className='max-w-2xl text-lg font-medium sm:text-xl'>
            cringe is just courage before the receipts arrive.
          </p>
          <p className='max-w-2xl text-muted-foreground'>
            yes, this page is cringe. lowercase. run-ons. a horse emoji in the
            404. good — i&apos;d rather be cringe and shipped than cool and
            hypothetical. every builder you idolize was embarrassing first.
            the only difference is they posted anyway. embarrassment is a tax
            you pay to keep a life you don&apos;t want. stop paying it. post
            the thing.
          </p>
        </div>
      </section>

      {/* ── the pact ─────────────────────────────────────────── */}
      <section
        id='pact'
        className='scroll-mt-20 rounded-2xl border bg-card p-6 text-center sm:p-10'
      >
        <Badge variant='secondary' className='mb-5 gap-1.5'>
          <PenLine className='size-3' />
          the pact
        </Badge>
        <h2 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
          one signup i actually want.
        </h2>
        <p className='mx-auto mt-3 max-w-xl text-sm text-muted-foreground'>
          no email. no newsletter. no funnel. just a promise stored in your
          browser and your spine: i will ship one thing this week instead of
          saying someday.
        </p>
        <div className='mt-7'>
          <PactButton />
        </div>
        <p className='mt-4 font-mono text-xs text-muted-foreground'>
          stored locally. i don&apos;t even know you signed. that&apos;s
          between you and your dreams.
        </p>
      </section>

      {/* ── final cta ────────────────────────────────────────── */}
      <section className='relative overflow-hidden rounded-2xl border bg-card p-6 sm:p-10'>
        <div
          aria-hidden
          className='pointer-events-none absolute -bottom-32 -right-16 size-72 rounded-full bg-primary/20 blur-3xl'
        />
        <div className='relative space-y-6'>
          <div className='space-y-3'>
            <h2 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
              steal everything. then build something greater.
            </h2>
            <p className='max-w-2xl text-muted-foreground'>
              if this page made you cringe, feel inspired, or slightly
              uncomfortable — perfect. pick the feeling and ship it. i&apos;m
              always down to help.
            </p>
          </div>

          <div className='flex flex-wrap items-center gap-3'>
            <Button asChild className='cursor-pointer gap-2 rounded-full'>
              <a href={BOOK_A_CALL_URL} target='_blank' rel='noreferrer'>
                <PhoneCall className='size-4' />
                book a free call
              </a>
            </Button>
            <Button
              asChild
              variant='outline'
              className='cursor-pointer gap-2 rounded-full'
            >
              <a
                href={notionUrl(NOTION_PAGES['open-community'])}
                target='_blank'
                rel='noreferrer'
              >
                <Users className='size-4' />
                join 2,200+ builders
              </a>
            </Button>
            <Button
              asChild
              variant='outline'
              className='cursor-pointer gap-2 rounded-full'
            >
              <a href={REPO_URL_STAR} target='_blank' rel='noreferrer'>
                <Github className='size-4' />
                star the repo
              </a>
            </Button>
            <Button
              asChild
              variant='ghost'
              className='cursor-pointer gap-2 rounded-full'
            >
              <a href={EMAIL_URL_LINK}>
                <Mail className='size-4' />
                email me
              </a>
            </Button>
          </div>

          <div className='flex flex-wrap items-center gap-3 border-t pt-6'>
            <ShareButton />
            <p className='text-sm text-muted-foreground'>
              send this to the friend who keeps saying{' '}
              <span className='font-medium text-foreground'>&ldquo;someday&rdquo;</span>
              . be annoying about it. every movement starts with one annoying
              DM.
            </p>
          </div>

          <p className='font-mono text-xs text-muted-foreground'>
            yapped into existence by{' '}
            <a
              href={LINKEDIN_URL}
              target='_blank'
              rel='noreferrer'
              className='underline underline-offset-4'
            >
              @yapsgg
            </a>{' '}
            ·{' '}
            <a
              href={X_URL}
              target='_blank'
              rel='noreferrer'
              className='underline underline-offset-4'
            >
              @abdibrokhim
            </a>{' '}
            · (hi mom)
          </p>
        </div>
      </section>
    </div>
  )
}
