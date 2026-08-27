import unittest

class TestOrderStateMachine(unittest.TestCase):
    ALLOWED_TRANSITIONS = {
        'PENDING': ['PAYMENT_PROCESSING', 'CONFIRMED', 'CANCELLED'],
        'PAYMENT_PROCESSING': ['CONFIRMED', 'FAILED', 'CANCELLED'],
        'CONFIRMED': ['PROCESSING', 'FULFILLING', 'CANCELLED'],
        'PROCESSING': ['FULFILLING', 'CANCELLED'],
        'FULFILLING': ['SHIPPED', 'CANCELLED'],
        'SHIPPED': ['OUT_FOR_DELIVERY', 'DELIVERED', 'RETURNED'],
        'DELIVERED': ['REFUND_REQUESTED', 'RETURNED'],
        'REFUND_REQUESTED': ['REFUNDED', 'CONFIRMED'],
        'CANCELLED': [],
        'REFUNDED': [],
    }

    def test_valid_forward_flow(self):
        self.assertIn('CONFIRMED', self.ALLOWED_TRANSITIONS['PENDING'])
        self.assertIn('FULFILLING', self.ALLOWED_TRANSITIONS['CONFIRMED'])
        self.assertIn('SHIPPED', self.ALLOWED_TRANSITIONS['FULFILLING'])
        self.assertIn('DELIVERED', self.ALLOWED_TRANSITIONS['SHIPPED'])

    def test_invalid_transition_cancelled_to_delivered(self):
        self.assertNotIn('DELIVERED', self.ALLOWED_TRANSITIONS['CANCELLED'])

    def test_invalid_transition_delivered_to_pending(self):
        self.assertNotIn('PENDING', self.ALLOWED_TRANSITIONS['DELIVERED'])

    def test_terminal_state_refunded(self):
        self.assertEqual(len(self.ALLOWED_TRANSITIONS['REFUNDED']), 0)

    def test_order_number_format(self):
        import re
        sample_order = "ORD-9824-AX7"
        self.assertTrue(re.match(r"^ORD-[0-9A-Z]{4}-[0-9A-Z]{3,4}$", sample_order))

if __name__ == '__main__':
    unittest.main()
