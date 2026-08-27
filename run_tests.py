import unittest
import sys
import os

def run_all_tests():
    print("=" * 75)
    print("   ENTERPRISE E-COMMERCE PLATFORM AUTOMATED TEST SUITE RUNNER")
    print("=" * 75)
    
    loader = unittest.TestLoader()
    suite = unittest.TestSuite()
    
    base_dir = os.path.dirname(os.path.abspath(__file__))
    tests_dir = os.path.join(base_dir, 'tests')
    
    discovered = loader.discover(start_dir=tests_dir, pattern='test_*.py')
    suite.addTests(discovered)
    
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    
    print("-" * 75)
    print(f"Total Tests Executed : {result.testsRun}")
    print(f"Total Failures       : {len(result.failures)}")
    print(f"Total Errors         : {len(result.errors)}")
    print("Status               : ALL TEST CASES PASSED SUCCESSFULLY" if result.wasSuccessful() else "Status: TESTS FAILED")
    print("=" * 75)
    
    return 0 if result.wasSuccessful() else 1

if __name__ == '__main__':
    sys.exit(run_all_tests())
