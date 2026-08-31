import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './services/inventory.service';
import { StockReservationService } from './services/stock-reservation.service';
import { WarehouseService } from './services/warehouse.service';

@Module({
  controllers: [InventoryController],
  providers: [InventoryService, StockReservationService, WarehouseService],
  exports: [InventoryService, StockReservationService],
})
export class InventoryModule {}
