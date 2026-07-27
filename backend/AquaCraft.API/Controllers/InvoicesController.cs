using AquaCraft.API.DTOs;
using AquaCraft.API.Interfaces;
using AquaCraft.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace AquaCraft.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InvoicesController : ControllerBase
{
    private readonly IInvoiceService _invoiceService;
    private readonly PdfService _pdfService;
    private readonly IBusinessSettingsService _businessSettingsService;


    public InvoicesController(
    IInvoiceService invoiceService,
    PdfService pdfService,
    IBusinessSettingsService businessSettingsService)
    {
        _invoiceService = invoiceService;
        _pdfService = pdfService;
        _businessSettingsService = businessSettingsService;
    }

    [HttpGet] public async Task<ActionResult<IEnumerable<InvoiceDto>>> GetAllInvoices()
    {
        var invoices = await _invoiceService.GetAllInvoicesAsync();
        return Ok(invoices);
    }

    [HttpGet("{id}")]  public async Task<ActionResult<InvoiceDto>> GetInvoiceById(int id)
    {
        var invoice = await _invoiceService.GetInvoiceByIdAsync(id);

        if (invoice == null)
            return NotFound();

        return Ok(invoice);
    }

    [HttpGet("number/{invoiceNumber}")] public async Task<ActionResult<InvoiceDto>> GetInvoiceByNumber(
        string invoiceNumber)
    {
        var invoice =  await _invoiceService.GetInvoiceByNumberAsync(invoiceNumber);

        if (invoice == null)
            return NotFound();

        return Ok(invoice);
    }

    [HttpGet("customer/{customerId}")]
    public async Task<ActionResult<IEnumerable<InvoiceDto>>> GetCustomerInvoices(
        int customerId)
    {
        var invoices =  await _invoiceService.GetCustomerInvoicesAsync(customerId);

        return Ok(invoices);
    }

    [HttpPost]
    public async Task<ActionResult<InvoiceDto>> CreateInvoice(
        InvoiceDto invoiceDto)
    {
        var createdInvoice = await _invoiceService.CreateInvoiceAsync(invoiceDto);

        return CreatedAtAction(
            nameof(GetInvoiceById),
            new { id = createdInvoice.InvoiceId },
            createdInvoice);
    }

    [HttpPost("save")]
    public async Task<ActionResult<InvoiceResponseDto>> SaveInvoice(
        CreateInvoiceDto createInvoiceDto)
    {
        try
        {
            var response =
                await _invoiceService.SaveInvoiceAsync(createInvoiceDto);

            return CreatedAtAction(
                nameof(GetInvoiceById),
                new { id = response.InvoiceId },
                response);
        }
        catch (Exception ex)
        {
            return StatusCode(
                500,
                new
                {
                    Error = ex.Message,
                    Details = ex.InnerException?.Message
                });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateInvoice(
        int id,
        InvoiceDto invoiceDto)
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

    [HttpGet("{id}/pdf")]
    public async Task<IActionResult> DownloadPdf(int id)
    {
        var invoice =   await _invoiceService.GetInvoiceByIdAsync(id);

        if (invoice == null)
            return NotFound();

        var business = await _businessSettingsService.GetAsync();

        if (business == null){
            return BadRequest(
                "Business settings not configured."
            );
        }

        var pdfBytes = _pdfService.GenerateInvoicePdf(invoice,business);

        var invoicesFolder = Path.Combine(Directory.GetCurrentDirectory(),"wwwroot","invoices");

        if (!Directory.Exists(invoicesFolder))
        {
            Directory.CreateDirectory(invoicesFolder);
        }

        var fileName = $"{invoice.InvoiceNumber}.pdf";

        var fullPath = Path.Combine(
            invoicesFolder,
            fileName
        );

        System.IO.File.WriteAllBytes(fullPath,pdfBytes);

        return File(
            pdfBytes,
            "application/pdf",
            fileName
        );
    }
}