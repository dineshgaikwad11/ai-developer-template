using Microsoft.AspNetCore.Mvc.Testing;
using FluentAssertions;
using System.Net;
using Xunit;

namespace IntegrationTests;

public sealed class HealthEndpointTests(WebApplicationFactory<Program> factory)
    : IClassFixture<WebApplicationFactory<Program>>
{
    [Fact]
    public async Task GetHealth_ReturnsHealthyResponse()
    {
        using var client = factory.CreateClient();

        using var response = await client.GetAsync("/api/v1/health");
        var body = await response.Content.ReadAsStringAsync();

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        body.Should().Contain("Healthy");
    }
}
