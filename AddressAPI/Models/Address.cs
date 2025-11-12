using System.ComponentModel.DataAnnotations.Schema;

namespace AddressAPI.Models;

[Table("address")]
public class Address
{
    [Column("address_id")]
    public int AddressId { get; set; }
    
    [Column("street_1")]
    public string Street1 { get; set; } = null!;

    [Column("street_2")]
    public string Street2 { get; set; } = null!;
    
    [Column("city")]
    public string City { get; set; } = null!;
    
    [Column("state")]
    public string State { get; set; } = null!;
    
    [Column("postal_code")]
    public string PostalCode { get; set; } = null!;
    
    [Column("country")]
    public string Country { get; set; } = null!;

}