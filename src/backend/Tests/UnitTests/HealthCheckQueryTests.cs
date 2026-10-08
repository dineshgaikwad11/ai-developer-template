using Application.Health;
using FluentAssertions;
using Xunit;

namespace UnitTests;

public sealed class HealthCheckQueryTests
{
    [Fact]
    public async Task Handle_ReturnsHealthyStatus()
    {
        var handler = new HealthCheckQueryHandler();

        var result = await handler.Handle(new HealthCheckQuery(), CancellationToken.None);

        result.Status.Should().Be("Healthy");
        result.CheckedAt.Should().BeCloseTo(DateTimeOffset.UtcNow, TimeSpan.FromSeconds(2));
    }
}
