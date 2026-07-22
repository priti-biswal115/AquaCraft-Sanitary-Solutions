using AquaCraft.API.DTOs;
using AquaCraft.API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AquaCraft.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InvoicesController : ControllerBase
{
    private readonly IInvoiceService _invoiceService;

    public InvoicesController(IInvoiceService invoiceService)
    {
        _invoiceService = invoiceService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<InvoiceDto>>> GetAllInvoices()
    {
        var invoices = await _invoiceService.GetAllInvoicesAsync();
        return Ok(invoices);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<InvoiceDto>> GetInvoiceById(int id)
    {
        var invoice = await _invoiceService.GetInvoiceByIdAsync(id);
        if (invoice == null)
            return NotFound();

        return Ok(invoice);
    }

    [HttpGet("number/{invoiceNumber}")]
    public async Task<ActionResult<InvoiceDto>> GetInvoiceByNumber(string invoiceNumber)
    {
        var invoice = await _invoiceService.GetInvoiceByNumberAsync(invoiceNumber);
        if (invoice == null)
            return NotFound();

        return Ok(invoice);
    }

    [HttpGet("customer/{customerId}")]
    public async Task<ActionResult<IEnumerable<InvoiceDto>>> GetCustomerInvoices(int customerId)
    {
        var invoices = await _invoiceService.GetCustomerInvoicesAsync(customerId);
        return Ok(invoices);
    }

    [HttpPost]
    public async Task<ActionResult<InvoiceDto>> CreateInvoice(InvoiceDto invoiceDto)
    {
        var createdInvoice = await _invoiceService.CreateInvoiceAsync(invoiceDto);
        return CreatedAtAction(nameof(GetInvoiceById), new { id = createdInvoice.InvoiceId }, createdInvoice);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateInvoice(int id, InvoiceDto invoiceDto)
    {
        var updatedInvoice = await _invoiceService.UpdateInvoiceAsync(id, invoiceDto);
        if (updatedInvoice == null)
            return NotFound();

        return Ok(updatedInvoice);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteInvoice(int id)
    {
        var result = await _invoiceService.DeleteInvoiceAsync(id);
        if (!result)
            return NotFound();

        return NoContent();
    }
}
