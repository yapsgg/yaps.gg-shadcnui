import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  CalendarClock,
  Library,
  MapPin,
  PenLine,
  Sparkles,
  Tag,
} from 'lucide-react'

import { ApplicationCard } from '@/components/application-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  APPLICATIONS,
  APPLICATIONS_LIBRARY_URL,
  formatDeadline,
  getApplicationBySlug,
  getApplicationStatus,
  getDaysLeft,
  STATUS_META,
} from '@/lib/applications'
import { cn } from '@/lib/utils'

export const dynamicParams = false

export function generateStaticParams() {
  return APPLICATIONS.map((application) => ({ program: application.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ program: string }>
}): Promise<Metadata> {
  const { program } = await params
  const application = getApplicationBySlug(program)

  if (!application) return {}

  return {
    title: `${application.name} — Apply | Yaps World`,
    description: application.blurb,
  }
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ program: string }>
}) {
  const { program } = await params
  const application = getApplicationBySlug(program)

  if (!application) {
    notFound()
  }

  const status = getApplicationStatus(application)
  const statusMeta = STATUS_META[status]
  const daysLeft = getDaysLeft(application)
  const isOpen = status === 'open' || status === 'closing-soon'
  const related = APPLICATIONS.filter(
    (item) => item.slug !== application.slug,
  ).slice(0, 3)

  return (
    <div className='mx-auto w-full max-w-5xl space-y-6 py-6'>
      <Button
        asChild
        variant='ghost'
        size='sm'
        className='cursor-pointer gap-1.5 text-muted-foreground'
      >
        <Link href='/apply'>
          <ArrowLeft className='size-4' />
          All open applications
        </Link>
      </Button>

      <section className='relative overflow-hidden rounded-2xl border bg-card p-6 sm:p-10'>
        <div
          aria-hidden
          className='pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-primary/20 blur-3xl'
        />
        <div className='relative space-y-6'>
          <div className='flex flex-wrap items-center gap-2'>
            <Badge
              variant='outline'
              className={cn('gap-1.5', statusMeta.className)}
            >
              <span
                className={cn('size-1.5 rounded-full', statusMeta.dotClassName)}
              />
              {statusMeta.label}
            </Badge>
            <Badge variant='secondary' className='gap-1.5'>
              <Tag className='size-3' />
              {application.category}
            </Badge>
            {application.featured && (
              <Badge variant='default' className='gap-1.5'>
                <Sparkles className='size-3' />
                Featured
              </Badge>
            )}
          </div>

          <div className='flex items-start gap-4'>
            <div className='hidden size-14 shrink-0 items-center justify-center rounded-2xl border bg-background text-3xl sm:flex'>
              <span aria-hidden>{application.emoji}</span>
            </div>
            <div className='space-y-3'>
              <h1 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
                {application.name}
              </h1>
              <p className='max-w-2xl text-muted-foreground'>
                {application.blurb}
              </p>
            </div>
          </div>

          <div className='grid grid-cols-1 gap-3 border-t pt-6 text-sm sm:grid-cols-3'>
            <div className='flex items-start gap-2'>
              <Building2 className='mt-0.5 size-4 text-muted-foreground' />
              <div>
                <p className='text-muted-foreground'>Organizer</p>
                <p className='font-medium'>{application.organizer}</p>
              </div>
            </div>
            <div className='flex items-start gap-2'>
              <MapPin className='mt-0.5 size-4 text-muted-foreground' />
              <div>
                <p className='text-muted-foreground'>Location</p>
                <p className='font-medium'>
                  {application.location} · {application.mode}
                </p>
              </div>
            </div>
            <div className='flex items-start gap-2'>
              <CalendarClock className='mt-0.5 size-4 text-muted-foreground' />
              <div>
                <p className='text-muted-foreground'>Deadline</p>
                <p className='font-medium'>
                  {formatDeadline(application.deadline)}
                  {isOpen && daysLeft >= 0 && (
                    <span className='text-muted-foreground'>
                      {' '}
                      · {daysLeft} days left
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className='flex flex-wrap gap-2'>
            {application.tags.map((tag) => (
              <Badge key={tag} variant='outline' className='font-normal'>
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <a
          href={application.applyUrl}
          target='_blank'
          rel='noreferrer'
          className='group relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-card to-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg'
        >
          <div className='flex items-start justify-between gap-4'>
            <div className='flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground'>
              <PenLine className='size-5' />
            </div>
            <ArrowUpRight className='size-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
          </div>
          <h2 className='mt-4 text-lg font-semibold'>
            Fill out the application
          </h2>
          <p className='mt-1 text-sm text-muted-foreground'>
            Go straight to the official {application.name} form and submit your
            application.
          </p>
        </a>

        <a
          href={APPLICATIONS_LIBRARY_URL}
          target='_blank'
          rel='noreferrer'
          className='group relative overflow-hidden rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg'
        >
          <div className='flex items-start justify-between gap-4'>
            <div className='flex size-11 items-center justify-center rounded-xl border bg-background'>
              <Library className='size-5' />
            </div>
            <ArrowUpRight className='size-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
          </div>
          <h2 className='mt-4 text-lg font-semibold'>
            Browse 100+ applications
          </h2>
          <p className='mt-1 text-sm text-muted-foreground'>
            Not the right fit? Explore scholarships, fellowships, grants,
            leadership programmes and more.
          </p>
        </a>
      </section>

      <section className='space-y-4'>
        <div className='flex items-end justify-between gap-4'>
          <div>
            <h2 className='text-xl font-semibold tracking-tight'>
              More opportunities for you
            </h2>
            <p className='text-sm text-muted-foreground'>
              A few more applications others are applying to right now.
            </p>
          </div>
          <Button
            asChild
            variant='ghost'
            size='sm'
            className='hidden cursor-pointer gap-1.5 sm:inline-flex'
          >
            <Link href={APPLICATIONS_LIBRARY_URL}>
              Browse all
              <ArrowUpRight className='size-4' />
            </Link>
          </Button>
        </div>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {related.map((item) => (
            <ApplicationCard key={item.slug} application={item} />
          ))}
        </div>
      </section>
    </div>
  )
}
