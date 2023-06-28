using Dispo.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dispo.Infrastructure.Mappings
{
    public class OrderMapping : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.ToTable("Orders");

            builder.HasKey("Id");

            builder.Property(x => x.Description)
                   .IsRequired(false)
                   .HasColumnName("Description")
                   .HasColumnType("VARCHAR(200)")
                   .HasMaxLength(200);

            builder.Property(x => x.Quantity)
                   .IsRequired()
                   .HasColumnName("Quantity")
                   .HasColumnType("INTEGER")
                   .HasMaxLength(9999);

            builder.Property(x => x.TotalPrice)
                   .IsRequired()
                   .HasColumnName("TotalPrice")
                   .HasColumnType("DECIMAL(10, 2)")
                   .HasMaxLength(120);

            builder.HasOne(a => a.Product)
                   .WithMany(b => b.Orders)
                   .HasForeignKey(c => c.ProductId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(a => a.PurchaseOrder)
                   .WithMany(b => b.Orders)
                   .HasForeignKey(c => c.PurchaseOrderId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
