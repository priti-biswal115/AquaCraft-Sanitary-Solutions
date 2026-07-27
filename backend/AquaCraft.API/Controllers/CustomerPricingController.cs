using AquaCraft.API.DTOs;
using AquaCraft.API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AquaCraft.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomerPricingController : ControllerBase
{
    private readonly ICustomerPricingService _customerPricingService;

    public CustomerPricingController(
        ICustomerPricingService customerPricingService)
    {
        _customerPricingService = customerPricingService;
    }


    [HttpGet]  public async Task<ActionResult<IEnumerable<CustomerPricingDto>>> GetAllPricing()
    {
        var pricing =
            await _customerPricingService.GetAllAsync();

        return Ok(pricing);
    }

    [HttpGet("{customerId}")]   public async Task<ActionResult<IEnumerable<CustomerPricingDto>>> GetCustomerPricing(
        int customerId)
    {
        var pricing = await _customerPricingService.GetByCustomerIdAsync(customerId);

        return Ok(pricing);
    }

    [HttpPost]    public async Task<ActionResult<CustomerPricingDto>> SetCustomerPricing(
        CustomerPricingDto dto)
    {
        var result =  await _customerPricingService.SetCustomerPricingAsync(dto);

        return Ok(result);
    }

    [HttpPut("{id}")] public async Task<ActionResult<CustomerPricingDto>>
    UpdateCustomerPricing(
        int id,
        CustomerPricingDto dto)
    {
        var result =   await _customerPricingService.UpdateCustomerPricingAsync(id, dto);

        if (result == null)
            return NotFound();

        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCustomerPricing(int id)
    {
        var result =  await _customerPricingService.DeleteCustomerPricingAsync(id);

        if (!result)
            return NotFound();

        return NoContent();
    }
}