import { Injectable } from '@nestjs/common';
import { ProductDetailDto, ProductFilterDto } from '@enterprise/types';

@Injectable()
export class FilterService {
  applyFilters(products: ProductDetailDto[], filter: ProductFilterDto) {
    let result = [...products];

    if (filter.minPrice !== undefined) {
      result = result.filter(p => p.basePrice >= filter.minPrice!);
    }
    if (filter.maxPrice !== undefined) {
      result = result.filter(p => p.basePrice <= filter.maxPrice!);
    }

    if (filter.sortBy === 'price_asc') {
      result.sort((a, b) => a.basePrice - b.basePrice);
    } else if (filter.sortBy === 'price_desc') {
      result.sort((a, b) => b.basePrice - a.basePrice);
    } else if (filter.sortBy === 'rating_desc') {
      result.sort((a, b) => b.ratingAverage - a.ratingAverage);
    }

    const page = filter.page || 1;
    const limit = filter.limit || 20;
    const totalCount = result.length;
    const totalPages = Math.ceil(totalCount / limit) || 1;
    const offset = (page - 1) * limit;

    return {
      data: result.slice(offset, offset + limit),
      meta: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }
}
