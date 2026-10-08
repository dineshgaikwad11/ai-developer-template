using Application.DTOs;
using MediatR;

namespace Application.Features.Employees;

public sealed record GetEmployeesQuery : IRequest<IReadOnlyList<EmployeeDto>>;
