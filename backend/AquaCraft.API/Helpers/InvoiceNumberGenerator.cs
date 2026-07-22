namespace AquaCraft.API.Helpers;

public class InvoiceNumberGenerator
{
    public static string GenerateInvoiceNumber(string prefix, int nextNumber)
    {
        return $"{prefix}-{nextNumber:D6}";
    }

    public static string GenerateInvoiceNumber(string prefix, int nextNumber, DateTime date)
    {
        return $"{prefix}-{date:yyyyMM}-{nextNumber:D4}";
    }
}
