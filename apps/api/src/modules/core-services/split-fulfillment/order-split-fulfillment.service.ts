import { Injectable } from '@nestjs/common';

export interface SplitShipmentPackage {
  packageId: string;
  sourceWarehouseId: string;
  warehouseName: string;
  carrierCode: string;
  items: { sku: string; quantity: number; weightKg: number }[];
  totalPackageWeightKg: number;
}

@Injectable()
export class OrderSplitFulfillmentService {
  async splitOrderIntoShipments(
    orderItems: { sku: string; quantity: number; weightKg: number; preferredWarehouse?: string }[]
  ): Promise<SplitShipmentPackage[]> {
    const warehouseGroups = new Map<string, { sku: string; quantity: number; weightKg: number }[]>();

    for (const item of orderItems) {
      const wh = item.preferredWarehouse || 'US-EAST-1';
      if (!warehouseGroups.has(wh)) {
        warehouseGroups.set(wh, []);
      }
      warehouseGroups.get(wh)!.push(item);
    }

    const packages: SplitShipmentPackage[] = [];
    let idx = 1;
    for (const [whId, items] of warehouseGroups.entries()) {
      const totalWeight = items.reduce((acc, i) => acc + (i.weightKg * i.quantity), 0);
      packages.push({
        packageId: `PKG-${Date.now()}-${idx++}`,
        sourceWarehouseId: whId,
        warehouseName: whId === 'US-EAST-1' ? 'Allentown Logistics Hub' : 'Reno West Hub',
        carrierCode: 'FEDEX_EXPRESS',
        items,
        totalPackageWeightKg: Math.round(totalWeight * 100) / 100,
      });
    }

    return packages;
  }
}
