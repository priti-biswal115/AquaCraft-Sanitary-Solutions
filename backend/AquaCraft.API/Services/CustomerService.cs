using AquaCraft.API.DTOs;
using AquaCraft.API.Interfaces;
using AquaCraft.API.Models;
using AquaCraft.API.Repositories;

namespace AquaCraft.API.Services;

public class CustomerService : ICustomerService
{
    private readonly CustomerRepository _customerRepository;

    public CustomerService(CustomerRepository customerRepository)
    {
        _customerRepository = customerRepository;
    }

    public async Task<IEnumerable<CustomerDto>> GetAllCustomersAsync()
    {
        var customers = await _customerRepository.GetAllAsync();
        return customers.Select(c => MapToDto(c));
    }

    public async Task<CustomerDto?> GetCustomerByIdAsync(int id)
    {
        var customer = await _customerRepository.GetByIdAsync(id);
        return customer == null ? null : MapToDto(customer);
    }

    public async Task<CustomerDto> CreateCustomerAsync(CustomerDto customerDto)
    {
        var customer = MapToEntity(customerDto);
        var createdCustomer = await _customerRepository.AddAsync(customer);
        return MapToDto(createdCustomer);
    }

    public async Task<CustomerDto?> UpdateCustomerAsync(int id, CustomerDto customerDto)
    {
        var customer = await _customerRepository.GetByIdAsync(id);
        if (customer == null)
            return null;

        customer.CustomerName = customerDto.CustomerName;
        customer.Phone = customerDto.Phone;
        customer.Address = customerDto.Address;
        customer.GSTNo = customerDto.GSTNo;

        var updatedCustomer = await _customerRepository.UpdateAsync(customer);
        return MapToDto(updatedCustomer);
    }

    public async Task<bool> DeleteCustomerAsync(int id)
    {
        return await _customerRepository.DeleteAsync(id);
    }

    private CustomerDto MapToDto(Customer customer)
    {
        return new CustomerDto
        {
            CustomerId = customer.CustomerId,
            CustomerName = customer.CustomerName,
            Phone = customer.Phone,
            Address = customer.Address,
            GSTNo = customer.GSTNo
        };
    }

    private Customer MapToEntity(CustomerDto customerDto)
    {
        return new Customer
        {
            CustomerName = customerDto.CustomerName,
            Phone = customerDto.Phone,
            Address = customerDto.Address,
            GSTNo = customerDto.GSTNo
        };
    }
}
