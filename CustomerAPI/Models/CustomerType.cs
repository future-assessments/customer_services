using System.ComponentModel.DataAnnotations.Schema;

namespace CustomerAPI.Models;

[Table("customer_type")]
public class CustomerType
{
    [Column("customer_type_id")]
    public int CustomerTypeId;
    [Column("type_of_customer")]
    public string CustomerTypeString { get; set; } = null!;

}