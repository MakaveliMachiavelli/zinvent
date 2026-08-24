/**
 * Zinvent Shared Validation Schemas
 * Zod schemas for runtime validation of all data structures
 */
import { z } from 'zod';
// ============================================
// CORE SCHEMAS
// ============================================
export const ProductIdSchema = z.enum([
    'closer', 'invoiceph', 'taxcalcph', 'negosyosheet', 'tippoolcalc',
    'payslipph', 'sellerprice', 'rentsheet', 'moveinreport', 'pumproute',
    'ratecalcph', 'tradejournalph', 'utangplanph', 'commissionph', 'freelancerkitph'
]);
export const CurrencySchema = z.enum(['PHP', 'USD']);
export const TaxModeSchema = z.enum(['nonvat', 'vat-excl', 'vat-incl']);
export const FrequencySchema = z.enum(['daily', 'weekly', 'monthly', 'quarterly', 'semi-annual', 'annual']);
export const ProStatusSchema = z.object({
    isPro: z.boolean(),
    code: z.string().optional(),
    activatedAt: z.string().datetime().optional(),
    source: z.enum(['gcash', 'lemonsqueezy', 'demo', 'manual'])
});
export const UsageTrackerSchema = z.object({
    runs: z.number().int().nonnegative(),
    lastReset: z.string().date(),
    limit: z.number().int().positive()
});
export const UserPreferencesSchema = z.object({
    theme: z.enum(['light', 'dark', 'system']),
    currency: CurrencySchema,
    language: z.enum(['en', 'tl']),
    notifications: z.boolean(),
    autoSave: z.boolean()
});
export const StorageSchemaSchema = z.object({
    version: z.number().int().positive(),
    lastMigration: z.string().datetime(),
    data: z.record(z.unknown())
});
// ============================================
// PRODUCT STORAGE SCHEMA
// ============================================
export const ProductStorageSchema = z.object({
    schema: StorageSchemaSchema,
    pro: ProStatusSchema,
    usage: UsageTrackerSchema,
    data: z.unknown(), // Product-specific, validated separately
    preferences: UserPreferencesSchema
});
// ============================================
// PRODUCT-SPECIFIC SCHEMAS
// ============================================
// --- InvoicePH ---
export const SellerInfoSchema = z.object({
    name: z.string().min(1),
    tin: z.string().regex(/^\d{3}-?\d{3}-?\d{3}-?\d{3}$/),
    address: z.string().min(1),
    vatMode: TaxModeSchema,
    branchCode: z.string().optional()
});
export const BuyerInfoSchema = z.object({
    name: z.string().min(1),
    tin: z.string().regex(/^\d{3}-?\d{3}-?\d{3}-?\d{3}$/),
    address: z.string().min(1)
});
export const InvoiceItemSchema = z.object({
    id: z.string().uuid(),
    description: z.string().min(1),
    quantity: z.number().positive(),
    unit: z.string().min(1),
    unitPrice: z.number().nonnegative(),
    discount: z.number().nonnegative().optional(),
    vatAmount: z.number().nonnegative().optional()
});
export const InvoiceSettingsSchema = z.object({
    series: z.string().min(1),
    nextNumber: z.number().int().positive(),
    defaultTerms: z.string().optional(),
    notes: z.string().optional(),
    logo: z.string().url().optional()
});
export const InvoiceTotalsSchema = z.object({
    subtotal: z.number().nonnegative(),
    discount: z.number().nonnegative(),
    vat: z.number().nonnegative(),
    total: z.number().nonnegative()
});
export const InvoiceRecordSchema = z.object({
    id: z.string().uuid(),
    number: z.string().min(1),
    date: z.string().date(),
    buyer: BuyerInfoSchema,
    items: z.array(InvoiceItemSchema),
    totals: InvoiceTotalsSchema,
    status: z.enum(['draft', 'sent', 'paid', 'cancelled'])
});
export const InvoicePHDataSchema = z.object({
    seller: SellerInfoSchema,
    buyer: BuyerInfoSchema,
    items: z.array(InvoiceItemSchema),
    settings: InvoiceSettingsSchema,
    history: z.array(InvoiceRecordSchema)
});
// --- TaxCalcPH ---
export const TaxProfileSchema = z.object({
    taxYear: z.number().int().min(2020).max(2030),
    status: z.enum(['single', 'married', 'head-of-family']),
    dependents: z.number().int().min(0).max(10),
    isSenior: z.boolean(),
    isPWD: z.boolean()
});
export const IncomeBreakdownSchema = z.object({
    compensation: z.number().nonnegative(),
    business: z.number().nonnegative(),
    professional: z.number().nonnegative(),
    capitalGains: z.number().nonnegative(),
    passive: z.number().nonnegative(),
    mixedIncome: z.boolean()
});
export const TaxBreakdownSchema = z.object({
    bracket: z.string(),
    rate: z.number().min(0).max(1),
    base: z.number().nonnegative(),
    tax: z.number().nonnegative()
});
export const TaxResultsSchema = z.object({
    taxableIncome: z.number().nonnegative(),
    incomeTax: z.number().nonnegative(),
    percentageTax: z.number().nonnegative(),
    totalTax: z.number().nonnegative(),
    effectiveRate: z.number().min(0).max(1),
    regime: z.enum(['graduated', '8-percent', 'osd']),
    breakdown: z.array(TaxBreakdownSchema)
});
export const TaxRecordSchema = z.object({
    id: z.string().uuid(),
    year: z.number().int(),
    profile: TaxProfileSchema,
    results: TaxResultsSchema,
    createdAt: z.string().datetime()
});
export const TaxCalcPHDataSchema = z.object({
    profile: TaxProfileSchema,
    income: IncomeBreakdownSchema,
    results: TaxResultsSchema,
    history: z.array(TaxRecordSchema)
});
// --- NegosyoSheet ---
export const InventoryItemSchema = z.object({
    id: z.string().uuid(),
    sku: z.string().min(1),
    name: z.string().min(1),
    category: z.string().min(1),
    unit: z.string().min(1),
    cost: z.number().nonnegative(),
    price: z.number().positive(),
    stock: z.number().int().nonnegative(),
    reorderPoint: z.number().int().nonnegative(),
    barcode: z.string().optional()
});
export const SaleItemSchema = z.object({
    productId: z.string().uuid(),
    qty: z.number().int().positive(),
    price: z.number().nonnegative(),
    discount: z.number().nonnegative()
});
export const SaleRecordSchema = z.object({
    id: z.string().uuid(),
    date: z.string().date(),
    items: z.array(SaleItemSchema),
    customer: z.string().optional(),
    payment: z.enum(['cash', 'gcash', 'credit', 'utang']),
    total: z.number().nonnegative(),
    discount: z.number().nonnegative()
});
export const UtangRecordSchema = z.object({
    id: z.string().uuid(),
    customer: z.string().min(1),
    amount: z.number().positive(),
    dueDate: z.string().date(),
    status: z.enum(['pending', 'partial', 'paid', 'overdue']),
    notes: z.string().optional()
});
export const ExpenseRecordSchema = z.object({
    id: z.string().uuid(),
    date: z.string().date(),
    category: z.string().min(1),
    amount: z.number().positive(),
    description: z.string().min(1),
    receipt: z.string().optional()
});
export const NegosyoSettingsSchema = z.object({
    businessName: z.string().min(1),
    ownerName: z.string().min(1),
    gcashNumber: z.string().optional(),
    smsTemplate: z.string().optional(),
    lowStockAlert: z.boolean()
});
export const NegosyoSheetDataSchema = z.object({
    inventory: z.array(InventoryItemSchema),
    sales: z.array(SaleRecordSchema),
    utang: z.array(UtangRecordSchema),
    expenses: z.array(ExpenseRecordSchema),
    settings: NegosyoSettingsSchema
});
// --- TipPoolCalc ---
export const EmployeeSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    role: z.enum(['server', 'bartender', 'host', 'busser', 'manager', 'chef', 'kitchen']),
    hours: z.number().nonnegative(),
    isManagerial: z.boolean(),
    share: z.number().nonnegative(),
    payout: z.number().nonnegative()
});
export const TipPoolSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    totalTips: z.number().nonnegative(),
    period: z.string(),
    status: z.enum(['draft', 'calculated', 'distributed'])
});
export const PeriodSchema = z.object({
    id: z.string().uuid(),
    start: z.string().date(),
    end: z.string().date(),
    totalTips: z.number().nonnegative(),
    totalHours: z.number().nonnegative(),
    poolId: z.string().uuid()
});
export const TipPoolSettingsSchema = z.object({
    venueName: z.string().min(1),
    distributionMethod: z.enum(['hours', 'points', 'hybrid']),
    managerialExclusion: z.boolean(),
    compliance: z.enum(['DOLE-11360', 'DO-242-24'])
});
export const TipPoolCalcDataSchema = z.object({
    pool: TipPoolSchema,
    employees: z.array(EmployeeSchema),
    periods: z.array(PeriodSchema),
    settings: TipPoolSettingsSchema
});
// --- PayslipPH ---
export const AllowanceSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    amount: z.number().nonnegative(),
    taxable: z.boolean(),
    frequency: FrequencySchema
});
export const DeductionSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    amount: z.number().nonnegative(),
    type: z.enum(['gov', 'loan', 'other']),
    frequency: FrequencySchema
});
export const PayEmployeeSchema = z.object({
    id: z.string().uuid(),
    employeeNo: z.string().min(1),
    name: z.string().min(1),
    tin: z.string().regex(/^\d{3}-?\d{3}-?\d{3}-?\d{3}$/),
    sss: z.string().min(1),
    philhealth: z.string().min(1),
    pagibig: z.string().min(1),
    birthDate: z.string().date(),
    hireDate: z.string().date(),
    position: z.string().min(1),
    rateType: z.enum(['monthly', 'daily', 'hourly']),
    basicRate: z.number().positive(),
    allowances: z.array(AllowanceSchema),
    deductions: z.array(DeductionSchema)
});
export const PayrollDeductionSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    amount: z.number().nonnegative(),
    employeeShare: z.number().nonnegative(),
    employerShare: z.number().nonnegative()
});
export const PayrollEmployeeSchema = z.object({
    employeeId: z.string().uuid(),
    daysWorked: z.number().int().nonnegative(),
    otHours: z.number().nonnegative(),
    ndHours: z.number().nonnegative(),
    holidayHours: z.number().nonnegative(),
    gross: z.number().nonnegative(),
    deductions: z.array(PayrollDeductionSchema),
    net: z.number().nonnegative()
});
export const PayrollSchema = z.object({
    id: z.string().uuid(),
    period: z.string(),
    startDate: z.string().date(),
    endDate: z.string().date(),
    employees: z.array(PayrollEmployeeSchema),
    status: z.enum(['draft', 'finalized', 'paid'])
});
export const PayrollSettingsSchema = z.object({
    companyName: z.string().min(1),
    companyTin: z.string().regex(/^\d{3}-?\d{3}-?\d{3}-?\d{3}$/),
    sssBranch: z.string().min(1),
    payFrequency: z.enum(['semi-monthly', 'monthly']),
    cutoff1: z.number().int().min(1).max(31),
    cutoff2: z.number().int().min(1).max(31)
});
export const GovRatesSchema = z.object({
    year: z.number().int(),
    sss: z.object({
        min: z.number().positive(),
        max: z.number().positive(),
        eeRate: z.number().min(0).max(1),
        erRate: z.number().min(0).max(1)
    }),
    philhealth: z.object({
        rate: z.number().min(0).max(1),
        ceiling: z.number().positive()
    }),
    pagibig: z.object({
        rate: z.number().min(0).max(1),
        ceiling: z.number().positive()
    }),
    taxTables: z.array(z.object({
        bracket: z.string(),
        min: z.number().nonnegative(),
        max: z.number().nonnegative(),
        baseTax: z.number().nonnegative(),
        rate: z.number().min(0).max(1)
    }))
});
export const PayslipPHDataSchema = z.object({
    employees: z.array(PayEmployeeSchema),
    payrolls: z.array(PayrollSchema),
    settings: PayrollSettingsSchema,
    govRates: GovRatesSchema
});
// --- SellerPrice ---
export const SellerProductSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    cost: z.number().positive(),
    weight: z.number().positive(),
    dimensions: z.object({
        l: z.number().positive(),
        w: z.number().positive(),
        h: z.number().positive()
    }),
    category: z.string().min(1)
});
export const MarketplaceConfigSchema = z.object({
    id: z.enum(['shopee', 'lazada', 'tiktok']),
    name: z.string().min(1),
    commissionRate: z.number().min(0).max(1),
    shippingFee: z.number().nonnegative(),
    paymentFee: z.number().min(0).max(1),
    otherFees: z.number().nonnegative(),
    minPrice: z.number().positive()
});
export const FeeBreakdownSchema = z.object({
    commission: z.number().nonnegative(),
    shipping: z.number().nonnegative(),
    payment: z.number().nonnegative(),
    other: z.number().nonnegative(),
    total: z.number().nonnegative()
});
export const PriceCalculationSchema = z.object({
    productId: z.string().uuid(),
    marketplace: z.string(),
    sellingPrice: z.number().positive(),
    fees: FeeBreakdownSchema,
    profit: z.number(),
    margin: z.number(),
    breakeven: z.number().positive(),
    targetPrice: z.number().positive().optional()
});
export const SellerSettingsSchema = z.object({
    defaultMarketplace: z.string(),
    targetMargin: z.number().min(0).max(1),
    rtsBuffer: z.number().nonnegative(),
    birRate: z.number().min(0).max(1)
});
export const SellerPriceDataSchema = z.object({
    products: z.array(SellerProductSchema),
    marketplaces: z.array(MarketplaceConfigSchema),
    calculations: z.array(PriceCalculationSchema),
    settings: SellerSettingsSchema
});
// ============================================
// PAYMENT SCHEMAS
// ============================================
export const UnlockCodeSchema = z.object({
    code: z.string().min(8).max(32),
    product: ProductIdSchema,
    tier: z.enum(['pro', 'demo']),
    createdAt: z.string().datetime(),
    usedAt: z.string().datetime().optional(),
    usedBy: z.string().optional(),
    source: z.enum(['gcash', 'lemonsqueezy', 'manual'])
});
export const PaymentRequestSchema = z.object({
    product: ProductIdSchema,
    amount: z.number().positive(),
    currency: CurrencySchema,
    email: z.string().email(),
    method: z.enum(['gcash', 'lemonsqueezy']),
    metadata: z.record(z.string()).optional()
});
export const PaymentResponseSchema = z.object({
    success: z.boolean(),
    code: z.string().optional(),
    redirectUrl: z.string().url().optional(),
    error: z.string().optional()
});
export const AffiliateLinkSchema = z.object({
    code: z.string().min(4).max(16),
    product: ProductIdSchema,
    affiliateId: z.string().min(1),
    commissionRate: z.number().min(0).max(1),
    clicks: z.number().int().nonnegative(),
    conversions: z.number().int().nonnegative(),
    createdAt: z.string().datetime()
});
// ============================================
// ANALYTICS SCHEMAS
// ============================================
export const AnalyticsEventSchema = z.object({
    event: z.string().min(1),
    product: ProductIdSchema,
    properties: z.record(z.unknown()),
    timestamp: z.string().datetime(),
    sessionId: z.string().uuid(),
    userId: z.string().optional()
});
export const FunnelStepSchema = z.object({
    step: z.string().min(1),
    count: z.number().int().nonnegative(),
    conversionRate: z.number().min(0).max(1)
});
// ============================================
// VALIDATION HELPERS
// ============================================
export function validateProductData(schema, data) {
    const result = schema.safeParse(data);
    if (result.success) {
        return { success: true, data: result.data };
    }
    return { success: false, errors: result.error };
}
export function validateUnlockCode(product, code) {
    // In production, check against secure database
    // For now, basic format validation
    return UnlockCodeSchema.shape.code.safeParse(code.toUpperCase()).success;
}
// ============================================
// SCHEMA MAP FOR RUNTIME LOOKUP
// ============================================
export const PRODUCT_DATA_SCHEMAS = {
    closer: z.object({}), // Closer has different data structure
    invoiceph: InvoicePHDataSchema,
    taxcalcph: TaxCalcPHDataSchema,
    negosyosheet: NegosyoSheetDataSchema,
    tippoolcalc: TipPoolCalcDataSchema,
    payslipph: PayslipPHDataSchema,
    sellerprice: SellerPriceDataSchema,
    rentsheet: z.object({}), // Excel-based
    moveinreport: z.object({}), // Photo-based
    pumproute: z.object({}), // Route-based
    ratecalcph: z.object({}), // Rate calculation
    tradejournalph: z.object({}), // Excel-based
    utangplanph: z.object({}), // Debt planning
    commissionph: z.object({}), // Commission calc
    freelancerkitph: z.object({}) // Excel-based
};
export function getProductSchema(product) {
    return PRODUCT_DATA_SCHEMAS[product] || z.object({});
}
// ============================================
// EXPORT ALL
// ============================================
export * from '../types';
//# sourceMappingURL=index.js.map