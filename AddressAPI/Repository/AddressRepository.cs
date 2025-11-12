using AddressAPI.Database;
using AddressAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AddressAPI.Repository;

public class AddressRepository(AppDbContext context) : IAddressRepository
{
    private readonly AppDbContext _context = context;
    
    public async Task<Address> GetAddressById(int id)
    {
        var address = await _context.Addresses.FirstOrDefaultAsync(c => c.AddressId == id);
        return address ?? throw new KeyNotFoundException($"Address {id} not found");
    }

    public async Task<IEnumerable<Address>> GetAllAddresses(int start, int size)
    {
        var addresses = await _context.Addresses
            .OrderBy(a => a.AddressId)
            .Skip(start)
            .Take(size)
            .ToListAsync<Address>();
        return addresses;
    }

    public async Task<int> CreateAddress(Address address)
    {
        await _context.Addresses.AddAsync(address);
        await _context.SaveChangesAsync();
        return address.AddressId;
    }

    public void UpdateAddress(Address address)
    {
        var foundAddress = _context.Addresses.First(c => c.AddressId == address.AddressId);
        if(foundAddress == null)
            throw new KeyNotFoundException($"Address {address.AddressId} not found");
        
        _context.Addresses.Update(address);
        _context.SaveChanges();
    }

    public void DeleteAddressById(int id)
    {
        var address = _context.Addresses.FirstOrDefault(c => c.AddressId == id);
        if (address != null)
        {
            _context.Addresses.Remove(address);
            _context.SaveChanges();
        }
        else
        {
            throw new KeyNotFoundException($"Unable to find address with key {id}");
        }
    }
}