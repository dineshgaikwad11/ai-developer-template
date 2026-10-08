using FluentValidation;

namespace Application.Features.Employees;

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
