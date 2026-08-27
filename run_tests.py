import unittest
import sys
import os

def run_all_tests():
    print("=" * 70)
    print("   ENTERPRISE E-COMMERCE PLATFORM AUTOMATED TEST SUITE RUNNER")
    print("=" * 70)
    
    loader = unittest.TestLoader()
    suite = unittest.TestSuite()
    
    # Discover unit and e2e tests
    unit_tests = loader.discover(start_dir='tests/unit', pattern='*.test.py')
    e2e_tests = loader.discover(start_dir='tests/e2e', pattern='*.test.py')
    
    suite.addTests(unit_tests)
    suite.addTests(e2e_tests)
    
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    
    print("-" * 70)
    print(f"Total Tests Executed: {result.testsRun}")
    print(f"Total Failures: {len(result.failures)}")
    print(f"Total Errors: {len(result.errors)}")
    print("Status: ALL TEST CASES PASSED SUCCESSFULLY" if result.wasSuccessful() else "Status: TESTS FAILED")
    print("=" * 70)
    
    return 0 if result.wasSuccessful() else 1

if __name__ == '__main__':
    sys.exit(run_all_tests())
