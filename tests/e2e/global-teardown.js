/**
 * Global Teardown for Playwright Tests
 * Runs once after all tests to clean up the test environment
 */

async function globalTeardown() {
  console.log('🧹 Cleaning up test environment...');
  
  // Clean up test data, close connections, etc.
  // Add any cleanup logic here
  
  console.log('✅ Test environment cleanup complete');
}

module.exports = globalTeardown;