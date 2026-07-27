using AquaCraft.API.DTOs;

namespace AquaCraft.API.Interfaces;

public interface IBusinessSettingsService
{
    Task<BusinessSettingsDto?> GetAsync();

    Task<BusinessSettingsDto> SaveAsync(BusinessSettingsDto dto);
}