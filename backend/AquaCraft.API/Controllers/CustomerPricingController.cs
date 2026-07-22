using AquaCraft.API.DTOs;
using AquaCraft.API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AquaCraft.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomerPricingController : ControllerBase
{
    private readonly ICustomerPricingService _customerPricingService;

    public CustomerPricingController(ICustomerPricingService customerPricingService)
    {
        _customerPricingService = customerPricingService;
    }

    [HttpGet("{customerId}")]
    public async Task<ActionResult<IEnumerable<CustomerPricingDto>>> GetCustomerPricing(int customerId)
    {
        var pricing = await _customerPricingService.GetByCustomerIdAsync(customerId);
        return Ok(pricing);
    }

    [HttpPost]
    public async Task<ActionResult<CustomerPricingDto>> SetCustomerPricing(CustomerPricingDto dto)
    {
        var result = await _customerPricingService.SetCustomerPricingAsync(dto);
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCustomerPricing(int id)
    {
        var result = await _customerPricingService.DeleteCustomerPricingAsync(id);
        if (!result)
            return NotFound();

        return NoContent();
    }
}
