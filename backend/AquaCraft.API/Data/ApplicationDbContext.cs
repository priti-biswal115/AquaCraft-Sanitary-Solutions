using AquaCraft.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AquaCraft.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext
        (
            DbContextOptions<ApplicationDbContext> options
        ) : base(options)
        {
        }

        public DbSet<Customer> Customers { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<CustomerPricing> CustomerPricing { get; set; }

        public DbSet<Invoice> Invoices { get; set; }

        public DbSet<InvoiceItem> InvoiceItems { get; set; }

        public DbSet<BusinessSettings> BusinessSettings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            
            modelBuilder.Entity<BusinessSettings>()
                .HasKey(b => b.BusinessId);

            modelBuilder.Entity<CustomerPricing>()
                .HasKey(cp => cp.PricingId);

            modelBuilder.Entity<CustomerPricing>()
                .HasOne(cp => cp.Customer)
                .WithMany(c => c.CustomerPricings)
                .HasForeignKey(cp => cp.CustomerId);

            modelBuilder.Entity<CustomerPricing>()
                .HasOne(cp => cp.Product)
                .WithMany(p => p.CustomerPricings)
                .HasForeignKey(cp => cp.ProductId);

            modelBuilder.Entity<Invoice>()
                .HasOne(i => i.Customer)
                .WithMany(c => c.Invoices)
                .HasForeignKey(i => i.CustomerId);

            modelBuilder.Entity<InvoiceItem>()
                .HasOne(ii => ii.Invoice)
                .WithMany(i => i.InvoiceItems)
                .HasForeignKey(ii => ii.InvoiceId);

            modelBuilder.Entity<InvoiceItem>()
                .HasOne(ii => ii.Product)
                .WithMany(p => p.InvoiceItems)
                .HasForeignKey(ii => ii.ProductId);
        }
    }
}