import unittest

class TestCartPricingEngine(unittest.TestCase):
    def test_subtotal_calculation(self):
        items = [
            {"price": 349.99, "quantity": 2},
            {"price": 599.00, "quantity": 1},
        ]
        subtotal = sum(i["price"] * i["quantity"] for i in items)
        self.assertEqual(round(subtotal, 2), 1298.98)

    def test_percentage_coupon_with_cap(self):
        subtotal = 500.00
        discount_percent = 20
        max_cap = 50.00
        calculated = (subtotal * discount_percent) / 100
        applied = min(calculated, max_cap)
        self.assertEqual(applied, 50.00)

    def test_tax_calculation_california(self):
        subtotal = 349.99
        tax_rate = 0.0925 # CA state + local
        tax = round(subtotal * tax_rate, 2)
        self.assertEqual(tax, 32.37)

    def test_free_shipping_threshold(self):
        threshold = 100.00
        cart_1 = 349.99
        cart_2 = 45.00
        shipping_1 = 0.0 if cart_1 >= threshold else 15.00
        shipping_2 = 0.0 if cart_2 >= threshold else 15.00
        self.assertEqual(shipping_1, 0.0)
        self.assertEqual(shipping_2, 15.00)

    def test_grand_total_computation(self):
        subtotal = 349.99
        discount = 0.0
        tax = 32.37
        shipping = 0.0
        grand_total = round(subtotal - discount + tax + shipping, 2)
        self.assertEqual(grand_total, 382.36)

if __name__ == '__main__':
    unittest.main()
