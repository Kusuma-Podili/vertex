export interface ShippingRateDto {
  carrierCode: string;
  carrierName: string;
  serviceName: string;
  rate: number;
  currency: string;
  estimatedDeliveryDays: number;
  guaranteedDelivery: boolean;
}

export interface TrackingDetailDto {
  trackingNumber: string;
  carrier: string;
  status: string;
  origin: string;
  destination: string;
  checkpoints: {
    timestamp: string;
    location: string;
    description: string;
  }[];
}
