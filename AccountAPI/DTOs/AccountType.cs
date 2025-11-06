namespace AccountAPI.DTOs;

public class AccountType : Enumeration
{
    public static readonly AccountType Savings = new(1, nameof(Savings));
    public static readonly AccountType Checking = new(1, nameof(Checking));

    public AccountType(int id, string name): base(id, name)
    {
    }
}