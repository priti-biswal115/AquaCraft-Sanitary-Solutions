using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using AquaCraft.API.DTOs;
using System.IO;

namespace AquaCraft.API.Services;

public class PdfService
{
    public byte[] GenerateInvoicePdf(
        InvoiceDto invoice,
        BusinessSettingsDto business)
    {
        return Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Margin(30);

                var logoPath = Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "wwwroot",
                    "images",
                    "logo.png");

                var signaturePath = Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "wwwroot",
                    "images",
                    "signature.png");

                var logoBytes = File.Exists(logoPath)
                    ? File.ReadAllBytes(logoPath)
                    : null;

                var signatureBytes = File.Exists(signaturePath)
                    ? File.ReadAllBytes(signaturePath)
                    : null;

                page.Content().Column(column =>
                {
                    if (logoBytes != null)
                    {
                        column.Item()
                            .AlignCenter()
                            .Width(150)
                            .Image(logoBytes);
                    }

                    column.Item()
                        .AlignCenter()
                        .Text(business.BusinessName)
                        .FontSize(24)
                        .Bold();

                    column.Item()
                        .AlignCenter()
                        .Text(business.Address);

                    column.Item()
                        .AlignCenter()
                        .Text($"GST No : {business.GSTNo}");

                    column.Item()
                        .AlignCenter()
                        .Text($"Phone : {business.Phone}");

                    column.Item().PaddingTop(20);

                    column.Item().Text(
                        $"Invoice Number : {invoice.InvoiceNumber}");

                    column.Item().Text(
                        $"Date : {invoice.InvoiceDate:dd-MM-yyyy}");

                    column.Item().PaddingTop(15);

                    column.Item()
                        .Text("Customer Details")
                        .Bold()
                        .FontSize(14);

                    column.Item().Row(row =>
                    {
                        row.RelativeItem()
                            .Text(invoice.CustomerName);

                        row.ConstantItem(150)
                            .AlignRight()
                            .Text(invoice.CustomerPhone ?? "");
                    });

                    column.Item().Row(row =>
                    {
                        row.RelativeItem()
                            .Text(invoice.CustomerAddress ?? "");

                        row.ConstantItem(150)
                            .AlignRight()
                            .Text(invoice.CustomerGST ?? "");
                    });

                    column.Item().PaddingTop(20);

                    column.Item().Table(table =>
                    {
                        table.ColumnsDefinition(columns =>
                        {
                            columns.RelativeColumn(4);
                            columns.RelativeColumn(1);
                            columns.RelativeColumn(2);
                            columns.RelativeColumn(2);
                        });

                        table.Header(header =>
                        {
                            header.Cell()
                                .Background("#1976D2")
                                .Padding(5)
                                .Text("Product")
                                .FontColor(Colors.White)
                                .Bold();

                            header.Cell()
                                .Background("#1976D2")
                                .Padding(5)
                                .Text("Qty")
                                .FontColor(Colors.White)
                                .Bold();

                            header.Cell()
                                .Background("#1976D2")
                                .Padding(5)
                                .Text("Rate")
                                .FontColor(Colors.White)
                                .Bold();

                            header.Cell()
                                .Background("#1976D2")
                                .Padding(5)
                                .Text("Amount")
                                .FontColor(Colors.White)
                                .Bold();
                        });

                        foreach (var item in invoice.InvoiceItems)
                        {
                            table.Cell().Text(
                                item.ProductName);

                            table.Cell().Text(
                                item.Quantity.ToString());

                            table.Cell().Text(
                                item.Rate.ToString("0.00"));

                            table.Cell().Text(
                                item.Amount.ToString("0.00"));
                        }
                    });

                    column.Item().PaddingTop(20);

                    column.Item()
                        .AlignRight()
                        .Text($"Sub Total : ₹{invoice.SubTotal}");

                    column.Item()
                        .AlignRight()
                        .Text($"GST (5%) : ₹{invoice.GSTAmount}");

                    column.Item()
                        .AlignRight()
                        .Text($"Grand Total : ₹{invoice.GrandTotal}")
                        .Bold()
                        .FontSize(18);

                    column.Item().PaddingTop(40);

                    if (signatureBytes != null)
                    {
                        column.Item()
                            .AlignRight()
                            .Width(100)
                            .Image(signatureBytes);
                    }

                    column.Item()
                        .AlignRight()
                        .Text(business.BusinessName)
                        .Bold();
                });
            });
        }).GeneratePdf();
    }
}