-- Enterprise E-Commerce Relational PostgreSQL Migration DDL
-- Core schemas, tables, indices, foreign keys, and audit trigger procedures

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Enum Definitions
CREATE TYPE "Role" AS ENUM ('CUSTOMER', 'VENDOR', 'ADMIN', 'SUPER_ADMIN', 'SUPPORT_AGENT', 'WAREHOUSE_STAFF');
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAYMENT_PROCESSING', 'CONFIRMED', 'PROCESSING', 'FULFILLING', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED', 'REFUND_REQUESTED', 'REFUNDED', 'RETURNED', 'FAILED');
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'AUTHORIZED', 'CAPTURED', 'SETTLED', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED', 'VOIDED');
CREATE TYPE "PaymentMethod" AS ENUM ('STRIPE_CREDIT_CARD', 'STRIPE_IDEAL', 'PAYPAL', 'APPLE_PAY', 'GOOGLE_PAY', 'KLARNA_BUY_NOW_PAY_LATER', 'BANK_TRANSFER', 'CASH_ON_DELIVERY');
CREATE TYPE "DiscountType" AS ENUM ('PERCENTAGE', 'FIXED_AMOUNT', 'FREE_SHIPPING', 'BUY_X_GET_Y');
CREATE TYPE "ShipmentStatus" AS ENUM ('LABEL_CREATED', 'PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED', 'EXCEPTION', 'RETURNED_TO_SENDER');
CREATE TYPE "StockMovementType" AS ENUM ('INBOUND_PURCHASE', 'ORDER_RESERVATION', 'ORDER_FULFILLMENT', 'ORDER_CANCELLATION_RESTOCK', 'MANUAL_ADJUSTMENT', 'DAMAGED_INVENTORY', 'RETURN_RESTOCK');

-- Users Table
CREATE TABLE "users" (
    "id" VARCHAR(64) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "passwordHash" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "phoneNumber" VARCHAR(50),
    "avatarUrl" TEXT,
    "role" "Role" NOT NULL DEFAULT 'CUSTOMER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "twoFactorSecret" VARCHAR(255),
    "lastLoginAt" TIMESTAMP WITH TIME ZONE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX "idx_users_email" ON "users"("email");
CREATE INDEX "idx_users_role" ON "users"("role");

-- Addresses Table
CREATE TABLE "addresses" (
    "id" VARCHAR(64) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "userId" VARCHAR(64) NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
    "title" VARCHAR(50) NOT NULL DEFAULT 'Home',
    "recipient" VARCHAR(200) NOT NULL,
    "streetLine1" VARCHAR(255) NOT NULL,
    "streetLine2" VARCHAR(255),
    "city" VARCHAR(100) NOT NULL,
    "state" VARCHAR(100) NOT NULL,
    "postalCode" VARCHAR(20) NOT NULL,
    "countryCode" VARCHAR(10) NOT NULL DEFAULT 'US',
    "phoneNumber" VARCHAR(50) NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "isBilling" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX "idx_addresses_user" ON "addresses"("userId");

-- Categories Table
CREATE TABLE "categories" (
    "id" VARCHAR(64) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "name" VARCHAR(150) NOT NULL,
    "slug" VARCHAR(150) NOT NULL UNIQUE,
    "description" TEXT,
    "imageUrl" TEXT,
    "parentId" VARCHAR(64) REFERENCES "categories"("id"),
    "sortOrder" INT NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX "idx_categories_slug" ON "categories"("slug");

-- Products Table
CREATE TABLE "products" (
    "id" VARCHAR(64) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "vendorId" VARCHAR(64),
    "categoryId" VARCHAR(64) NOT NULL REFERENCES "categories"("id"),
    "brandId" VARCHAR(64),
    "title" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL UNIQUE,
    "sku" VARCHAR(100) NOT NULL UNIQUE,
    "barcode" VARCHAR(100),
    "shortDescription" VARCHAR(500) NOT NULL,
    "description" TEXT NOT NULL,
    "basePrice" DECIMAL(12, 2) NOT NULL,
    "compareAtPrice" DECIMAL(12, 2),
    "costPrice" DECIMAL(12, 2),
    "currency" VARCHAR(10) NOT NULL DEFAULT 'USD',
    "ratingAverage" DECIMAL(3, 2) NOT NULL DEFAULT 0.00,
    "reviewCount" INT NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "metaTitle" VARCHAR(255),
    "metaDescription" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX "idx_products_slug" ON "products"("slug");
CREATE INDEX "idx_products_sku" ON "products"("sku");
CREATE INDEX "idx_products_category" ON "products"("categoryId");
CREATE INDEX "idx_products_price" ON "products"("basePrice");

-- Product Variants
CREATE TABLE "product_variants" (
    "id" VARCHAR(64) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "productId" VARCHAR(64) NOT NULL REFERENCES "products"("id") ON DELETE CASCADE,
    "sku" VARCHAR(100) NOT NULL UNIQUE,
    "barcode" VARCHAR(100),
    "name" VARCHAR(255) NOT NULL,
    "priceOffset" DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    "weightKg" DECIMAL(8, 3) NOT NULL DEFAULT 0.500,
    "option1Name" VARCHAR(50),
    "option1Value" VARCHAR(100),
    "option2Name" VARCHAR(50),
    "option2Value" VARCHAR(100),
    "option3Name" VARCHAR(50),
    "option3Value" VARCHAR(100),
    "imageUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX "idx_variants_product" ON "product_variants"("productId");
CREATE INDEX "idx_variants_sku" ON "product_variants"("sku");

-- Orders Table
CREATE TABLE "orders" (
    "id" VARCHAR(64) PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "orderNumber" VARCHAR(50) NOT NULL UNIQUE,
    "userId" VARCHAR(64) NOT NULL REFERENCES "users"("id"),
    "shippingAddressId" VARCHAR(64) NOT NULL REFERENCES "addresses"("id"),
    "billingAddressId" VARCHAR(64) NOT NULL REFERENCES "addresses"("id"),
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "currency" VARCHAR(10) NOT NULL DEFAULT 'USD',
    "subtotal" DECIMAL(12, 2) NOT NULL,
    "shippingFee" DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    "taxAmount" DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    "discountAmount" DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    "totalAmount" DECIMAL(12, 2) NOT NULL,
    "couponCode" VARCHAR(50),
    "customerNotes" TEXT,
    "adminNotes" TEXT,
    "placedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX "idx_orders_user" ON "orders"("userId");
CREATE INDEX "idx_orders_status" ON "orders"("status");
CREATE INDEX "idx_orders_number" ON "orders"("orderNumber");
