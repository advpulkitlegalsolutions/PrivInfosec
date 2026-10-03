import "server-only";

/**
 * Fixed-window rate limiter.
 * ------------------------------------------------------------------
 * In-memory implementation suitable for a single server instance. On
 * serverless or multi-instance hosting, replace `store` with a shared
 * store (e.g. Upstash Redis / Vercel KV) implementing the same interface.
 */
type Bucket = { count: number; resetAt: number };

export interface RateLimitStore {
  hit(key: string, windowMs: number): Promise<Bucket>;
}

class MemoryStore implements RateLimitStore {
  private buckets = new Map<string, Bucket>();
  async hit(key: string, windowMs: number) {
    const now = Date.now();
    // Opportunistic cleanup to bound memory.
    if (this.buckets.size > 5000) {
      for (const [k, b] of this.buckets) if (b.resetAt <= now) this.buckets.delete(k);
    }
    const existing = this.buckets.get(key);
    if (!existing || existing.resetAt <= now) {
      const fresh = { count: 1, resetAt: now + windowMs };
      this.buckets.set(key, fresh);
      return fresh;
    }
    existing.count += 1;
    return existing;
  }
}

const store: RateLimitStore = new MemoryStore();

export async function rateLimit(key: string, { limit, windowMs }: { limit: number; windowMs: number }) {
  const bucket = await store.hit(key, windowMs);
  return {
    success: bucket.count <= limit,
    remaining: Math.max(0, limit - bucket.count),
    retryAfterSeconds: Math.ceil((bucket.resetAt - Date.now()) / 1000),
  };
}
