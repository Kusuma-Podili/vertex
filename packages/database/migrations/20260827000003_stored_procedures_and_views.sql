-- Enterprise Stored Procedures, Triggers & Materialized Views
-- PostgreSQL 15+ Advanced Schema Automation

-- 1. Materialized View for Real-Time Sales & Revenue Telemetry
CREATE MATERIALIZED VIEW IF NOT EXISTS "mv_daily_sales_analytics" AS
SELECT
    DATE_TRUNC('day', o."placedAt") AS "sale_date",
    COUNT(o."id") AS "total_orders",
    SUM(o."totalAmount") AS "gross_revenue",
    AVG(o."totalAmount") AS "average_order_value",
    SUM(o."taxAmount") AS "total_tax_collected",
    SUM(o."discountAmount") AS "total_promotions_applied",
    COUNT(DISTINCT o."userId") AS "unique_buyers"
FROM "orders" o
WHERE o."status" NOT IN ('CANCELLED', 'FAILED')
GROUP BY DATE_TRUNC('day', o."placedAt")
ORDER BY "sale_date" DESC;

CREATE UNIQUE INDEX IF NOT EXISTS "idx_mv_daily_sales_date" ON "mv_daily_sales_analytics"("sale_date");

-- 2. Materialized View for Top Selling Product Catalog Performance
CREATE MATERIALIZED VIEW IF NOT EXISTS "mv_top_product_performers" AS
SELECT
    p."id" AS "product_id",
    p."title",
    p."sku",
    c."name" AS "category_name",
    COUNT(oi."id") AS "total_units_sold",
    SUM(oi."totalPrice") AS "lifetime_revenue",
    p."ratingAverage",
    p."reviewCount"
FROM "products" p
LEFT JOIN "categories" c ON p."categoryId" = c."id"
LEFT JOIN "order_items" oi ON p."id" = oi."productId"
GROUP BY p."id", p."title", p."sku", c."name", p."ratingAverage", p."reviewCount"
ORDER BY "lifetime_revenue" DESC NULLS LAST;

-- 3. Stored Procedure for Atomic Inventory Reservation
CREATE OR REPLACE FUNCTION reserve_inventory_stock(
    p_variant_id VARCHAR(64),
    p_warehouse_id VARCHAR(64),
    p_quantity INT,
    p_order_id VARCHAR(64)
) RETURNS BOOLEAN AS $$
DECLARE
    v_available INT;
    v_reserved INT;
BEGIN
    SELECT "quantityAvailable", "quantityReserved"
    INTO v_available, v_reserved
    FROM "inventories"
    WHERE "variantId" = p_variant_id AND "warehouseId" = p_warehouse_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Inventory record not found for variant % in warehouse %', p_variant_id, p_warehouse_id;
    END IF;

    IF (v_available - v_reserved) < p_quantity THEN
        RETURN FALSE;
    END IF;

    UPDATE "inventories"
    SET "quantityReserved" = "quantityReserved" + p_quantity,
        "updatedAt" = CURRENT_TIMESTAMP
    WHERE "variantId" = p_variant_id AND "warehouseId" = p_warehouse_id;

    INSERT INTO "stock_movements" (
        "id", "inventoryId", "type", "quantity", "balanceAfter", "reason", "referenceId", "createdAt"
    ) VALUES (
        uuid_generate_v4()::text,
        (SELECT "id" FROM "inventories" WHERE "variantId" = p_variant_id AND "warehouseId" = p_warehouse_id),
        'ORDER_RESERVATION',
        p_quantity,
        v_available - v_reserved - p_quantity,
        'Checkout stock lock for order',
        p_order_id,
        CURRENT_TIMESTAMP
    );

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- 4. Audit Log Automation Trigger Function
CREATE OR REPLACE FUNCTION audit_record_changes() RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'DELETE') THEN
        INSERT INTO "audit_logs" ("id", "action", "resource", "resourceId", "metadata", "createdAt")
        VALUES (uuid_generate_v4()::text, 'DELETE', TG_TABLE_NAME, OLD."id", row_to_json(OLD), CURRENT_TIMESTAMP);
        RETURN OLD;
    ELSIF (TG_OP = 'UPDATE') THEN
        INSERT INTO "audit_logs" ("id", "action", "resource", "resourceId", "metadata", "createdAt")
        VALUES (uuid_generate_v4()::text, 'UPDATE', TG_TABLE_NAME, NEW."id", json_build_object('old', row_to_json(OLD), 'new', row_to_json(NEW)), CURRENT_TIMESTAMP);
        RETURN NEW;
    ELSIF (TG_OP = 'INSERT') THEN
        INSERT INTO "audit_logs" ("id", "action", "resource", "resourceId", "metadata", "createdAt")
        VALUES (uuid_generate_v4()::text, 'INSERT', TG_TABLE_NAME, NEW."id", row_to_json(NEW), CURRENT_TIMESTAMP);
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;
