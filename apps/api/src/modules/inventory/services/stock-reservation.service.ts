import { Injectable, BadRequestException } from '@nestjs/common';
import { InventoryService } from './inventory.service';

export interface Reservation {
  id: string;
  variantId: string;
  orderId: string;
  quantity: number;
  expiresAt: Date;
  isConfirmed: boolean;
}

@Injectable()
export class StockReservationService {
  private reservations = new Map<string, Reservation>();

  constructor(private readonly inventoryService: InventoryService) {}

  async reserve(variantId: string, quantity: number, orderId: string): Promise<Reservation> {
    const available = await this.inventoryService.getAvailableStock(variantId);
    if (available < quantity) {
      throw new BadRequestException(`Insufficient stock for variant '${variantId}'. Requested: ${quantity}, Available: ${available}`);
    }

    const reservation: Reservation = {
      id: `res-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      variantId,
      orderId,
      quantity,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 min lock
      isConfirmed: false,
    };

    this.reservations.set(reservation.id, reservation);
    return reservation;
  }

  async confirmReservation(reservationId: string): Promise<void> {
    const res = this.reservations.get(reservationId);
    if (res) {
      res.isConfirmed = true;
    }
  }

  async releaseReservation(reservationId: string): Promise<void> {
    this.reservations.delete(reservationId);
  }
}
