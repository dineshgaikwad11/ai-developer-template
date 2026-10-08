using Application;
using Domain.Entities;
using FluentAssertions;
using Xunit;

namespace UnitTests;

public sealed class ArchitectureDependencyTests
{
    private static readonly string[] FrameworkPrefixes =
    [
        "Microsoft.EntityFrameworkCore",
        "Microsoft.AspNetCore",
        "Npgsql",
        "Serilog"
    ];

    private static IEnumerable<string> ReferencedNames(Type anchor) =>
        anchor.Assembly.GetReferencedAssemblies().Select(reference => reference.Name ?? string.Empty);

    [Fact]
    public void Domain_DoesNotReferenceOtherLayersOrFrameworks()
    {
        var references = ReferencedNames(typeof(Employee)).ToArray();

        references.Should().NotContain("Application");
        references.Should().NotContain("Infrastructure");
        references.Should().NotContain("API");
        references.Should().NotContain(name => FrameworkPrefixes.Any(name.StartsWith));
    }

    [Fact]
    public void Application_DoesNotReferenceInfrastructureApiOrPersistenceFrameworks()
    {
        var references = ReferencedNames(typeof(DependencyInjection)).ToArray();

        references.Should().NotContain("Infrastructure");
        references.Should().NotContain("API");
        references.Should().NotContain(name => FrameworkPrefixes.Any(name.StartsWith));
    }
}
