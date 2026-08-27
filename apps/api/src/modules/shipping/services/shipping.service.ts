import { Injectable } from '@nestjs/common';
import { ShippingRateDto } from '@enterprise/types';
import { CarrierAdapterService } from './carrier-adapter.service';

@Injectable()
export class ShippingService {
  constructor(private readonly carrierAdapter: CarrierAdapterService) {}

  async calculateRates(postalCode: string, countryCode: string, weightKg: number): Promise<ShippingRateDto[]> {
    return this.carrierAdapter.getRates(postalCode, countryCode, weightKg);
  }
}
