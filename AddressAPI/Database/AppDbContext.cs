using Microsoft.EntityFrameworkCore;
using AddressAPI.Models;

namespace AddressAPI.Database;

public class AppDbContext : DbContext
{

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
        optionsBuilder
            .UseNpgsql()
            .UseSeeding((context, _) =>
            {
                var address1 = new Address
                {
                    Street1 = "45 Jones Avenue",
                    City = "London",
                    State = "London Borough",
                    PostalCode = "EC1A 1AE",
                    Country = "United Kingdom"
                };
                
                context.Set<Address>().Add(address1);

                var address2 = new Address
                {
                    Street1 = "120 Park Avenue",
                    City = "New York",
                    State = "New York State",
                    PostalCode = "NY1 1AA",
                    Country = "United States"
                };
                context.Set<Address>().Add(address2);
                context.SaveChanges();
            });
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        
    }
    
    public DbSet<Address> Addresses { get; set; }
}