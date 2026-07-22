namespace AquaCraft.API.Helpers;

public class GstCalculator
{
    public static decimal CalculateGst(decimal amount, decimal gstRate)
    {
        return Math.Round(amount * gstRate, 2);
    }

    public static decimal CalculateTotalWithGst(decimal subtotal, decimal gstRate)
    {
        var gstAmount = CalculateGst(subtotal, gstRate);
        return Math.Round(subtotal + gstAmount, 2);
    }

    public static (decimal subtotal, decimal gstAmount, decimal total) CalculateInvoiceAmounts(
        decimal subtotal,
        decimal gstRate)
    {
        var gstAmount = CalculateGst(subtotal, gstRate);
        var total = subtotal + gstAmount;
        return (subtotal, gstAmount, total);
    }
}
