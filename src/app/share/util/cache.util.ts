import { isPlatformServer } from '@angular/common';
import { makeStateKey, TransferState } from '@angular/core';
import { Observable, of, shareReplay, tap } from 'rxjs';

/**
 * @description Utility function to cache Observable results with TTL + TransferState (SSR-safe)
 * @param key Unique cache key
 * @param fetchFn Function that returns the Observable (usually HTTP request)
 * @param cache Map<string, CacheEntry> to store data in memory
 * @param transferState Angular TransferState (for SSR hydration)
 * @param platformId PLATFORM_ID (to detect server/browser)
 * @param ttl Optional TTL in milliseconds (default = 5 minutes)
 */
export function getCached<T>(
  key: string,
  fetchFn: () => Observable<T>,
  cache: Map<string, { time: number; data$: Observable<T> }>,
  transferState: TransferState,
  platformId: Object,
  ttl: number = 5 * 60 * 1000,
): Observable<T> {
  const now = Date.now();

  // 1️⃣ Check memory cache
  const entry = cache.get(key);
  if (entry && now - entry.time < ttl) return entry.data$;

  // 2️⃣ Check TransferState (SSR → browser hydration)
  const stateKey = makeStateKey<T>(key);
  const existingState = transferState.get(stateKey, null as any);
  if (existingState) return of(existingState);

  // 3️⃣ Fetch new data
  const data$ = fetchFn().pipe(
    shareReplay(1),
    tap((data) => {
      cache.set(key, { time: Date.now(), data$ });

      // Save to TransferState on server
      if (isPlatformServer(platformId)) {
        transferState.set(stateKey, data);
      }
    }),
  );

  cache.set(key, { time: Date.now(), data$ });
  return data$;
}
