using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public sealed class EmployeeConfiguration : IEntityTypeConfiguration<Employee>
{
    public void Configure(EntityTypeBuilder<Employee> builder)
    {
        builder.ToTable("Employees");
        builder.HasKey(employee => employee.Id);

        builder.Property(employee => employee.FirstName).IsRequired().HasMaxLength(100);
        builder.Property(employee => employee.LastName).IsRequired().HasMaxLength(100);
        builder.Property(employee => employee.Email).IsRequired().HasMaxLength(254);
        builder.Property(employee => employee.PhoneNumber).IsRequired().HasMaxLength(32);
        builder.Property(employee => employee.Department).IsRequired().HasMaxLength(100);
        builder.Property(employee => employee.Salary).HasPrecision(18, 2);
        builder.Property(employee => employee.HireDate).HasColumnType("date");
        builder.Property(employee => employee.CreatedAt).IsRequired().HasColumnType("datetime2");
        builder.Property(employee => employee.IsDeleted).IsRequired().HasDefaultValue(false);
        builder.HasIndex(employee => employee.Email).HasDatabaseName("IX_Employees_Email");
        builder.HasQueryFilter(employee => !employee.IsDeleted);
    }
}