using Dispo.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dispo.Infrastructure.Mappings
{
    public class ProductWarehouseQuantityMapping : IEntityTypeConfiguration<ProductWarehouseQuantity>
    {
        public void Configure(EntityTypeBuilder<ProductWarehouseQuantity> builder)
        {
            builder.ToTable("ProductWarehouseQuantities");

            builder.HasKey(a => new { a.ProductId, a.WarehouseId });

            builder.Property(x => x.Quantity)
                   .IsRequired()
                   .HasColumnName("Quantity")
                   .HasColumnType("DECIMAL(10, 2)");

            builder.HasOne(a => a.Product)
                   .WithOne(b => b.ProductWarehouseQuantity)
                   .HasForeignKey<ProductWarehouseQuantity>(c => c.ProductId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(a => a.Warehouse)
                   .WithOne(b => b.ProductWarehouseQuantity)
                   .HasForeignKey<ProductWarehouseQuantity>(c => c.WarehouseId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasIndex(a => new { a.ProductId, a.WarehouseId })
                   .IsUnique();
        }
    }
}
