import { expect, test } from '@playwright/test';

test('renders the system status workspace', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'System status' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Healthy' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Ready to extend' })).toBeVisible();
});
