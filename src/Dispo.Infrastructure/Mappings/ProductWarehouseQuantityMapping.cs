using Dispo.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Reflection.Emit;

namespace Dispo.Infrastructure.Mappings
{
    public class ProductWarehouseQuantityMapping : IEntityTypeConfiguration<ProductWarehouseQuantity>
    {
        public void Configure(EntityTypeBuilder<ProductWarehouseQuantity> builder)
        {
            builder.HasKey(pi => new { pi.ProductId, pi.WarehouseId });

            builder.Property(x => x.Quantity)
                .IsRequired()
                .HasColumnName("Quantity")
                .HasColumnType("DECIMAL(10, 2)");

            builder.HasOne(x => x.Product)
                .WithOne(x => x.ProductWarehouseQuantity)
                .HasForeignKey<ProductWarehouseQuantity>(pi => pi.ProductId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.Warehouse)
                .WithOne(x => x.ProductWarehouseQuantity)
                .HasForeignKey<ProductWarehouseQuantity>(pi => pi.WarehouseId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasIndex(pi => new { pi.ProductId, pi.WarehouseId }).IsUnique();
        }
    }
}
