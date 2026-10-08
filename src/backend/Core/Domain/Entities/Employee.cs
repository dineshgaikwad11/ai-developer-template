namespace Domain.Entities;

public sealed class Employee
{
    private Employee()
    {
    }

    public Employee(
        string firstName,
        string lastName,
        string email,
        string phoneNumber,
        string department,
        decimal salary,
        DateTime hireDate)
    {
        Id = Guid.NewGuid();
        FirstName = firstName;
        LastName = lastName;
        Email = email;
        PhoneNumber = phoneNumber;
        Department = department;
        Salary = salary;
        HireDate = hireDate;
        CreatedAt = DateTime.UtcNow;
    }

    public Guid Id { get; private set; }
    public string FirstName { get; private set; } = string.Empty;
    public string LastName { get; private set; } = string.Empty;
    public string Email { get; private set; } = string.Empty;
    public string PhoneNumber { get; private set; } = string.Empty;
    public string Department { get; private set; } = string.Empty;
    public decimal Salary { get; private set; }
    public DateTime HireDate { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public bool IsDeleted { get; private set; }

    public void SoftDelete() => IsDeleted = true;
}