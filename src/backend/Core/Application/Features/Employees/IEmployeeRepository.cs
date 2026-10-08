using Domain.Entities;

namespace Application.Features.Employees;

public interface IEmployeeRepository
{
    Task AddAsync(Employee employee, CancellationToken cancellationToken);

    Task<IReadOnlyList<Employee>> GetActiveEmployeesAsync(CancellationToken cancellationToken);
}