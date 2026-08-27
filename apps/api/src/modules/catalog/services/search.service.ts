import { Injectable } from '@nestjs/common';
import { ProductDetailDto } from '@enterprise/types';

@Injectable()
export class SearchService {
  searchProducts(products: ProductDetailDto[], query: string): ProductDetailDto[] {
    const q = query.toLowerCase().trim();
    return products.filter(p => {
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.tags.some(tag => tag.toLowerCase().includes(q))
      );
    });
  }
}
