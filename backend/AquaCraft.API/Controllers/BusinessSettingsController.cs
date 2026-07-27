
using AquaCraft.API.DTOs;
using AquaCraft.API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AquaCraft.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BusinessSettingsController
    : ControllerBase
{
    private readonly IBusinessSettingsService _service;

    public BusinessSettingsController(
        IBusinessSettingsService service)
    {
        _service = service;
    }

    [HttpGet] public async Task<ActionResult>
        Get()
    {
        var data = await _service.GetAsync();
        return Ok(data);
    }

    [HttpPost] public async Task<ActionResult>
        Save(
            BusinessSettingsDto dto)
    {
        var result = await _service.SaveAsync(dto);

        return Ok(result);
    }
}