import { Module } from '@nestjs/common';
import { ShippingController } from './shipping.controller';
import { ShippingService } from './services/shipping.service';
import { CarrierAdapterService } from './services/carrier-adapter.service';
import { TrackingService } from './services/tracking.service';

@Module({
  controllers: [ShippingController],
  providers: [ShippingService, CarrierAdapterService, TrackingService],
  exports: [ShippingService, TrackingService],
})
export class ShippingModule {}
