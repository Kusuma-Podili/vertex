import { Injectable } from '@nestjs/common';
import { SalesMetricDto } from '@enterprise/types';

@Injectable()
export class AnalyticsService {
  async getDashboardMetrics(): Promise<SalesMetricDto> {
    return {
      totalRevenue: 284950.40,
      totalOrders: 1420,
      averageOrderValue: 200.67,
      conversionRate: 3.84,
      revenueGrowthPercent: 24.5,
      ordersGrowthPercent: 18.2,
      chartData: [
        { date: '2026-08-21', revenue: 38400, orders: 190 },
        { date: '2026-08-22', revenue: 42100, orders: 210 },
        { date: '2026-08-23', revenue: 39500, orders: 195 },
        { date: '2026-08-24', revenue: 47800, orders: 235 },
        { date: '2026-08-25', revenue: 53200, orders: 260 },
        { date: '2026-08-26', revenue: 63950, orders: 330 },
      ]
    };
  }
}
