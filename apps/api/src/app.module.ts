import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { CartModule } from './modules/cart/cart.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ShippingModule } from './modules/shipping/shipping.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { VendorModule } from './modules/vendor/vendor.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CatalogModule,
    InventoryModule,
    CartModule,
    OrdersModule,
    PaymentsModule,
    ShippingModule,
    NotificationsModule,
    ReviewsModule,
    AnalyticsModule,
    VendorModule,
  ],
})
export class AppModule {}
