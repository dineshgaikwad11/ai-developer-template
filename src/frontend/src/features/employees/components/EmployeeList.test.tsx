import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { EmployeeList } from './EmployeeList';

const { useGetEmployeesMock } = vi.hoisted(() => ({ useGetEmployeesMock: vi.fn() }));

vi.mock('../api/useEmployees', () => ({ useGetEmployees: useGetEmployeesMock }));

describe('EmployeeList', () => {
  beforeEach(() => useGetEmployeesMock.mockReset());

  it('shows a loading indicator while the query is pending', () => {
    useGetEmployeesMock.mockReturnValue({ isPending: true, isError: false, isSuccess: false });

    render(<EmployeeList />);

    expect(screen.getByRole('status', { name: 'Loading employees' })).toBeInTheDocument();
  });

  it('shows an informative empty state', () => {
    useGetEmployeesMock.mockReturnValue({ isPending: false, isError: false, isSuccess: true, data: [] });

    render(<EmployeeList />);

    expect(screen.getByRole('status')).toHaveTextContent('No employees have been added yet.');
  });

  it('shows a safe error message when the request fails', () => {
    useGetEmployeesMock.mockReturnValue({ isPending: false, isError: true, isSuccess: false });

    render(<EmployeeList />);

    expect(screen.getByRole('alert')).toHaveTextContent('Employees could not be loaded.');
  });

  it('renders employee data in the responsive table', () => {
    useGetEmployeesMock.mockReturnValue({
      isPending: false,
      isError: false,
      isSuccess: true,
      data: [{
        id: 'employee-1',
        firstName: 'Avery',
        lastName: 'Morgan',
        email: 'avery.morgan@example.com',
        phoneNumber: '555-0100',
        department: 'Engineering',
        salary: 85000,
        hireDate: '2022-01-01T00:00:00',
        createdAt: '2026-10-08T00:00:00Z',
        isDeleted: false,
      }],
    });

    render(<EmployeeList />);

    expect(screen.getByRole('table')).toHaveClass('table-hover', 'table-striped', 'align-middle');
    expect(screen.getByText('Avery Morgan')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toHaveClass('badge', 'bg-secondary');
  });
});