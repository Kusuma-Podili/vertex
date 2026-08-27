export interface VendorSummaryDto {
  id: string;
  storeName: string;
  storeSlug: string;
  rating: number;
  totalProducts: number;
  totalSalesCount: number;
  commissionRate: number;
  isApproved: boolean;
}
