namespace AquaCraft.API.DTOs;

public class InvoiceDto
{
    public int InvoiceId { get; set; }
    public string InvoiceNumber { get; set; } = string.Empty;
    public int CustomerId { get; set; }
    public DateTime InvoiceDate { get; set; }
    public decimal SubTotal { get; set; }
    public decimal GSTAmount { get; set; }
    public decimal GrandTotal { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedDate { get; set; }
    public List<InvoiceItemDto> InvoiceItems { get; set; } = new List<InvoiceItemDto>();
}

public class InvoiceItemDto
{
    public int InvoiceItemId { get; set; }
    public int InvoiceId { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public decimal Rate { get; set; }
    public decimal Amount { get; set; }
}
