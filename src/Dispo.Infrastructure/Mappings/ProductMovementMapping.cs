using Dispo.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dispo.Infrastructure.Mappings
{
    public class ProductMovementMapping : IEntityTypeConfiguration<ProductMovement>
    {
        public void Configure(EntityTypeBuilder<ProductMovement> builder)
        {
            builder.ToTable("ProductMovements");

            builder.HasKey("Id");

            builder.HasOne(a => a.Movement)
                   .WithMany(b => b.ProductMoviments)
                   .HasForeignKey(c => c.MovimentId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(a => a.Product)
                   .WithMany(b => b.ProductMoviments)
                   .HasForeignKey(c => c.ProductId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
