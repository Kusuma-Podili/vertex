import { Controller, Get, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './services/analytics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('dashboard')
  async getDashboardMetrics() {
    return this.analyticsService.getDashboardMetrics();
  }
}
