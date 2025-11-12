using CustomerAPI.Models;

namespace CustomerAPI.Repository;

public interface ICustomerRepository
{
    Task<List<Customer>> GetAllCustomers(int start, int size);
    Task<Customer> GetCustomerById(int id);
    Task<int> SaveCustomer(Customer customer);
    void DeleteCustomer(int id);
    void UpdateCustomer(Customer customer);
}