import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { BrandsController } from './controllers/brands.controller';
import { ProductsService } from './services/products.service';
import { CategoriesService } from './services/categories.service';
import { SearchService } from './services/search.service';
import { FilterService } from './services/filter.service';
import { RecommendationService } from './services/recommendation.service';

@Module({
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [
    ProductsService,
    CategoriesService,
    SearchService,
    FilterService,
    RecommendationService,
  ],
  exports: [ProductsService, CategoriesService, SearchService],
})
export class CatalogModule {}
