const RESERVED_SEGMENTS = new Set([
  'api',
  '_next',
  'robots.txt',
  'sitemap.xml',
  'favicon.ico',
  'opengraph-image.png',
])

const BLOCKED_PATHS = new Set(['login', 'admin', 'wp-admin', 'env', 'secrets'])

const MAX_SEGMENTS = 4
const MAX_SEGMENT_LENGTH = 60

/**
 * Normalizes a catch-all slug into a safe, canonical path.
 * Returns null when the path should 404 (invalid, reserved, or blocked).
 */
export function normalizeSlug(slug: string[] | undefined): string | null {
  if (!slug || slug.length === 0 || slug.length > MAX_SEGMENTS) return null

  const parts: string[] = []

  for (const raw of slug) {
    let part: string
    try {
      part = decodeURIComponent(raw).toLowerCase().trim()
    } catch {
      return null
    }

    if (!part || part.length > MAX_SEGMENT_LENGTH) return null
    if (!/^[a-z0-9][a-z0-9-]*$/.test(part)) return null
    if (RESERVED_SEGMENTS.has(part)) return null

    parts.push(part)
  }

  const path = parts.join('/')
  if (BLOCKED_PATHS.has(path)) return null

  return path
}
