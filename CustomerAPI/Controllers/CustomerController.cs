using System.Threading.Tasks;
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

    [HttpPost]
    public async Task<IActionResult> AddCustomer([FromBody] CustomerDTO customerDto)
    {
        int customerId = await _service.AddCustomer(customerDto);
        return CreatedAtAction(nameof(GetById), new { id = customerId }, null);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCustomer(int id)
    {
        try
        {
            var customer = await _service.GetById(id);
            _service.DeleteCustomer(customer.CustomerId);
            return NoContent();
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCustomer(int id, [FromBody] CustomerDTO customerDto)
    {
        if (id != customerDto.CustomerId)
        {
            return BadRequest("Customer ID mismatch");
        }
        try
        {
            await _service.GetById(id); // Check if customer exists
            _service.UpdateCustomer(customerDto);
            return NoContent();
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }
}