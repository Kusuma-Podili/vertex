import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './services/orders.service';
import { OrderStateMachineService } from './services/order-state-machine.service';
import { InvoiceService } from './services/invoice.service';
import { CartModule } from '../cart/cart.module';
import { InventoryModule } from '../inventory/inventory.module';

@Module({
  imports: [CartModule, InventoryModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrderStateMachineService, InvoiceService],
  exports: [OrdersService, OrderStateMachineService],
})
export class OrdersModule {}
