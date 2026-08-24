/**
 * Zinvent Shared - Main Entry Point
 * Exports all types, utilities, and schemas
 */

// Types - explicit exports to avoid conflicts
export type {
  ProductId,
  Currency,
  TaxMode,
  Frequency,
  StorageSchema,
  ProStatus,
  UsageTracker,
  ProductStorage,
  UserPreferences,
  // InvoicePH
  InvoicePHData,
  SellerInfo,
  BuyerInfo,
  InvoiceItem,
  InvoiceSettings,
  InvoiceRecord,
  InvoiceTotals,
  // TaxCalcPH
  TaxCalcPHData,
  TaxProfile,
  IncomeBreakdown,
  TaxResults,
  TaxBreakdown,
  TaxRecord,
  // NegosyoSheet
  NegosyoSheetData,
  InventoryItem,
  SaleRecord,
  SaleItem,
  UtangRecord,
  ExpenseRecord,
  NegosyoSettings,
  // TipPoolCalc
  TipPoolCalcData,
  TipPool,
  Employee,
  Period,
  TipPoolSettings,
  // PayslipPH
  PayslipPHData,
  PayEmployee,
  Allowance,
  Deduction,
  Payroll,
  PayrollEmployee,
  PayrollDeduction,
  PayrollSettings,
  GovRates,
  TaxTable,
  // SellerPrice
  SellerPriceData,
  SellerProduct,
  MarketplaceConfig,
  PriceCalculation,
  FeeBreakdown,
  SellerSettings,
  // Generic
  GenericProductData,
  // Payment
  UnlockCode,
  PaymentRequest,
  PaymentResponse,
  AffiliateLink,
  // Analytics
  AnalyticsEvent,
  FunnelStep,
  // Utility
  DeepPartial,
  RequiredKeys,
  OptionalKeys
} from './types';

export {
  isProductId,
  getStorageKey,
  getProKey,
  getUsageKey
} from './types';

// Utils
export {
  getStorageKey as getStorageKeyUtil,
  getProKey as getProKeyUtil,
  getUsageKey as getUsageKeyUtil,
  getDataKey,
  getPrefsKey,
  DEFAULT_PREFERENCES,
  DEFAULT_PRO_STATUS,
  createUsageTracker,
  DEFAULT_SCHEMA,
  initProductStorage,
  loadProductStorage,
  saveProductStorage,
  checkProAccess,
  getProStatus,
  activatePro,
  checkUsageLimit,
  incrementUsage,
  formatCurrency,
  formatNumber,
  formatPercent,
  formatDate,
  formatDateTime,
  validateTIN,
  formatTIN,
  validateEmail,
  validatePhonePH,
  formatPhonePH,
  downloadFile,
  downloadJSON,
  downloadCSV,
  initAnalytics,
  trackEvent,
  debounce,
  throttle,
  ZinventError,
  handleError,
  roundTo,
  clamp,
  safeDivide
} from './utils';

// Schemas
export {
  ProductIdSchema,
  CurrencySchema,
  TaxModeSchema,
  FrequencySchema,
  ProStatusSchema,
  UsageTrackerSchema,
  UserPreferencesSchema,
  StorageSchemaSchema,
  ProductStorageSchema,
  // InvoicePH
  SellerInfoSchema,
  BuyerInfoSchema,
  InvoiceItemSchema,
  InvoiceSettingsSchema,
  InvoiceTotalsSchema,
  InvoiceRecordSchema,
  InvoicePHDataSchema,
  // TaxCalcPH
  TaxProfileSchema,
  IncomeBreakdownSchema,
  TaxBreakdownSchema,
  TaxResultsSchema,
  TaxRecordSchema,
  TaxCalcPHDataSchema,
  // NegosyoSheet
  InventoryItemSchema,
  SaleItemSchema,
  SaleRecordSchema,
  UtangRecordSchema,
  ExpenseRecordSchema,
  NegosyoSettingsSchema,
  NegosyoSheetDataSchema,
  // TipPoolCalc
  EmployeeSchema,
  TipPoolSchema,
  PeriodSchema,
  TipPoolSettingsSchema,
  TipPoolCalcDataSchema,
  // PayslipPH
  AllowanceSchema,
  DeductionSchema,
  PayEmployeeSchema,
  PayrollDeductionSchema,
  PayrollEmployeeSchema,
  PayrollSchema,
  PayrollSettingsSchema,
  GovRatesSchema,
  TaxTableSchema,
  PayslipPHDataSchema,
  // SellerPrice
  SellerProductSchema,
  MarketplaceConfigSchema,
  FeeBreakdownSchema,
  PriceCalculationSchema,
  SellerSettingsSchema,
  SellerPriceDataSchema,
  // Payment
  UnlockCodeSchema,
  PaymentRequestSchema,
  PaymentResponseSchema,
  AffiliateLinkSchema,
  // Analytics
  AnalyticsEventSchema,
  FunnelStepSchema,
  // Helpers
  validateProductData,
  validateUnlockCode,
  PRODUCT_DATA_SCHEMAS,
  getProductSchema
} from './schemas';