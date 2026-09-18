import { getRedis, isRedisConfigured } from '@/lib/redis'

export type RateLimitResult = {
  allowed: boolean
  limit: number
  remaining: number
}

/**
 * Fixed-window rate limit backed by Redis INCR + EXPIRE.
 * Fails open (allows the request) if Redis is unavailable, so a cache outage
 * never takes the site down.
 */
export async function checkRateLimit(
  key: string,
  limit: number,
  windowSeconds: number,
): Promise<RateLimitResult> {
  if (!isRedisConfigured()) {
    return { allowed: true, limit, remaining: limit }
  }

  try {
    const redis = await getRedis()
    const redisKey = `ratelimit:v1:${key}`
    const count = await redis.incr(redisKey)

    if (count === 1) {
      await redis.expire(redisKey, windowSeconds)
    }

    return {
      allowed: count <= limit,
      limit,
      remaining: Math.max(0, limit - count),
    }
  } catch (error) {
    console.error('[rate-limit] failed', error)
    return { allowed: true, limit, remaining: limit }
  }
}
