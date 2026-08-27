import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { InventoryService } from './services/inventory.service';
import { StockReservationService } from './services/stock-reservation.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('inventory')
export class InventoryController {
  constructor(
    private readonly inventoryService: InventoryService,
    private readonly reservationService: StockReservationService,
  ) {}

  @Get('variant/:variantId')
  async getStock(@Param('variantId') variantId: string) {
    return this.inventoryService.getAvailableStock(variantId);
  }

  @Post('reserve')
  async reserveStock(@Body() body: { variantId: string; quantity: number; orderId: string }) {
    return this.reservationService.reserve(body.variantId, body.quantity, body.orderId);
  }
}
