using AquaCraft.API.DTOs;
using AquaCraft.API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AquaCraft.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase
{
    private readonly ICustomerService _customerService;

    public CustomersController(ICustomerService customerService)
    {
        _customerService = customerService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CustomerDto>>> GetAllCustomers()
    {
        var customers = await _customerService.GetAllCustomersAsync();
        return Ok(customers);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CustomerDto>> GetCustomerById(int id)
    {
        var customer = await _customerService.GetCustomerByIdAsync(id);
        if (customer == null)
            return NotFound();

        return Ok(customer);
    }

    [HttpPost]
    public async Task<ActionResult<CustomerDto>> CreateCustomer(CustomerDto customerDto)
    {
        var createdCustomer = await _customerService.CreateCustomerAsync(customerDto);
        return CreatedAtAction(nameof(GetCustomerById), new { id = createdCustomer.CustomerId }, createdCustomer);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCustomer(int id, CustomerDto customerDto)
    {
        var updatedCustomer = await _customerService.UpdateCustomerAsync(id, customerDto);
        if (updatedCustomer == null)
            return NotFound();

        return Ok(updatedCustomer);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCustomer(int id)
    {
        var result = await _customerService.DeleteCustomerAsync(id);
        if (!result)
            return NotFound();

        return NoContent();
    }
}
