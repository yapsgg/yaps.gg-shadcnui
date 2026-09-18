import type { GeneratedPage } from '@/lib/generate-page'
import { getRedis, isRedisConfigured } from '@/lib/redis'

const KEY_PREFIX = 'genpage:v1:'
const TTL_SECONDS = 60 * 60 * 24 // 1 day

export function pageCacheKey(slug: string): string {
  return `${KEY_PREFIX}${slug}`
}

/** Reads a generated page from Redis, or null on a miss / when Redis is unconfigured. */
export async function getCachedPage(
  slug: string,
): Promise<GeneratedPage | null> {
  if (!isRedisConfigured()) return null

  try {
    const redis = await getRedis()
    const raw = await redis.get(pageCacheKey(slug))
    if (!raw) return null
    return JSON.parse(raw) as GeneratedPage
  } catch (error) {
    console.error('[page-cache] get failed', error)
    return null
  }
}

/** Stores a generated page in Redis with a TTL. Best-effort: never throws. */
export async function setCachedPage(
  slug: string,
  page: GeneratedPage,
): Promise<void> {
  if (!isRedisConfigured()) return

  try {
    const redis = await getRedis()
    await redis.set(pageCacheKey(slug), JSON.stringify(page), {
      EX: TTL_SECONDS,
    })
  } catch (error) {
    console.error('[page-cache] set failed', error)
  }
}
