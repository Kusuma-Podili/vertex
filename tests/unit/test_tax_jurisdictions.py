import unittest

class TestTaxJurisdictions(unittest.TestCase):
    TAX_TABLE = {
        'US-CA': 0.0925,
        'US-NY': 0.08875,
        'US-TX': 0.0825,
        'US-WA': 0.0950,
        'US-FL': 0.0700,
        'US-IL': 0.0875,
        'US-MA': 0.0625,
        'US-PA': 0.0600,
        'US-NJ': 0.06625,
        'US-NC': 0.0725,
        'DE-DEFAULT': 0.1900,
        'GB-DEFAULT': 0.2000,
        'FR-DEFAULT': 0.2000,
        'JP-DEFAULT': 0.1000,
        'AU-DEFAULT': 0.1000,
    }

    def calculate_tax(self, amount, country, state=''):
        key = f"{country.upper()}-{state.upper()}"
        default_key = f"{country.upper()}-DEFAULT"
        rate = self.TAX_TABLE.get(key, self.TAX_TABLE.get(default_key, 0.05))
        return round(amount * rate, 2)

    def test_california_tax(self):
        tax = self.calculate_tax(100.00, 'US', 'CA')
        self.assertEqual(tax, 9.25)

    def test_new_york_tax(self):
        tax = self.calculate_tax(200.00, 'US', 'NY')
        self.assertEqual(tax, 17.75)

    def test_texas_tax(self):
        tax = self.calculate_tax(1000.00, 'US', 'TX')
        self.assertEqual(tax, 82.50)

    def test_germany_vat(self):
        tax = self.calculate_tax(500.00, 'DE')
        self.assertEqual(tax, 95.00)

    def test_uk_vat(self):
        tax = self.calculate_tax(100.00, 'GB')
        self.assertEqual(tax, 20.00)

    def test_japan_consumption_tax(self):
        tax = self.calculate_tax(350.00, 'JP')
        self.assertEqual(tax, 35.00)

    def test_zero_amount_tax(self):
        tax = self.calculate_tax(0.00, 'US', 'CA')
        self.assertEqual(tax, 0.00)

    def test_fractional_cent_rounding(self):
        tax = self.calculate_tax(12.33, 'US', 'CA')
        # 12.33 * 0.0925 = 1.140525 -> 1.14
        self.assertEqual(tax, 1.14)

if __name__ == '__main__':
    unittest.main()
