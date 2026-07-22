namespace AquaCraft.API.Models;

public class CustomerPricing
{
    public int PricingId { get; set; }

    public int CustomerId { get; set; }

    public int ProductId { get; set; }

    public decimal Rate { get; set; }

    public Customer? Customer { get; set; }

    public Product? Product { get; set; }
}
