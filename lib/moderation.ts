import type { GeneratedPage } from '@/lib/generate-page'

/**
 * Lightweight output check. Not a substitute for a real moderation API, but it
 * keeps obviously unsafe generations out of the cache and off the page.
 */
const FLAGGED_PATTERNS: RegExp[] = [
  /\bcsam\b/i,
  /\bchild\s*(porn|pornography|sexual|erotica|nude)/i,
  /\b(underage|minor)s?\s*(sex|nude|nudes|porn)/i,
  /\b(rape|molest|groom)\w*/i,
  /\bterror(ist|ism)\s*(attack|plot|bomb|recruit)/i,
  /\b(bomb|explosive|ied)\s*(making|recipe|instruction|synthesis|build)/i,
  /\b(meth|methamphetamine|fentanyl)\s*(synthesis|recipe|manufactur|precursor)/i,
  /\b(pirated|torrent|warez)\s*(software|movies?|books?|downloads?)/i,
  /\b(kill|hang)\s+(your|my)self\b/i,
  /\bhow\s+to\s+(make|build)\s+(a\s+)?(gun|weapon|silencer)\b/i,
]

export function isFlagged(page: GeneratedPage): boolean {
  const text = [
    page.title,
    page.tagline,
    page.intro,
    ...page.sections.flatMap((section) => [section.heading, section.body]),
    ...page.tags,
  ].join('\n')

  return FLAGGED_PATTERNS.some((pattern) => pattern.test(text))
}
