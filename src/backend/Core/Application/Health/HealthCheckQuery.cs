using MediatR;

namespace Application.Health;

public sealed record HealthCheckQuery : IRequest<HealthCheckResponse>;

public sealed record HealthCheckResponse(string Status, DateTimeOffset CheckedAt);

public sealed class HealthCheckQueryHandler : IRequestHandler<HealthCheckQuery, HealthCheckResponse>
{
    public Task<HealthCheckResponse> Handle(HealthCheckQuery request, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();
        return Task.FromResult(new HealthCheckResponse("Healthy", DateTimeOffset.UtcNow));
    }
}
