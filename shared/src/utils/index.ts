/**
 * Zinvent Shared Utilities
 * Storage, validation, formatting, and cross-product helpers
 */

import type {
  ProductId,
  ProductStorage,
  UserPreferences,
  ProStatus,
  UsageTracker,
  StorageSchema,
  UnlockCode,
  Currency,
  AnalyticsEvent
} from '../types';

// ============================================
// STORAGE UTILITIES
// ============================================

const CURRENT_SCHEMA_VERSION = 1;
const STORAGE_PREFIX = 'zinvent_';

export function getStorageKey(product: ProductId, suffix = ''): string {
  return `${STORAGE_PREFIX}${product}_v${CURRENT_SCHEMA_VERSION}${suffix ? '_' + suffix : ''}`;
}

export function getProKey(product: ProductId): string {
  return getStorageKey(product, 'pro');
}

export function getUsageKey(product: ProductId): string {
  return getStorageKey(product, 'usage');
}

export function getDataKey(product: ProductId): string {
  return getStorageKey(product, 'data');
}

export function getPrefsKey(product: ProductId): string {
  return getStorageKey(product, 'prefs');
}

// Default preferences
export const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'system',
  currency: 'PHP',
  language: 'en',
  notifications: true,
  autoSave: true
};

// Default pro status
export const DEFAULT_PRO_STATUS: ProStatus = {
  isPro: false,
  source: 'demo'
};

// Default usage tracker
export function createUsageTracker(limit: number): UsageTracker {
  return {
    runs: 0,
    lastReset: new Date().toISOString().split('T')[0],
    limit
  };
}

// Default schema
export const DEFAULT_SCHEMA: StorageSchema = {
  version: CURRENT_SCHEMA_VERSION,
  lastMigration: new Date().toISOString(),
  data: {}
};

// Initialize product storage
export function initProductStorage<T = unknown>(
  product: ProductId,
  defaultData: T,
  freeLimit: number
): ProductStorage<T> {
  const storage: ProductStorage<T> = {
    schema: DEFAULT_SCHEMA,
    pro: DEFAULT_PRO_STATUS,
    usage: createUsageTracker(freeLimit),
    data: defaultData,
    preferences: DEFAULT_PREFERENCES
  };
  saveProductStorage(product, storage);
  return storage;
}

// Load product storage
export function loadProductStorage<T = unknown>(product: ProductId): ProductStorage<T> | null {
  try {
    const raw = localStorage.getItem(getStorageKey(product));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ProductStorage<T>;
    
    // Migration logic here if schema version changes
    if (parsed.schema.version !== CURRENT_SCHEMA_VERSION) {
      return migrateStorage(product, parsed);
    }
    
    return parsed;
  } catch {
    return null;
  }
}

// Save product storage
export function saveProductStorage<T = unknown>(product: ProductId, storage: ProductStorage<T>): void {
  localStorage.setItem(getStorageKey(product), JSON.stringify(storage));
}

// Migrate storage (placeholder for future versions)
function migrateStorage<T = unknown>(product: ProductId, storage: ProductStorage<T>): ProductStorage<T> {
  // For v1, no migration needed
  storage.schema.version = CURRENT_SCHEMA_VERSION;
  storage.schema.lastMigration = new Date().toISOString();
  saveProductStorage(product, storage);
  return storage;
}

// ============================================
// PRO / USAGE UTILITIES
// ============================================

export function checkProAccess(product: ProductId): boolean {
  const storage = loadProductStorage(product);
  return storage?.pro.isPro ?? false;
}

export function getProStatus(product: ProductId): ProStatus {
  const storage = loadProductStorage(product);
  return storage?.pro ?? DEFAULT_PRO_STATUS;
}

export function activatePro(product: ProductId, code: string, source: ProStatus['source'] = 'manual'): boolean {
  const storage = loadProductStorage(product);
  if (!storage) return false;
  
  // Validate code (in production, check against server/database)
  const validCodes = getValidCodes(product);
  if (!validCodes.includes(code.toUpperCase())) return false;
  
  storage.pro = {
    isPro: true,
    code: code.toUpperCase(),
    activatedAt: new Date().toISOString(),
    source
  };
  saveProductStorage(product, storage);
  return true;
}

export function checkUsageLimit(product: ProductId): { allowed: boolean; remaining: number } {
  const storage = loadProductStorage(product);
  if (!storage) return { allowed: true, remaining: 999 };
  if (storage.pro.isPro) return { allowed: true, remaining: Infinity };
  
  const today = new Date().toISOString().split('T')[0];
  if (storage.usage.lastReset !== today) {
    storage.usage.runs = 0;
    storage.usage.lastReset = today;
    saveProductStorage(product, storage);
  }
  
  const remaining = Math.max(0, storage.usage.limit - storage.usage.runs);
  return { allowed: storage.usage.runs < storage.usage.limit, remaining };
}

export function incrementUsage(product: ProductId): void {
  const storage = loadProductStorage(product);
  if (!storage || storage.pro.isPro) return;
  
  const today = new Date().toISOString().split('T')[0];
  if (storage.usage.lastReset !== today) {
    storage.usage.runs = 0;
    storage.usage.lastReset = today;
  }
  
  storage.usage.runs += 1;
  saveProductStorage(product, storage);
}

// Valid unlock codes (in production, fetch from secure source)
function getValidCodes(product: ProductId): string[] {
  // These should be loaded from a secure source in production
  // For now, return empty - actual codes in app.js
  return [];
}

// ============================================
// FORMATTING UTILITIES
// ============================================

export function formatCurrency(amount: number, currency: Currency = 'PHP', locale = 'en-PH'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: currency === 'PHP' ? 0 : 2,
    maximumFractionDigits: currency === 'PHP' ? 0 : 2
  }).format(amount);
}

export function formatNumber(num: number, locale = 'en-PH', decimals = 0): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num);
}

export function formatPercent(value: number, locale = 'en-PH'): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
  }).format(value / 100);
}

export function formatDate(date: string | Date, locale = 'en-PH'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(d);
}

export function formatDateTime(date: string | Date, locale = 'en-PH'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(d);
}

// ============================================
// VALIDATION UTILITIES
// ============================================

export function validateTIN(tin: string): boolean {
  // PH TIN format: 999-999-999-000 or 999999999000
  const cleaned = tin.replace(/[-\s]/g, '');
  return /^\d{12}$/.test(cleaned);
}

export function formatTIN(tin: string): string {
  const cleaned = tin.replace(/[-\s]/g, '');
  if (cleaned.length === 12) {
    return `${cleaned.slice(0,3)}-${cleaned.slice(3,6)}-${cleaned.slice(6,9)}-${cleaned.slice(9)}`;
  }
  return tin;
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhonePH(phone: string): boolean {
  // PH mobile: 09XX-XXX-XXXX or +639XX-XXX-XXXX
  const cleaned = phone.replace(/[\s-]/g, '');
  return /^(?:\+63|0)9\d{9}$/.test(cleaned);
}

export function formatPhonePH(phone: string): string {
  const cleaned = phone.replace(/[\s-]/g, '');
  if (cleaned.startsWith('+63')) {
    return `+63 ${cleaned.slice(3,5)} ${cleaned.slice(5,8)} ${cleaned.slice(8)}`;
  }
  if (cleaned.startsWith('09')) {
    return `${cleaned.slice(0,4)} ${cleaned.slice(4,7)} ${cleaned.slice(7)}`;
  }
  return phone;
}

// ============================================
// EXPORT UTILITIES
// ============================================

export function downloadFile(content: string | Blob, filename: string, mimeType: string): void {
  const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadJSON(data: unknown, filename: string): void {
  downloadFile(JSON.stringify(data, null, 2), filename, 'application/json');
}

export function downloadCSV(headers: string[], rows: string[][], filename: string): void {
  const content = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  downloadFile(content, filename, 'text/csv');
}

// ============================================
// ANALYTICS UTILITIES
// ============================================

let analyticsQueue: AnalyticsEvent[] = [];
let sessionId = crypto.randomUUID();
let userId: string | undefined;

export function initAnalytics(uid?: string): void {
  userId = uid;
  // Flush any queued events
  flushAnalytics();
}

export function trackEvent(event: string, product: ProductId, properties: Record<string, unknown> = {}): void {
  const evt: AnalyticsEvent = {
    event,
    product,
    properties,
    timestamp: new Date().toISOString(),
    sessionId,
    userId
  };
  
  analyticsQueue.push(evt);
  
  // Batch send every 10 events or 30 seconds
  if (analyticsQueue.length >= 10) {
    flushAnalytics();
  }
}

async function flushAnalytics(): Promise<void> {
  if (analyticsQueue.length === 0) return;
  
  const events = [...analyticsQueue];
  analyticsQueue = [];
  
  try {
    // In production, send to analytics endpoint
    // await fetch('/api/analytics', { method: 'POST', body: JSON.stringify({ events }) });
    console.debug('[Analytics] Flushed', events.length, 'events');
  } catch (err) {
    // Re-queue on failure
    analyticsQueue.unshift(...events);
    console.warn('[Analytics] Flush failed, re-queued', err);
  }
}

// Auto-flush on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    if (analyticsQueue.length > 0) {
      navigator.sendBeacon('/api/analytics', JSON.stringify({ events: analyticsQueue }));
    }
  });
  
  // Periodic flush
  setInterval(flushAnalytics, 30_000);
}

// ============================================
// DEBOUNCE / THROTTLE
// ============================================

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => { inThrottle = false; }, limit);
    }
  };
}

// ============================================
// ERROR HANDLING
// ============================================

export class ZinventError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly product: ProductId,
    public readonly recoverable: boolean = true
  ) {
    super(message);
    this.name = 'ZinventError';
  }
}

export function handleError(error: unknown, context: string): ZinventError {
  if (error instanceof ZinventError) return error;
  if (error instanceof Error) {
    return new ZinventError(error.message, 'UNKNOWN_ERROR', 'closer' as ProductId, true);
  }
  return new ZinventError(String(error), 'UNKNOWN_ERROR', 'closer' as ProductId, true);
}

// ============================================
// COMPUTATION HELPERS
// ============================================

export function roundTo(value: number, decimals = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function safeDivide(numerator: number, denominator: number, fallback = 0): number {
  return denominator === 0 ? fallback : numerator / denominator;
}

// ============================================
// EXPORT ALL
// ============================================

export * from '../types';