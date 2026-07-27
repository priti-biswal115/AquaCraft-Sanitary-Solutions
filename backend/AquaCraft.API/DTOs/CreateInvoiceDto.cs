namespace AquaCraft.API.DTOs;

public class CreateInvoiceDto
{
    public int CustomerId { get; set; }
    public decimal SubTotal { get; set; }
    public decimal GSTAmount { get; set; }
    public decimal GrandTotal { get; set; }
    public List<InvoiceItemDto> Items { get; set; } = new List<InvoiceItemDto>();
}
