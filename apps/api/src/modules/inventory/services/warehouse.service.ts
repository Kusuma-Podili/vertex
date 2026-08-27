import { Injectable } from '@nestjs/common';

@Injectable()
export class WarehouseService {
  private warehouses = [
    { id: 'wh-main', code: 'US-EAST-1', name: 'East Coast Fulfillment Hub', city: 'Allentown', state: 'PA' },
    { id: 'wh-west', code: 'US-WEST-1', name: 'West Coast Logistics Center', city: 'Reno', state: 'NV' },
  ];

  async getWarehouses() {
    return this.warehouses;
  }
}
