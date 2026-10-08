using Application.DTOs;
using Domain.Entities;
using MediatR;

namespace Application.Features.Employees;

public sealed class CreateEmployeeCommandHandler(IEmployeeRepository employees)
    : IRequestHandler<CreateEmployeeCommand, EmployeeDto>
{
    public async Task<EmployeeDto> Handle(
        CreateEmployeeCommand request,
        CancellationToken cancellationToken)
    {
        var employee = new Employee(
            request.FirstName.Trim(),
            request.LastName.Trim(),
            request.Email.Trim(),
            request.PhoneNumber.Trim(),
            request.Department.Trim(),
            request.Salary,
            request.HireDate.Date);

        await employees.AddAsync(employee, cancellationToken);

        return EmployeeMapping.ToDto(employee);
    }
}
