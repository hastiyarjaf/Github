import { test, expect } from '@playwright/test';

/**
 * Authentication Tests
 * Tests the complete authentication flow including login, registration, and logout
 */

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Start from the home page
    await page.goto('/');
  });

  test('should display login form', async ({ page }) => {
    await page.goto('/login');
    
    // Check if login form elements are present
    await expect(page.locator('h2')).toContainText('Sign in to WeDoNet');
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toContainText('Sign in');
  });

  test('should show validation errors for empty form', async ({ page }) => {
    await page.goto('/login');
    
    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // Check for validation errors
    await expect(page.locator('text=Username or email is required')).toBeVisible();
    await expect(page.locator('text=Password is required')).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login');
    
    // Fill form with invalid credentials
    await page.fill('input[name="username"]', 'invaliduser');
    await page.fill('input[name="password"]', 'wrongpassword');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for error message
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-message"]')).toContainText(/Invalid credentials|Authentication failed/);
  });

  test('should successfully login with valid admin credentials', async ({ page }) => {
    await page.goto('/login');
    
    // Fill form with admin credentials (using default test credentials)
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'AdminPassword123!');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for successful login and redirect
    await expect(page).toHaveURL(/dashboard/);
    
    // Check for success indicators
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });

  test('should redirect to login when accessing protected route', async ({ page }) => {
    // Try to access admin dashboard without authentication
    await page.goto('/admin/dashboard');
    
    // Should be redirected to login
    await expect(page).toHaveURL(/login/);
    await expect(page.locator('h2')).toContainText('Sign in to WeDoNet');
  });

  test('should display registration form', async ({ page }) => {
    await page.goto('/register');
    
    // Check if registration form elements are present
    await expect(page.locator('h2')).toContainText(/Register|Create Account/);
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="confirmPassword"]')).toBeVisible();
  });

  test('should validate registration form', async ({ page }) => {
    await page.goto('/register');
    
    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // Check for validation errors
    await expect(page.locator('text=Username is required')).toBeVisible();
    await expect(page.locator('text=Email is required')).toBeVisible();
    await expect(page.locator('text=Password is required')).toBeVisible();
  });

  test('should validate password confirmation', async ({ page }) => {
    await page.goto('/register');
    
    // Fill form with mismatched passwords
    await page.fill('input[name="username"]', 'testuser');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'TestPassword123!');
    await page.fill('input[name="confirmPassword"]', 'DifferentPassword123!');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Check for password mismatch error
    await expect(page.locator('text=Passwords do not match')).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    // First login
    await page.goto('/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'AdminPassword123!');
    await page.click('button[type="submit"]');
    
    // Wait for dashboard
    await expect(page).toHaveURL(/dashboard/);
    
    // Logout
    await page.click('[data-testid="user-menu"]');
    await page.click('[data-testid="logout-button"]');
    
    // Should be redirected to home or login
    await expect(page).toHaveURL(/login|\/$/);
    
    // Verify user menu is gone
    await expect(page.locator('[data-testid="user-menu"]')).not.toBeVisible();
  });
});

/**
 * Application Form Tests
 * Tests the public application submission functionality
 */
test.describe('Application Submission', () => {
  test('should display application form', async ({ page }) => {
    await page.goto('/apply');
    
    await expect(page.locator('h1, h2')).toContainText(/Apply|Application/);
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"], input[name="specialty"]')).toBeVisible();
  });

  test('should submit application successfully', async ({ page }) => {
    await page.goto('/apply');
    
    // Fill application form
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john.doe@example.com');
    await page.fill('input[name="portfolio"]', 'https://johndoe.dev');
    await page.fill('textarea[name="specialty"], input[name="specialty"]', 'Full Stack Development');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for success message
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="success-message"]')).toContainText(/submitted|success/i);
  });

  test('should validate required fields', async ({ page }) => {
    await page.goto('/apply');
    
    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // Check for validation errors
    await expect(page.locator('text=Name is required')).toBeVisible();
    await expect(page.locator('text=Email is required')).toBeVisible();
  });
});

/**
 * Contact Form Tests
 * Tests the public contact form functionality
 */
test.describe('Contact Form', () => {
  test('should display contact form', async ({ page }) => {
    await page.goto('/contact');
    
    await expect(page.locator('h1, h2')).toContainText(/Contact/);
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
  });

  test('should submit contact message successfully', async ({ page }) => {
    await page.goto('/contact');
    
    // Fill contact form
    await page.fill('input[name="name"]', 'Jane Smith');
    await page.fill('input[name="email"]', 'jane.smith@example.com');
    await page.fill('input[name="subject"]', 'Inquiry about services');
    await page.fill('textarea[name="message"]', 'I would like to know more about your services and pricing.');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for success message
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="success-message"]')).toContainText(/sent|success/i);
  });
});

/**
 * Security Tests
 * Tests various security aspects of the application
 */
test.describe('Security', () => {
  test('should have proper security headers', async ({ page, request }) => {
    const response = await request.get('/');
    
    // Check for security headers
    const headers = response.headers();
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['x-frame-options']).toBeTruthy();
    expect(headers['x-xss-protection']).toBeTruthy();
  });

  test('should rate limit requests', async ({ request }) => {
    const apiUrl = 'http://localhost:3001/api/contact';
    
    // Make multiple rapid requests
    const requests = Array.from({ length: 10 }, () => 
      request.post(apiUrl, {
        data: {
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message'
        }
      })
    );
    
    const responses = await Promise.all(requests);
    
    // At least one request should be rate limited
    const rateLimitedResponses = responses.filter(response => response.status() === 429);
    expect(rateLimitedResponses.length).toBeGreaterThan(0);
  });
});

/**
 * Accessibility Tests
 * Tests basic accessibility requirements
 */
test.describe('Accessibility', () => {
  test('should have proper heading structure', async ({ page }) => {
    await page.goto('/');
    
    // Check that there's at least one h1 element
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
  });

  test('should have alt text for images', async ({ page }) => {
    await page.goto('/');
    
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      for (let i = 0; i < imageCount; i++) {
        const image = images.nth(i);
        const alt = await image.getAttribute('alt');
        expect(alt).toBeTruthy();
      }
    }
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/login');
    
    // Tab through form elements
    await page.press('body', 'Tab');
    await expect(page.locator('input[name="username"]')).toBeFocused();
    
    await page.press('input[name="username"]', 'Tab');
    await expect(page.locator('input[name="password"]')).toBeFocused();
  });
});