using AquaCraft.API.Data;
using AquaCraft.API.Interfaces;
using AquaCraft.API.Repositories;
using AquaCraft.API.Services;
using Microsoft.EntityFrameworkCore;
using QuestPDF.Infrastructure;

QuestPDF.Settings.License = LicenseType.Community;


var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});


builder.Services.AddScoped<CustomerRepository>();
builder.Services.AddScoped<ProductRepository>();
builder.Services.AddScoped<CustomerPricingRepository>();
builder.Services.AddScoped<InvoiceRepository>();

builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ICustomerPricingService, CustomerPricingService>();
builder.Services.AddScoped<IInvoiceService, InvoiceService>();
builder.Services.AddScoped<PdfService>();
builder.Services.AddScoped<BusinessSettingsRepository>();
builder.Services.AddScoped<IBusinessSettingsService,BusinessSettingsService>();



var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("ReactPolicy");
app.UseHttpsRedirection();
app.UseAuthorization();
app.UseStaticFiles();
app.MapControllers();
app.Run();