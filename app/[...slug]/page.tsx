import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { GeneratedPageView } from './GeneratedPageView'
import { generatePage } from '@/lib/generate-page'
import { getCachedPage, setCachedPage } from '@/lib/page-cache'
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

  let page = await getCachedPage(path)

  if (!page) {
    page = await generatePage(path)
    if (!page) notFound()
    await setCachedPage(path, page)
  }

  return <GeneratedPageView path={path} page={page} />
}
