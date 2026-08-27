import unittest

class TestCurrencyConverter(unittest.TestCase):
    RATES = {
        'USD': 1.0,
        'EUR': 0.92,
        'GBP': 0.79,
        'CAD': 1.36,
        'AUD': 1.52,
        'JPY': 152.4,
        'CHF': 0.90,
    }

    def convert(self, amount, from_curr, to_curr):
        amount_usd = amount / self.RATES[from_curr]
        target = amount_usd * self.RATES[to_curr]
        return round(target, 2)

    def test_usd_to_eur(self):
        eur = self.convert(100.0, 'USD', 'EUR')
        self.assertEqual(eur, 92.00)

    def test_eur_to_usd(self):
        usd = self.convert(92.0, 'EUR', 'USD')
        self.assertEqual(usd, 100.00)

    def test_usd_to_jpy(self):
        jpy = self.convert(10.0, 'USD', 'JPY')
        self.assertEqual(jpy, 1524.00)

    def test_same_currency(self):
        usd = self.convert(250.0, 'USD', 'USD')
        self.assertEqual(usd, 250.00)

if __name__ == '__main__':
    unittest.main()
