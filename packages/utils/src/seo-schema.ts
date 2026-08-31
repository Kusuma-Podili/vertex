export function generateProductJsonLd(product: {
  title: string;
  sku: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
}) {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.title,
    image: [product.imageUrl],
    description: product.description,
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      priceCurrency: product.currency,
      price: product.price,
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };
}
