namespace AquaCraft.API.DTOs;

public class CustomerPricingDto
{
    public int PricingId { get; set; }
    public int CustomerId { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public int ProductId { get; set; }
    public string ProductName { get; set; } = string.Empty;
    public decimal Rate { get; set; }
}
