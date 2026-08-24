/**
 * Zinvent Shared Types
 * Single source of truth for all product data structures
 */
// ============================================
// TYPE GUARDS
// ============================================
export function isProductId(value) {
    const valid = [
        'closer', 'invoiceph', 'taxcalcph', 'negosyosheet', 'tippoolcalc',
        'payslipph', 'sellerprice', 'rentsheet', 'moveinreport', 'pumproute',
        'ratecalcph', 'tradejournalph', 'utangplanph', 'commissionph', 'freelancerkitph'
    ];
    return valid.includes(value);
}
export function getStorageKey(product) {
    return `zinvent_${product}_v1`;
}
export function getProKey(product) {
    return `${getStorageKey(product)}_pro`;
}
export function getUsageKey(product) {
    return `${getStorageKey(product)}_usage`;
}
//# sourceMappingURL=index.js.map