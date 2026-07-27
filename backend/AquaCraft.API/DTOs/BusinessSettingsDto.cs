namespace AquaCraft.API.DTOs;

public class BusinessSettingsDto
{
    public int BusinessId { get; set; }

    public string BusinessName { get; set; } = string.Empty;

    public string GSTNo { get; set; } = string.Empty;

    public string Phone { get; set; } = string.Empty;

    public string Address { get; set; } = string.Empty;
}