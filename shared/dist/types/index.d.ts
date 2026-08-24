/**
 * Zinvent Shared Types
 * Single source of truth for all product data structures
 */
export type ProductId = 'closer' | 'invoiceph' | 'taxcalcph' | 'negosyosheet' | 'tippoolcalc' | 'payslipph' | 'sellerprice' | 'rentsheet' | 'moveinreport' | 'pumproute' | 'ratecalcph' | 'tradejournalph' | 'utangplanph' | 'commissionph' | 'freelancerkitph';
export type Currency = 'PHP' | 'USD';
export type TaxMode = 'nonvat' | 'vat-excl' | 'vat-incl';
export type Frequency = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'semi-annual' | 'annual';
export interface StorageSchema {
    version: number;
    lastMigration: string;
    data: Record<string, unknown>;
}
export interface ProStatus {
    isPro: boolean;
    code?: string;
    activatedAt?: string;
    source: 'gcash' | 'lemonsqueezy' | 'demo' | 'manual';
}
export interface UsageTracker {
    runs: number;
    lastReset: string;
    limit: number;
}
export interface ProductStorage<T = unknown> {
    schema: StorageSchema;
    pro: ProStatus;
    usage: UsageTracker;
    data: T;
    preferences: UserPreferences;
}
export interface UserPreferences {
    theme: 'light' | 'dark' | 'system';
    currency: Currency;
    language: 'en' | 'tl';
    notifications: boolean;
    autoSave: boolean;
}
export interface InvoicePHData {
    seller: SellerInfo;
    buyer: BuyerInfo;
    items: InvoiceItem[];
    settings: InvoiceSettings;
    history: InvoiceRecord[];
}
export interface SellerInfo {
    name: string;
    tin: string;
    address: string;
    vatMode: TaxMode;
    branchCode?: string;
}
export interface BuyerInfo {
    name: string;
    tin: string;
    address: string;
}
export interface InvoiceItem {
    id: string;
    description: string;
    quantity: number;
    unit: string;
    unitPrice: number;
    discount?: number;
    vatAmount?: number;
}
export interface InvoiceSettings {
    series: string;
    nextNumber: number;
    defaultTerms: string;
    notes: string;
    logo?: string;
}
export interface InvoiceRecord {
    id: string;
    number: string;
    date: string;
    buyer: BuyerInfo;
    items: InvoiceItem[];
    totals: InvoiceTotals;
    status: 'draft' | 'sent' | 'paid' | 'cancelled';
}
export interface InvoiceTotals {
    subtotal: number;
    discount: number;
    vat: number;
    total: number;
}
export interface TaxCalcPHData {
    profile: TaxProfile;
    income: IncomeBreakdown;
    results: TaxResults;
    history: TaxRecord[];
}
export interface TaxProfile {
    taxYear: number;
    status: 'single' | 'married' | 'head-of-family';
    dependents: number;
    isSenior: boolean;
    isPWD: boolean;
}
export interface IncomeBreakdown {
    compensation: number;
    business: number;
    professional: number;
    capitalGains: number;
    passive: number;
    mixedIncome: boolean;
}
export interface TaxResults {
    taxableIncome: number;
    incomeTax: number;
    percentageTax: number;
    totalTax: number;
    effectiveRate: number;
    regime: 'graduated' | '8-percent' | 'osd';
    breakdown: TaxBreakdown[];
}
export interface TaxBreakdown {
    bracket: string;
    rate: number;
    base: number;
    tax: number;
}
export interface TaxRecord {
    id: string;
    year: number;
    profile: TaxProfile;
    results: TaxResults;
    createdAt: string;
}
export interface NegosyoSheetData {
    inventory: InventoryItem[];
    sales: SaleRecord[];
    utang: UtangRecord[];
    expenses: ExpenseRecord[];
    settings: NegosyoSettings;
}
export interface InventoryItem {
    id: string;
    sku: string;
    name: string;
    category: string;
    unit: string;
    cost: number;
    price: number;
    stock: number;
    reorderPoint: number;
    barcode?: string;
}
export interface SaleRecord {
    id: string;
    date: string;
    items: SaleItem[];
    customer?: string;
    payment: 'cash' | 'gcash' | 'credit' | 'utang';
    total: number;
    discount: number;
}
export interface SaleItem {
    productId: string;
    qty: number;
    price: number;
    discount: number;
}
export interface UtangRecord {
    id: string;
    customer: string;
    amount: number;
    dueDate: string;
    status: 'pending' | 'partial' | 'paid' | 'overdue';
    notes: string;
}
export interface ExpenseRecord {
    id: string;
    date: string;
    category: string;
    amount: number;
    description: string;
    receipt?: string;
}
export interface NegosyoSettings {
    businessName: string;
    ownerName: string;
    gcashNumber: string;
    smsTemplate: string;
    lowStockAlert: boolean;
}
export interface TipPoolCalcData {
    pool: TipPool;
    employees: Employee[];
    periods: Period[];
    settings: TipPoolSettings;
}
export interface TipPool {
    id: string;
    name: string;
    totalTips: number;
    period: string;
    status: 'draft' | 'calculated' | 'distributed';
}
export interface Employee {
    id: string;
    name: string;
    role: 'server' | 'bartender' | 'host' | 'busser' | 'manager' | 'chef' | 'kitchen';
    hours: number;
    isManagerial: boolean;
    share: number;
    payout: number;
}
export interface Period {
    id: string;
    start: string;
    end: string;
    totalTips: number;
    totalHours: number;
    poolId: string;
}
export interface TipPoolSettings {
    venueName: string;
    distributionMethod: 'hours' | 'points' | 'hybrid';
    managerialExclusion: boolean;
    compliance: 'DOLE-11360' | 'DO-242-24';
}
export interface PayslipPHData {
    employees: PayEmployee[];
    payrolls: Payroll[];
    settings: PayrollSettings;
    govRates: GovRates;
}
export interface PayEmployee {
    id: string;
    employeeNo: string;
    name: string;
    tin: string;
    sss: string;
    philhealth: string;
    pagibig: string;
    birthDate: string;
    hireDate: string;
    position: string;
    rateType: 'monthly' | 'daily' | 'hourly';
    basicRate: number;
    allowances: Allowance[];
    deductions: Deduction[];
}
export interface Allowance {
    id: string;
    name: string;
    amount: number;
    taxable: boolean;
    frequency: Frequency;
}
export interface Deduction {
    id: string;
    name: string;
    amount: number;
    type: 'gov' | 'loan' | 'other';
    frequency: Frequency;
}
export interface Payroll {
    id: string;
    period: string;
    startDate: string;
    endDate: string;
    employees: PayrollEmployee[];
    status: 'draft' | 'finalized' | 'paid';
}
export interface PayrollEmployee {
    employeeId: string;
    daysWorked: number;
    otHours: number;
    ndHours: number;
    holidayHours: number;
    gross: number;
    deductions: PayrollDeduction[];
    net: number;
}
export interface PayrollDeduction {
    id: string;
    name: string;
    amount: number;
    employeeShare: number;
    employerShare: number;
}
export interface PayrollSettings {
    companyName: string;
    companyTin: string;
    sssBranch: string;
    payFrequency: 'semi-monthly' | 'monthly';
    cutoff1: number;
    cutoff2: number;
}
export interface GovRates {
    year: number;
    sss: {
        min: number;
        max: number;
        eeRate: number;
        erRate: number;
    };
    philhealth: {
        rate: number;
        ceiling: number;
    };
    pagibig: {
        rate: number;
        ceiling: number;
    };
    taxTables: TaxTable[];
}
export interface TaxTable {
    bracket: string;
    min: number;
    max: number;
    baseTax: number;
    rate: number;
}
export interface SellerPriceData {
    products: SellerProduct[];
    marketplaces: MarketplaceConfig[];
    calculations: PriceCalculation[];
    settings: SellerSettings;
}
export interface SellerProduct {
    id: string;
    name: string;
    cost: number;
    weight: number;
    dimensions: {
        l: number;
        w: number;
        h: number;
    };
    category: string;
}
export interface MarketplaceConfig {
    id: 'shopee' | 'lazada' | 'tiktok';
    name: string;
    commissionRate: number;
    shippingFee: number;
    paymentFee: number;
    otherFees: number;
    minPrice: number;
}
export interface PriceCalculation {
    productId: string;
    marketplace: string;
    sellingPrice: number;
    fees: FeeBreakdown;
    profit: number;
    margin: number;
    breakeven: number;
    targetPrice?: number;
}
export interface FeeBreakdown {
    commission: number;
    shipping: number;
    payment: number;
    other: number;
    total: number;
}
export interface SellerSettings {
    defaultMarketplace: string;
    targetMargin: number;
    rtsBuffer: number;
    birRate: number;
}
export interface GenericProductData {
    records: Record<string, unknown>[];
    settings: Record<string, unknown>;
    preferences: UserPreferences;
}
export interface UnlockCode {
    code: string;
    product: ProductId;
    tier: 'pro' | 'demo';
    createdAt: string;
    usedAt?: string;
    usedBy?: string;
    source: 'gcash' | 'lemonsqueezy' | 'manual';
}
export interface PaymentRequest {
    product: ProductId;
    amount: number;
    currency: Currency;
    email: string;
    method: 'gcash' | 'lemonsqueezy';
    metadata?: Record<string, string>;
}
export interface PaymentResponse {
    success: boolean;
    code?: string;
    redirectUrl?: string;
    error?: string;
}
export interface AffiliateLink {
    code: string;
    product: ProductId;
    affiliateId: string;
    commissionRate: number;
    clicks: number;
    conversions: number;
    createdAt: string;
}
export interface AnalyticsEvent {
    event: string;
    product: ProductId;
    properties: Record<string, unknown>;
    timestamp: string;
    sessionId: string;
    userId?: string;
}
export interface FunnelStep {
    step: string;
    count: number;
    conversionRate: number;
}
export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};
export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export declare function isProductId(value: string): value is ProductId;
export declare function getStorageKey(product: ProductId): string;
export declare function getProKey(product: ProductId): string;
export declare function getUsageKey(product: ProductId): string;
//# sourceMappingURL=index.d.ts.map