namespace AquaCraft.API.Models;

public class Product
{
    public int ProductId { get; set; }

    public string ProductType { get; set; } = string.Empty;

    public string ProductName { get; set; } = string.Empty;

    public string HSNCode { get; set; } = string.Empty;

    public ICollection<CustomerPricing> CustomerPricings { get; set; }
        = new List<CustomerPricing>();

    public ICollection<InvoiceItem> InvoiceItems { get; set; } = new List<InvoiceItem>();
}