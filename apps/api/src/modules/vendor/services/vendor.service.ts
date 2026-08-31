import { Injectable, NotFoundException } from '@nestjs/common';
import { VendorSummaryDto } from '@enterprise/types';

@Injectable()
export class VendorService {
  private vendors: VendorSummaryDto[] = [
    {
      id: 'ven-1',
      storeName: 'AeroAcoustics Official',
      storeSlug: 'aeroacoustics-official',
      rating: 4.95,
      totalProducts: 18,
      totalSalesCount: 1420,
      commissionRate: 0.10,
      isApproved: true,
    },
    {
      id: 'ven-2',
      storeName: 'QuantumTech Hardware',
      storeSlug: 'quantumtech-hardware',
      rating: 4.90,
      totalProducts: 12,
      totalSalesCount: 890,
      commissionRate: 0.08,
      isApproved: true,
    }
  ];

  async getAllVendors(): Promise<VendorSummaryDto[]> {
    return this.vendors;
  }

  async getBySlug(slug: string): Promise<VendorSummaryDto> {
    const v = this.vendors.find(item => item.storeSlug === slug);
    if (!v) throw new NotFoundException(`Vendor store '${slug}' not found.`);
    return v;
  }
}
