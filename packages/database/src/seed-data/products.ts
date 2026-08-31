export interface SeedProduct {
  id: string;
  categoryId: string;
  brandName: string;
  title: string;
  slug: string;
  sku: string;
  shortDescription: string;
  description: string;
  basePrice: number;
  compareAtPrice?: number;
  ratingAverage: number;
  reviewCount: number;
  isFeatured: boolean;
  images: string[];
  variants: {
    sku: string;
    name: string;
    priceOffset: number;
    option1Name: string;
    option1Value: string;
    option2Name?: string;
    option2Value?: string;
  }[];
  attributes: { key: string; value: string; group?: string }[];
  tags: string[];
}

export const SEED_PRODUCTS: SeedProduct[] = [
  {
    id: 'prod-aurora-headphones',
    categoryId: 'cat-audio',
    brandName: 'AeroAcoustics',
    title: 'Aurora Pro Active Noise Cancelling Wireless Headphones',
    slug: 'aurora-pro-anc-headphones',
    sku: 'AURORA-PRO-001',
    shortDescription: 'Studio-grade spatial audio with 45dB hybrid ANC, 40-hour battery life, and custom beryllium drivers.',
    description: 'Experience pure sonic clarity with the Aurora Pro ANC Headphones. Featuring custom-tuned 40mm Beryllium dynamic transducers, ultra-low latency Bluetooth 5.3 with LDAC support, and plush memory foam protein leather ear cushions designed for all-day mastering and listening comfort.',
    basePrice: 349.99,
    compareAtPrice: 399.99,
    ratingAverage: 4.85,
    reviewCount: 142,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1000&auto=format&fit=crop'
    ],
    variants: [
      { sku: 'AURORA-PRO-BLK', name: 'Midnight Black', priceOffset: 0, option1Name: 'Color', option1Value: 'Midnight Black' },
      { sku: 'AURORA-PRO-SLV', name: 'Lunar Silver', priceOffset: 0, option1Name: 'Color', option1Value: 'Lunar Silver' },
      { sku: 'AURORA-PRO-GLD', name: 'Champagne Gold', priceOffset: 20, option1Name: 'Color', option1Value: 'Champagne Gold' }
    ],
    attributes: [
      { key: 'Driver Size', value: '40mm Beryllium Diaphragm', group: 'Acoustics' },
      { key: 'Frequency Response', value: '10Hz - 45,000Hz', group: 'Acoustics' },
      { key: 'Battery Life', value: '40 hours (ANC On), 60 hours (ANC Off)', group: 'Battery' },
      { key: 'Charging', value: 'USB-C Fast Charging (10 min = 5 hours)', group: 'Battery' },
      { key: 'Weight', value: '260g', group: 'Physical' }
    ],
    tags: ['audio', 'wireless', 'anc', 'bluetooth', 'flagship']
  },
  {
    id: 'prod-titan-workstation',
    categoryId: 'cat-laptops',
    brandName: 'QuantumTech',
    title: 'TitanBook 16 Max Creator Workstation',
    slug: 'titanbook-16-max-laptop',
    sku: 'TITAN-16-MAX-01',
    shortDescription: '16-inch 3.2K 165Hz Mini-LED display, 16-Core Neural Processor, 64GB Unified RAM, and vapor chamber cooling.',
    description: 'Designed for machine learning researchers, 3D artists, and software architects. The TitanBook 16 Max delivers unprecedented mobile computing performance without thermal throttling.',
    basePrice: 2499.00,
    compareAtPrice: 2799.00,
    ratingAverage: 4.92,
    reviewCount: 89,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=1000&auto=format&fit=crop'
    ],
    variants: [
      { sku: 'TITAN-16-32-1TB', name: '32GB RAM / 1TB NVMe', priceOffset: 0, option1Name: 'Configuration', option1Value: '32GB / 1TB' },
      { sku: 'TITAN-16-64-2TB', name: '64GB RAM / 2TB NVMe', priceOffset: 500, option1Name: 'Configuration', option1Value: '64GB / 2TB' },
      { sku: 'TITAN-16-128-4TB', name: '128GB RAM / 4TB NVMe', priceOffset: 1200, option1Name: 'Configuration', option1Value: '128GB / 4TB' }
    ],
    attributes: [
      { key: 'Processor', value: '16-Core 5.4GHz Enterprise SoC', group: 'Performance' },
      { key: 'Display', value: '16-inch 3200x2000 165Hz Mini-LED 1600 nits', group: 'Display' },
      { key: 'Graphics', value: 'Integrated 40-core GPU with Ray Tracing', group: 'Graphics' },
      { key: 'Chassis', value: 'CNC Machined Anodized Aluminum', group: 'Build' }
    ],
    tags: ['laptop', 'workstation', 'creator', 'apple-alternative', 'high-performance']
  },
  {
    id: 'prod-ergonomic-mesh-chair',
    categoryId: 'cat-furniture',
    brandName: 'ErgoForm Design',
    title: 'AeroSync Ergonomic Posture Mesh Task Chair',
    slug: 'aerosync-ergonomic-mesh-chair',
    sku: 'ERGO-SYNC-M01',
    shortDescription: 'Self-adjusting dynamic lumbar spine support, 4D magnetic armrests, and breathable DuPont elastomeric mesh.',
    description: 'Engineered in collaboration with biomechanical orthopedic specialists to eliminate lower back fatigue during 12+ hour intense programming sessions.',
    basePrice: 599.00,
    compareAtPrice: 699.00,
    ratingAverage: 4.78,
    reviewCount: 310,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1580481077197-094c9ca4e1a0?w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&auto=format&fit=crop'
    ],
    variants: [
      { sku: 'ERGO-SYNC-BLK', name: 'Onyx Black Mesh / Aluminum Frame', priceOffset: 0, option1Name: 'Color', option1Value: 'Onyx Black' },
      { sku: 'ERGO-SYNC-GRY', name: 'Mineral Gray Mesh / Chrome Frame', priceOffset: 40, option1Name: 'Color', option1Value: 'Mineral Gray' }
    ],
    attributes: [
      { key: 'Max Capacity', value: '150 kg (330 lbs)', group: 'Specifications' },
      { key: 'Recline Angle', value: '90° to 135° Synchronous Tilt', group: 'Mechanics' },
      { key: 'Warranty', value: '12-Year Comprehensive Structural Warranty', group: 'Support' }
    ],
    tags: ['chair', 'furniture', 'ergonomic', 'office', 'mesh']
  },
  {
    id: 'prod-artisanal-espresso-machine',
    categoryId: 'cat-kitchen',
    brandName: 'BaristaCraft',
    title: 'Veloce Dual-Boiler PID Rotary Espresso Machine',
    slug: 'veloce-dual-boiler-espresso-machine',
    sku: 'VELOCE-DB-PID',
    shortDescription: 'Dual insulated stainless steel boilers, saturated E61 brew group, commercial rotary pump, and digital PID temp control.',
    description: 'Bring specialty cafe caliber third-wave espresso extraction right to your kitchen counter with precision flow profiling and instantaneous steam pressure.',
    basePrice: 1850.00,
    compareAtPrice: 2100.00,
    ratingAverage: 4.95,
    reviewCount: 64,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=1000&auto=format&fit=crop'
    ],
    variants: [
      { sku: 'VELOCE-SS-WALNUT', name: 'Polished Stainless Steel with Walnut Accents', priceOffset: 0, option1Name: 'Finish', option1Value: 'Stainless / Walnut' },
      { sku: 'VELOCE-MATTE-BLK', name: 'Matte Powdercoat Black with Brass Accents', priceOffset: 100, option1Name: 'Finish', option1Value: 'Matte Black / Brass' }
    ],
    attributes: [
      { key: 'Brew Boiler', value: '0.8L 316L Stainless Steel', group: 'Boiler System' },
      { key: 'Steam Boiler', value: '1.8L 316L Stainless Steel', group: 'Boiler System' },
      { key: 'Pump Type', value: 'Commercial Fluid-o-Tech Rotary Vane Pump', group: 'Pump' }
    ],
    tags: ['coffee', 'espresso', 'kitchen', 'luxury', 'dual-boiler']
  },
  {
    id: 'prod-wool-cashmere-overcoat',
    categoryId: 'cat-mens-apparel',
    brandName: 'Nordic Heritage',
    title: 'Kobenhavn 100% Merino Wool & Cashmere Minimalist Overcoat',
    slug: 'kobenhavn-wool-cashmere-overcoat',
    sku: 'NORDIC-OVERCOAT-01',
    shortDescription: 'Double-breasted unstructured tailoring, water-resistant storm welt pockets, and horn button closures.',
    description: 'Crafted from 650 GSM virgin Merino wool blended with Grade-A Mongolian cashmere for supreme warmth, breathability, and timeless Scandinavian silhouette.',
    basePrice: 420.00,
    compareAtPrice: 550.00,
    ratingAverage: 4.88,
    reviewCount: 77,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=1000&auto=format&fit=crop'
    ],
    variants: [
      { sku: 'NORDIC-COAT-CAMEL-M', name: 'Camel Tan / Medium', priceOffset: 0, option1Name: 'Color', option1Value: 'Camel Tan', option2Name: 'Size', option2Value: 'M' },
      { sku: 'NORDIC-COAT-CAMEL-L', name: 'Camel Tan / Large', priceOffset: 0, option1Name: 'Color', option1Value: 'Camel Tan', option2Name: 'Size', option2Value: 'L' },
      { sku: 'NORDIC-COAT-CHAR-M', name: 'Charcoal Grey / Medium', priceOffset: 0, option1Name: 'Color', option1Value: 'Charcoal Grey', option2Name: 'Size', option2Value: 'M' }
    ],
    attributes: [
      { key: 'Material', value: '90% Merino Wool, 10% Cashmere', group: 'Composition' },
      { key: 'Lining', value: '100% Bemberg Cupro Breathable Twill', group: 'Composition' },
      { key: 'Origin', value: 'Crafted in Portugal', group: 'Manufacturing' }
    ],
    tags: ['fashion', 'menswear', 'overcoat', 'cashmere', 'wool', 'luxury']
  }
];
