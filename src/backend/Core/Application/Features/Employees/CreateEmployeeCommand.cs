using Application.DTOs;
using Domain.Entities;
using FluentValidation;
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

public sealed class CreateEmployeeCommandValidator : AbstractValidator<CreateEmployeeCommand>
{
    public CreateEmployeeCommandValidator()
    {
        RuleFor(command => command.FirstName)
            .Cascade(CascadeMode.Stop)
            .Must(value => !string.IsNullOrWhiteSpace(value)).WithMessage("First name is required.")
            .MaximumLength(100);
        RuleFor(command => command.LastName)
            .Cascade(CascadeMode.Stop)
            .Must(value => !string.IsNullOrWhiteSpace(value)).WithMessage("Last name is required.")
            .MaximumLength(100);
        RuleFor(command => command.Email)
            .Cascade(CascadeMode.Stop)
            .Must(value => !string.IsNullOrWhiteSpace(value)).WithMessage("Email is required.")
            .EmailAddress()
            .MaximumLength(254);
        RuleFor(command => command.PhoneNumber)
            .Cascade(CascadeMode.Stop)
            .Must(value => !string.IsNullOrWhiteSpace(value)).WithMessage("Phone number is required.")
            .MaximumLength(32);
        RuleFor(command => command.Department)
            .Cascade(CascadeMode.Stop)
            .Must(value => !string.IsNullOrWhiteSpace(value)).WithMessage("Department is required.")
            .MaximumLength(100);
        RuleFor(command => command.Salary)
            .GreaterThan(0)
            .LessThanOrEqualTo(9999999999999999.99m);
        RuleFor(command => command.HireDate)
            .Must(hireDate => hireDate != default && hireDate.Date <= DateTime.UtcNow.Date)
            .WithMessage("Hire date must be a valid date that is not in the future.");
    }
}

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

public sealed record GetEmployeesQuery : IRequest<IReadOnlyList<EmployeeDto>>;

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