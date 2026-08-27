import { Injectable } from '@nestjs/common';
import { ProductDetailDto } from '@enterprise/types';

@Injectable()
export class RecommendationService {
  getRelatedProducts(productId: string, allProducts: ProductDetailDto[]): ProductDetailDto[] {
    const target = allProducts.find(p => p.id === productId);
    if (!target) return allProducts.slice(0, 4);

    return allProducts
      .filter(p => p.id !== productId && p.category.id === target.category.id)
      .slice(0, 4);
  }
}
