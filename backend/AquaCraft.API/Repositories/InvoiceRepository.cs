using AquaCraft.API.Data;
using AquaCraft.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AquaCraft.API.Repositories;

public class InvoiceRepository
{
    private readonly ApplicationDbContext _context;

    public InvoiceRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Invoice?> GetByIdAsync(int id)
    {
        return await _context.Invoices
            .Include(i => i.Customer)
            .Include(i => i.InvoiceItems)
                .ThenInclude(ii => ii.Product)
            .FirstOrDefaultAsync(i => i.InvoiceId == id);
    }

    public async Task<IEnumerable<Invoice>> GetAllAsync()
    {
        return await _context.Invoices
            .Include(i => i.Customer)
            .Include(i => i.InvoiceItems)
            .ToListAsync();
    }

    public async Task<Invoice?> GetByInvoiceNumberAsync(string invoiceNumber)
    {
        return await _context.Invoices
            .AsNoTracking()
            .Include(i => i.InvoiceItems)
            .FirstOrDefaultAsync(i => i.InvoiceNumber == invoiceNumber);
    }

    public async Task<IEnumerable<Invoice>> GetByCustomerIdAsync(int customerId)
    {
        return await _context.Invoices
            .AsNoTracking()
            .Include(i => i.InvoiceItems)
            .Where(i => i.CustomerId == customerId)
            .ToListAsync();
    }

    public async Task<Invoice> AddAsync(Invoice invoice)
    {
        _context.Invoices.Add(invoice);
        await _context.SaveChangesAsync();
        return invoice;
    }

    public async Task<Invoice?> UpdateAsync(Invoice invoice)
    {
        _context.Invoices.Update(invoice);
        await _context.SaveChangesAsync();
        return invoice;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var invoice = await _context.Invoices
            .Include(i => i.InvoiceItems)
            .FirstOrDefaultAsync(i => i.InvoiceId == id);

        if (invoice == null)
            return false;

        _context.InvoiceItems.RemoveRange(invoice.InvoiceItems);

        _context.Invoices.Remove(invoice);

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<string> GetNextInvoiceNumberAsync()
    {
        var currentYear = DateTime.Now.Year;
        var lastInvoice = await _context.Invoices
            .Where(i => i.InvoiceNumber.StartsWith($"ACS-{currentYear}"))
            .OrderByDescending(i => i.InvoiceId)
            .FirstOrDefaultAsync();

        int nextSequence = 1;

        if (lastInvoice != null)
        {
            var lastNumber = lastInvoice.InvoiceNumber;
            var lastSequence = int.Parse(lastNumber.Split('-')[2]);
            nextSequence = lastSequence + 1;
        }

        return $"ACS-{currentYear}-{nextSequence:D5}";
    }

    public async Task<Invoice> AddInvoiceWithItemsAsync(Invoice invoice, List<InvoiceItem> items)
    {
        invoice.InvoiceNumber = await GetNextInvoiceNumberAsync();
        invoice.InvoiceDate = DateTime.Now;
        invoice.CreatedDate = DateTime.Now;
        invoice.Status = "Generated";

        _context.Invoices.Add(invoice);

        foreach (var item in items)
        {
            item.Invoice = invoice;
            _context.InvoiceItems.Add(item);
        }

        await _context.SaveChangesAsync();
        return invoice;
    }
}