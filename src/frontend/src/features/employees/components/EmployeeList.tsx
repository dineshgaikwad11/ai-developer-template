import { useGetEmployees } from '../api/useEmployees';

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

function formatDate(value: string) {
  const dateOnly = value.slice(0, 10);
  return new Date(`${dateOnly}T00:00:00`).toLocaleDateString();
}

export function EmployeeList() {
  const employees = useGetEmployees();

  return (
    <section className="card shadow-sm">
      <div className="card-header bg-white">
        <h2 className="h5 mb-0">Employees</h2>
      </div>
      <div className="card-body">
        {employees.isPending && (
          <div className="d-flex justify-content-center py-5" role="status" aria-label="Loading employees">
            <span className="spinner-border text-primary" aria-hidden="true" />
          </div>
        )}
        {employees.isError && (
          <div className="alert alert-danger mb-0" role="alert">
            Employees could not be loaded. Check your connection and authorization, then retry.
            <div>
              <button className="btn btn-sm btn-outline-danger mt-2" type="button" onClick={() => void employees.refetch()}>
                Retry
              </button>
            </div>
          </div>
        )}
        {employees.isSuccess && employees.data.length === 0 && (
          <div className="alert alert-info mb-0" role="status">No employees have been added yet.</div>
        )}
        {employees.isSuccess && employees.data.length > 0 && (
          <div className="table-responsive">
            <table className="table table-hover table-striped align-middle mb-0">
              <thead>
                <tr>
                  <th scope="col">Employee</th>
                  <th scope="col">Department</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Salary</th>
                  <th scope="col">Hire date</th>
                </tr>
              </thead>
              <tbody>
                {employees.data.map((employee) => (
                  <tr key={employee.id}>
                    <td className="fw-medium">{employee.firstName} {employee.lastName}</td>
                    <td><span className="badge bg-secondary">{employee.department}</span></td>
                    <td><a href={`mailto:${employee.email}`}>{employee.email}</a></td>
                    <td>{employee.phoneNumber}</td>
                    <td>{currencyFormatter.format(employee.salary)}</td>
                    <td>{formatDate(employee.hireDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}