/**
 * Zinvent Shared Utilities
 * Storage, validation, formatting, and cross-product helpers
 */
import type { ProductId, ProductStorage, UserPreferences, ProStatus, UsageTracker, StorageSchema, Currency } from '../types';
export declare function getStorageKey(product: ProductId, suffix?: string): string;
export declare function getProKey(product: ProductId): string;
export declare function getUsageKey(product: ProductId): string;
export declare function getDataKey(product: ProductId): string;
export declare function getPrefsKey(product: ProductId): string;
export declare const DEFAULT_PREFERENCES: UserPreferences;
export declare const DEFAULT_PRO_STATUS: ProStatus;
export declare function createUsageTracker(limit: number): UsageTracker;
export declare const DEFAULT_SCHEMA: StorageSchema;
export declare function initProductStorage<T = unknown>(product: ProductId, defaultData: T, freeLimit: number): ProductStorage<T>;
export declare function loadProductStorage<T = unknown>(product: ProductId): ProductStorage<T> | null;
export declare function saveProductStorage<T = unknown>(product: ProductId, storage: ProductStorage<T>): void;
export declare function checkProAccess(product: ProductId): boolean;
export declare function getProStatus(product: ProductId): ProStatus;
export declare function activatePro(product: ProductId, code: string, source?: ProStatus['source']): boolean;
export declare function checkUsageLimit(product: ProductId): {
    allowed: boolean;
    remaining: number;
};
export declare function incrementUsage(product: ProductId): void;
export declare function formatCurrency(amount: number, currency?: Currency, locale?: string): string;
export declare function formatNumber(num: number, locale?: string, decimals?: number): string;
export declare function formatPercent(value: number, locale?: string): string;
export declare function formatDate(date: string | Date, locale?: string): string;
export declare function formatDateTime(date: string | Date, locale?: string): string;
export declare function validateTIN(tin: string): boolean;
export declare function formatTIN(tin: string): string;
export declare function validateEmail(email: string): boolean;
export declare function validatePhonePH(phone: string): boolean;
export declare function formatPhonePH(phone: string): string;
export declare function downloadFile(content: string | Blob, filename: string, mimeType: string): void;
export declare function downloadJSON(data: unknown, filename: string): void;
export declare function downloadCSV(headers: string[], rows: string[][], filename: string): void;
export declare function initAnalytics(uid?: string): void;
export declare function trackEvent(event: string, product: ProductId, properties?: Record<string, unknown>): void;
export declare function debounce<T extends (...args: unknown[]) => unknown>(fn: T, delay: number): (...args: Parameters<T>) => void;
export declare function throttle<T extends (...args: unknown[]) => unknown>(fn: T, limit: number): (...args: Parameters<T>) => void;
export declare class ZinventError extends Error {
    readonly code: string;
    readonly product: ProductId;
    readonly recoverable: boolean;
    constructor(message: string, code: string, product: ProductId, recoverable?: boolean);
}
export declare function handleError(error: unknown, context: string): ZinventError;
export declare function roundTo(value: number, decimals?: number): number;
export declare function clamp(value: number, min: number, max: number): number;
export declare function safeDivide(numerator: number, denominator: number, fallback?: number): number;
export * from '../types';
//# sourceMappingURL=index.d.ts.map