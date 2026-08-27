import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductFilterDto, ProductDetailDto } from '@enterprise/types';
import { SearchService } from './search.service';
import { FilterService } from './filter.service';
import { RecommendationService } from './recommendation.service';

@Injectable()
export class ProductsService {
  private products: ProductDetailDto[] = [
    {
      id: 'prod-aurora-headphones',
      title: 'Aurora Pro Active Noise Cancelling Wireless Headphones',
      slug: 'aurora-pro-anc-headphones',
      sku: 'AURORA-PRO-001',
      shortDescription: 'Studio-grade spatial audio with 45dB hybrid ANC and 40-hour battery life.',
      description: 'Experience pure acoustic perfection with Beryllium dynamic drivers and custom tuned spatial DSP.',
      basePrice: 349.99,
      compareAtPrice: 399.99,
      currency: 'USD',
      ratingAverage: 4.85,
      reviewCount: 142,
      isFeatured: true,
      category: { id: 'cat-audio', name: 'Headphones & Audio', slug: 'headphones-audio' },
      brand: { id: 'brand-aero', name: 'AeroAcoustics', slug: 'aeroacoustics' },
      images: [
        { id: 'img-1', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800', isPrimary: true },
        { id: 'img-2', url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800', isPrimary: false }
      ],
      variants: [
        { id: 'var-1', sku: 'AURORA-BLK', name: 'Midnight Black', priceOffset: 0, weightKg: 0.26, quantityAvailable: 85 },
        { id: 'var-2', sku: 'AURORA-SLV', name: 'Lunar Silver', priceOffset: 0, weightKg: 0.26, quantityAvailable: 42 }
      ],
      attributes: [
        { key: 'Driver', value: '40mm Beryllium', group: 'Acoustics' },
        { key: 'Battery', value: '40 Hours', group: 'Battery' }
      ],
      tags: ['audio', 'wireless', 'anc', 'flagship']
    },
    {
      id: 'prod-titan-workstation',
      title: 'TitanBook 16 Max Creator Workstation',
      slug: 'titanbook-16-max-laptop',
      sku: 'TITAN-16-MAX-01',
      shortDescription: '16-inch 3.2K 165Hz Mini-LED display, 16-Core Neural Processor, 64GB Unified RAM.',
      description: 'The ultimate portable machine learning and engineering workstation laptop.',
      basePrice: 2499.00,
      compareAtPrice: 2799.00,
      currency: 'USD',
      ratingAverage: 4.92,
      reviewCount: 89,
      isFeatured: true,
      category: { id: 'cat-laptops', name: 'Laptops & Computers', slug: 'laptops-computers' },
      brand: { id: 'brand-quantum', name: 'QuantumTech', slug: 'quantumtech' },
      images: [
        { id: 'img-3', url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800', isPrimary: true }
      ],
      variants: [
        { id: 'var-3', sku: 'TITAN-64-2TB', name: '64GB RAM / 2TB NVMe', priceOffset: 0, weightKg: 1.8, quantityAvailable: 25 }
      ],
      attributes: [
        { key: 'RAM', value: '64GB Unified', group: 'Hardware' },
        { key: 'Storage', value: '2TB PCIe Gen5 NVMe', group: 'Hardware' }
      ],
      tags: ['laptop', 'workstation', 'creator', 'high-performance']
    }
  ];

  constructor(
    private readonly searchService: SearchService,
    private readonly filterService: FilterService,
    private readonly recommendationService: RecommendationService,
  ) {}

  async findAll(query: ProductFilterDto) {
    let filtered = [...this.products];
    if (query.search) {
      filtered = this.searchService.searchProducts(filtered, query.search);
    }
    if (query.categorySlug) {
      filtered = filtered.filter(p => p.category.slug === query.categorySlug);
    }
    return this.filterService.applyFilters(filtered, query);
  }

  async findFeatured(): Promise<ProductDetailDto[]> {
    return this.products.filter(p => p.isFeatured);
  }

  async findBySlug(slug: string): Promise<ProductDetailDto> {
    const product = this.products.find(p => p.slug === slug);
    if (!product) throw new NotFoundException(`Product with slug '${slug}' not found.`);
    return product;
  }

  async findById(id: string): Promise<ProductDetailDto> {
    const product = this.products.find(p => p.id === id);
    if (!product) throw new NotFoundException(`Product with ID '${id}' not found.`);
    return product;
  }

  async getRecommendations(productId: string) {
    return this.recommendationService.getRelatedProducts(productId, this.products);
  }
}
