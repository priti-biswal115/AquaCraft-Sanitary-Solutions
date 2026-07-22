using AquaCraft.API.DTOs;
using AquaCraft.API.Interfaces;
using AquaCraft.API.Models;
using AquaCraft.API.Repositories;

namespace AquaCraft.API.Services;

public class InvoiceService : IInvoiceService
{
    private readonly InvoiceRepository _invoiceRepository;

    public InvoiceService(InvoiceRepository invoiceRepository)
    {
        _invoiceRepository = invoiceRepository;
    }

    public async Task<IEnumerable<InvoiceDto>> GetAllInvoicesAsync()
    {
        var invoices = await _invoiceRepository.GetAllAsync();
        return invoices.Select(i => MapToDto(i));
    }

    public async Task<InvoiceDto?> GetInvoiceByIdAsync(int id)
    {
        var invoice = await _invoiceRepository.GetByIdAsync(id);
        return invoice == null ? null : MapToDto(invoice);
    }

    public async Task<InvoiceDto?> GetInvoiceByNumberAsync(string invoiceNumber)
    {
        var invoice = await _invoiceRepository.GetByInvoiceNumberAsync(invoiceNumber);
        return invoice == null ? null : MapToDto(invoice);
    }

    public async Task<IEnumerable<InvoiceDto>> GetCustomerInvoicesAsync(int customerId)
    {
        var invoices = await _invoiceRepository.GetByCustomerIdAsync(customerId);
        return invoices.Select(i => MapToDto(i));
    }

    public async Task<InvoiceDto> CreateInvoiceAsync(InvoiceDto invoiceDto)
    {
        var invoice = MapToEntity(invoiceDto);

        invoice.InvoiceNumber = GenerateInvoiceNumber();

        invoice.CreatedDate = DateTime.Now;

        var createdInvoice = await _invoiceRepository.AddAsync(invoice);

        return MapToDto(createdInvoice);
    }

    public async Task<InvoiceDto?> UpdateInvoiceAsync(int id, InvoiceDto invoiceDto)
    {
        var invoice = await _invoiceRepository.GetByIdAsync(id);

        if (invoice == null)
            return null;

        invoice.Status = invoiceDto.Status;

        var updatedInvoice = await _invoiceRepository.UpdateAsync(invoice);

        return MapToDto(updatedInvoice);
    }

    public async Task<bool> DeleteInvoiceAsync(int id)
    {
        return await _invoiceRepository.DeleteAsync(id);
    }

    private string GenerateInvoiceNumber()
    {
        var year = DateTime.Now.Year;

        var random = new Random();

        var sequence = random.Next(1000, 9999);

        return $"ACS-{year}-{sequence}";
    }

    private InvoiceDto MapToDto(Invoice invoice)
    {
        return new InvoiceDto
        {
            InvoiceId = invoice.InvoiceId,
            InvoiceNumber = invoice.InvoiceNumber,
            CustomerId = invoice.CustomerId,
            InvoiceDate = invoice.InvoiceDate,
            SubTotal = invoice.SubTotal,
            GSTAmount = invoice.GSTAmount,
            GrandTotal = invoice.GrandTotal,
            Status = invoice.Status,
            CreatedDate = invoice.CreatedDate,

            InvoiceItems = invoice.InvoiceItems.Select(ii => new InvoiceItemDto
            {
                InvoiceItemId = ii.InvoiceItemId,
                InvoiceId = ii.InvoiceId,
                ProductId = ii.ProductId,
                Quantity = ii.Quantity,
                Rate = ii.Rate,
                Amount = ii.Amount
            }).ToList()
        };
    }

    private Invoice MapToEntity(InvoiceDto invoiceDto)
    {
        return new Invoice
        {
            CustomerId = invoiceDto.CustomerId,
            InvoiceDate = invoiceDto.InvoiceDate,
            SubTotal = invoiceDto.SubTotal,
            GSTAmount = invoiceDto.GSTAmount,
            GrandTotal = invoiceDto.GrandTotal,
            Status = invoiceDto.Status,
            CreatedDate = invoiceDto.CreatedDate,

            InvoiceItems = invoiceDto.InvoiceItems.Select(ii => new InvoiceItem
            {
                ProductId = ii.ProductId,
                Quantity = ii.Quantity,
                Rate = ii.Rate,
                Amount = ii.Amount
            }).ToList()
        };
    }
}