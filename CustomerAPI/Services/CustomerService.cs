using CustomerAPI.DTO;

namespace CustomerAPI.Services;

public class CustomerService : ICustomerService
{

    public async Task<CustomerDTO> GetById(int id)
    {
        var customer = new CustomerDTO
        {
            CustomerId = id,
            FirstName = "Joe",
            LastName = "Green"
        };

        return customer;
    }

    public async Task<List<CustomerDTO>> GetAll(int offset = 0, int limit = 10)
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
        return results;
    }
}