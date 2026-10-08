using Application.DTOs;
using Domain.Entities;

namespace Application.Features.Employees;

internal static class EmployeeMapping
{
    public static EmployeeDto ToDto(Employee employee) => new(
        employee.Id,
        employee.FirstName,
        employee.LastName,
        employee.Email,
        employee.PhoneNumber,
        employee.Department,
        employee.Salary,
        employee.HireDate,
        employee.CreatedAt,
        employee.IsDeleted);
}
