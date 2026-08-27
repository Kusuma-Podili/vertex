# Enterprise Architecture & System Design

This document details the high-level architecture, module decomposition, domain event lifecycle, and security model of the Enterprise E-Commerce Platform.

## 1. System Topology

```
                  +-----------------------------------+
                  |        Cloudflare / Edge CDN      |
                  +-----------------------------------+
                                    |
          +-------------------------+-------------------------+
          |                                                   |
+----------------------+                             +----------------------+
| Next.js Storefront   |                             | Vite Admin Portal    |
| (Port 3000)          |                             | (Port 3001)          |
+----------------------+                             +----------------------+
          |                                                   |
          +-------------------------+-------------------------+
                                    |
                    +-------------------------------+
                    |     NestJS API Gateway        |
                    |     (Port 4000)               |
                    +-------------------------------+
                                    |
        +---------------------------+---------------------------+
        |                           |                           |
+---------------+           +---------------+           +---------------+
| PostgreSQL 15 |           | Redis Cache   |           | BullMQ Worker |
| (Primary DB)  |           | & Rate Limit  |           | (Port 4001)   |
+---------------+           +---------------+           +---------------+
```

## 2. Domain Decomposition

The backend engine follows Clean Hexagonal Architecture, separated into 14 distinct domain modules:

1. **Authentication & RBAC**: JWT Access & Refresh Tokens, bcrypt hashing, Role & Permission decorators, Session tracking.
2. **Users & Profiles**: Customer accounts, merchant accounts, address book, preferences, GDPR data exports.
3. **Product Catalog**: Multi-level category hierarchy, dynamic variant attributes (Color, Size, Material), brands, tags, SEO metadata.
4. **Search & Discovery**: Full-text fuzzy search, faceted aggregation filters, autocomplete, popularity scoring.
5. **Inventory & Warehousing**: Multi-location warehouse stock, stock reservation timeouts, automated replenishment triggers.
6. **Cart & Pricing Engine**: Server-persisted and guest cart merge, volume tier pricing, tax calculation rules by jurisdiction.
7. **Promotion & Coupon System**: Percentage, fixed-amount, buy-X-get-Y, minimum spend constraints, usage counters.
8. **Orders & State Machine**: Deterministic state machine (PENDING -> PAYMENT_PROCESSING -> CONFIRMED -> FULFILLING -> SHIPPED -> DELIVERED / CANCELLED / REFUNDED).
9. **Payments Integration**: Stripe Payment Intents, PayPal Orders API, idempotent webhook handling with signature verification.
10. **Shipping & Logistics**: Carrier rate quotes (FedEx, UPS, DHL), tracking number generation, dispatch status webhooks.
11. **Reviews & Sentiment**: Verified purchase review gating, aggregate rating recalculation, sentiment moderation queues.
12. **Notification Dispatcher**: Transactional HTML email generation, SMS notifications, real-time WebSocket push feeds.
13. **Vendor Marketplace**: Vendor onboarding, commission rate calculation, payout schedules, merchant store settings.
14. **Analytics & Metrics**: Real-time sales telemetry, customer lifetime value (LTV), cart abandonment analytics, CSV/PDF report generators.

## 3. Order State Machine Transitions

```
[ PENDING ] ──( Initiate Payment )──> [ PAYMENT_PROCESSING ]
                                              |
                     +------------------------+------------------------+
                     | Payment Success                                 | Payment Failed
                     v                                                 v
              [ CONFIRMED ]                                      [ CANCELLED ]
                     |
            ( Reserve Stock & Pack )
                     v
             [ FULFILLING ]
                     |
            ( Handover to Carrier )
                     v
               [ SHIPPED ] ──( Delivery Confirmed )──> [ DELIVERED ]
                     |                                       |
           ( Return / Exception )                  ( Refund Requested )
                     v                                       v
             [ RETURNED ] <────────( Issue Refund )─── [ REFUNDED ]
```

## 4. Security & Compliance Standards
- **OWASP Top 10 Mitigation**: SQL injection prevention via Prisma parameterized queries, XSS sanitization, helmet headers, strict CORS.
- **Idempotency**: All payment and order creation endpoints require `Idempotency-Key` HTTP headers backed by Redis locks.
- **Rate Limiting**: Tiered IP and user-level throttling using sliding window algorithm.
- **Audit Logging**: Immutable audit logs capturing every administrative modification, refund issuance, and role assignment.
