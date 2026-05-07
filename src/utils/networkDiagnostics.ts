type NetworkDiagnosticsSummary = {
  totalEntries: number;
  totalTransferBytes: number;
  transferKB: number;
  totalDecodedBytes: number;
  decodedKB: number;
  byInitiator: Record<string, number>;
  byInitiatorCount: Record<string, number>;
  imageRequests: number;
  imageTransferKB: number;
  repeatedImageRequests: number;
  repeatedImageTransferKB: number;
  repeatedImageCacheHits: number;
};

type ApiDiagnosticsSummary = {
  requests: number;
  responses: number;
  errors: number;
  estimatedResponseKB: number;
  byEndpointKB: Record<string, number>;
  cacheHits: number;
  cacheMisses: number;
};

const DIAG_FLAG_KEY = 'networkDiagnostics';
const DIAG_INTERVAL_MS = 15000;
const apiDiagnosticsSummary: ApiDiagnosticsSummary = {
  requests: 0,
  responses: 0,
  errors: 0,
  estimatedResponseKB: 0,
  byEndpointKB: {},
  cacheHits: 0,
  cacheMisses: 0,
};

export const isNetworkDiagnosticsEnabled = (): boolean =>
  localStorage.getItem(DIAG_FLAG_KEY) === '1';

const normalizeEndpoint = (url?: string): string => {
  if (!url) return 'unknown';
  try {
    const parsed = new URL(url, window.location.origin);
    return parsed.pathname;
  } catch {
    return url.split('?')[0];
  }
};

const estimateResponseBytes = (
  data: unknown,
  headers?: Record<string, string | number | undefined>,
): number => {
  const contentLengthRaw =
    headers?.['content-length'] ??
    headers?.['Content-Length'] ??
    headers?.['CONTENT-LENGTH'];
  const contentLength = Number(contentLengthRaw);
  if (Number.isFinite(contentLength) && contentLength > 0) return contentLength;
  try {
    if (typeof data === 'string') return data.length;
    return JSON.stringify(data).length;
  } catch {
    return 0;
  }
};

export const recordApiRequest = (url?: string): void => {
  if (!isNetworkDiagnosticsEnabled()) return;
  apiDiagnosticsSummary.requests += 1;
  const endpoint = normalizeEndpoint(url);
  if (!apiDiagnosticsSummary.byEndpointKB[endpoint]) {
    apiDiagnosticsSummary.byEndpointKB[endpoint] = 0;
  }
};

export const recordApiResponse = (
  url: string | undefined,
  data: unknown,
  headers?: Record<string, string | number | undefined>,
): void => {
  if (!isNetworkDiagnosticsEnabled()) return;
  apiDiagnosticsSummary.responses += 1;
  const endpoint = normalizeEndpoint(url);
  const responseKB = estimateResponseBytes(data, headers) / 1024;
  apiDiagnosticsSummary.estimatedResponseKB += responseKB;
  apiDiagnosticsSummary.byEndpointKB[endpoint] =
    (apiDiagnosticsSummary.byEndpointKB[endpoint] || 0) + responseKB;
};

export const recordApiError = (): void => {
  if (!isNetworkDiagnosticsEnabled()) return;
  apiDiagnosticsSummary.errors += 1;
};

export const recordApiCacheHit = (): void => {
  if (!isNetworkDiagnosticsEnabled()) return;
  apiDiagnosticsSummary.cacheHits += 1;
};

export const recordApiCacheMiss = (): void => {
  if (!isNetworkDiagnosticsEnabled()) return;
  apiDiagnosticsSummary.cacheMisses += 1;
};

export const initNetworkDiagnostics = (): (() => void) => {
  if (
    !isNetworkDiagnosticsEnabled() ||
    typeof window === 'undefined' ||
    !('PerformanceObserver' in window)
  ) {
    return () => undefined;
  }

  const observed = new Set<string>();
  const imageRequestCountByUrl = new Map<string, number>();
  const repeatedImageTransferByUrlKB = new Map<string, number>();
  let summary: NetworkDiagnosticsSummary = {
    totalEntries: 0,
    totalTransferBytes: 0,
    transferKB: 0,
    totalDecodedBytes: 0,
    decodedKB: 0,
    byInitiator: {},
    byInitiatorCount: {},
    imageRequests: 0,
    imageTransferKB: 0,
    repeatedImageRequests: 0,
    repeatedImageTransferKB: 0,
    repeatedImageCacheHits: 0,
  };

  const toKB = (bytes: number): number => bytes / 1024;

  const isImageEntry = (entry: PerformanceResourceTiming): boolean =>
    entry.initiatorType === 'img' || /\.(png|jpe?g|webp|gif|svg)(\?|$)/i.test(entry.name);

  const buildTopRepeatedImages = (): string => {
    return Array.from(repeatedImageTransferByUrlKB.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([url, kb]) => {
        const numRequests = imageRequestCountByUrl.get(url) || 0;
        return `${numRequests}x ${kb.toFixed(1)}KB ${url}`;
      })
      .join(' || ');
  };

  const printSummary = () => {
    const byInitiatorRows = Object.entries(summary.byInitiator)
      .sort((a, b) => b[1] - a[1])
      .map(([type, kb]) => {
        const count = summary.byInitiatorCount[type] || 0;
        return `${type}: ${kb.toFixed(2)}KB (${count} reqs)`;
      })
      .join(' | ');
    const repeatedHitRate =
      summary.repeatedImageRequests === 0
        ? 0
        : (summary.repeatedImageCacheHits / summary.repeatedImageRequests) * 100;
    const apiCacheDenominator =
      apiDiagnosticsSummary.cacheHits + apiDiagnosticsSummary.cacheMisses;
    const apiCacheHitRate =
      apiCacheDenominator === 0
        ? 0
        : (apiDiagnosticsSummary.cacheHits / apiCacheDenominator) * 100;
    const topRepeatedImages = buildTopRepeatedImages();
    const topApiEndpoints = Object.entries(apiDiagnosticsSummary.byEndpointKB)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([endpoint, kb]) => `${endpoint}: ${kb.toFixed(2)}KB`)
      .join(' | ');

    const fetchTransferKB = summary.byInitiator.fetch || 0;
    const fetchRequests = summary.byInitiatorCount.fetch || 0;
    const xhrTransferKB = summary.byInitiator.xmlhttprequest || 0;
    const xhrRequests = summary.byInitiatorCount.xmlhttprequest || 0;

    console.info(
      `[net-diag] entries=${summary.totalEntries} transfer=${summary.transferKB.toFixed(
        1,
      )}KB decoded=${summary.decodedKB.toFixed(
        1,
      )}KB byType=[${byInitiatorRows}] images={total:${summary.imageRequests},transfer:${summary.imageTransferKB.toFixed(
        1,
      )}KB,repeated:${summary.repeatedImageRequests},repeatedTransfer:${summary.repeatedImageTransferKB.toFixed(
        1,
      )}KB,repeatedCacheHitRate:${repeatedHitRate.toFixed(
        1,
      )}%} backendLike={fetch:${fetchTransferKB.toFixed(
        3,
      )}KB/${fetchRequests}req,xhr:${xhrTransferKB.toFixed(
        3,
      )}KB/${xhrRequests}req,totalBytes:${summary.totalTransferBytes}} api={req:${
        apiDiagnosticsSummary.requests
      },res:${apiDiagnosticsSummary.responses},err:${apiDiagnosticsSummary.errors},estResponseKB:${apiDiagnosticsSummary.estimatedResponseKB.toFixed(
        2,
      )},cacheHit:${apiDiagnosticsSummary.cacheHits},cacheMiss:${
        apiDiagnosticsSummary.cacheMisses
      },cacheHitRate:${apiCacheHitRate.toFixed(1)}%}`,
    );
    if (topRepeatedImages) {
      console.info(`[net-diag] top repeated images => ${topRepeatedImages}`);
    }
    if (topApiEndpoints) {
      console.info(`[net-diag] top api endpoints => ${topApiEndpoints}`);
    }
  };

  const consumeEntries = (entries: PerformanceResourceTiming[]) => {
    entries.forEach((entry) => {
      const key = `${entry.name}|${entry.startTime}|${entry.responseEnd}`;
      if (observed.has(key)) return;
      observed.add(key);

      const transferBytes = entry.transferSize || 0;
      const decodedBytes = entry.decodedBodySize || 0;
      const transferKB = toKB(transferBytes);
      const decodedKB = toKB(decodedBytes);
      const initiatorType = entry.initiatorType || 'unknown';

      summary.totalEntries += 1;
      summary.totalTransferBytes += transferBytes;
      summary.transferKB += transferKB;
      summary.totalDecodedBytes += decodedBytes;
      summary.decodedKB += decodedKB;
      summary.byInitiator[initiatorType] =
        (summary.byInitiator[initiatorType] || 0) + transferKB;
      summary.byInitiatorCount[initiatorType] =
        (summary.byInitiatorCount[initiatorType] || 0) + 1;

      if (!isImageEntry(entry)) return;

      summary.imageRequests += 1;
      summary.imageTransferKB += transferKB;
      const prevTimesRequested = imageRequestCountByUrl.get(entry.name) || 0;
      const nextTimesRequested = prevTimesRequested + 1;
      imageRequestCountByUrl.set(entry.name, nextTimesRequested);
      const isRepeated = nextTimesRequested > 1;
      if (!isRepeated) return;

      summary.repeatedImageRequests += 1;
      summary.repeatedImageTransferKB += transferKB;
      if (transferKB === 0) {
        summary.repeatedImageCacheHits += 1;
      }
      if (transferKB > 0) {
        repeatedImageTransferByUrlKB.set(
          entry.name,
          (repeatedImageTransferByUrlKB.get(entry.name) || 0) + transferKB,
        );
      }
    });
  };

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries() as PerformanceResourceTiming[];
    consumeEntries(entries);
  });
  observer.observe({ entryTypes: ['resource'] });

  const flushInitialEntries = () => {
    const entries = performance.getEntriesByType(
      'resource',
    ) as PerformanceResourceTiming[];
    consumeEntries(entries);
  };
  flushInitialEntries();
  const intervalId = window.setInterval(printSummary, DIAG_INTERVAL_MS);
  // Expose a manual report hook for quick inspection from browser console.
  (window as any).__netDiagReport = printSummary;

  console.info(
    '[net-diag] enabled. Use __netDiagReport() for on-demand report. Set localStorage.networkDiagnostics=0 to disable.',
  );

  return () => {
    window.clearInterval(intervalId);
    observer.disconnect();
    delete (window as any).__netDiagReport;
    printSummary();
  };
};
