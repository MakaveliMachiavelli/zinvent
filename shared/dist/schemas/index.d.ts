/**
 * Zinvent Shared Validation Schemas
 * Zod schemas for runtime validation of all data structures
 */
import { z } from 'zod';
import type { ProductId } from '../types';
export declare const ProductIdSchema: z.ZodEnum<["closer", "invoiceph", "taxcalcph", "negosyosheet", "tippoolcalc", "payslipph", "sellerprice", "rentsheet", "moveinreport", "pumproute", "ratecalcph", "tradejournalph", "utangplanph", "commissionph", "freelancerkitph"]>;
export declare const CurrencySchema: z.ZodEnum<["PHP", "USD"]>;
export declare const TaxModeSchema: z.ZodEnum<["nonvat", "vat-excl", "vat-incl"]>;
export declare const FrequencySchema: z.ZodEnum<["daily", "weekly", "monthly", "quarterly", "semi-annual", "annual"]>;
export declare const ProStatusSchema: z.ZodObject<{
    isPro: z.ZodBoolean;
    code: z.ZodOptional<z.ZodString>;
    activatedAt: z.ZodOptional<z.ZodString>;
    source: z.ZodEnum<["gcash", "lemonsqueezy", "demo", "manual"]>;
}, "strip", z.ZodTypeAny, {
    source: "gcash" | "lemonsqueezy" | "demo" | "manual";
    isPro: boolean;
    code?: string | undefined;
    activatedAt?: string | undefined;
}, {
    source: "gcash" | "lemonsqueezy" | "demo" | "manual";
    isPro: boolean;
    code?: string | undefined;
    activatedAt?: string | undefined;
}>;
export declare const UsageTrackerSchema: z.ZodObject<{
    runs: z.ZodNumber;
    lastReset: z.ZodString;
    limit: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    runs: number;
    lastReset: string;
    limit: number;
}, {
    runs: number;
    lastReset: string;
    limit: number;
}>;
export declare const UserPreferencesSchema: z.ZodObject<{
    theme: z.ZodEnum<["light", "dark", "system"]>;
    currency: z.ZodEnum<["PHP", "USD"]>;
    language: z.ZodEnum<["en", "tl"]>;
    notifications: z.ZodBoolean;
    autoSave: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    currency: "PHP" | "USD";
    theme: "light" | "dark" | "system";
    language: "en" | "tl";
    notifications: boolean;
    autoSave: boolean;
}, {
    currency: "PHP" | "USD";
    theme: "light" | "dark" | "system";
    language: "en" | "tl";
    notifications: boolean;
    autoSave: boolean;
}>;
export declare const StorageSchemaSchema: z.ZodObject<{
    version: z.ZodNumber;
    lastMigration: z.ZodString;
    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    data: Record<string, unknown>;
    version: number;
    lastMigration: string;
}, {
    data: Record<string, unknown>;
    version: number;
    lastMigration: string;
}>;
export declare const ProductStorageSchema: z.ZodObject<{
    schema: z.ZodObject<{
        version: z.ZodNumber;
        lastMigration: z.ZodString;
        data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        data: Record<string, unknown>;
        version: number;
        lastMigration: string;
    }, {
        data: Record<string, unknown>;
        version: number;
        lastMigration: string;
    }>;
    pro: z.ZodObject<{
        isPro: z.ZodBoolean;
        code: z.ZodOptional<z.ZodString>;
        activatedAt: z.ZodOptional<z.ZodString>;
        source: z.ZodEnum<["gcash", "lemonsqueezy", "demo", "manual"]>;
    }, "strip", z.ZodTypeAny, {
        source: "gcash" | "lemonsqueezy" | "demo" | "manual";
        isPro: boolean;
        code?: string | undefined;
        activatedAt?: string | undefined;
    }, {
        source: "gcash" | "lemonsqueezy" | "demo" | "manual";
        isPro: boolean;
        code?: string | undefined;
        activatedAt?: string | undefined;
    }>;
    usage: z.ZodObject<{
        runs: z.ZodNumber;
        lastReset: z.ZodString;
        limit: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        runs: number;
        lastReset: string;
        limit: number;
    }, {
        runs: number;
        lastReset: string;
        limit: number;
    }>;
    data: z.ZodUnknown;
    preferences: z.ZodObject<{
        theme: z.ZodEnum<["light", "dark", "system"]>;
        currency: z.ZodEnum<["PHP", "USD"]>;
        language: z.ZodEnum<["en", "tl"]>;
        notifications: z.ZodBoolean;
        autoSave: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        currency: "PHP" | "USD";
        theme: "light" | "dark" | "system";
        language: "en" | "tl";
        notifications: boolean;
        autoSave: boolean;
    }, {
        currency: "PHP" | "USD";
        theme: "light" | "dark" | "system";
        language: "en" | "tl";
        notifications: boolean;
        autoSave: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    pro: {
        source: "gcash" | "lemonsqueezy" | "demo" | "manual";
        isPro: boolean;
        code?: string | undefined;
        activatedAt?: string | undefined;
    };
    usage: {
        runs: number;
        lastReset: string;
        limit: number;
    };
    schema: {
        data: Record<string, unknown>;
        version: number;
        lastMigration: string;
    };
    preferences: {
        currency: "PHP" | "USD";
        theme: "light" | "dark" | "system";
        language: "en" | "tl";
        notifications: boolean;
        autoSave: boolean;
    };
    data?: unknown;
}, {
    pro: {
        source: "gcash" | "lemonsqueezy" | "demo" | "manual";
        isPro: boolean;
        code?: string | undefined;
        activatedAt?: string | undefined;
    };
    usage: {
        runs: number;
        lastReset: string;
        limit: number;
    };
    schema: {
        data: Record<string, unknown>;
        version: number;
        lastMigration: string;
    };
    preferences: {
        currency: "PHP" | "USD";
        theme: "light" | "dark" | "system";
        language: "en" | "tl";
        notifications: boolean;
        autoSave: boolean;
    };
    data?: unknown;
}>;
export declare const SellerInfoSchema: z.ZodObject<{
    name: z.ZodString;
    tin: z.ZodString;
    address: z.ZodString;
    vatMode: z.ZodEnum<["nonvat", "vat-excl", "vat-incl"]>;
    branchCode: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    address: string;
    name: string;
    tin: string;
    vatMode: "nonvat" | "vat-excl" | "vat-incl";
    branchCode?: string | undefined;
}, {
    address: string;
    name: string;
    tin: string;
    vatMode: "nonvat" | "vat-excl" | "vat-incl";
    branchCode?: string | undefined;
}>;
export declare const BuyerInfoSchema: z.ZodObject<{
    name: z.ZodString;
    tin: z.ZodString;
    address: z.ZodString;
}, "strip", z.ZodTypeAny, {
    address: string;
    name: string;
    tin: string;
}, {
    address: string;
    name: string;
    tin: string;
}>;
export declare const InvoiceItemSchema: z.ZodObject<{
    id: z.ZodString;
    description: z.ZodString;
    quantity: z.ZodNumber;
    unit: z.ZodString;
    unitPrice: z.ZodNumber;
    discount: z.ZodOptional<z.ZodNumber>;
    vatAmount: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    unit: string;
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    discount?: number | undefined;
    vatAmount?: number | undefined;
}, {
    unit: string;
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    discount?: number | undefined;
    vatAmount?: number | undefined;
}>;
export declare const InvoiceSettingsSchema: z.ZodObject<{
    series: z.ZodString;
    nextNumber: z.ZodNumber;
    defaultTerms: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    logo: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    series: string;
    nextNumber: number;
    defaultTerms?: string | undefined;
    notes?: string | undefined;
    logo?: string | undefined;
}, {
    series: string;
    nextNumber: number;
    defaultTerms?: string | undefined;
    notes?: string | undefined;
    logo?: string | undefined;
}>;
export declare const InvoiceTotalsSchema: z.ZodObject<{
    subtotal: z.ZodNumber;
    discount: z.ZodNumber;
    vat: z.ZodNumber;
    total: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    discount: number;
    subtotal: number;
    vat: number;
    total: number;
}, {
    discount: number;
    subtotal: number;
    vat: number;
    total: number;
}>;
export declare const InvoiceRecordSchema: z.ZodObject<{
    id: z.ZodString;
    number: z.ZodString;
    date: z.ZodString;
    buyer: z.ZodObject<{
        name: z.ZodString;
        tin: z.ZodString;
        address: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        address: string;
        name: string;
        tin: string;
    }, {
        address: string;
        name: string;
        tin: string;
    }>;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        description: z.ZodString;
        quantity: z.ZodNumber;
        unit: z.ZodString;
        unitPrice: z.ZodNumber;
        discount: z.ZodOptional<z.ZodNumber>;
        vatAmount: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        unit: string;
        id: string;
        description: string;
        quantity: number;
        unitPrice: number;
        discount?: number | undefined;
        vatAmount?: number | undefined;
    }, {
        unit: string;
        id: string;
        description: string;
        quantity: number;
        unitPrice: number;
        discount?: number | undefined;
        vatAmount?: number | undefined;
    }>, "many">;
    totals: z.ZodObject<{
        subtotal: z.ZodNumber;
        discount: z.ZodNumber;
        vat: z.ZodNumber;
        total: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        discount: number;
        subtotal: number;
        vat: number;
        total: number;
    }, {
        discount: number;
        subtotal: number;
        vat: number;
        total: number;
    }>;
    status: z.ZodEnum<["draft", "sent", "paid", "cancelled"]>;
}, "strip", z.ZodTypeAny, {
    number: string;
    status: "draft" | "sent" | "paid" | "cancelled";
    date: string;
    id: string;
    buyer: {
        address: string;
        name: string;
        tin: string;
    };
    items: {
        unit: string;
        id: string;
        description: string;
        quantity: number;
        unitPrice: number;
        discount?: number | undefined;
        vatAmount?: number | undefined;
    }[];
    totals: {
        discount: number;
        subtotal: number;
        vat: number;
        total: number;
    };
}, {
    number: string;
    status: "draft" | "sent" | "paid" | "cancelled";
    date: string;
    id: string;
    buyer: {
        address: string;
        name: string;
        tin: string;
    };
    items: {
        unit: string;
        id: string;
        description: string;
        quantity: number;
        unitPrice: number;
        discount?: number | undefined;
        vatAmount?: number | undefined;
    }[];
    totals: {
        discount: number;
        subtotal: number;
        vat: number;
        total: number;
    };
}>;
export declare const InvoicePHDataSchema: z.ZodObject<{
    seller: z.ZodObject<{
        name: z.ZodString;
        tin: z.ZodString;
        address: z.ZodString;
        vatMode: z.ZodEnum<["nonvat", "vat-excl", "vat-incl"]>;
        branchCode: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        address: string;
        name: string;
        tin: string;
        vatMode: "nonvat" | "vat-excl" | "vat-incl";
        branchCode?: string | undefined;
    }, {
        address: string;
        name: string;
        tin: string;
        vatMode: "nonvat" | "vat-excl" | "vat-incl";
        branchCode?: string | undefined;
    }>;
    buyer: z.ZodObject<{
        name: z.ZodString;
        tin: z.ZodString;
        address: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        address: string;
        name: string;
        tin: string;
    }, {
        address: string;
        name: string;
        tin: string;
    }>;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        description: z.ZodString;
        quantity: z.ZodNumber;
        unit: z.ZodString;
        unitPrice: z.ZodNumber;
        discount: z.ZodOptional<z.ZodNumber>;
        vatAmount: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        unit: string;
        id: string;
        description: string;
        quantity: number;
        unitPrice: number;
        discount?: number | undefined;
        vatAmount?: number | undefined;
    }, {
        unit: string;
        id: string;
        description: string;
        quantity: number;
        unitPrice: number;
        discount?: number | undefined;
        vatAmount?: number | undefined;
    }>, "many">;
    settings: z.ZodObject<{
        series: z.ZodString;
        nextNumber: z.ZodNumber;
        defaultTerms: z.ZodOptional<z.ZodString>;
        notes: z.ZodOptional<z.ZodString>;
        logo: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        series: string;
        nextNumber: number;
        defaultTerms?: string | undefined;
        notes?: string | undefined;
        logo?: string | undefined;
    }, {
        series: string;
        nextNumber: number;
        defaultTerms?: string | undefined;
        notes?: string | undefined;
        logo?: string | undefined;
    }>;
    history: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        number: z.ZodString;
        date: z.ZodString;
        buyer: z.ZodObject<{
            name: z.ZodString;
            tin: z.ZodString;
            address: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            address: string;
            name: string;
            tin: string;
        }, {
            address: string;
            name: string;
            tin: string;
        }>;
        items: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            description: z.ZodString;
            quantity: z.ZodNumber;
            unit: z.ZodString;
            unitPrice: z.ZodNumber;
            discount: z.ZodOptional<z.ZodNumber>;
            vatAmount: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            unit: string;
            id: string;
            description: string;
            quantity: number;
            unitPrice: number;
            discount?: number | undefined;
            vatAmount?: number | undefined;
        }, {
            unit: string;
            id: string;
            description: string;
            quantity: number;
            unitPrice: number;
            discount?: number | undefined;
            vatAmount?: number | undefined;
        }>, "many">;
        totals: z.ZodObject<{
            subtotal: z.ZodNumber;
            discount: z.ZodNumber;
            vat: z.ZodNumber;
            total: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            discount: number;
            subtotal: number;
            vat: number;
            total: number;
        }, {
            discount: number;
            subtotal: number;
            vat: number;
            total: number;
        }>;
        status: z.ZodEnum<["draft", "sent", "paid", "cancelled"]>;
    }, "strip", z.ZodTypeAny, {
        number: string;
        status: "draft" | "sent" | "paid" | "cancelled";
        date: string;
        id: string;
        buyer: {
            address: string;
            name: string;
            tin: string;
        };
        items: {
            unit: string;
            id: string;
            description: string;
            quantity: number;
            unitPrice: number;
            discount?: number | undefined;
            vatAmount?: number | undefined;
        }[];
        totals: {
            discount: number;
            subtotal: number;
            vat: number;
            total: number;
        };
    }, {
        number: string;
        status: "draft" | "sent" | "paid" | "cancelled";
        date: string;
        id: string;
        buyer: {
            address: string;
            name: string;
            tin: string;
        };
        items: {
            unit: string;
            id: string;
            description: string;
            quantity: number;
            unitPrice: number;
            discount?: number | undefined;
            vatAmount?: number | undefined;
        }[];
        totals: {
            discount: number;
            subtotal: number;
            vat: number;
            total: number;
        };
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    buyer: {
        address: string;
        name: string;
        tin: string;
    };
    items: {
        unit: string;
        id: string;
        description: string;
        quantity: number;
        unitPrice: number;
        discount?: number | undefined;
        vatAmount?: number | undefined;
    }[];
    seller: {
        address: string;
        name: string;
        tin: string;
        vatMode: "nonvat" | "vat-excl" | "vat-incl";
        branchCode?: string | undefined;
    };
    settings: {
        series: string;
        nextNumber: number;
        defaultTerms?: string | undefined;
        notes?: string | undefined;
        logo?: string | undefined;
    };
    history: {
        number: string;
        status: "draft" | "sent" | "paid" | "cancelled";
        date: string;
        id: string;
        buyer: {
            address: string;
            name: string;
            tin: string;
        };
        items: {
            unit: string;
            id: string;
            description: string;
            quantity: number;
            unitPrice: number;
            discount?: number | undefined;
            vatAmount?: number | undefined;
        }[];
        totals: {
            discount: number;
            subtotal: number;
            vat: number;
            total: number;
        };
    }[];
}, {
    buyer: {
        address: string;
        name: string;
        tin: string;
    };
    items: {
        unit: string;
        id: string;
        description: string;
        quantity: number;
        unitPrice: number;
        discount?: number | undefined;
        vatAmount?: number | undefined;
    }[];
    seller: {
        address: string;
        name: string;
        tin: string;
        vatMode: "nonvat" | "vat-excl" | "vat-incl";
        branchCode?: string | undefined;
    };
    settings: {
        series: string;
        nextNumber: number;
        defaultTerms?: string | undefined;
        notes?: string | undefined;
        logo?: string | undefined;
    };
    history: {
        number: string;
        status: "draft" | "sent" | "paid" | "cancelled";
        date: string;
        id: string;
        buyer: {
            address: string;
            name: string;
            tin: string;
        };
        items: {
            unit: string;
            id: string;
            description: string;
            quantity: number;
            unitPrice: number;
            discount?: number | undefined;
            vatAmount?: number | undefined;
        }[];
        totals: {
            discount: number;
            subtotal: number;
            vat: number;
            total: number;
        };
    }[];
}>;
export declare const TaxProfileSchema: z.ZodObject<{
    taxYear: z.ZodNumber;
    status: z.ZodEnum<["single", "married", "head-of-family"]>;
    dependents: z.ZodNumber;
    isSenior: z.ZodBoolean;
    isPWD: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    status: "single" | "married" | "head-of-family";
    taxYear: number;
    dependents: number;
    isSenior: boolean;
    isPWD: boolean;
}, {
    status: "single" | "married" | "head-of-family";
    taxYear: number;
    dependents: number;
    isSenior: boolean;
    isPWD: boolean;
}>;
export declare const IncomeBreakdownSchema: z.ZodObject<{
    compensation: z.ZodNumber;
    business: z.ZodNumber;
    professional: z.ZodNumber;
    capitalGains: z.ZodNumber;
    passive: z.ZodNumber;
    mixedIncome: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    compensation: number;
    business: number;
    professional: number;
    capitalGains: number;
    passive: number;
    mixedIncome: boolean;
}, {
    compensation: number;
    business: number;
    professional: number;
    capitalGains: number;
    passive: number;
    mixedIncome: boolean;
}>;
export declare const TaxBreakdownSchema: z.ZodObject<{
    bracket: z.ZodString;
    rate: z.ZodNumber;
    base: z.ZodNumber;
    tax: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    base: number;
    bracket: string;
    rate: number;
    tax: number;
}, {
    base: number;
    bracket: string;
    rate: number;
    tax: number;
}>;
export declare const TaxResultsSchema: z.ZodObject<{
    taxableIncome: z.ZodNumber;
    incomeTax: z.ZodNumber;
    percentageTax: z.ZodNumber;
    totalTax: z.ZodNumber;
    effectiveRate: z.ZodNumber;
    regime: z.ZodEnum<["graduated", "8-percent", "osd"]>;
    breakdown: z.ZodArray<z.ZodObject<{
        bracket: z.ZodString;
        rate: z.ZodNumber;
        base: z.ZodNumber;
        tax: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        base: number;
        bracket: string;
        rate: number;
        tax: number;
    }, {
        base: number;
        bracket: string;
        rate: number;
        tax: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    taxableIncome: number;
    incomeTax: number;
    percentageTax: number;
    totalTax: number;
    effectiveRate: number;
    regime: "graduated" | "8-percent" | "osd";
    breakdown: {
        base: number;
        bracket: string;
        rate: number;
        tax: number;
    }[];
}, {
    taxableIncome: number;
    incomeTax: number;
    percentageTax: number;
    totalTax: number;
    effectiveRate: number;
    regime: "graduated" | "8-percent" | "osd";
    breakdown: {
        base: number;
        bracket: string;
        rate: number;
        tax: number;
    }[];
}>;
export declare const TaxRecordSchema: z.ZodObject<{
    id: z.ZodString;
    year: z.ZodNumber;
    profile: z.ZodObject<{
        taxYear: z.ZodNumber;
        status: z.ZodEnum<["single", "married", "head-of-family"]>;
        dependents: z.ZodNumber;
        isSenior: z.ZodBoolean;
        isPWD: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        status: "single" | "married" | "head-of-family";
        taxYear: number;
        dependents: number;
        isSenior: boolean;
        isPWD: boolean;
    }, {
        status: "single" | "married" | "head-of-family";
        taxYear: number;
        dependents: number;
        isSenior: boolean;
        isPWD: boolean;
    }>;
    results: z.ZodObject<{
        taxableIncome: z.ZodNumber;
        incomeTax: z.ZodNumber;
        percentageTax: z.ZodNumber;
        totalTax: z.ZodNumber;
        effectiveRate: z.ZodNumber;
        regime: z.ZodEnum<["graduated", "8-percent", "osd"]>;
        breakdown: z.ZodArray<z.ZodObject<{
            bracket: z.ZodString;
            rate: z.ZodNumber;
            base: z.ZodNumber;
            tax: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            base: number;
            bracket: string;
            rate: number;
            tax: number;
        }, {
            base: number;
            bracket: string;
            rate: number;
            tax: number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        taxableIncome: number;
        incomeTax: number;
        percentageTax: number;
        totalTax: number;
        effectiveRate: number;
        regime: "graduated" | "8-percent" | "osd";
        breakdown: {
            base: number;
            bracket: string;
            rate: number;
            tax: number;
        }[];
    }, {
        taxableIncome: number;
        incomeTax: number;
        percentageTax: number;
        totalTax: number;
        effectiveRate: number;
        regime: "graduated" | "8-percent" | "osd";
        breakdown: {
            base: number;
            bracket: string;
            rate: number;
            tax: number;
        }[];
    }>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    year: number;
    id: string;
    profile: {
        status: "single" | "married" | "head-of-family";
        taxYear: number;
        dependents: number;
        isSenior: boolean;
        isPWD: boolean;
    };
    results: {
        taxableIncome: number;
        incomeTax: number;
        percentageTax: number;
        totalTax: number;
        effectiveRate: number;
        regime: "graduated" | "8-percent" | "osd";
        breakdown: {
            base: number;
            bracket: string;
            rate: number;
            tax: number;
        }[];
    };
    createdAt: string;
}, {
    year: number;
    id: string;
    profile: {
        status: "single" | "married" | "head-of-family";
        taxYear: number;
        dependents: number;
        isSenior: boolean;
        isPWD: boolean;
    };
    results: {
        taxableIncome: number;
        incomeTax: number;
        percentageTax: number;
        totalTax: number;
        effectiveRate: number;
        regime: "graduated" | "8-percent" | "osd";
        breakdown: {
            base: number;
            bracket: string;
            rate: number;
            tax: number;
        }[];
    };
    createdAt: string;
}>;
export declare const TaxCalcPHDataSchema: z.ZodObject<{
    profile: z.ZodObject<{
        taxYear: z.ZodNumber;
        status: z.ZodEnum<["single", "married", "head-of-family"]>;
        dependents: z.ZodNumber;
        isSenior: z.ZodBoolean;
        isPWD: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        status: "single" | "married" | "head-of-family";
        taxYear: number;
        dependents: number;
        isSenior: boolean;
        isPWD: boolean;
    }, {
        status: "single" | "married" | "head-of-family";
        taxYear: number;
        dependents: number;
        isSenior: boolean;
        isPWD: boolean;
    }>;
    income: z.ZodObject<{
        compensation: z.ZodNumber;
        business: z.ZodNumber;
        professional: z.ZodNumber;
        capitalGains: z.ZodNumber;
        passive: z.ZodNumber;
        mixedIncome: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        compensation: number;
        business: number;
        professional: number;
        capitalGains: number;
        passive: number;
        mixedIncome: boolean;
    }, {
        compensation: number;
        business: number;
        professional: number;
        capitalGains: number;
        passive: number;
        mixedIncome: boolean;
    }>;
    results: z.ZodObject<{
        taxableIncome: z.ZodNumber;
        incomeTax: z.ZodNumber;
        percentageTax: z.ZodNumber;
        totalTax: z.ZodNumber;
        effectiveRate: z.ZodNumber;
        regime: z.ZodEnum<["graduated", "8-percent", "osd"]>;
        breakdown: z.ZodArray<z.ZodObject<{
            bracket: z.ZodString;
            rate: z.ZodNumber;
            base: z.ZodNumber;
            tax: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            base: number;
            bracket: string;
            rate: number;
            tax: number;
        }, {
            base: number;
            bracket: string;
            rate: number;
            tax: number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        taxableIncome: number;
        incomeTax: number;
        percentageTax: number;
        totalTax: number;
        effectiveRate: number;
        regime: "graduated" | "8-percent" | "osd";
        breakdown: {
            base: number;
            bracket: string;
            rate: number;
            tax: number;
        }[];
    }, {
        taxableIncome: number;
        incomeTax: number;
        percentageTax: number;
        totalTax: number;
        effectiveRate: number;
        regime: "graduated" | "8-percent" | "osd";
        breakdown: {
            base: number;
            bracket: string;
            rate: number;
            tax: number;
        }[];
    }>;
    history: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        year: z.ZodNumber;
        profile: z.ZodObject<{
            taxYear: z.ZodNumber;
            status: z.ZodEnum<["single", "married", "head-of-family"]>;
            dependents: z.ZodNumber;
            isSenior: z.ZodBoolean;
            isPWD: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            status: "single" | "married" | "head-of-family";
            taxYear: number;
            dependents: number;
            isSenior: boolean;
            isPWD: boolean;
        }, {
            status: "single" | "married" | "head-of-family";
            taxYear: number;
            dependents: number;
            isSenior: boolean;
            isPWD: boolean;
        }>;
        results: z.ZodObject<{
            taxableIncome: z.ZodNumber;
            incomeTax: z.ZodNumber;
            percentageTax: z.ZodNumber;
            totalTax: z.ZodNumber;
            effectiveRate: z.ZodNumber;
            regime: z.ZodEnum<["graduated", "8-percent", "osd"]>;
            breakdown: z.ZodArray<z.ZodObject<{
                bracket: z.ZodString;
                rate: z.ZodNumber;
                base: z.ZodNumber;
                tax: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                base: number;
                bracket: string;
                rate: number;
                tax: number;
            }, {
                base: number;
                bracket: string;
                rate: number;
                tax: number;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            taxableIncome: number;
            incomeTax: number;
            percentageTax: number;
            totalTax: number;
            effectiveRate: number;
            regime: "graduated" | "8-percent" | "osd";
            breakdown: {
                base: number;
                bracket: string;
                rate: number;
                tax: number;
            }[];
        }, {
            taxableIncome: number;
            incomeTax: number;
            percentageTax: number;
            totalTax: number;
            effectiveRate: number;
            regime: "graduated" | "8-percent" | "osd";
            breakdown: {
                base: number;
                bracket: string;
                rate: number;
                tax: number;
            }[];
        }>;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        year: number;
        id: string;
        profile: {
            status: "single" | "married" | "head-of-family";
            taxYear: number;
            dependents: number;
            isSenior: boolean;
            isPWD: boolean;
        };
        results: {
            taxableIncome: number;
            incomeTax: number;
            percentageTax: number;
            totalTax: number;
            effectiveRate: number;
            regime: "graduated" | "8-percent" | "osd";
            breakdown: {
                base: number;
                bracket: string;
                rate: number;
                tax: number;
            }[];
        };
        createdAt: string;
    }, {
        year: number;
        id: string;
        profile: {
            status: "single" | "married" | "head-of-family";
            taxYear: number;
            dependents: number;
            isSenior: boolean;
            isPWD: boolean;
        };
        results: {
            taxableIncome: number;
            incomeTax: number;
            percentageTax: number;
            totalTax: number;
            effectiveRate: number;
            regime: "graduated" | "8-percent" | "osd";
            breakdown: {
                base: number;
                bracket: string;
                rate: number;
                tax: number;
            }[];
        };
        createdAt: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    history: {
        year: number;
        id: string;
        profile: {
            status: "single" | "married" | "head-of-family";
            taxYear: number;
            dependents: number;
            isSenior: boolean;
            isPWD: boolean;
        };
        results: {
            taxableIncome: number;
            incomeTax: number;
            percentageTax: number;
            totalTax: number;
            effectiveRate: number;
            regime: "graduated" | "8-percent" | "osd";
            breakdown: {
                base: number;
                bracket: string;
                rate: number;
                tax: number;
            }[];
        };
        createdAt: string;
    }[];
    profile: {
        status: "single" | "married" | "head-of-family";
        taxYear: number;
        dependents: number;
        isSenior: boolean;
        isPWD: boolean;
    };
    results: {
        taxableIncome: number;
        incomeTax: number;
        percentageTax: number;
        totalTax: number;
        effectiveRate: number;
        regime: "graduated" | "8-percent" | "osd";
        breakdown: {
            base: number;
            bracket: string;
            rate: number;
            tax: number;
        }[];
    };
    income: {
        compensation: number;
        business: number;
        professional: number;
        capitalGains: number;
        passive: number;
        mixedIncome: boolean;
    };
}, {
    history: {
        year: number;
        id: string;
        profile: {
            status: "single" | "married" | "head-of-family";
            taxYear: number;
            dependents: number;
            isSenior: boolean;
            isPWD: boolean;
        };
        results: {
            taxableIncome: number;
            incomeTax: number;
            percentageTax: number;
            totalTax: number;
            effectiveRate: number;
            regime: "graduated" | "8-percent" | "osd";
            breakdown: {
                base: number;
                bracket: string;
                rate: number;
                tax: number;
            }[];
        };
        createdAt: string;
    }[];
    profile: {
        status: "single" | "married" | "head-of-family";
        taxYear: number;
        dependents: number;
        isSenior: boolean;
        isPWD: boolean;
    };
    results: {
        taxableIncome: number;
        incomeTax: number;
        percentageTax: number;
        totalTax: number;
        effectiveRate: number;
        regime: "graduated" | "8-percent" | "osd";
        breakdown: {
            base: number;
            bracket: string;
            rate: number;
            tax: number;
        }[];
    };
    income: {
        compensation: number;
        business: number;
        professional: number;
        capitalGains: number;
        passive: number;
        mixedIncome: boolean;
    };
}>;
export declare const InventoryItemSchema: z.ZodObject<{
    id: z.ZodString;
    sku: z.ZodString;
    name: z.ZodString;
    category: z.ZodString;
    unit: z.ZodString;
    cost: z.ZodNumber;
    price: z.ZodNumber;
    stock: z.ZodNumber;
    reorderPoint: z.ZodNumber;
    barcode: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    unit: string;
    name: string;
    id: string;
    sku: string;
    category: string;
    cost: number;
    price: number;
    stock: number;
    reorderPoint: number;
    barcode?: string | undefined;
}, {
    unit: string;
    name: string;
    id: string;
    sku: string;
    category: string;
    cost: number;
    price: number;
    stock: number;
    reorderPoint: number;
    barcode?: string | undefined;
}>;
export declare const SaleItemSchema: z.ZodObject<{
    productId: z.ZodString;
    qty: z.ZodNumber;
    price: z.ZodNumber;
    discount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    discount: number;
    price: number;
    productId: string;
    qty: number;
}, {
    discount: number;
    price: number;
    productId: string;
    qty: number;
}>;
export declare const SaleRecordSchema: z.ZodObject<{
    id: z.ZodString;
    date: z.ZodString;
    items: z.ZodArray<z.ZodObject<{
        productId: z.ZodString;
        qty: z.ZodNumber;
        price: z.ZodNumber;
        discount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        discount: number;
        price: number;
        productId: string;
        qty: number;
    }, {
        discount: number;
        price: number;
        productId: string;
        qty: number;
    }>, "many">;
    customer: z.ZodOptional<z.ZodString>;
    payment: z.ZodEnum<["cash", "gcash", "credit", "utang"]>;
    total: z.ZodNumber;
    discount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    date: string;
    id: string;
    discount: number;
    total: number;
    items: {
        discount: number;
        price: number;
        productId: string;
        qty: number;
    }[];
    payment: "gcash" | "cash" | "credit" | "utang";
    customer?: string | undefined;
}, {
    date: string;
    id: string;
    discount: number;
    total: number;
    items: {
        discount: number;
        price: number;
        productId: string;
        qty: number;
    }[];
    payment: "gcash" | "cash" | "credit" | "utang";
    customer?: string | undefined;
}>;
export declare const UtangRecordSchema: z.ZodObject<{
    id: z.ZodString;
    customer: z.ZodString;
    amount: z.ZodNumber;
    dueDate: z.ZodString;
    status: z.ZodEnum<["pending", "partial", "paid", "overdue"]>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "paid" | "pending" | "partial" | "overdue";
    id: string;
    customer: string;
    amount: number;
    dueDate: string;
    notes?: string | undefined;
}, {
    status: "paid" | "pending" | "partial" | "overdue";
    id: string;
    customer: string;
    amount: number;
    dueDate: string;
    notes?: string | undefined;
}>;
export declare const ExpenseRecordSchema: z.ZodObject<{
    id: z.ZodString;
    date: z.ZodString;
    category: z.ZodString;
    amount: z.ZodNumber;
    description: z.ZodString;
    receipt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    date: string;
    id: string;
    description: string;
    category: string;
    amount: number;
    receipt?: string | undefined;
}, {
    date: string;
    id: string;
    description: string;
    category: string;
    amount: number;
    receipt?: string | undefined;
}>;
export declare const NegosyoSettingsSchema: z.ZodObject<{
    businessName: z.ZodString;
    ownerName: z.ZodString;
    gcashNumber: z.ZodOptional<z.ZodString>;
    smsTemplate: z.ZodOptional<z.ZodString>;
    lowStockAlert: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    businessName: string;
    ownerName: string;
    lowStockAlert: boolean;
    gcashNumber?: string | undefined;
    smsTemplate?: string | undefined;
}, {
    businessName: string;
    ownerName: string;
    lowStockAlert: boolean;
    gcashNumber?: string | undefined;
    smsTemplate?: string | undefined;
}>;
export declare const NegosyoSheetDataSchema: z.ZodObject<{
    inventory: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        sku: z.ZodString;
        name: z.ZodString;
        category: z.ZodString;
        unit: z.ZodString;
        cost: z.ZodNumber;
        price: z.ZodNumber;
        stock: z.ZodNumber;
        reorderPoint: z.ZodNumber;
        barcode: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        unit: string;
        name: string;
        id: string;
        sku: string;
        category: string;
        cost: number;
        price: number;
        stock: number;
        reorderPoint: number;
        barcode?: string | undefined;
    }, {
        unit: string;
        name: string;
        id: string;
        sku: string;
        category: string;
        cost: number;
        price: number;
        stock: number;
        reorderPoint: number;
        barcode?: string | undefined;
    }>, "many">;
    sales: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        date: z.ZodString;
        items: z.ZodArray<z.ZodObject<{
            productId: z.ZodString;
            qty: z.ZodNumber;
            price: z.ZodNumber;
            discount: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            discount: number;
            price: number;
            productId: string;
            qty: number;
        }, {
            discount: number;
            price: number;
            productId: string;
            qty: number;
        }>, "many">;
        customer: z.ZodOptional<z.ZodString>;
        payment: z.ZodEnum<["cash", "gcash", "credit", "utang"]>;
        total: z.ZodNumber;
        discount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        date: string;
        id: string;
        discount: number;
        total: number;
        items: {
            discount: number;
            price: number;
            productId: string;
            qty: number;
        }[];
        payment: "gcash" | "cash" | "credit" | "utang";
        customer?: string | undefined;
    }, {
        date: string;
        id: string;
        discount: number;
        total: number;
        items: {
            discount: number;
            price: number;
            productId: string;
            qty: number;
        }[];
        payment: "gcash" | "cash" | "credit" | "utang";
        customer?: string | undefined;
    }>, "many">;
    utang: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        customer: z.ZodString;
        amount: z.ZodNumber;
        dueDate: z.ZodString;
        status: z.ZodEnum<["pending", "partial", "paid", "overdue"]>;
        notes: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status: "paid" | "pending" | "partial" | "overdue";
        id: string;
        customer: string;
        amount: number;
        dueDate: string;
        notes?: string | undefined;
    }, {
        status: "paid" | "pending" | "partial" | "overdue";
        id: string;
        customer: string;
        amount: number;
        dueDate: string;
        notes?: string | undefined;
    }>, "many">;
    expenses: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        date: z.ZodString;
        category: z.ZodString;
        amount: z.ZodNumber;
        description: z.ZodString;
        receipt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        date: string;
        id: string;
        description: string;
        category: string;
        amount: number;
        receipt?: string | undefined;
    }, {
        date: string;
        id: string;
        description: string;
        category: string;
        amount: number;
        receipt?: string | undefined;
    }>, "many">;
    settings: z.ZodObject<{
        businessName: z.ZodString;
        ownerName: z.ZodString;
        gcashNumber: z.ZodOptional<z.ZodString>;
        smsTemplate: z.ZodOptional<z.ZodString>;
        lowStockAlert: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        businessName: string;
        ownerName: string;
        lowStockAlert: boolean;
        gcashNumber?: string | undefined;
        smsTemplate?: string | undefined;
    }, {
        businessName: string;
        ownerName: string;
        lowStockAlert: boolean;
        gcashNumber?: string | undefined;
        smsTemplate?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    utang: {
        status: "paid" | "pending" | "partial" | "overdue";
        id: string;
        customer: string;
        amount: number;
        dueDate: string;
        notes?: string | undefined;
    }[];
    settings: {
        businessName: string;
        ownerName: string;
        lowStockAlert: boolean;
        gcashNumber?: string | undefined;
        smsTemplate?: string | undefined;
    };
    inventory: {
        unit: string;
        name: string;
        id: string;
        sku: string;
        category: string;
        cost: number;
        price: number;
        stock: number;
        reorderPoint: number;
        barcode?: string | undefined;
    }[];
    sales: {
        date: string;
        id: string;
        discount: number;
        total: number;
        items: {
            discount: number;
            price: number;
            productId: string;
            qty: number;
        }[];
        payment: "gcash" | "cash" | "credit" | "utang";
        customer?: string | undefined;
    }[];
    expenses: {
        date: string;
        id: string;
        description: string;
        category: string;
        amount: number;
        receipt?: string | undefined;
    }[];
}, {
    utang: {
        status: "paid" | "pending" | "partial" | "overdue";
        id: string;
        customer: string;
        amount: number;
        dueDate: string;
        notes?: string | undefined;
    }[];
    settings: {
        businessName: string;
        ownerName: string;
        lowStockAlert: boolean;
        gcashNumber?: string | undefined;
        smsTemplate?: string | undefined;
    };
    inventory: {
        unit: string;
        name: string;
        id: string;
        sku: string;
        category: string;
        cost: number;
        price: number;
        stock: number;
        reorderPoint: number;
        barcode?: string | undefined;
    }[];
    sales: {
        date: string;
        id: string;
        discount: number;
        total: number;
        items: {
            discount: number;
            price: number;
            productId: string;
            qty: number;
        }[];
        payment: "gcash" | "cash" | "credit" | "utang";
        customer?: string | undefined;
    }[];
    expenses: {
        date: string;
        id: string;
        description: string;
        category: string;
        amount: number;
        receipt?: string | undefined;
    }[];
}>;
export declare const EmployeeSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    role: z.ZodEnum<["server", "bartender", "host", "busser", "manager", "chef", "kitchen"]>;
    hours: z.ZodNumber;
    isManagerial: z.ZodBoolean;
    share: z.ZodNumber;
    payout: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    hours: number;
    name: string;
    id: string;
    role: "server" | "bartender" | "host" | "busser" | "manager" | "chef" | "kitchen";
    isManagerial: boolean;
    share: number;
    payout: number;
}, {
    hours: number;
    name: string;
    id: string;
    role: "server" | "bartender" | "host" | "busser" | "manager" | "chef" | "kitchen";
    isManagerial: boolean;
    share: number;
    payout: number;
}>;
export declare const TipPoolSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    totalTips: z.ZodNumber;
    period: z.ZodString;
    status: z.ZodEnum<["draft", "calculated", "distributed"]>;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "calculated" | "distributed";
    name: string;
    id: string;
    totalTips: number;
    period: string;
}, {
    status: "draft" | "calculated" | "distributed";
    name: string;
    id: string;
    totalTips: number;
    period: string;
}>;
export declare const PeriodSchema: z.ZodObject<{
    id: z.ZodString;
    start: z.ZodString;
    end: z.ZodString;
    totalTips: z.ZodNumber;
    totalHours: z.ZodNumber;
    poolId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    totalTips: number;
    start: string;
    end: string;
    totalHours: number;
    poolId: string;
}, {
    id: string;
    totalTips: number;
    start: string;
    end: string;
    totalHours: number;
    poolId: string;
}>;
export declare const TipPoolSettingsSchema: z.ZodObject<{
    venueName: z.ZodString;
    distributionMethod: z.ZodEnum<["hours", "points", "hybrid"]>;
    managerialExclusion: z.ZodBoolean;
    compliance: z.ZodEnum<["DOLE-11360", "DO-242-24"]>;
}, "strip", z.ZodTypeAny, {
    venueName: string;
    distributionMethod: "hours" | "points" | "hybrid";
    managerialExclusion: boolean;
    compliance: "DOLE-11360" | "DO-242-24";
}, {
    venueName: string;
    distributionMethod: "hours" | "points" | "hybrid";
    managerialExclusion: boolean;
    compliance: "DOLE-11360" | "DO-242-24";
}>;
export declare const TipPoolCalcDataSchema: z.ZodObject<{
    pool: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        totalTips: z.ZodNumber;
        period: z.ZodString;
        status: z.ZodEnum<["draft", "calculated", "distributed"]>;
    }, "strip", z.ZodTypeAny, {
        status: "draft" | "calculated" | "distributed";
        name: string;
        id: string;
        totalTips: number;
        period: string;
    }, {
        status: "draft" | "calculated" | "distributed";
        name: string;
        id: string;
        totalTips: number;
        period: string;
    }>;
    employees: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        role: z.ZodEnum<["server", "bartender", "host", "busser", "manager", "chef", "kitchen"]>;
        hours: z.ZodNumber;
        isManagerial: z.ZodBoolean;
        share: z.ZodNumber;
        payout: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        hours: number;
        name: string;
        id: string;
        role: "server" | "bartender" | "host" | "busser" | "manager" | "chef" | "kitchen";
        isManagerial: boolean;
        share: number;
        payout: number;
    }, {
        hours: number;
        name: string;
        id: string;
        role: "server" | "bartender" | "host" | "busser" | "manager" | "chef" | "kitchen";
        isManagerial: boolean;
        share: number;
        payout: number;
    }>, "many">;
    periods: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        start: z.ZodString;
        end: z.ZodString;
        totalTips: z.ZodNumber;
        totalHours: z.ZodNumber;
        poolId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        totalTips: number;
        start: string;
        end: string;
        totalHours: number;
        poolId: string;
    }, {
        id: string;
        totalTips: number;
        start: string;
        end: string;
        totalHours: number;
        poolId: string;
    }>, "many">;
    settings: z.ZodObject<{
        venueName: z.ZodString;
        distributionMethod: z.ZodEnum<["hours", "points", "hybrid"]>;
        managerialExclusion: z.ZodBoolean;
        compliance: z.ZodEnum<["DOLE-11360", "DO-242-24"]>;
    }, "strip", z.ZodTypeAny, {
        venueName: string;
        distributionMethod: "hours" | "points" | "hybrid";
        managerialExclusion: boolean;
        compliance: "DOLE-11360" | "DO-242-24";
    }, {
        venueName: string;
        distributionMethod: "hours" | "points" | "hybrid";
        managerialExclusion: boolean;
        compliance: "DOLE-11360" | "DO-242-24";
    }>;
}, "strip", z.ZodTypeAny, {
    settings: {
        venueName: string;
        distributionMethod: "hours" | "points" | "hybrid";
        managerialExclusion: boolean;
        compliance: "DOLE-11360" | "DO-242-24";
    };
    pool: {
        status: "draft" | "calculated" | "distributed";
        name: string;
        id: string;
        totalTips: number;
        period: string;
    };
    employees: {
        hours: number;
        name: string;
        id: string;
        role: "server" | "bartender" | "host" | "busser" | "manager" | "chef" | "kitchen";
        isManagerial: boolean;
        share: number;
        payout: number;
    }[];
    periods: {
        id: string;
        totalTips: number;
        start: string;
        end: string;
        totalHours: number;
        poolId: string;
    }[];
}, {
    settings: {
        venueName: string;
        distributionMethod: "hours" | "points" | "hybrid";
        managerialExclusion: boolean;
        compliance: "DOLE-11360" | "DO-242-24";
    };
    pool: {
        status: "draft" | "calculated" | "distributed";
        name: string;
        id: string;
        totalTips: number;
        period: string;
    };
    employees: {
        hours: number;
        name: string;
        id: string;
        role: "server" | "bartender" | "host" | "busser" | "manager" | "chef" | "kitchen";
        isManagerial: boolean;
        share: number;
        payout: number;
    }[];
    periods: {
        id: string;
        totalTips: number;
        start: string;
        end: string;
        totalHours: number;
        poolId: string;
    }[];
}>;
export declare const AllowanceSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    amount: z.ZodNumber;
    taxable: z.ZodBoolean;
    frequency: z.ZodEnum<["daily", "weekly", "monthly", "quarterly", "semi-annual", "annual"]>;
}, "strip", z.ZodTypeAny, {
    name: string;
    id: string;
    amount: number;
    taxable: boolean;
    frequency: "daily" | "weekly" | "monthly" | "quarterly" | "semi-annual" | "annual";
}, {
    name: string;
    id: string;
    amount: number;
    taxable: boolean;
    frequency: "daily" | "weekly" | "monthly" | "quarterly" | "semi-annual" | "annual";
}>;
export declare const DeductionSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    amount: z.ZodNumber;
    type: z.ZodEnum<["gov", "loan", "other"]>;
    frequency: z.ZodEnum<["daily", "weekly", "monthly", "quarterly", "semi-annual", "annual"]>;
}, "strip", z.ZodTypeAny, {
    type: "gov" | "loan" | "other";
    name: string;
    id: string;
    amount: number;
    frequency: "daily" | "weekly" | "monthly" | "quarterly" | "semi-annual" | "annual";
}, {
    type: "gov" | "loan" | "other";
    name: string;
    id: string;
    amount: number;
    frequency: "daily" | "weekly" | "monthly" | "quarterly" | "semi-annual" | "annual";
}>;
export declare const PayEmployeeSchema: z.ZodObject<{
    id: z.ZodString;
    employeeNo: z.ZodString;
    name: z.ZodString;
    tin: z.ZodString;
    sss: z.ZodString;
    philhealth: z.ZodString;
    pagibig: z.ZodString;
    birthDate: z.ZodString;
    hireDate: z.ZodString;
    position: z.ZodString;
    rateType: z.ZodEnum<["monthly", "daily", "hourly"]>;
    basicRate: z.ZodNumber;
    allowances: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        amount: z.ZodNumber;
        taxable: z.ZodBoolean;
        frequency: z.ZodEnum<["daily", "weekly", "monthly", "quarterly", "semi-annual", "annual"]>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: string;
        amount: number;
        taxable: boolean;
        frequency: "daily" | "weekly" | "monthly" | "quarterly" | "semi-annual" | "annual";
    }, {
        name: string;
        id: string;
        amount: number;
        taxable: boolean;
        frequency: "daily" | "weekly" | "monthly" | "quarterly" | "semi-annual" | "annual";
    }>, "many">;
    deductions: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        amount: z.ZodNumber;
        type: z.ZodEnum<["gov", "loan", "other"]>;
        frequency: z.ZodEnum<["daily", "weekly", "monthly", "quarterly", "semi-annual", "annual"]>;
    }, "strip", z.ZodTypeAny, {
        type: "gov" | "loan" | "other";
        name: string;
        id: string;
        amount: number;
        frequency: "daily" | "weekly" | "monthly" | "quarterly" | "semi-annual" | "annual";
    }, {
        type: "gov" | "loan" | "other";
        name: string;
        id: string;
        amount: number;
        frequency: "daily" | "weekly" | "monthly" | "quarterly" | "semi-annual" | "annual";
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    tin: string;
    id: string;
    employeeNo: string;
    sss: string;
    philhealth: string;
    pagibig: string;
    birthDate: string;
    hireDate: string;
    position: string;
    rateType: "daily" | "monthly" | "hourly";
    basicRate: number;
    allowances: {
        name: string;
        id: string;
        amount: number;
        taxable: boolean;
        frequency: "daily" | "weekly" | "monthly" | "quarterly" | "semi-annual" | "annual";
    }[];
    deductions: {
        type: "gov" | "loan" | "other";
        name: string;
        id: string;
        amount: number;
        frequency: "daily" | "weekly" | "monthly" | "quarterly" | "semi-annual" | "annual";
    }[];
}, {
    name: string;
    tin: string;
    id: string;
    employeeNo: string;
    sss: string;
    philhealth: string;
    pagibig: string;
    birthDate: string;
    hireDate: string;
    position: string;
    rateType: "daily" | "monthly" | "hourly";
    basicRate: number;
    allowances: {
        name: string;
        id: string;
        amount: number;
        taxable: boolean;
        frequency: "daily" | "weekly" | "monthly" | "quarterly" | "semi-annual" | "annual";
    }[];
    deductions: {
        type: "gov" | "loan" | "other";
        name: string;
        id: string;
        amount: number;
        frequency: "daily" | "weekly" | "monthly" | "quarterly" | "semi-annual" | "annual";
    }[];
}>;
export declare const PayrollDeductionSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    amount: z.ZodNumber;
    employeeShare: z.ZodNumber;
    employerShare: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    id: string;
    amount: number;
    employeeShare: number;
    employerShare: number;
}, {
    name: string;
    id: string;
    amount: number;
    employeeShare: number;
    employerShare: number;
}>;
export declare const PayrollEmployeeSchema: z.ZodObject<{
    employeeId: z.ZodString;
    daysWorked: z.ZodNumber;
    otHours: z.ZodNumber;
    ndHours: z.ZodNumber;
    holidayHours: z.ZodNumber;
    gross: z.ZodNumber;
    deductions: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        amount: z.ZodNumber;
        employeeShare: z.ZodNumber;
        employerShare: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: string;
        amount: number;
        employeeShare: number;
        employerShare: number;
    }, {
        name: string;
        id: string;
        amount: number;
        employeeShare: number;
        employerShare: number;
    }>, "many">;
    net: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    deductions: {
        name: string;
        id: string;
        amount: number;
        employeeShare: number;
        employerShare: number;
    }[];
    employeeId: string;
    daysWorked: number;
    otHours: number;
    ndHours: number;
    holidayHours: number;
    gross: number;
    net: number;
}, {
    deductions: {
        name: string;
        id: string;
        amount: number;
        employeeShare: number;
        employerShare: number;
    }[];
    employeeId: string;
    daysWorked: number;
    otHours: number;
    ndHours: number;
    holidayHours: number;
    gross: number;
    net: number;
}>;
export declare const PayrollSchema: z.ZodObject<{
    id: z.ZodString;
    period: z.ZodString;
    startDate: z.ZodString;
    endDate: z.ZodString;
    employees: z.ZodArray<z.ZodObject<{
        employeeId: z.ZodString;
        daysWorked: z.ZodNumber;
        otHours: z.ZodNumber;
        ndHours: z.ZodNumber;
        holidayHours: z.ZodNumber;
        gross: z.ZodNumber;
        deductions: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            amount: z.ZodNumber;
            employeeShare: z.ZodNumber;
            employerShare: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: string;
            amount: number;
            employeeShare: number;
            employerShare: number;
        }, {
            name: string;
            id: string;
            amount: number;
            employeeShare: number;
            employerShare: number;
        }>, "many">;
        net: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        deductions: {
            name: string;
            id: string;
            amount: number;
            employeeShare: number;
            employerShare: number;
        }[];
        employeeId: string;
        daysWorked: number;
        otHours: number;
        ndHours: number;
        holidayHours: number;
        gross: number;
        net: number;
    }, {
        deductions: {
            name: string;
            id: string;
            amount: number;
            employeeShare: number;
            employerShare: number;
        }[];
        employeeId: string;
        daysWorked: number;
        otHours: number;
        ndHours: number;
        holidayHours: number;
        gross: number;
        net: number;
    }>, "many">;
    status: z.ZodEnum<["draft", "finalized", "paid"]>;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "paid" | "finalized";
    id: string;
    period: string;
    employees: {
        deductions: {
            name: string;
            id: string;
            amount: number;
            employeeShare: number;
            employerShare: number;
        }[];
        employeeId: string;
        daysWorked: number;
        otHours: number;
        ndHours: number;
        holidayHours: number;
        gross: number;
        net: number;
    }[];
    startDate: string;
    endDate: string;
}, {
    status: "draft" | "paid" | "finalized";
    id: string;
    period: string;
    employees: {
        deductions: {
            name: string;
            id: string;
            amount: number;
            employeeShare: number;
            employerShare: number;
        }[];
        employeeId: string;
        daysWorked: number;
        otHours: number;
        ndHours: number;
        holidayHours: number;
        gross: number;
        net: number;
    }[];
    startDate: string;
    endDate: string;
}>;
export declare const PayrollSettingsSchema: z.ZodObject<{
    companyName: z.ZodString;
    companyTin: z.ZodString;
    sssBranch: z.ZodString;
    payFrequency: z.ZodEnum<["semi-monthly", "monthly"]>;
    cutoff1: z.ZodNumber;
    cutoff2: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    companyName: string;
    companyTin: string;
    sssBranch: string;
    payFrequency: "monthly" | "semi-monthly";
    cutoff1: number;
    cutoff2: number;
}, {
    companyName: string;
    companyTin: string;
    sssBranch: string;
    payFrequency: "monthly" | "semi-monthly";
    cutoff1: number;
    cutoff2: number;
}>;
export declare const GovRatesSchema: z.ZodObject<{
    year: z.ZodNumber;
    sss: z.ZodObject<{
        min: z.ZodNumber;
        max: z.ZodNumber;
        eeRate: z.ZodNumber;
        erRate: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        min: number;
        max: number;
        eeRate: number;
        erRate: number;
    }, {
        min: number;
        max: number;
        eeRate: number;
        erRate: number;
    }>;
    philhealth: z.ZodObject<{
        rate: z.ZodNumber;
        ceiling: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        rate: number;
        ceiling: number;
    }, {
        rate: number;
        ceiling: number;
    }>;
    pagibig: z.ZodObject<{
        rate: z.ZodNumber;
        ceiling: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        rate: number;
        ceiling: number;
    }, {
        rate: number;
        ceiling: number;
    }>;
    taxTables: z.ZodArray<z.ZodObject<{
        bracket: z.ZodString;
        min: z.ZodNumber;
        max: z.ZodNumber;
        baseTax: z.ZodNumber;
        rate: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        bracket: string;
        rate: number;
        min: number;
        max: number;
        baseTax: number;
    }, {
        bracket: string;
        rate: number;
        min: number;
        max: number;
        baseTax: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
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
    taxTables: {
        bracket: string;
        rate: number;
        min: number;
        max: number;
        baseTax: number;
    }[];
}, {
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
    taxTables: {
        bracket: string;
        rate: number;
        min: number;
        max: number;
        baseTax: number;
    }[];
}>;
export declare const PayslipPHDataSchema: z.ZodObject<{
    employees: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        employeeNo: z.ZodString;
        name: z.ZodString;
        tin: z.ZodString;
        sss: z.ZodString;
        philhealth: z.ZodString;
        pagibig: z.ZodString;
        birthDate: z.ZodString;
        hireDate: z.ZodString;
        position: z.ZodString;
        rateType: z.ZodEnum<["monthly", "daily", "hourly"]>;
        basicRate: z.ZodNumber;
        allowances: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            amount: z.ZodNumber;
            taxable: z.ZodBoolean;
            frequency: z.ZodEnum<["daily", "weekly", "monthly", "quarterly", "semi-annual", "annual"]>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: string;
            amount: number;
            taxable: boolean;
            frequency: "daily" | "weekly" | "monthly" | "quarterly" | "semi-annual" | "annual";
        }, {
            name: string;
            id: string;
            amount: number;
            taxable: boolean;
            frequency: "daily" | "weekly" | "monthly" | "quarterly" | "semi-annual" | "annual";
        }>, "many">;
        deductions: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            amount: z.ZodNumber;
            type: z.ZodEnum<["gov", "loan", "other"]>;
            frequency: z.ZodEnum<["daily", "weekly", "monthly", "quarterly", "semi-annual", "annual"]>;
        }, "strip", z.ZodTypeAny, {
            type: "gov" | "loan" | "other";
            name: string;
            id: string;
            amount: number;
            frequency: "daily" | "weekly" | "monthly" | "quarterly" | "semi-annual" | "annual";
        }, {
            type: "gov" | "loan" | "other";
            name: string;
            id: string;
            amount: number;
            frequency: "daily" | "weekly" | "monthly" | "quarterly" | "semi-annual" | "annual";
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        name: string;
        tin: string;
        id: string;
        employeeNo: string;
        sss: string;
        philhealth: string;
        pagibig: string;
        birthDate: string;
        hireDate: string;
        position: string;
        rateType: "daily" | "monthly" | "hourly";
        basicRate: number;
        allowances: {
            name: string;
            id: string;
            amount: number;
            taxable: boolean;
            frequency: "daily" | "weekly" | "monthly" | "quarterly" | "semi-annual" | "annual";
        }[];
        deductions: {
            type: "gov" | "loan" | "other";
            name: string;
            id: string;
            amount: number;
            frequency: "daily" | "weekly" | "monthly" | "quarterly" | "semi-annual" | "annual";
        }[];
    }, {
        name: string;
        tin: string;
        id: string;
        employeeNo: string;
        sss: string;
        philhealth: string;
        pagibig: string;
        birthDate: string;
        hireDate: string;
        position: string;
        rateType: "daily" | "monthly" | "hourly";
        basicRate: number;
        allowances: {
            name: string;
            id: string;
            amount: number;
            taxable: boolean;
            frequency: "daily" | "weekly" | "monthly" | "quarterly" | "semi-annual" | "annual";
        }[];
        deductions: {
            type: "gov" | "loan" | "other";
            name: string;
            id: string;
            amount: number;
            frequency: "daily" | "weekly" | "monthly" | "quarterly" | "semi-annual" | "annual";
        }[];
    }>, "many">;
    payrolls: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        period: z.ZodString;
        startDate: z.ZodString;
        endDate: z.ZodString;
        employees: z.ZodArray<z.ZodObject<{
            employeeId: z.ZodString;
            daysWorked: z.ZodNumber;
            otHours: z.ZodNumber;
            ndHours: z.ZodNumber;
            holidayHours: z.ZodNumber;
            gross: z.ZodNumber;
            deductions: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
                amount: z.ZodNumber;
                employeeShare: z.ZodNumber;
                employerShare: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                name: string;
                id: string;
                amount: number;
                employeeShare: number;
                employerShare: number;
            }, {
                name: string;
                id: string;
                amount: number;
                employeeShare: number;
                employerShare: number;
            }>, "many">;
            net: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            deductions: {
                name: string;
                id: string;
                amount: number;
                employeeShare: number;
                employerShare: number;
            }[];
            employeeId: string;
            daysWorked: number;
            otHours: number;
            ndHours: number;
            holidayHours: number;
            gross: number;
            net: number;
        }, {
            deductions: {
                name: string;
                id: string;
                amount: number;
                employeeShare: number;
                employerShare: number;
            }[];
            employeeId: string;
            daysWorked: number;
            otHours: number;
            ndHours: number;
            holidayHours: number;
            gross: number;
            net: number;
        }>, "many">;
        status: z.ZodEnum<["draft", "finalized", "paid"]>;
    }, "strip", z.ZodTypeAny, {
        status: "draft" | "paid" | "finalized";
        id: string;
        period: string;
        employees: {
            deductions: {
                name: string;
                id: string;
                amount: number;
                employeeShare: number;
                employerShare: number;
            }[];
            employeeId: string;
            daysWorked: number;
            otHours: number;
            ndHours: number;
            holidayHours: number;
            gross: number;
            net: number;
        }[];
        startDate: string;
        endDate: string;
    }, {
        status: "draft" | "paid" | "finalized";
        id: string;
        period: string;
        employees: {
            deductions: {
                name: string;
                id: string;
                amount: number;
                employeeShare: number;
                employerShare: number;
            }[];
            employeeId: string;
            daysWorked: number;
            otHours: number;
            ndHours: number;
            holidayHours: number;
            gross: number;
            net: number;
        }[];
        startDate: string;
        endDate: string;
    }>, "many">;
    settings: z.ZodObject<{
        companyName: z.ZodString;
        companyTin: z.ZodString;
        sssBranch: z.ZodString;
        payFrequency: z.ZodEnum<["semi-monthly", "monthly"]>;
        cutoff1: z.ZodNumber;
        cutoff2: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        companyName: string;
        companyTin: string;
        sssBranch: string;
        payFrequency: "monthly" | "semi-monthly";
        cutoff1: number;
        cutoff2: number;
    }, {
        companyName: string;
        companyTin: string;
        sssBranch: string;
        payFrequency: "monthly" | "semi-monthly";
        cutoff1: number;
        cutoff2: number;
    }>;
    govRates: z.ZodObject<{
        year: z.ZodNumber;
        sss: z.ZodObject<{
            min: z.ZodNumber;
            max: z.ZodNumber;
            eeRate: z.ZodNumber;
            erRate: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            min: number;
            max: number;
            eeRate: number;
            erRate: number;
        }, {
            min: number;
            max: number;
            eeRate: number;
            erRate: number;
        }>;
        philhealth: z.ZodObject<{
            rate: z.ZodNumber;
            ceiling: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            rate: number;
            ceiling: number;
        }, {
            rate: number;
            ceiling: number;
        }>;
        pagibig: z.ZodObject<{
            rate: z.ZodNumber;
            ceiling: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            rate: number;
            ceiling: number;
        }, {
            rate: number;
            ceiling: number;
        }>;
        taxTables: z.ZodArray<z.ZodObject<{
            bracket: z.ZodString;
            min: z.ZodNumber;
            max: z.ZodNumber;
            baseTax: z.ZodNumber;
            rate: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            bracket: string;
            rate: number;
            min: number;
            max: number;
            baseTax: number;
        }, {
            bracket: string;
            rate: number;
            min: number;
            max: number;
            baseTax: number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
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
        taxTables: {
            bracket: string;
            rate: number;
            min: number;
            max: number;
            baseTax: number;
        }[];
    }, {
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
        taxTables: {
            bracket: string;
            rate: number;
            min: number;
            max: number;
            baseTax: number;
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    settings: {
        companyName: string;
        companyTin: string;
        sssBranch: string;
        payFrequency: "monthly" | "semi-monthly";
        cutoff1: number;
        cutoff2: number;
    };
    employees: {
        name: string;
        tin: string;
        id: string;
        employeeNo: string;
        sss: string;
        philhealth: string;
        pagibig: string;
        birthDate: string;
        hireDate: string;
        position: string;
        rateType: "daily" | "monthly" | "hourly";
        basicRate: number;
        allowances: {
            name: string;
            id: string;
            amount: number;
            taxable: boolean;
            frequency: "daily" | "weekly" | "monthly" | "quarterly" | "semi-annual" | "annual";
        }[];
        deductions: {
            type: "gov" | "loan" | "other";
            name: string;
            id: string;
            amount: number;
            frequency: "daily" | "weekly" | "monthly" | "quarterly" | "semi-annual" | "annual";
        }[];
    }[];
    payrolls: {
        status: "draft" | "paid" | "finalized";
        id: string;
        period: string;
        employees: {
            deductions: {
                name: string;
                id: string;
                amount: number;
                employeeShare: number;
                employerShare: number;
            }[];
            employeeId: string;
            daysWorked: number;
            otHours: number;
            ndHours: number;
            holidayHours: number;
            gross: number;
            net: number;
        }[];
        startDate: string;
        endDate: string;
    }[];
    govRates: {
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
        taxTables: {
            bracket: string;
            rate: number;
            min: number;
            max: number;
            baseTax: number;
        }[];
    };
}, {
    settings: {
        companyName: string;
        companyTin: string;
        sssBranch: string;
        payFrequency: "monthly" | "semi-monthly";
        cutoff1: number;
        cutoff2: number;
    };
    employees: {
        name: string;
        tin: string;
        id: string;
        employeeNo: string;
        sss: string;
        philhealth: string;
        pagibig: string;
        birthDate: string;
        hireDate: string;
        position: string;
        rateType: "daily" | "monthly" | "hourly";
        basicRate: number;
        allowances: {
            name: string;
            id: string;
            amount: number;
            taxable: boolean;
            frequency: "daily" | "weekly" | "monthly" | "quarterly" | "semi-annual" | "annual";
        }[];
        deductions: {
            type: "gov" | "loan" | "other";
            name: string;
            id: string;
            amount: number;
            frequency: "daily" | "weekly" | "monthly" | "quarterly" | "semi-annual" | "annual";
        }[];
    }[];
    payrolls: {
        status: "draft" | "paid" | "finalized";
        id: string;
        period: string;
        employees: {
            deductions: {
                name: string;
                id: string;
                amount: number;
                employeeShare: number;
                employerShare: number;
            }[];
            employeeId: string;
            daysWorked: number;
            otHours: number;
            ndHours: number;
            holidayHours: number;
            gross: number;
            net: number;
        }[];
        startDate: string;
        endDate: string;
    }[];
    govRates: {
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
        taxTables: {
            bracket: string;
            rate: number;
            min: number;
            max: number;
            baseTax: number;
        }[];
    };
}>;
export declare const SellerProductSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    cost: z.ZodNumber;
    weight: z.ZodNumber;
    dimensions: z.ZodObject<{
        l: z.ZodNumber;
        w: z.ZodNumber;
        h: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        l: number;
        w: number;
        h: number;
    }, {
        l: number;
        w: number;
        h: number;
    }>;
    category: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    id: string;
    category: string;
    cost: number;
    weight: number;
    dimensions: {
        l: number;
        w: number;
        h: number;
    };
}, {
    name: string;
    id: string;
    category: string;
    cost: number;
    weight: number;
    dimensions: {
        l: number;
        w: number;
        h: number;
    };
}>;
export declare const MarketplaceConfigSchema: z.ZodObject<{
    id: z.ZodEnum<["shopee", "lazada", "tiktok"]>;
    name: z.ZodString;
    commissionRate: z.ZodNumber;
    shippingFee: z.ZodNumber;
    paymentFee: z.ZodNumber;
    otherFees: z.ZodNumber;
    minPrice: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    id: "shopee" | "lazada" | "tiktok";
    commissionRate: number;
    shippingFee: number;
    paymentFee: number;
    otherFees: number;
    minPrice: number;
}, {
    name: string;
    id: "shopee" | "lazada" | "tiktok";
    commissionRate: number;
    shippingFee: number;
    paymentFee: number;
    otherFees: number;
    minPrice: number;
}>;
export declare const FeeBreakdownSchema: z.ZodObject<{
    commission: z.ZodNumber;
    shipping: z.ZodNumber;
    payment: z.ZodNumber;
    other: z.ZodNumber;
    total: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    other: number;
    total: number;
    payment: number;
    commission: number;
    shipping: number;
}, {
    other: number;
    total: number;
    payment: number;
    commission: number;
    shipping: number;
}>;
export declare const PriceCalculationSchema: z.ZodObject<{
    productId: z.ZodString;
    marketplace: z.ZodString;
    sellingPrice: z.ZodNumber;
    fees: z.ZodObject<{
        commission: z.ZodNumber;
        shipping: z.ZodNumber;
        payment: z.ZodNumber;
        other: z.ZodNumber;
        total: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        other: number;
        total: number;
        payment: number;
        commission: number;
        shipping: number;
    }, {
        other: number;
        total: number;
        payment: number;
        commission: number;
        shipping: number;
    }>;
    profit: z.ZodNumber;
    margin: z.ZodNumber;
    breakeven: z.ZodNumber;
    targetPrice: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    productId: string;
    marketplace: string;
    sellingPrice: number;
    fees: {
        other: number;
        total: number;
        payment: number;
        commission: number;
        shipping: number;
    };
    profit: number;
    margin: number;
    breakeven: number;
    targetPrice?: number | undefined;
}, {
    productId: string;
    marketplace: string;
    sellingPrice: number;
    fees: {
        other: number;
        total: number;
        payment: number;
        commission: number;
        shipping: number;
    };
    profit: number;
    margin: number;
    breakeven: number;
    targetPrice?: number | undefined;
}>;
export declare const SellerSettingsSchema: z.ZodObject<{
    defaultMarketplace: z.ZodString;
    targetMargin: z.ZodNumber;
    rtsBuffer: z.ZodNumber;
    birRate: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    defaultMarketplace: string;
    targetMargin: number;
    rtsBuffer: number;
    birRate: number;
}, {
    defaultMarketplace: string;
    targetMargin: number;
    rtsBuffer: number;
    birRate: number;
}>;
export declare const SellerPriceDataSchema: z.ZodObject<{
    products: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        cost: z.ZodNumber;
        weight: z.ZodNumber;
        dimensions: z.ZodObject<{
            l: z.ZodNumber;
            w: z.ZodNumber;
            h: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            l: number;
            w: number;
            h: number;
        }, {
            l: number;
            w: number;
            h: number;
        }>;
        category: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: string;
        category: string;
        cost: number;
        weight: number;
        dimensions: {
            l: number;
            w: number;
            h: number;
        };
    }, {
        name: string;
        id: string;
        category: string;
        cost: number;
        weight: number;
        dimensions: {
            l: number;
            w: number;
            h: number;
        };
    }>, "many">;
    marketplaces: z.ZodArray<z.ZodObject<{
        id: z.ZodEnum<["shopee", "lazada", "tiktok"]>;
        name: z.ZodString;
        commissionRate: z.ZodNumber;
        shippingFee: z.ZodNumber;
        paymentFee: z.ZodNumber;
        otherFees: z.ZodNumber;
        minPrice: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: "shopee" | "lazada" | "tiktok";
        commissionRate: number;
        shippingFee: number;
        paymentFee: number;
        otherFees: number;
        minPrice: number;
    }, {
        name: string;
        id: "shopee" | "lazada" | "tiktok";
        commissionRate: number;
        shippingFee: number;
        paymentFee: number;
        otherFees: number;
        minPrice: number;
    }>, "many">;
    calculations: z.ZodArray<z.ZodObject<{
        productId: z.ZodString;
        marketplace: z.ZodString;
        sellingPrice: z.ZodNumber;
        fees: z.ZodObject<{
            commission: z.ZodNumber;
            shipping: z.ZodNumber;
            payment: z.ZodNumber;
            other: z.ZodNumber;
            total: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            other: number;
            total: number;
            payment: number;
            commission: number;
            shipping: number;
        }, {
            other: number;
            total: number;
            payment: number;
            commission: number;
            shipping: number;
        }>;
        profit: z.ZodNumber;
        margin: z.ZodNumber;
        breakeven: z.ZodNumber;
        targetPrice: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        productId: string;
        marketplace: string;
        sellingPrice: number;
        fees: {
            other: number;
            total: number;
            payment: number;
            commission: number;
            shipping: number;
        };
        profit: number;
        margin: number;
        breakeven: number;
        targetPrice?: number | undefined;
    }, {
        productId: string;
        marketplace: string;
        sellingPrice: number;
        fees: {
            other: number;
            total: number;
            payment: number;
            commission: number;
            shipping: number;
        };
        profit: number;
        margin: number;
        breakeven: number;
        targetPrice?: number | undefined;
    }>, "many">;
    settings: z.ZodObject<{
        defaultMarketplace: z.ZodString;
        targetMargin: z.ZodNumber;
        rtsBuffer: z.ZodNumber;
        birRate: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        defaultMarketplace: string;
        targetMargin: number;
        rtsBuffer: number;
        birRate: number;
    }, {
        defaultMarketplace: string;
        targetMargin: number;
        rtsBuffer: number;
        birRate: number;
    }>;
}, "strip", z.ZodTypeAny, {
    settings: {
        defaultMarketplace: string;
        targetMargin: number;
        rtsBuffer: number;
        birRate: number;
    };
    products: {
        name: string;
        id: string;
        category: string;
        cost: number;
        weight: number;
        dimensions: {
            l: number;
            w: number;
            h: number;
        };
    }[];
    marketplaces: {
        name: string;
        id: "shopee" | "lazada" | "tiktok";
        commissionRate: number;
        shippingFee: number;
        paymentFee: number;
        otherFees: number;
        minPrice: number;
    }[];
    calculations: {
        productId: string;
        marketplace: string;
        sellingPrice: number;
        fees: {
            other: number;
            total: number;
            payment: number;
            commission: number;
            shipping: number;
        };
        profit: number;
        margin: number;
        breakeven: number;
        targetPrice?: number | undefined;
    }[];
}, {
    settings: {
        defaultMarketplace: string;
        targetMargin: number;
        rtsBuffer: number;
        birRate: number;
    };
    products: {
        name: string;
        id: string;
        category: string;
        cost: number;
        weight: number;
        dimensions: {
            l: number;
            w: number;
            h: number;
        };
    }[];
    marketplaces: {
        name: string;
        id: "shopee" | "lazada" | "tiktok";
        commissionRate: number;
        shippingFee: number;
        paymentFee: number;
        otherFees: number;
        minPrice: number;
    }[];
    calculations: {
        productId: string;
        marketplace: string;
        sellingPrice: number;
        fees: {
            other: number;
            total: number;
            payment: number;
            commission: number;
            shipping: number;
        };
        profit: number;
        margin: number;
        breakeven: number;
        targetPrice?: number | undefined;
    }[];
}>;
export declare const UnlockCodeSchema: z.ZodObject<{
    code: z.ZodString;
    product: z.ZodEnum<["closer", "invoiceph", "taxcalcph", "negosyosheet", "tippoolcalc", "payslipph", "sellerprice", "rentsheet", "moveinreport", "pumproute", "ratecalcph", "tradejournalph", "utangplanph", "commissionph", "freelancerkitph"]>;
    tier: z.ZodEnum<["pro", "demo"]>;
    createdAt: z.ZodString;
    usedAt: z.ZodOptional<z.ZodString>;
    usedBy: z.ZodOptional<z.ZodString>;
    source: z.ZodEnum<["gcash", "lemonsqueezy", "manual"]>;
}, "strip", z.ZodTypeAny, {
    source: "gcash" | "lemonsqueezy" | "manual";
    code: string;
    createdAt: string;
    product: "closer" | "invoiceph" | "taxcalcph" | "negosyosheet" | "tippoolcalc" | "payslipph" | "sellerprice" | "rentsheet" | "moveinreport" | "pumproute" | "ratecalcph" | "tradejournalph" | "utangplanph" | "commissionph" | "freelancerkitph";
    tier: "demo" | "pro";
    usedAt?: string | undefined;
    usedBy?: string | undefined;
}, {
    source: "gcash" | "lemonsqueezy" | "manual";
    code: string;
    createdAt: string;
    product: "closer" | "invoiceph" | "taxcalcph" | "negosyosheet" | "tippoolcalc" | "payslipph" | "sellerprice" | "rentsheet" | "moveinreport" | "pumproute" | "ratecalcph" | "tradejournalph" | "utangplanph" | "commissionph" | "freelancerkitph";
    tier: "demo" | "pro";
    usedAt?: string | undefined;
    usedBy?: string | undefined;
}>;
export declare const PaymentRequestSchema: z.ZodObject<{
    product: z.ZodEnum<["closer", "invoiceph", "taxcalcph", "negosyosheet", "tippoolcalc", "payslipph", "sellerprice", "rentsheet", "moveinreport", "pumproute", "ratecalcph", "tradejournalph", "utangplanph", "commissionph", "freelancerkitph"]>;
    amount: z.ZodNumber;
    currency: z.ZodEnum<["PHP", "USD"]>;
    email: z.ZodString;
    method: z.ZodEnum<["gcash", "lemonsqueezy"]>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    currency: "PHP" | "USD";
    amount: number;
    product: "closer" | "invoiceph" | "taxcalcph" | "negosyosheet" | "tippoolcalc" | "payslipph" | "sellerprice" | "rentsheet" | "moveinreport" | "pumproute" | "ratecalcph" | "tradejournalph" | "utangplanph" | "commissionph" | "freelancerkitph";
    email: string;
    method: "gcash" | "lemonsqueezy";
    metadata?: Record<string, string> | undefined;
}, {
    currency: "PHP" | "USD";
    amount: number;
    product: "closer" | "invoiceph" | "taxcalcph" | "negosyosheet" | "tippoolcalc" | "payslipph" | "sellerprice" | "rentsheet" | "moveinreport" | "pumproute" | "ratecalcph" | "tradejournalph" | "utangplanph" | "commissionph" | "freelancerkitph";
    email: string;
    method: "gcash" | "lemonsqueezy";
    metadata?: Record<string, string> | undefined;
}>;
export declare const PaymentResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    code: z.ZodOptional<z.ZodString>;
    redirectUrl: z.ZodOptional<z.ZodString>;
    error: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    code?: string | undefined;
    error?: string | undefined;
    redirectUrl?: string | undefined;
}, {
    success: boolean;
    code?: string | undefined;
    error?: string | undefined;
    redirectUrl?: string | undefined;
}>;
export declare const AffiliateLinkSchema: z.ZodObject<{
    code: z.ZodString;
    product: z.ZodEnum<["closer", "invoiceph", "taxcalcph", "negosyosheet", "tippoolcalc", "payslipph", "sellerprice", "rentsheet", "moveinreport", "pumproute", "ratecalcph", "tradejournalph", "utangplanph", "commissionph", "freelancerkitph"]>;
    affiliateId: z.ZodString;
    commissionRate: z.ZodNumber;
    clicks: z.ZodNumber;
    conversions: z.ZodNumber;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string;
    createdAt: string;
    commissionRate: number;
    product: "closer" | "invoiceph" | "taxcalcph" | "negosyosheet" | "tippoolcalc" | "payslipph" | "sellerprice" | "rentsheet" | "moveinreport" | "pumproute" | "ratecalcph" | "tradejournalph" | "utangplanph" | "commissionph" | "freelancerkitph";
    affiliateId: string;
    clicks: number;
    conversions: number;
}, {
    code: string;
    createdAt: string;
    commissionRate: number;
    product: "closer" | "invoiceph" | "taxcalcph" | "negosyosheet" | "tippoolcalc" | "payslipph" | "sellerprice" | "rentsheet" | "moveinreport" | "pumproute" | "ratecalcph" | "tradejournalph" | "utangplanph" | "commissionph" | "freelancerkitph";
    affiliateId: string;
    clicks: number;
    conversions: number;
}>;
export declare const AnalyticsEventSchema: z.ZodObject<{
    event: z.ZodString;
    product: z.ZodEnum<["closer", "invoiceph", "taxcalcph", "negosyosheet", "tippoolcalc", "payslipph", "sellerprice", "rentsheet", "moveinreport", "pumproute", "ratecalcph", "tradejournalph", "utangplanph", "commissionph", "freelancerkitph"]>;
    properties: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    timestamp: z.ZodString;
    sessionId: z.ZodString;
    userId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    product: "closer" | "invoiceph" | "taxcalcph" | "negosyosheet" | "tippoolcalc" | "payslipph" | "sellerprice" | "rentsheet" | "moveinreport" | "pumproute" | "ratecalcph" | "tradejournalph" | "utangplanph" | "commissionph" | "freelancerkitph";
    event: string;
    properties: Record<string, unknown>;
    timestamp: string;
    sessionId: string;
    userId?: string | undefined;
}, {
    product: "closer" | "invoiceph" | "taxcalcph" | "negosyosheet" | "tippoolcalc" | "payslipph" | "sellerprice" | "rentsheet" | "moveinreport" | "pumproute" | "ratecalcph" | "tradejournalph" | "utangplanph" | "commissionph" | "freelancerkitph";
    event: string;
    properties: Record<string, unknown>;
    timestamp: string;
    sessionId: string;
    userId?: string | undefined;
}>;
export declare const FunnelStepSchema: z.ZodObject<{
    step: z.ZodString;
    count: z.ZodNumber;
    conversionRate: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    step: string;
    count: number;
    conversionRate: number;
}, {
    step: string;
    count: number;
    conversionRate: number;
}>;
export declare function validateProductData<T>(schema: z.ZodSchema<T>, data: unknown): {
    success: boolean;
    data?: T;
    errors?: z.ZodError;
};
export declare function validateUnlockCode(product: ProductId, code: string): boolean;
export declare const PRODUCT_DATA_SCHEMAS: Record<ProductId, z.ZodSchema>;
export declare function getProductSchema(product: ProductId): z.ZodSchema;
export * from '../types';
//# sourceMappingURL=index.d.ts.map