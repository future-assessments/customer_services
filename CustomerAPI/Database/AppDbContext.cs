using Microsoft.EntityFrameworkCore;
using CustomerAPI.Models;
namespace CustomerAPI.Database;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder
        .UseNpgsql()
        .UseSeeding((context, _) =>
        {
            var customer = new Customer
            {
                FirstName = "Joe",
                LastName = "Green"
            };
            context.Set<Customer>().Add(customer);

            var customer2 = new Customer
            {
                FirstName = "Mary",
                LastName = "Brown"
            };
            context.Set<Customer>().Add(customer2);

            context.SaveChanges();
        });
    }
    
    public DbSet<Customer> Customers { get; set; }
}
