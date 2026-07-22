namespace AquaCraft.API.Models;

public class Invoice
{
    public int InvoiceId { get; set; }

    public string InvoiceNumber { get; set; } = string.Empty;

    public int CustomerId { get; set; }

    public DateTime InvoiceDate { get; set; }

    public decimal SubTotal { get; set; }

    public decimal GSTAmount { get; set; }

    public decimal GrandTotal { get; set; }

    public string Status { get; set; } = "Generated";

    public DateTime CreatedDate { get; set; }

    public Customer? Customer { get; set; }

    public ICollection<InvoiceItem> InvoiceItems { get; set; }
        = new List<InvoiceItem>();
}