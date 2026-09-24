import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Library, Sparkles } from 'lucide-react'

import { ApplicationCard } from '@/components/application-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  APPLICATIONS_LIBRARY_URL,
  getActiveApplications,
} from '@/lib/applications'

export const metadata: Metadata = {
  title: 'Apply — Open Applications | Yaps World',
  description:
    'Browse every upcoming and active scholarship, fellowship, grant and leadership application in one place.',
}

export default function ApplyPage() {
  const applications = getActiveApplications()
  const categories = new Set(applications.map((app) => app.category))

  return (
    <div className='mx-auto w-full max-w-6xl space-y-8 py-6'>
      <section className='relative overflow-hidden rounded-2xl border bg-card p-6 sm:p-10'>
        <div
          aria-hidden
          className='pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-primary/20 blur-3xl'
        />
        <div
          aria-hidden
          className='pointer-events-none absolute -bottom-32 -left-16 size-72 rounded-full bg-emerald-500/10 blur-3xl'
        />
        <div className='relative space-y-5'>
          <Badge variant='outline' className='gap-1.5'>
            <Sparkles className='size-3.5' />
            {applications.length} live opportunities
          </Badge>
          <div className='space-y-3'>
            <h1 className='text-3xl font-semibold tracking-tight sm:text-5xl'>
              Apply to your next big thing
            </h1>
            <p className='max-w-2xl text-muted-foreground'>
              Hand-picked scholarships, fellowships, grants, accelerators and
              leadership programmes — updated as new calls open. Pick one, fill
              it out, and go.
            </p>
          </div>
          <div className='flex flex-wrap items-center gap-3'>
            <Button asChild className='cursor-pointer gap-2 rounded-full'>
              <a href={APPLICATIONS_LIBRARY_URL} target='_blank' rel='noreferrer'>
                <Library className='size-4' />
                Browse 100+ applications
                <ArrowUpRight className='size-4' />
              </a>
            </Button>
            <span className='text-sm text-muted-foreground'>
              across {categories.size}+ categories — scholarships, fellowships,
              grants, leadership & more
            </span>
          </div>
        </div>
      </section>

      <section className='space-y-4'>
        <div className='flex items-end justify-between gap-4'>
          <div>
            <h2 className='text-xl font-semibold tracking-tight'>
              Open & upcoming
            </h2>
            <p className='text-sm text-muted-foreground'>
              Sorted by application deadline.
            </p>
          </div>
          <Button
            asChild
            variant='ghost'
            size='sm'
            className='hidden cursor-pointer gap-1.5 sm:inline-flex'
          >
            <Link href={APPLICATIONS_LIBRARY_URL}>
              View all
              <ArrowRight className='size-4' />
            </Link>
          </Button>
        </div>

        {applications.length > 0 ? (
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {applications.map((application) => (
              <ApplicationCard
                key={application.slug}
                application={application}
              />
            ))}
          </div>
        ) : (
          <div className='rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground'>
            No live applications right now — check the full library instead.
          </div>
        )}
      </section>

      <section className='flex flex-col items-start justify-between gap-4 rounded-2xl border bg-gradient-to-br from-primary/10 via-card to-card p-6 sm:flex-row sm:items-center sm:p-8'>
        <div className='space-y-1'>
          <h2 className='text-lg font-semibold'>Didn&apos;t find the one?</h2>
          <p className='text-sm text-muted-foreground'>
            Explore the full library of 100+ opportunities, filter by category
            and never miss a deadline.
          </p>
        </div>
        <Button asChild className='cursor-pointer gap-2 rounded-full'>
          <a href={APPLICATIONS_LIBRARY_URL} target='_blank' rel='noreferrer'>
            Open the library
            <ArrowUpRight className='size-4' />
          </a>
        </Button>
      </section>
    </div>
  )
}
