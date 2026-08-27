import { Injectable } from '@nestjs/common';
import { TrackingDetailDto } from '@enterprise/types';

@Injectable()
export class TrackingService {
  async getTrackingInfo(trackingNumber: string): Promise<TrackingDetailDto> {
    return {
      trackingNumber,
      carrier: 'FedEx Express',
      status: 'In Transit',
      origin: 'Allentown, PA',
      destination: 'Springfield, OR',
      checkpoints: [
        { timestamp: new Date(Date.now() - 3600000 * 24).toISOString(), location: 'Allentown Hub, PA', description: 'Package received by carrier' },
        { timestamp: new Date(Date.now() - 3600000 * 12).toISOString(), location: 'Chicago Sort Facility, IL', description: 'In transit to destination facility' },
        { timestamp: new Date().toISOString(), location: 'Portland Regional Hub, OR', description: 'Out for local sorting' },
      ],
    };
  }
}
