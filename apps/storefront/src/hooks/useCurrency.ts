import { useState } from 'react';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'JPY';

export function useCurrency() {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const rates: Record<CurrencyCode, number> = {
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.79,
    CAD: 1.36,
    JPY: 152.4,
  };

  const convert = (amountInUsd: number) => {
    return amountInUsd * rates[currency];
  };

  const format = (amountInUsd: number) => {
    const converted = convert(amountInUsd);
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(converted);
  };

  return { currency, setCurrency, convert, format };
}
