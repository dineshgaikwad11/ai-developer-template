namespace Application.DTOs;

public sealed record EmployeeDto(
    Guid Id,
    string FirstName,
    string LastName,
    string Email,
    string PhoneNumber,
    string Department,
    decimal Salary,
    DateTime HireDate,
    DateTime CreatedAt,
    bool IsDeleted);