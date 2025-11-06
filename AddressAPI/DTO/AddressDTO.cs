namespace AddressAPI.DTO;

public class AddressDTO
{
    public int AddressId { get; set; }
    public string Street1 { get; set; } = null!;
    public string Street2 { get; set; } = null!;
    public string City { get; set; } = null!;
    public string State { get; set; } = null!;
    public string PostalCode { get; set; } = null!;
    public string Country { get; set; } = null!;
}