using AquaCraft.API.DTOs;
using AquaCraft.API.Interfaces;
using AquaCraft.API.Models;
using AquaCraft.API.Repositories;

namespace AquaCraft.API.Services;

public class CustomerPricingService : ICustomerPricingService
{
    private readonly CustomerPricingRepository _customerPricingRepository;

    public CustomerPricingService(CustomerPricingRepository customerPricingRepository)
    {
        _customerPricingRepository = customerPricingRepository;
    }

    public async Task<IEnumerable<CustomerPricingDto>> GetByCustomerIdAsync(int customerId)
    {
        var pricings = await _customerPricingRepository.GetByCustomerIdAsync(customerId);
        return pricings.Select(MapToDto);
    }

    public async Task<CustomerPricingDto> SetCustomerPricingAsync(CustomerPricingDto dto)
    {
        var entity = new CustomerPricing
        {
            CustomerId = dto.CustomerId,
            ProductId = dto.ProductId,
            Rate = dto.Rate
        };

        var created = await _customerPricingRepository.AddAsync(entity);

        var full = await _customerPricingRepository.GetByIdAsync(created.PricingId);
        return full == null ? MapToDto(created) : MapToDto(full);
    }

    public async Task<bool> DeleteCustomerPricingAsync(int id)
    {
        return await _customerPricingRepository.DeleteAsync(id);
    }

    private static CustomerPricingDto MapToDto(CustomerPricing pricing)
    {
        return new CustomerPricingDto
        {
            PricingId = pricing.PricingId,
            CustomerId = pricing.CustomerId,
            CustomerName = pricing.Customer?.CustomerName ?? string.Empty,
            ProductId = pricing.ProductId,
            ProductName = pricing.Product?.ProductName ?? string.Empty,
            Rate = pricing.Rate
        };
    }
}
