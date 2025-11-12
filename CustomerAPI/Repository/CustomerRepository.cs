using CustomerAPI.Models;
using CustomerAPI.Database;
using Microsoft.EntityFrameworkCore;

namespace CustomerAPI.Repository;

public class CustomerRepository(AppDbContext context) : ICustomerRepository
{
    private readonly AppDbContext _context = context;

    public async Task<List<Customer>> GetAllCustomers(int start, int size)
    {
        var customers = await _context.Customers
            .OrderBy(c => c.CustomerId)
            .Skip(start)
            .Take(size)
            .ToListAsync();
        return customers;
    }

    public async Task<Customer> GetCustomerById(int id)
    {
        var customer = await _context.Customers
            .FirstOrDefaultAsync(c => c.CustomerId == id);

        return customer ?? throw new KeyNotFoundException($"Customer {id} not found");
    }

    public async Task<int> SaveCustomer(Customer customer)
    {
        await _context.Customers.AddAsync(customer);
        await _context.SaveChangesAsync();
        return customer.CustomerId;
    }

    public void DeleteCustomer(int id)
    {
        var customer = _context.Customers.FirstOrDefault(c => c.CustomerId == id);
        if (customer != null)
        {
            _context.Customers.Remove(customer);
            _context.SaveChanges();
        }
    }

    public void UpdateCustomer(Customer customer)
    {
        _context.Customers.Update(customer);
        _context.SaveChanges();
    }
}