/**
 * Global Setup for Playwright Tests
 * Runs once before all tests to set up the test environment
 */

async function globalSetup() {
  console.log('🚀 Setting up test environment...');
  
  // Set test environment variables
  process.env.NODE_ENV = 'test';
  process.env.JWT_ACCESS_SECRET = 'test-access-secret-key-at-least-32-characters-long';
  process.env.JWT_REFRESH_SECRET = 'test-refresh-secret-key-at-least-32-characters-long';
  process.env.ADMIN_PASSWORD = 'AdminPassword123!';
  
  // Wait for services to be ready
  await waitForServices();
  
  console.log('✅ Test environment setup complete');
}

async function waitForServices() {
  const axios = require('axios');
  const maxRetries = 30;
  const retryDelay = 2000;
  
  console.log('⏳ Waiting for backend service...');
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await axios.get('http://localhost:3001/health', {
        timeout: 5000
      });
      
      if (response.status === 200) {
        console.log('✅ Backend service is ready');
        break;
      }
    } catch (error) {
      if (i === maxRetries - 1) {
        throw new Error('Backend service failed to start');
      }
      
      console.log(`⏳ Backend not ready, retrying... (${i + 1}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
  
  console.log('⏳ Waiting for frontend service...');
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await axios.get('http://localhost:3000', {
        timeout: 5000
      });
      
      if (response.status === 200) {
        console.log('✅ Frontend service is ready');
        break;
      }
    } catch (error) {
      if (i === maxRetries - 1) {
        throw new Error('Frontend service failed to start');
      }
      
      console.log(`⏳ Frontend not ready, retrying... (${i + 1}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
}

module.exports = globalSetup;