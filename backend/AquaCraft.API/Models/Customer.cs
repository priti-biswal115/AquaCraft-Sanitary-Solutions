namespace AquaCraft.API.Models;

public class Customer
{
    public int CustomerId { get; set; }

    public string CustomerName { get; set; } = string.Empty;

    public string Phone { get; set; } = string.Empty;

    public string Address { get; set; } = string.Empty;

    public string GSTNo { get; set; } = string.Empty;

    public ICollection<Invoice> Invoices { get; set; } = new List<Invoice>();

    public ICollection<CustomerPricing> CustomerPricings { get; set; }
        = new List<CustomerPricing>();
}