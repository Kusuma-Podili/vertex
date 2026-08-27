import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ShippingService } from './services/shipping.service';
import { TrackingService } from './services/tracking.service';

@Controller('shipping')
export class ShippingController {
  constructor(
    private readonly shippingService: ShippingService,
    private readonly trackingService: TrackingService,
  ) {}

  @Post('rates')
  async getRates(@Body() body: { postalCode: string; countryCode: string; weightKg: number }) {
    return this.shippingService.calculateRates(body.postalCode, body.countryCode, body.weightKg);
  }

  @Get('track/:trackingNumber')
  async trackShipment(@Param('trackingNumber') trackingNumber: string) {
    return this.trackingService.getTrackingInfo(trackingNumber);
  }
}
