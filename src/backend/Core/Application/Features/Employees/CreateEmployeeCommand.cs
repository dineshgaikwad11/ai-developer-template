using Application.DTOs;
using MediatR;

namespace Application.Features.Employees;

public sealed record CreateEmployeeCommand(
    string FirstName,
    string LastName,
    string Email,
    string PhoneNumber,
    string Department,
    decimal Salary,
    DateTime HireDate) : IRequest<EmployeeDto>;
