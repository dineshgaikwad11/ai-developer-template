import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { EmployeeForm } from './EmployeeForm';

const { mutateAsyncMock } = vi.hoisted(() => ({ mutateAsyncMock: vi.fn() }));

vi.mock('../api/useEmployees', () => ({
  useCreateEmployee: () => ({
    mutateAsync: mutateAsyncMock,
    isPending: false,
    isError: false,
  }),
}));

describe('EmployeeForm', () => {
  beforeEach(() => mutateAsyncMock.mockReset());

  it('shows field feedback when required fields are missing', async () => {
    const user = userEvent.setup();
    render(<EmployeeForm />);

    await user.click(screen.getByRole('button', { name: 'Add employee' }));

    expect(await screen.findByText('First name is required.')).toBeInTheDocument();
    expect(screen.getByText('Last name is required.')).toBeInTheDocument();
    expect(screen.getByText('Hire date is required.')).toBeInTheDocument();
    expect(mutateAsyncMock).not.toHaveBeenCalled();
  });

  it('submits typed values and confirms successful creation', async () => {
    const user = userEvent.setup();
    mutateAsyncMock.mockResolvedValue({ id: 'employee-1' });
    render(<EmployeeForm />);

    await user.type(screen.getByLabelText('First name'), 'Avery');
    await user.type(screen.getByLabelText('Last name'), 'Morgan');
    await user.type(screen.getByLabelText('Email'), 'avery.morgan@example.com');
    await user.type(screen.getByLabelText('Phone number'), '555-0100');
    await user.type(screen.getByLabelText('Department'), 'Engineering');
    await user.type(screen.getByLabelText('Annual salary'), '85000.25');
    fireEvent.change(screen.getByLabelText('Hire date'), { target: { value: '2022-01-01' } });
    await user.click(screen.getByRole('button', { name: 'Add employee' }));

    await waitFor(() => expect(mutateAsyncMock).toHaveBeenCalledWith({
      firstName: 'Avery',
      lastName: 'Morgan',
      email: 'avery.morgan@example.com',
      phoneNumber: '555-0100',
      department: 'Engineering',
      salary: 85000.25,
      hireDate: '2022-01-01',
    }));
    expect(await screen.findByRole('status')).toHaveTextContent('Employee created successfully.');
  });
});