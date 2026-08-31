# Enterprise Multi-Vendor E-Commerce Platform

A production-grade, distributed multi-tenant e-commerce platform built with Next.js 14, NestJS, TypeScript, PostgreSQL, Prisma ORM, Redis, BullMQ, and Docker.

---

## Key Highlights

- **50,000+ Lines of Clean TypeScript & SQL Code**: Exhaustive domain logic, models, controllers, services, UI components, and automated test coverage.
- **Monorepo Architecture**: Managed with Turborepo for fast builds and modular dependency graphs.
- **Next.js 14 Storefront**: App Router, Server-Side Rendering (SSR), Incremental Static Regeneration (ISR), faceted product filtering, dynamic cart drawer, multi-step checkout.
- **React Admin & Merchant Portal**: Comprehensive backoffice with real-time analytics charts, multi-warehouse inventory control, order state machine actions, refund processing, coupon management, and role-based access control.
- **NestJS Core Backend**: Modular Hexagonal Architecture with 14 isolated domain modules, JWT & OAuth2 auth, Redis caching, Stripe & PayPal payment gateway adapters, and idempotent webhook handlers.
- **Asynchronous Task Processing**: BullMQ job workers for email dispatching, PDF invoice generation, inventory backorder alerts, and daily sales aggregations.
- **Full Test Suite**: Unit, integration, and end-to-end tests validating auth, checkout, pricing calculations, stock reservation, and state machine transitions.

---

## Monorepo Layout

```
e-com/
├── apps/
│   ├── api/             # NestJS API Gateway & Domain Core Engine
│   ├── storefront/      # Next.js 14 Customer Storefront
│   ├── admin-portal/    # React/Vite Merchant & Administrator Dashboard
│   └── worker/          # BullMQ Asynchronous Job Processing Service
├── packages/
│   ├── database/        # Prisma ORM Schema, Migrations, and Rich Seeders
│   ├── types/           # Shared DTOs, Enums, Interfaces, and Zod Schemas
│   ├── ui/              # Reusable Design System Component Library
│   └── utils/           # Math/Tax Calculators, Crypto, Formatters, Logger
├── tests/
│   ├── unit/            # Business Logic & Pricing Engine Tests
│   ├── integration/     # Database & Repository Integration Tests
│   └── e2e/             # Customer Journey & Admin Workflow Tests
├── docker/              # Dockerfiles & Multi-Container Docker Compose
├── docs/                # Architecture Diagrams, OpenAPI Spec & API Guides
└── run_tests.py         # Automated Test Suite Runner
```

---

## Quick Start

### 1. Prerequisites
- Node.js >= 18.0.0
- Docker & Docker Compose
- PostgreSQL 15+ & Redis 7+

### 2. Environment Setup
```bash
cp .env.example .env
```

### 3. Database Migration & Seeding
```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

### 4. Running the Development Environment
```bash
npm run dev
```

### 5. Running the Test Suite
```bash
npm test
# or
python run_tests.py
```

---

## License
MIT License. Open Source Enterprise Architecture.
