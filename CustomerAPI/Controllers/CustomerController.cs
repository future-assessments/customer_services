using CustomerAPI.DTO;
using Microsoft.AspNetCore.Mvc;

namespace CustomerAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class CustomerController : ControllerBase
{
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var customer = new CustomerDTO
        {
            CustomerId = id,
            FirstName = "Joe",
            LastName = "Green"
        };

        return Ok(customer);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(int offset = 0, int limit = 10)
    {
        List<CustomerDTO> results = new List<CustomerDTO>
        {
            new CustomerDTO
            {
                CustomerId = 1,
                FirstName = "Michelle",
                LastName = "Rose"
            },
            new CustomerDTO
            {
                CustomerId = 2,
                FirstName = "Jennifer",
                LastName = "McDonald"
            }
        };
        return Ok(results);
    }
}