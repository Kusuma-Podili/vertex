import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories() {
    return this.categoriesService.getCategoryTree();
  }

  @Get(':slug')
  async getCategoryBySlug(@Param('slug') slug: string) {
    return this.categoriesService.findBySlug(slug);
  }
}
