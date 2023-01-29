using Dispo.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dispo.Infrastructure.Mappings
{
    public class InventoryMapping : IEntityTypeConfiguration<Inventory>
    {
        public void Configure(EntityTypeBuilder<Inventory> builder)
        {
            builder.ToTable("Inventory");

            builder.HasKey("Id");

            builder.HasOne(a => a.Branch)
                   .WithOne(b => b.Inventory)
                   .HasForeignKey<Inventory>(b => b.BranchId);
        }
    }
}