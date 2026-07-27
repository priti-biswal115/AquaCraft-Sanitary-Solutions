using AquaCraft.API.DTOs;
using AquaCraft.API.Interfaces;
using AquaCraft.API.Models;
using AquaCraft.API.Repositories;

namespace AquaCraft.API.Services;

public class BusinessSettingsService
    : IBusinessSettingsService
{
    private readonly BusinessSettingsRepository
        _repository;

    public BusinessSettingsService(
        BusinessSettingsRepository repository)
    {
        _repository = repository;
    }

    public async Task<BusinessSettingsDto?> GetAsync()
    {
        var data = await _repository.GetAsync();

        if (data == null)
            return null;

        return new BusinessSettingsDto
        {
            BusinessId = data.BusinessId,
            BusinessName = data.BusinessName,
            GSTNo = data.GSTNo,
            Phone = data.Phone,
            Address = data.Address
        };
    }

    public async Task<BusinessSettingsDto> SaveAsync(
        BusinessSettingsDto dto)
    {
        var entity = new BusinessSettings
        {
            BusinessName = dto.BusinessName,
            GSTNo = dto.GSTNo,
            Phone = dto.Phone,
            Address = dto.Address
        };

        var saved = await _repository.SaveAsync(entity);

        return new BusinessSettingsDto
        {
            BusinessId = saved.BusinessId,
            BusinessName = saved.BusinessName,
            GSTNo = saved.GSTNo,
            Phone = saved.Phone,
            Address = saved.Address
        };
    }
}