using Application.DTOs;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using Xunit;

namespace IntegrationTests;

public sealed class EmployeeEndpointsTests
{
    [Fact]
    public async Task GetEmployees_WithoutAuthentication_ReturnsUnauthorized()
    {
        using var factory = new EmployeeApiFactory();
        using var client = factory.CreateClient();

        using var response = await client.GetAsync("/api/employees");

        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
    }

    [Fact]
    public async Task CreateEmployee_WithInvalidInput_ReturnsBadRequest()
    {
        using var factory = new EmployeeApiFactory();
        using var client = CreateAuthenticatedClient(factory);
        var input = new
        {
            firstName = " ",
            lastName = "Morgan",
            email = "invalid-email",
            phoneNumber = "555-0100",
            department = "Engineering",
            salary = 0,
            hireDate = DateTime.UtcNow.Date.AddYears(-1)
        };

        using var response = await client.PostAsJsonAsync("/api/employees", input);

        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }

    [Fact]
    public async Task CreateEmployee_ThenGetEmployees_ReturnsCreatedEmployee()
    {
        using var factory = new EmployeeApiFactory();
        using var client = CreateAuthenticatedClient(factory);
        var input = new CreateEmployeeDto
        {
            FirstName = "Avery",
            LastName = "Morgan",
            Email = "avery.morgan@example.com",
            PhoneNumber = "555-0100",
            Department = "Engineering",
            Salary = 85000m,
            HireDate = DateTime.UtcNow.Date.AddYears(-1)
        };

        using var createResponse = await client.PostAsJsonAsync("/api/employees", input);
        var created = await createResponse.Content.ReadFromJsonAsync<EmployeeDto>();
        using var listResponse = await client.GetAsync("/api/employees");
        var employees = await listResponse.Content.ReadFromJsonAsync<EmployeeDto[]>();

        createResponse.StatusCode.Should().Be(HttpStatusCode.Created);
        created.Should().NotBeNull();
        created!.Id.Should().NotBeEmpty();
        listResponse.StatusCode.Should().Be(HttpStatusCode.OK);
        employees.Should().ContainSingle().Which.Id.Should().Be(created.Id);
    }

    [Fact]
    public async Task CreateEmployee_WhenPersistenceFails_ReturnsSafeServerError()
    {
        using var factory = new EmployeeApiFactory();
        factory.Services.GetRequiredService<EmployeeTestRepository>().ShouldFailWrites = true;
        using var client = CreateAuthenticatedClient(factory);
        var input = new CreateEmployeeDto
        {
            FirstName = "Avery",
            LastName = "Morgan",
            Email = "avery.morgan@example.com",
            PhoneNumber = "555-0100",
            Department = "Engineering",
            Salary = 85000m,
            HireDate = DateTime.UtcNow.Date.AddYears(-1)
        };

        using var response = await client.PostAsJsonAsync("/api/employees", input);
        var body = await response.Content.ReadAsStringAsync();

        response.StatusCode.Should().Be(HttpStatusCode.InternalServerError);
        body.Should().Contain("An unexpected error occurred.");
        body.Should().NotContain("test failure detail");
    }

    private static HttpClient CreateAuthenticatedClient(EmployeeApiFactory factory)
    {
        var client = factory.CreateClient();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
            TestAuthenticationHandler.SchemeName,
            "Test");
        return client;
    }
}