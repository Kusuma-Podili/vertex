export interface SeedCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  parentId?: string;
  children?: SeedCategory[];
}

export const SEED_CATEGORIES: SeedCategory[] = [
  {
    id: 'cat-electronics',
    name: 'Electronics & Gadgets',
    slug: 'electronics',
    description: 'Cutting-edge consumer electronics, smart home devices, audio gear, and accessories.',
    imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&auto=format&fit=crop',
    children: [
      {
        id: 'cat-smartphones',
        name: 'Smartphones & Tablets',
        slug: 'smartphones-tablets',
        description: 'Flagship mobile devices, tablets, and high-speed chargers.',
        imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop',
      },
      {
        id: 'cat-audio',
        name: 'Headphones & Audio',
        slug: 'headphones-audio',
        description: 'Noise-cancelling wireless headphones, audiophile IEMs, and bluetooth speakers.',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop',
      },
      {
        id: 'cat-laptops',
        name: 'Laptops & Computers',
        slug: 'laptops-computers',
        description: 'Ultra-portable productivity notebooks, gaming rigs, and workstation displays.',
        imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop',
      },
      {
        id: 'cat-smart-home',
        name: 'Smart Home & IoT',
        slug: 'smart-home',
        description: 'Smart lighting, automated security cameras, thermostats, and voice assistants.',
        imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop',
      }
    ]
  },
  {
    id: 'cat-fashion',
    name: 'Apparel & Fashion',
    slug: 'fashion',
    description: 'Designer apparel, luxury streetwear, activewear, and footwear.',
    imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop',
    children: [
      {
        id: 'cat-mens-apparel',
        name: "Men's Collection",
        slug: 'mens-apparel',
        description: 'Tailored suits, organic cotton tees, jackets, and denim.',
        imageUrl: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&auto=format&fit=crop',
      },
      {
        id: 'cat-womens-apparel',
        name: "Women's Collection",
        slug: 'womens-apparel',
        description: 'Elegant dresses, blazers, sustainable knitwear, and activewear.',
        imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop',
      },
      {
        id: 'cat-footwear',
        name: 'Footwear & Sneakers',
        slug: 'footwear-sneakers',
        description: 'Performance running shoes, leather dress shoes, and casual sneakers.',
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop',
      }
    ]
  },
  {
    id: 'cat-home-living',
    name: 'Home & Living',
    slug: 'home-living',
    description: 'Modern Scandinavian furniture, artisanal ceramic kitchenware, and luxury bedding.',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop',
    children: [
      {
        id: 'cat-furniture',
        name: 'Living Room & Furniture',
        slug: 'living-furniture',
        description: 'Ergonomic office chairs, solid oak coffee tables, and modular sofas.',
        imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop',
      },
      {
        id: 'cat-kitchen',
        name: 'Kitchen & Gourmet Cookware',
        slug: 'kitchen-cookware',
        description: 'Cast iron skillets, espresso machines, and chef knife sets.',
        imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop',
      }
    ]
  }
];
