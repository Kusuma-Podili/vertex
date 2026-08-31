import { roundToTwoDecimals } from './currency';

export interface TaxJurisdictionRate {
  stateOrProvince: string;
  countryCode: string;
  combinedTaxRate: number; // e.g. 0.0825 for 8.25%
}

const TAX_RATE_REGISTRY: Record<string, number> = {
  'US-CA': 0.0925,
  'US-NY': 0.08875,
  'US-TX': 0.0825,
  'US-WA': 0.095,
  'US-FL': 0.070,
  'DE-DEFAULT': 0.19,
  'GB-DEFAULT': 0.20,
  'FR-DEFAULT': 0.20,
};

export function calculateJurisdictionTax(
  taxableAmount: number,
  countryCode: string,
  stateCode: string = ''
): number {
  const key = `${countryCode.toUpperCase()}-${stateCode.toUpperCase()}`;
  const defaultKey = `${countryCode.toUpperCase()}-DEFAULT`;
  const rate = TAX_RATE_REGISTRY[key] ?? TAX_RATE_REGISTRY[defaultKey] ?? 0.05;

  return roundToTwoDecimals(taxableAmount * rate);
}
