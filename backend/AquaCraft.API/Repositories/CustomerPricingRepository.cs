using AquaCraft.API.Data;
using AquaCraft.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AquaCraft.API.Repositories;

public class CustomerPricingRepository
{
    private readonly ApplicationDbContext _context;

    public CustomerPricingRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<CustomerPricing>> GetAllAsync()
    {
        return await _context.CustomerPricing
            .AsNoTracking()
            .Include(cp => cp.Customer)
            .Include(cp => cp.Product)
            .ToListAsync();
    }

    public async Task<IEnumerable<CustomerPricing>> GetByCustomerIdAsync(
        int customerId)
    {
        return await _context.CustomerPricing
            .AsNoTracking()
            .Include(cp => cp.Customer)
            .Include(cp => cp.Product)
            .Where(cp => cp.CustomerId == customerId)
            .ToListAsync();
    }

    public async Task<CustomerPricing?> GetByIdAsync(int id)
    {
        return await _context.CustomerPricing
            .Include(cp => cp.Customer)
            .Include(cp => cp.Product)
            .FirstOrDefaultAsync(cp => cp.PricingId == id);
    }

    public async Task<CustomerPricing> AddAsync(
        CustomerPricing pricing)
    {
        _context.CustomerPricing.Add(pricing);

        await _context.SaveChangesAsync();

        return pricing;
    }

    public async Task<CustomerPricing>
    UpdateAsync(CustomerPricing pricing)
    {
        _context.CustomerPricing.Update(pricing);

        await _context.SaveChangesAsync();

        return pricing;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var pricing = await _context.CustomerPricing.FindAsync(id);

        if (pricing == null)
            return false;

        _context.CustomerPricing.Remove(pricing);

        await _context.SaveChangesAsync();

        return true;
    }
}