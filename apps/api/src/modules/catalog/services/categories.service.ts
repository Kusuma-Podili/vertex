import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  private categories = [
    {
      id: 'cat-electronics',
      name: 'Electronics & Gadgets',
      slug: 'electronics',
      description: 'Cutting-edge consumer electronics and audio gear.',
      imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800',
      children: [
        { id: 'cat-audio', name: 'Headphones & Audio', slug: 'headphones-audio' },
        { id: 'cat-laptops', name: 'Laptops & Computers', slug: 'laptops-computers' },
      ],
    },
    {
      id: 'cat-home-living',
      name: 'Home & Living',
      slug: 'home-living',
      description: 'Modern furniture and artisanal kitchenware.',
      imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800',
      children: [
        { id: 'cat-furniture', name: 'Living Room & Furniture', slug: 'living-furniture' },
        { id: 'cat-kitchen', name: 'Kitchen & Cookware', slug: 'kitchen-cookware' },
      ],
    }
  ];

  async getCategoryTree() {
    return this.categories;
  }

  async findBySlug(slug: string) {
    for (const cat of this.categories) {
      if (cat.slug === slug) return cat;
      const child = cat.children.find(c => c.slug === slug);
      if (child) return child;
    }
    throw new NotFoundException(`Category with slug '${slug}' not found.`);
  }
}
