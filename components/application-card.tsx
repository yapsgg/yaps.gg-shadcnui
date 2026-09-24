import Link from 'next/link'
import { ArrowUpRight, CalendarClock, MapPin } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  type Application,
  formatDeadline,
  getApplicationStatus,
  getDaysLeft,
  STATUS_META,
} from '@/lib/applications'
import { cn } from '@/lib/utils'

export function ApplicationCard({
  application,
  className,
}: {
  application: Application
  className?: string
}) {
  const status = getApplicationStatus(application)
  const statusMeta = STATUS_META[status]
  const daysLeft = getDaysLeft(application)
  const isOpen = status === 'open' || status === 'closing-soon'

  return (
    <Link
      href={`/${application.slug}`}
      className={cn('group block h-full focus-visible:outline-none', className)}
    >
      <Card className='relative h-full gap-4 overflow-hidden py-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg'>
        <div
          aria-hidden
          className='pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-primary/10 blur-3xl transition-opacity duration-300 group-hover:opacity-100 sm:opacity-0'
        />
        <CardHeader className='px-5'>
          <div className='flex items-start justify-between gap-3'>
            <div className='flex size-11 shrink-0 items-center justify-center rounded-xl border bg-background text-2xl'>
              <span aria-hidden>{application.emoji}</span>
            </div>
            <Badge
              variant='outline'
              className={cn('gap-1.5', statusMeta.className)}
            >
              <span
                className={cn(
                  'size-1.5 rounded-full',
                  statusMeta.dotClassName,
                )}
              />
              {statusMeta.label}
            </Badge>
          </div>
          <CardTitle className='mt-3 text-base leading-snug'>
            <span className='flex items-start gap-1'>
              {application.name}
              <ArrowUpRight className='mt-1 size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100' />
            </span>
          </CardTitle>
          <p className='text-sm text-muted-foreground'>{application.organizer}</p>
        </CardHeader>
        <CardContent className='mt-auto space-y-3 px-5'>
          <p className='line-clamp-2 text-sm text-muted-foreground'>
            {application.blurb}
          </p>
          <div className='flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground'>
            <span className='inline-flex items-center gap-1.5'>
              <CalendarClock className='size-3.5' />
              {formatDeadline(application.deadline)}
              {isOpen && daysLeft >= 0 && (
                <span className='text-foreground/70'>· {daysLeft}d left</span>
              )}
            </span>
            <span className='inline-flex items-center gap-1.5'>
              <MapPin className='size-3.5' />
              {application.mode}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
