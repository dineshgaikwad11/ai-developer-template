namespace Domain.Common;

public abstract class AuditableEntity
{
    public Guid Id { get; protected set; } = Guid.NewGuid();
    public DateTimeOffset CreatedAt { get; private set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? UpdatedAt { get; private set; }
    public DateTimeOffset? DeletedAt { get; private set; }

    public void MarkUpdated(DateTimeOffset now) => UpdatedAt = now;

    public void SoftDelete(DateTimeOffset now) => DeletedAt ??= now;
}
