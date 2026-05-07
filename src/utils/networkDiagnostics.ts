type NetworkDiagnosticsSummary = {
  totalEntries: number;
  transferKB: number;
  decodedKB: number;
  byInitiator: Record<string, number>;
  imageRequests: number;
  imageTransferKB: number;
  repeatedImageRequests: number;
  repeatedImageTransferKB: number;
  repeatedImageCacheHits: number;
};

const DIAG_FLAG_KEY = 'networkDiagnostics';
const DIAG_INTERVAL_MS = 15000;

export const isNetworkDiagnosticsEnabled = (): boolean =>
  localStorage.getItem(DIAG_FLAG_KEY) === '1';

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
    transferKB: 0,
    decodedKB: 0,
    byInitiator: {},
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
      .map(([type, kb]) => `${type}: ${kb.toFixed(1)}KB`)
      .join(' | ');
    const repeatedHitRate =
      summary.repeatedImageRequests === 0
        ? 0
        : (summary.repeatedImageCacheHits / summary.repeatedImageRequests) * 100;
    const topRepeatedImages = buildTopRepeatedImages();

    console.info(
      `[net-diag] entries=${summary.totalEntries} transfer=${summary.transferKB.toFixed(
        1,
      )}KB decoded=${summary.decodedKB.toFixed(
        1,
      )}KB byType=[${byInitiatorRows}] images={total:${summary.imageRequests},transfer:${summary.imageTransferKB.toFixed(
        1,
      )}KB,repeated:${summary.repeatedImageRequests},repeatedTransfer:${summary.repeatedImageTransferKB.toFixed(
        1,
      )}KB,repeatedCacheHitRate:${repeatedHitRate.toFixed(1)}%}`,
    );
    if (topRepeatedImages) {
      console.info(`[net-diag] top repeated images => ${topRepeatedImages}`);
    }
  };

  const consumeEntries = (entries: PerformanceResourceTiming[]) => {
    entries.forEach((entry) => {
      const key = `${entry.name}|${entry.startTime}|${entry.responseEnd}`;
      if (observed.has(key)) return;
      observed.add(key);

      const transferKB = toKB(entry.transferSize || 0);
      const decodedKB = toKB(entry.decodedBodySize || 0);
      const initiatorType = entry.initiatorType || 'unknown';

      summary.totalEntries += 1;
      summary.transferKB += transferKB;
      summary.decodedKB += decodedKB;
      summary.byInitiator[initiatorType] =
        (summary.byInitiator[initiatorType] || 0) + transferKB;

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
