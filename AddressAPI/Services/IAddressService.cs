using AddressAPI.DTO;

namespace AddressAPI.Services;

public interface IAddressService
{
    Task<AddressDTO> GetAddressAsync(int addressId);
    Task<IEnumerable<AddressDTO>> GetAddressesAsync(int start, int size);
    Task<int> CreateAddressAsync(AddressDTO address);
    void UpdateAddressAsync(AddressDTO address);
    Task DeleteAddressAsync(int addressId);
    
}