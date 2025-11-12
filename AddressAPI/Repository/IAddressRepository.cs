using AddressAPI.DTO;
using AddressAPI.Models;

namespace AddressAPI.Repository;

public interface IAddressRepository
{
    Task<Address> GetAddressById(int id);
    Task<List<Address>> GetAllAddresses(int start, int size);
    Task<int> CreateAddress(Address address);
    void UpdateAddress(Address address);
    void DeleteAddressById(int id);
}