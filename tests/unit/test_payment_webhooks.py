import unittest
import hashlib
import hmac
import time

class TestPaymentWebhooks(unittest.TestCase):
    SECRET = "whsec_enterprise_2026_test_secret"

    def sign_payload(self, payload_str, timestamp):
        sig_str = f"t={timestamp},v1={hmac.new(self.SECRET.encode(), f'{timestamp}.{payload_str}'.encode(), hashlib.sha256).hexdigest()}"
        return sig_str

    def verify_sig(self, payload_str, header, tolerance=300):
        parts = dict(x.split('=', 1) for x in header.split(','))
        t = int(parts.get('t', 0))
        sig = parts.get('v1')
        if abs(time.time() - t) > tolerance:
            return False
        expected = hmac.new(self.SECRET.encode(), f"{t}.{payload_str}".encode(), hashlib.sha256).hexdigest()
        return hmac.compare_digest(sig, expected)

    def test_valid_webhook_signature(self):
        payload = '{"id":"evt_123","type":"payment_intent.succeeded"}'
        now = int(time.time())
        header = self.sign_payload(payload, now)
        self.assertTrue(self.verify_sig(payload, header))

    def test_tampered_payload_rejection(self):
        payload = '{"id":"evt_123","type":"payment_intent.succeeded"}'
        now = int(time.time())
        header = self.sign_payload(payload, now)
        tampered_payload = '{"id":"evt_123","type":"payment_intent.succeeded","amount":999999}'
        self.assertFalse(self.verify_sig(tampered_payload, header))

    def test_expired_timestamp_replay_attack(self):
        payload = '{"id":"evt_123"}'
        old_time = int(time.time()) - 400 # 400s old, exceeds 300s tolerance
        header = self.sign_payload(payload, old_time)
        self.assertFalse(self.verify_sig(payload, header))

    def test_invalid_secret_rejection(self):
        payload = '{"id":"evt_123"}'
        wrong_secret_sig = hmac.new(b"wrong_secret", f"{int(time.time())}.{payload}".encode(), hashlib.sha256).hexdigest()
        header = f"t={int(time.time())},v1={wrong_secret_sig}"
        self.assertFalse(self.verify_sig(payload, header))

if __name__ == '__main__':
    unittest.main()
