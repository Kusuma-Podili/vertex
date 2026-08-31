import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { VendorService } from './services/vendor.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('vendors')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Get()
  async listVendors() {
    return this.vendorService.getAllVendors();
  }

  @Get(':slug')
  async getVendorBySlug(@Param('slug') slug: string) {
    return this.vendorService.getBySlug(slug);
  }
}
