using AddressAPI.Models;
using AddressAPI.DTO;
using AddressAPI.Repository;

namespace AddressAPI.Services;

public class AddressService(IAddressRepository repository) : IAddressService
{
    private readonly IAddressRepository _repository = repository;
    
    public async Task<AddressDTO> GetAddressAsync(int addressId)
    {
        var address = await _repository.GetAddressById(addressId);
        return new AddressDTO()
        {
            AddressId = address.AddressId,
            Street1 = address.Street1,
            Street2 = address.Street2,
            City = address.City,
            State = address.State,
            Country = address.Country,
            PostalCode = address.PostalCode
        };
    }

    public async Task<IEnumerable<AddressDTO>> GetAddressesAsync(int start, int size)
    {
        List<Address> addresses = await _repository.GetAllAddresses(start, size);
        List<AddressDTO> results = addresses.Select(address => new AddressDTO
        {
            AddressId = address.AddressId,
            Street1 = address.Street1,
            Street2 = address.Street2,
            City = address.City,
            State = address.State,
            Country = address.Country,
            PostalCode = address.PostalCode
        }).ToList();
        return results;
    }

    public async Task<int> CreateAddressAsync(AddressDTO address)
    {
        var addressDb = new Address()
        {
            Street1 = address.Street1,
            Street2 = address.Street2,
            City = address.City,
            State = address.State,
            Country = address.Country,
            PostalCode = address.PostalCode
        };
        await _repository.CreateAddress(addressDb);
        return addressDb.AddressId;
    }

    public async void UpdateAddressAsync(AddressDTO address)
    {
        Address foundAddress = await _repository.GetAddressById(address.AddressId);
        
        if(foundAddress == null)
            throw new KeyNotFoundException($"Address {address.AddressId} not found");
        
        foundAddress.Street1 = address.Street1;
        foundAddress.Street2 = address.Street2;
        foundAddress.City = address.City;
        foundAddress.State = address.State;
        foundAddress.Country = address.Country;
        foundAddress.PostalCode = address.PostalCode;
        
        _repository.UpdateAddress(foundAddress);
    }

    public async Task DeleteAddressAsync(int addressId)
    {
        var foundAddress = await _repository.GetAddressById(addressId);
        if(foundAddress == null)
            throw new KeyNotFoundException($"Address {addressId} not found");
        _repository.DeleteAddressById(addressId);
    }
}