import { Injectable } from '@nestjs/common';
import { roundToTwoDecimals } from '@enterprise/utils';

export interface TaxJurisdictionProfile {
  countryCode: string;
  stateCode: string;
  countyOrDistrict?: string;
  stateRate: number;
  countyRate: number;
  cityRate: number;
  specialDistrictRate: number;
  digitalGoodsExempt: boolean;
  physicalFreightTaxable: boolean;
}

@Injectable()
export class TaxJurisdictionEngineService {
  private taxProfiles: Record<string, TaxJurisdictionProfile> = {
    'US-CA': { countryCode: 'US', stateCode: 'CA', stateRate: 0.0725, countyRate: 0.0100, cityRate: 0.0050, specialDistrictRate: 0.0050, digitalGoodsExempt: true, physicalFreightTaxable: false },
    'US-NY': { countryCode: 'US', stateCode: 'NY', stateRate: 0.0400, countyRate: 0.0400, cityRate: 0.00875, specialDistrictRate: 0.0000, digitalGoodsExempt: false, physicalFreightTaxable: true },
    'US-TX': { countryCode: 'US', stateCode: 'TX', stateRate: 0.0625, countyRate: 0.0100, cityRate: 0.0100, specialDistrictRate: 0.0000, digitalGoodsExempt: false, physicalFreightTaxable: true },
    'US-WA': { countryCode: 'US', stateCode: 'WA', stateRate: 0.0650, countyRate: 0.0150, cityRate: 0.0150, specialDistrictRate: 0.0000, digitalGoodsExempt: false, physicalFreightTaxable: true },
    'US-FL': { countryCode: 'US', stateCode: 'FL', stateRate: 0.0600, countyRate: 0.0100, cityRate: 0.0000, specialDistrictRate: 0.0000, digitalGoodsExempt: true, physicalFreightTaxable: true },
    'US-IL': { countryCode: 'US', stateCode: 'IL', stateRate: 0.0625, countyRate: 0.0125, cityRate: 0.0125, specialDistrictRate: 0.0000, digitalGoodsExempt: false, physicalFreightTaxable: true },
    'DE-DEFAULT': { countryCode: 'DE', stateCode: 'ALL', stateRate: 0.1900, countyRate: 0.0, cityRate: 0.0, specialDistrictRate: 0.0, digitalGoodsExempt: false, physicalFreightTaxable: true },
    'GB-DEFAULT': { countryCode: 'GB', stateCode: 'ALL', stateRate: 0.2000, countyRate: 0.0, cityRate: 0.0, specialDistrictRate: 0.0, digitalGoodsExempt: false, physicalFreightTaxable: true },
    'FR-DEFAULT': { countryCode: 'FR', stateCode: 'ALL', stateRate: 0.2000, countyRate: 0.0, cityRate: 0.0, specialDistrictRate: 0.0, digitalGoodsExempt: false, physicalFreightTaxable: true },
    'JP-DEFAULT': { countryCode: 'JP', stateCode: 'ALL', stateRate: 0.1000, countyRate: 0.0, cityRate: 0.0, specialDistrictRate: 0.0, digitalGoodsExempt: false, physicalFreightTaxable: true },
  };

  calculateDetailedTax(subtotal: number, shippingFee: number, country: string, state: string) {
    const key = `${country.toUpperCase()}-${state.toUpperCase()}`;
    const defaultKey = `${country.toUpperCase()}-DEFAULT`;
    const profile = this.taxProfiles[key] || this.taxProfiles[defaultKey] || {
      countryCode: country,
      stateCode: state,
      stateRate: 0.05,
      countyRate: 0.0,
      cityRate: 0.0,
      specialDistrictRate: 0.0,
      digitalGoodsExempt: false,
      physicalFreightTaxable: false,
    };

    const combinedRate = profile.stateRate + profile.countyRate + profile.cityRate + profile.specialDistrictRate;
    const taxableBase = subtotal + (profile.physicalFreightTaxable ? shippingFee : 0);
    const taxAmount = roundToTwoDecimals(taxableBase * combinedRate);

    return {
      countryCode: country,
      stateCode: state,
      combinedRate,
      stateTax: roundToTwoDecimals(taxableBase * profile.stateRate),
      localTax: roundToTwoDecimals(taxableBase * (profile.countyRate + profile.cityRate + profile.specialDistrictRate)),
      shippingTaxable: profile.physicalFreightTaxable,
      totalTaxAmount: taxAmount,
    };
  }
}
