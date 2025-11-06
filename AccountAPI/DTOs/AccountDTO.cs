namespace AccountAPI.DTOs;

public class AccountDTO
{
    public int AccountId { get; set; }
    public AccountType AccountType { get; set; }
    public string AccountName { get; set; } = "";
    public decimal AccountBalance { get; set; } = 0.0m;
}