namespace AquaCraft.API.DTOs;

public class CustomerDto
{
    public int CustomerId { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string GSTNo { get; set; } = string.Empty;
}
