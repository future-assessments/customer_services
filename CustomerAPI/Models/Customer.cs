using System.ComponentModel.DataAnnotations.Schema;

namespace CustomerAPI.Models;

[Table("customer")]
public class Customer
{
    [Column("customer_id")]
    public int CustomerId { get; set; }
    
    [Column("customer_firstname")]
    public string FirstName { get; set; } = null!;
    
    [Column("customer_lastname")]
    public string LastName { get; set; } = null!;
}