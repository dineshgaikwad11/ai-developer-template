import { expect, test } from '@playwright/test';
import type { CreateEmployeeInput, Employee } from '../src/features/employees/types';

test('creates an employee and displays it in the list', async ({ page }) => {
  let employees: Employee[] = [];

  await page.route('http://localhost:5000/api/employees', async (route) => {
    const origin = route.request().headers().origin ?? 'http://127.0.0.1:5173';
    const corsHeaders = {
      'access-control-allow-origin': origin,
      'access-control-allow-methods': 'GET, POST, OPTIONS',
      'access-control-allow-headers': 'accept, content-type',
    };

    if (route.request().method() === 'OPTIONS') {
      await route.fulfill({ status: 204, headers: corsHeaders });
      return;
    }

    if (route.request().method() === 'GET') {
      await route.fulfill({ json: employees, headers: corsHeaders });
      return;
    }

    const input = route.request().postDataJSON() as CreateEmployeeInput;
    const employee: Employee = {
      id: 'employee-1',
      ...input,
      hireDate: `${input.hireDate}T00:00:00`,
      createdAt: '2026-10-08T00:00:00Z',
      isDeleted: false,
    };
    employees = [employee];
    await route.fulfill({ status: 201, json: employee, headers: corsHeaders });
  });

  await page.goto('/employees');
  await page.getByLabel('First name').fill('Avery');
  await page.getByLabel('Last name').fill('Morgan');
  await page.getByLabel('Email').fill('avery.morgan@example.com');
  await page.getByLabel('Phone number').fill('555-0100');
  await page.getByLabel('Department').fill('Engineering');
  await page.getByLabel('Annual salary').fill('85000');
  await page.getByLabel('Hire date').fill('2022-01-01');
  await page.getByRole('button', { name: 'Add employee' }).click();

  await expect(page.getByRole('status')).toContainText('Employee created successfully.');
  await expect(page.getByRole('row', { name: /Avery Morgan/ })).toBeVisible();
});