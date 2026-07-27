namespace AquaCraft.API.Models;

public class BusinessSettings
{
    public int BusinessId { get; set; }

    public string BusinessName { get; set; } = string.Empty;

    public string GSTNo { get; set; } = string.Empty;

    public string Phone { get; set; } = string.Empty;

    public string Address { get; set; } = string.Empty;
}