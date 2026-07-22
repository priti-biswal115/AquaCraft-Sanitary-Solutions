using AquaCraft.API.DTOs;

namespace AquaCraft.API.Interfaces;

public interface ICustomerPricingService
{
    Task<IEnumerable<CustomerPricingDto>> GetByCustomerIdAsync(int customerId);
    Task<CustomerPricingDto> SetCustomerPricingAsync(CustomerPricingDto dto);
    Task<bool> DeleteCustomerPricingAsync(int id);
}
