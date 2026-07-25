export class SubmissionDeduper {
  private readonly entries = new Map<string, number>();

  constructor(private readonly ttlMs = 120_000) {}

  checkAndRemember(key: string, now = Date.now()): boolean {
    this.cleanup(now);
    const expiresAt = this.entries.get(key);
    if (expiresAt && expiresAt > now) return true;
    this.entries.set(key, now + this.ttlMs);
    return false;
  }

  clear(): void {
    this.entries.clear();
  }

  private cleanup(now: number): void {
    for (const [key, expiresAt] of this.entries) {
      if (expiresAt <= now) this.entries.delete(key);
    }
  }
}

export class WindowRateLimiter {
  private readonly requests = new Map<string, number[]>();

  constructor(
    private readonly maxRequests = 5,
    private readonly windowMs = 10 * 60_000,
  ) {}

  isLimited(key: string, now = Date.now()): boolean {
    const cutoff = now - this.windowMs;
    const recent = (this.requests.get(key) ?? []).filter((timestamp) => timestamp > cutoff);
    if (recent.length >= this.maxRequests) {
      this.requests.set(key, recent);
      return true;
    }
    recent.push(now);
    this.requests.set(key, recent);
    return false;
  }
}

declare global {
  var __leadDeduper: SubmissionDeduper | undefined;
  var __leadRateLimiter: WindowRateLimiter | undefined;
}

export const leadDeduper = globalThis.__leadDeduper ?? new SubmissionDeduper();
export const leadRateLimiter = globalThis.__leadRateLimiter ?? new WindowRateLimiter();

if (process.env.NODE_ENV !== "production") {
  globalThis.__leadDeduper = leadDeduper;
  globalThis.__leadRateLimiter = leadRateLimiter;
}
