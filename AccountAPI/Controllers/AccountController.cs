using Microsoft.AspNetCore.Mvc;
using AccountAPI.DTOs;

namespace AccountAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class AccountController : ControllerBase
{

    [HttpGet]
    public async Task<IActionResult> GetAllAccounts(int start = 0, int size = 1)
    {
        List<AccountDTO> accounts = new List<AccountDTO>
        {
            new AccountDTO
            {
                AccountId = 1,
                AccountType = AccountType.Savings,
                AccountName = "Special Savings Booster",
                AccountBalance = 2345.76m
            },
            new AccountDTO
            {
                AccountId = 2,
                AccountType = AccountType.Checking,
                AccountName = "Big Spender Checking Accout",
                AccountBalance = 23.98m
            }
        };
        return Ok(accounts);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAccountById(int accountId)
    {
        var account = new AccountDTO
        {
            AccountId = accountId,
            AccountType = AccountType.Savings,
            AccountName = "Special Savings Booster",
            AccountBalance = 2345.76m
        };

        return Ok(account);
    }
}