import { headers } from 'next/headers'

import { GeneratedPageView } from './GeneratedPageView'
import { GenerationUnavailable } from './GenerationUnavailable'
import { generatePage } from '@/lib/generate-page'
import { isFlagged } from '@/lib/moderation'
import { getCachedPage, setCachedPage } from '@/lib/page-cache'
import { checkRateLimit } from '@/lib/rate-limit'

const PER_IP_LIMIT = 10
const PER_IP_WINDOW_SECONDS = 60 * 60 // 1 hour
const GLOBAL_LIMIT = 500
const GLOBAL_WINDOW_SECONDS = 60 * 60 * 24 // 1 day

async function clientIp(): Promise<string> {
  const requestHeaders = await headers()
  const forwarded = requestHeaders.get('x-forwarded-for')
  return (forwarded?.split(',')[0] ?? requestHeaders.get('x-real-ip') ?? 'unknown').trim()
}

export async function GeneratedPageContent({ path }: { path: string }) {
  const cached = await getCachedPage(path)
  if (cached) {
    return <GeneratedPageView page={cached} />
  }

  const ip = await clientIp()
  const day = new Date().toISOString().slice(0, 10)

  const [perIp, global] = await Promise.all([
    checkRateLimit(`ip:${ip}`, PER_IP_LIMIT, PER_IP_WINDOW_SECONDS),
    checkRateLimit(`global:${day}`, GLOBAL_LIMIT, GLOBAL_WINDOW_SECONDS),
  ])

  if (!perIp.allowed || !global.allowed) {
    return (
      <GenerationUnavailable
        title="Slow down a sec"
        message="This page hasn't been made yet, and you've hit the generation limit for now. Try again later, or explore the pages that already exist."
      />
    )
  }

  const page = await generatePage(path)

  if (!page) {
    return (
      <GenerationUnavailable
        title="Couldn't make this page"
        message="Something went wrong generating this page. Try another path, or check back in a bit."
      />
    )
  }

  if (isFlagged(page)) {
    return (
      <GenerationUnavailable
        title="Can't show this"
        message="This one isn't something we can generate. Try a different path."
      />
    )
  }

  await setCachedPage(path, page)
  return <GeneratedPageView page={page} />
}
