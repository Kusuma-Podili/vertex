export interface SalesMetricDto {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  conversionRate: number;
  revenueGrowthPercent: number;
  ordersGrowthPercent: number;
  chartData: {
    date: string;
    revenue: number;
    orders: number;
  }[];
}
