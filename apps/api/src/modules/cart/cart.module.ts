import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './services/cart.service';
import { CartPricingService } from './services/cart-pricing.service';
import { CouponService } from './services/coupon.service';
import { CatalogModule } from '../catalog/catalog.module';

@Module({
  imports: [CatalogModule],
  controllers: [CartController],
  providers: [CartService, CartPricingService, CouponService],
  exports: [CartService, CartPricingService, CouponService],
})
export class CartModule {}
