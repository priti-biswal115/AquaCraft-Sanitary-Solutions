using AquaCraft.API.Data;
using AquaCraft.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AquaCraft.API.Repositories;

public class BusinessSettingsRepository
{
    private readonly ApplicationDbContext _context;

    public BusinessSettingsRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<BusinessSettings?> GetAsync()
    {
        return await _context.BusinessSettings.FirstOrDefaultAsync();
    }

    public async Task<BusinessSettings> SaveAsync(BusinessSettings settings)
    {
        var existing = await _context.BusinessSettings.FirstOrDefaultAsync();

        if (existing == null)
        {
            _context.BusinessSettings
                .Add(settings);
        }
        else
        {
            existing.BusinessName =
                settings.BusinessName;

            existing.GSTNo = settings.GSTNo;

            existing.Phone = settings.Phone;

            existing.Address = settings.Address;
        }

        await _context.SaveChangesAsync();

        return existing ?? settings;
    }
}