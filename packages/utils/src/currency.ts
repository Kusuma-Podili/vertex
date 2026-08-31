export function formatCurrency(amount: number, currency: string = 'USD', locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function roundToTwoDecimals(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateDiscountAmount(
  subtotal: number,
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT',
  discountValue: number,
  maxCap?: number
): number {
  if (discountType === 'PERCENTAGE') {
    const calculated = (subtotal * discountValue) / 100;
    if (maxCap && maxCap > 0) {
      return roundToTwoDecimals(Math.min(calculated, maxCap));
    }
    return roundToTwoDecimals(calculated);
  }
  return roundToTwoDecimals(Math.min(subtotal, discountValue));
}
