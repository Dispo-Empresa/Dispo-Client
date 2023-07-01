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

            builder.Property(x => x.Name)
                   .IsRequired()
                   .HasColumnName("Name")
                   .HasColumnType("VARCHAR(60)")
                   .HasMaxLength(60);

            builder.HasOne(a => a.Company)
                   .WithMany(b => b.Warehouses)
                   .HasForeignKey(c => c.CompanyId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(a => a.Adress)
                   .WithOne(b => b.Warehouse)
                   .HasForeignKey<Warehouse>(c => c.AdressId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}