using AddressAPI.DTO;
using Microsoft.AspNetCore.Mvc;

namespace AddressAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class AddressController : ControllerBase
{

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAddressById(int id)
    {
        var address = new AddressDTO
        {
            AddressId = id,
            Street1 = "234 Highway Street",
            City = "Busytown",
            PostalCode = "123ABC",
            State = "New York",
            Country = "USA"
        };

        return Ok(address);
    }


}