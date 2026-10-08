using Application.DTOs;
using MediatR;

namespace Application.Features.Employees;

public sealed class GetEmployeesQueryHandler(IEmployeeRepository employees)
    : IRequestHandler<GetEmployeesQuery, IReadOnlyList<EmployeeDto>>
{
    public async Task<IReadOnlyList<EmployeeDto>> Handle(
        GetEmployeesQuery request,
        CancellationToken cancellationToken)
    {
        var results = await employees.GetActiveEmployeesAsync(cancellationToken);
        return results.Select(EmployeeMapping.ToDto).ToArray();
    }
}
