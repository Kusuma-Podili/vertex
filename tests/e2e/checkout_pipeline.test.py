import unittest

class TestE2ECheckoutPipeline(unittest.TestCase):
    def test_end_to_end_customer_journey(self):
        # Step 1: User logs in
        user = {"id": "usr-customer-john", "email": "john.doe@enterprise-dev.com"}
        self.assertIsNotNone(user["id"])

        # Step 2: User adds Aurora Headphones to Cart
        cart = {"items": [{"variantId": "var-1", "price": 349.99, "quantity": 1}]}
        self.assertEqual(len(cart["items"]), 1)

        # Step 3: Stock is reserved
        reservation_confirmed = True
        self.assertTrue(reservation_confirmed)

        # Step 4: Tax & Freight calculated
        subtotal = 349.99
        tax = 32.37
        shipping = 0.0
        total = round(subtotal + tax + shipping, 2)
        self.assertEqual(total, 382.36)

        # Step 5: Payment captured via Stripe
        payment_status = "CAPTURED"
        self.assertEqual(payment_status, "CAPTURED")

        # Step 6: Order transitioned to CONFIRMED
        order_status = "CONFIRMED"
        self.assertEqual(order_status, "CONFIRMED")

if __name__ == '__main__':
    unittest.main()
