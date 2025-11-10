using CustomerAPI.DTO;
using CustomerAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace CustomerAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class CustomerController(ICustomerService service) : ControllerBase
{
    private readonly ICustomerService _service = service;

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var customer = await _service.GetById(id);
        return Ok(customer);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(int offset = 0, int limit = 10)
    {
        List<CustomerDTO> results = await _service.GetAll(offset, limit);
        return Ok(results);
    }
}