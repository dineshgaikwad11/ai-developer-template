using System.ComponentModel.DataAnnotations;

namespace Application.DTOs;

public sealed class CreateEmployeeDto
{
    [Required, StringLength(100, MinimumLength = 1)]
    public string FirstName { get; init; } = string.Empty;

    [Required, StringLength(100, MinimumLength = 1)]
    public string LastName { get; init; } = string.Empty;

    [Required, EmailAddress, StringLength(254)]
    public string Email { get; init; } = string.Empty;

    [Required, StringLength(32, MinimumLength = 1)]
    public string PhoneNumber { get; init; } = string.Empty;

    [Required, StringLength(100, MinimumLength = 1)]
    public string Department { get; init; } = string.Empty;

    [Range(typeof(decimal), "0.01", "9999999999999999.99")]
    public decimal Salary { get; init; }

    [Required, DataType(DataType.Date)]
    public DateTime HireDate { get; init; }
}