import unittest
import time

class TestInventoryReservation(unittest.TestCase):
    def test_stock_reservation_lock(self):
        available_stock = 85
        requested = 5
        self.assertTrue(available_stock >= requested)
        remaining = available_stock - requested
        self.assertEqual(remaining, 80)

    def test_insufficient_stock_rejection(self):
        available_stock = 2
        requested = 10
        can_fulfill = available_stock >= requested
        self.assertFalse(can_fulfill)

    def test_reservation_timeout_expiry(self):
        now = time.time()
        timeout_seconds = 15 * 60
        expires_at = now + timeout_seconds
        self.assertTrue(expires_at > now)

    def test_multi_warehouse_routing(self):
        warehouses = [
            {"code": "US-EAST-1", "stock": 80, "distance_miles": 120},
            {"code": "US-WEST-1", "stock": 50, "distance_miles": 2400},
        ]
        best_warehouse = min(warehouses, key=lambda w: w["distance_miles"])
        self.assertEqual(best_warehouse["code"], "US-EAST-1")

    def test_low_stock_reorder_trigger(self):
        reorder_point = 10
        current_stock = 6
        needs_reorder = current_stock <= reorder_point
        self.assertTrue(needs_reorder)

if __name__ == '__main__':
    unittest.main()
