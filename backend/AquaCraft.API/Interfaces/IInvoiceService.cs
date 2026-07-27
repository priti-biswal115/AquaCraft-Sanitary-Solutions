using AquaCraft.API.DTOs;

namespace AquaCraft.API.Interfaces;

public interface IInvoiceService
{
    Task<IEnumerable<InvoiceDto>> GetAllInvoicesAsync();
    Task<InvoiceDto?> GetInvoiceByIdAsync(int id);
    Task<InvoiceDto?> GetInvoiceByNumberAsync(string invoiceNumber);
    Task<IEnumerable<InvoiceDto>> GetCustomerInvoicesAsync(int customerId);
    Task<InvoiceDto> CreateInvoiceAsync(InvoiceDto invoiceDto);
    Task<InvoiceResponseDto> SaveInvoiceAsync(CreateInvoiceDto dto);
    Task<InvoiceDto?> UpdateInvoiceAsync(int id, InvoiceDto invoiceDto);
    Task<bool> DeleteInvoiceAsync(int id);
}
