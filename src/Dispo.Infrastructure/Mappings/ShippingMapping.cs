using Dispo.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dispo.Infrastructure.Mappings
{
    public class ShippingMapping : IEntityTypeConfiguration<Shipping>
    {
        public void Configure(EntityTypeBuilder<Shipping> builder)
        {
            builder.ToTable("Shippings");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                   .UseIdentityColumn()
                   .HasColumnType("BIGINT")
                   .ValueGeneratedOnAdd();

            builder.Property(x => x.ShippingPrice)
                   .IsRequired()
                   .HasColumnName("Description")
                   .HasColumnType("VARCHAR(200)")
                   .HasMaxLength(200);

            builder.Property(x => x.EstimatedDeliveryDate)
                   .IsRequired()
                   .HasColumnName("Date")
                   .HasColumnType("datetime2");

            builder.HasOne(a => a.PurchaseOrder)
                   .WithOne(b => b.Shipping)
                   .HasForeignKey<Shipping>(c => c.PurchaseOrderId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
