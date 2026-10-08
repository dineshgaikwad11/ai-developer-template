using Application.DTOs;
using Application.Features.Employees;
using Domain.Entities;
using FluentAssertions;
using FluentValidation.TestHelper;
using Moq;
using Xunit;

namespace UnitTests;

public sealed class CreateEmployeeCommandTests
{
    private static CreateEmployeeCommand ValidCommand() => new(
        "Avery",
        "Morgan",
        "avery.morgan@example.com",
        "555-0100",
        "Engineering",
        85000m,
        DateTime.UtcNow.Date.AddYears(-1));

    [Fact]
    public void Validator_RejectsWhitespaceRequiredFieldsInvalidEmailSalaryAndFutureHireDate()
    {
        var validator = new CreateEmployeeCommandValidator();
        var command = ValidCommand() with
        {
            FirstName = " ",
            LastName = " ",
            Email = "not-an-email",
            PhoneNumber = " ",
            Department = " ",
            Salary = 0,
            HireDate = DateTime.UtcNow.Date.AddDays(1)
        };

        var result = validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(request => request.FirstName);
        result.ShouldHaveValidationErrorFor(request => request.LastName);
        result.ShouldHaveValidationErrorFor(request => request.Email);
        result.ShouldHaveValidationErrorFor(request => request.PhoneNumber);
        result.ShouldHaveValidationErrorFor(request => request.Department);
        result.ShouldHaveValidationErrorFor(request => request.Salary);
        result.ShouldHaveValidationErrorFor(request => request.HireDate);
    }

    [Fact]
    public async Task Handler_PersistsEmployeeAndReturnsDto()
    {
        Employee? savedEmployee = null;
        var repository = new Mock<IEmployeeRepository>();
        repository
            .Setup(store => store.AddAsync(It.IsAny<Employee>(), It.IsAny<CancellationToken>()))
            .Callback<Employee, CancellationToken>((employee, _) => savedEmployee = employee)
            .Returns(Task.CompletedTask);
        var handler = new CreateEmployeeCommandHandler(repository.Object);

        var result = await handler.Handle(ValidCommand(), CancellationToken.None);

        savedEmployee.Should().NotBeNull();
        result.Id.Should().Be(savedEmployee!.Id);
        result.Email.Should().Be("avery.morgan@example.com");
        result.CreatedAt.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(2));
        result.IsDeleted.Should().BeFalse();
        repository.Verify(store => store.AddAsync(savedEmployee, It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task QueryHandler_MapsActiveEmployeesToDtos()
    {
        var employee = new Employee(
            "Avery",
            "Morgan",
            "avery.morgan@example.com",
            "555-0100",
            "Engineering",
            85000m,
            DateTime.UtcNow.Date.AddYears(-1));
        var repository = new Mock<IEmployeeRepository>();
        repository
            .Setup(store => store.GetActiveEmployeesAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(new[] { employee });
        var handler = new GetEmployeesQueryHandler(repository.Object);

        var result = await handler.Handle(new GetEmployeesQuery(), CancellationToken.None);

        result.Should().ContainSingle().Which.Id.Should().Be(employee.Id);
        result[0].IsDeleted.Should().BeFalse();
    }
}