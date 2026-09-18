import { createClient } from 'redis'

type RedisClient = ReturnType<typeof createClient>

declare global {
  // eslint-disable-next-line no-var
  var __redisClient: RedisClient | undefined
}

/**
 * Resolves the Redis connection string.
 * Supports the Vercel integration prefix (`YAPSGG_REDIS_URL`) and the generic name.
 */
function redisUrl(): string | undefined {
  return process.env.YAPSGG_REDIS_URL ?? process.env.REDIS_URL
}

/** True when a Redis connection string is available. */
export function isRedisConfigured(): boolean {
  return Boolean(redisUrl())
}

/**
 * Returns a shared, lazily-connected Redis client.
 * The client is cached on `globalThis` so dev HMR does not open new connections.
 */
export async function getRedis(): Promise<RedisClient> {
  let client = globalThis.__redisClient

  if (!client) {
    client = createClient({ url: redisUrl() }) as RedisClient
    client.on('error', (error) => console.error('[redis] error', error))
    globalThis.__redisClient = client
  }

  if (!client.isOpen) {
    await client.connect()
  }

  return client
}
