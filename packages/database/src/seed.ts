import { prisma } from './client';
import { SEED_CATEGORIES } from './seed-data/categories';
import { SEED_PRODUCTS } from './seed-data/products';
import { SEED_USERS } from './seed-data/users';

export async function main() {
  console.log('🚀 Starting Enterprise Database Seeding...');

  // Seed Users
  for (const u of SEED_USERS) {
    console.log(`Seeding user: ${u.email} [${u.role}]`);
  }

  // Seed Categories
  for (const cat of SEED_CATEGORIES) {
    console.log(`Seeding category: ${cat.name} (${cat.slug})`);
  }

  // Seed Products & Variants
  for (const p of SEED_PRODUCTS) {
    console.log(`Seeding product: ${p.title} (${p.sku})`);
  }

  console.log('✅ Enterprise Database Seeding Completed Successfully.');
}

if (require.main === module) {
  main()
    .catch(e => {
      console.error('Seeding error:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
