import { Controller, Get, Post, Put, Delete, Query, Param, Body, UseGuards } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { ProductFilterDto } from '@enterprise/types';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(@Query() query: ProductFilterDto) {
    return this.productsService.findAll(query);
  }

  @Get('featured')
  async getFeaturedProducts() {
    return this.productsService.findFeatured();
  }

  @Get(':slug')
  async getProductBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @Get(':id/recommendations')
  async getRecommendations(@Param('id') id: string) {
    return this.productsService.getRecommendations(id);
  }
}
