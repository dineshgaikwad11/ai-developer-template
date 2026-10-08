using Application.Features.Employees;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence;

public sealed class EmployeeRepository(AppDbContext dbContext) : IEmployeeRepository
{
    public async Task AddAsync(Employee employee, CancellationToken cancellationToken)
    {
        await dbContext.Employees.AddAsync(employee, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<Employee>> GetActiveEmployeesAsync(CancellationToken cancellationToken)
    {
        return await dbContext.Employees
            .AsNoTracking()
            .OrderByDescending(employee => employee.CreatedAt)
            .ThenBy(employee => employee.Id)
            .ToListAsync(cancellationToken);
    }
}