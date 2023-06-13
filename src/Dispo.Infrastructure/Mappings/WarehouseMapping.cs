using Dispo.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dispo.Infrastructure.Mappings
{
    public class WarehouseMapping : IEntityTypeConfiguration<Warehouse>
    {
        public void Configure(EntityTypeBuilder<Warehouse> builder)
        {
            builder.ToTable("Warehouses");

            builder.HasKey("Id");

            builder.HasOne(a => a.Branch)
                   .WithOne(b => b.Warehouse)
                   .HasForeignKey<Warehouse>(b => b.BranchId);
        }
    }
}