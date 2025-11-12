using CustomerAPI.DTO;
using CustomerAPI.Models;
using CustomerAPI.Repository;

namespace CustomerAPI.Services;

public class CustomerService(ICustomerRepository repository) : ICustomerService
{
    private readonly ICustomerRepository _repository = repository;

    public async Task<CustomerDTO> GetById(int id)
    {
        var customer = await _repository.GetCustomerById(id);
        var customerDto = new CustomerDTO
        {
            CustomerId = customer.CustomerId,
            FirstName = customer.FirstName,
            LastName = customer.LastName
        };

        return customerDto;
    }

    public async Task<List<CustomerDTO>> GetAll(int offset = 0, int limit = 10)
    {
        List<Customer> customers = await _repository.GetAllCustomers(offset, limit);
        List<CustomerDTO> customerDtos = customers.Select(c => new CustomerDTO
        {
            CustomerId = c.CustomerId,
            FirstName = c.FirstName,
            LastName = c.LastName
        }).ToList();

        return customerDtos;
    }

    public async Task<int> AddCustomer(CustomerDTO customerDto)
    {
        var customer = new Customer
        {
            FirstName = customerDto.FirstName,
            LastName = customerDto.LastName
        };

        return await _repository.SaveCustomer(customer);
    }

    public void DeleteCustomer(int id)
    {
        var customer = _repository.GetCustomerById(id);
        if (customer == null)
        {
            throw new KeyNotFoundException($"Customer {id} not found");
        }
        _repository.DeleteCustomer(id);
    }
    
    public void UpdateCustomer(CustomerDTO customerDto)
    {
        var customer = new Customer
        {
            CustomerId = customerDto.CustomerId,
            FirstName = customerDto.FirstName,
            LastName = customerDto.LastName
        };

        _repository.UpdateCustomer(customer);
    }
}