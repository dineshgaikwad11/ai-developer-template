import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useCreateEmployee } from '../api/useEmployees';
import type { CreateEmployeeInput } from '../types';

const employeeFormSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required.').max(100, 'Use 100 characters or fewer.'),
  lastName: z.string().trim().min(1, 'Last name is required.').max(100, 'Use 100 characters or fewer.'),
  email: z.string().trim().email('Enter a valid email address.').max(254, 'Use 254 characters or fewer.'),
  phoneNumber: z.string().trim().min(1, 'Phone number is required.').max(32, 'Use 32 characters or fewer.'),
  department: z.string().trim().min(1, 'Department is required.').max(100, 'Use 100 characters or fewer.'),
  salary: z.string()
    .trim()
    .regex(/^\d+(\.\d{1,2})?$/, 'Enter a valid amount with up to two decimal places.')
    .refine((value) => Number(value) > 0, 'Salary must be greater than zero.'),
  hireDate: z.string()
    .min(1, 'Hire date is required.')
    .refine((value) => {
      const hireDate = new Date(`${value}T00:00:00`);
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      return !Number.isNaN(hireDate.getTime()) && hireDate <= today;
    }, 'Hire date must be today or earlier.'),
});

type EmployeeFormValues = z.infer<typeof employeeFormSchema>;

export function EmployeeForm() {
  const createEmployee = useCreateEmployee();
  const [created, setCreated] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeFormValues>({ resolver: zodResolver(employeeFormSchema) });

  const onSubmit = async (values: EmployeeFormValues) => {
    setCreated(false);
    const input: CreateEmployeeInput = { ...values, salary: Number(values.salary) };
    try {
      await createEmployee.mutateAsync(input);
      reset();
      setCreated(true);
    } catch {
      setCreated(false);
    }
  };

  const isSaving = isSubmitting || createEmployee.isPending;

  return (
    <section className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h2 className="h5 mb-0">Add employee</h2>
      </div>
      <div className="card-body">
        {created && <div className="alert alert-success" role="status">Employee created successfully.</div>}
        {createEmployee.isError && (
          <div className="alert alert-danger" role="alert">
            Unable to save the employee. Check your connection and authorization, then try again.
          </div>
        )}
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label" htmlFor="firstName">First name</label>
            <input id="firstName" autoComplete="given-name" className={`form-control${errors.firstName ? ' is-invalid' : ''}`} {...register('firstName')} />
            {errors.firstName && <div className="invalid-feedback">{errors.firstName.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="lastName">Last name</label>
            <input id="lastName" autoComplete="family-name" className={`form-control${errors.lastName ? ' is-invalid' : ''}`} {...register('lastName')} />
            {errors.lastName && <div className="invalid-feedback">{errors.lastName.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">Email</label>
            <input id="email" type="email" autoComplete="email" className={`form-control${errors.email ? ' is-invalid' : ''}`} {...register('email')} />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="phoneNumber">Phone number</label>
            <input id="phoneNumber" type="tel" autoComplete="tel" className={`form-control${errors.phoneNumber ? ' is-invalid' : ''}`} {...register('phoneNumber')} />
            {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="department">Department</label>
            <input id="department" className={`form-control${errors.department ? ' is-invalid' : ''}`} {...register('department')} />
            {errors.department && <div className="invalid-feedback">{errors.department.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="salary">Annual salary</label>
            <input id="salary" type="number" min="0.01" step="0.01" inputMode="decimal" className={`form-control${errors.salary ? ' is-invalid' : ''}`} {...register('salary')} />
            {errors.salary && <div className="invalid-feedback">{errors.salary.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="hireDate">Hire date</label>
            <input id="hireDate" type="date" max={new Date().toISOString().slice(0, 10)} className={`form-control${errors.hireDate ? ' is-invalid' : ''}`} {...register('hireDate')} />
            {errors.hireDate && <div className="invalid-feedback">{errors.hireDate.message}</div>}
          </div>
          <button className="btn btn-primary w-100" type="submit" disabled={isSaving}>
            {isSaving ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
                Saving...
              </>
            ) : 'Add employee'}
          </button>
        </form>
      </div>
    </section>
  );
}