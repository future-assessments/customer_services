using CustomerAPI.DTO;

namespace CustomerAPI.Services;

public interface ICustomerService
{
    Task<CustomerDTO> GetById(int id);
    Task<List<CustomerDTO>> GetAll(int offset = 0, int limit = 10);
}
