namespace AquaCraft.API.DTOs;

public class ProductDto
{
    public int ProductId { get; set; }
    public string ProductType { get; set; } = string.Empty;
    public string ProductName { get; set; } = string.Empty;
    public string HSNCode { get; set; } = string.Empty;
}
