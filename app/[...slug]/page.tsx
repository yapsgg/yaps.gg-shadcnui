import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { GeneratedPageContent } from './GeneratedPageContent'
import { GeneratedPageSkeleton } from './GeneratedPageSkeleton'
import { normalizeSlug } from '@/lib/slug'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

type PageProps = {
  params: Promise<{ slug: string[] }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const path = normalizeSlug(slug)
  if (!path) notFound()

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-muted-foreground text-xs tracking-widest uppercase">
        yaps.gg/{path}
      </p>

      <Suspense fallback={<GeneratedPageSkeleton />}>
        <GeneratedPageContent path={path} />
      </Suspense>
    </article>
  )
}
