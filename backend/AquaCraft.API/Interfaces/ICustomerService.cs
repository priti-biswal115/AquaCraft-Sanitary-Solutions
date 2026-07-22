using AquaCraft.API.DTOs;

namespace AquaCraft.API.Interfaces;

public interface ICustomerService
{
    Task<IEnumerable<CustomerDto>> GetAllCustomersAsync();
    Task<CustomerDto?> GetCustomerByIdAsync(int id);
    Task<CustomerDto> CreateCustomerAsync(CustomerDto customerDto);
    Task<CustomerDto?> UpdateCustomerAsync(int id, CustomerDto customerDto);
    Task<bool> DeleteCustomerAsync(int id);
}
