namespace AquaCraft.API.DTOs;

public class InvoiceItemDto
{
    public int ProductId { get; set; }

    public string ProductName { get; set; } = string.Empty;

    public int Quantity { get; set; }

    public decimal Rate { get; set; }

    public decimal Amount { get; set; }
}