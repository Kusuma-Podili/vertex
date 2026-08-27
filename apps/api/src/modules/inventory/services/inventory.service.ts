import { Injectable, BadRequestException } from '@nestjs/common';

export interface StockRecord {
  variantId: string;
  warehouseId: string;
  quantityAvailable: number;
  quantityReserved: number;
  reorderPoint: number;
}

@Injectable()
export class InventoryService {
  private stockMap = new Map<string, StockRecord>([
    ['var-1', { variantId: 'var-1', warehouseId: 'wh-main', quantityAvailable: 85, quantityReserved: 5, reorderPoint: 10 }],
    ['var-2', { variantId: 'var-2', warehouseId: 'wh-main', quantityAvailable: 42, quantityReserved: 2, reorderPoint: 10 }],
    ['var-3', { variantId: 'var-3', warehouseId: 'wh-main', quantityAvailable: 25, quantityReserved: 0, reorderPoint: 5 }],
  ]);

  async getAvailableStock(variantId: string): Promise<number> {
    const record = this.stockMap.get(variantId);
    if (!record) return 0;
    return Math.max(0, record.quantityAvailable - record.quantityReserved);
  }

  async adjustStock(variantId: string, delta: number, reason: string): Promise<StockRecord> {
    const record = this.stockMap.get(variantId);
    if (!record) throw new BadRequestException(`No inventory record for variant '${variantId}'`);
    record.quantityAvailable += delta;
    return record;
  }
}
