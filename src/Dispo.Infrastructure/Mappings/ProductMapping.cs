using Dispo.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dispo.Infrastructure.Mappings
{
    public class ProductMapping : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.ToTable("Products");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                   .UseIdentityColumn()
                   .HasColumnType("BIGINT")
                   .ValueGeneratedOnAdd();

            builder.Property(x => x.Ativo)
                   .IsRequired()
                   .HasColumnName("Ativo")
                   .HasDefaultValue(true);

            builder.Property(x => x.Name)
                   .IsRequired()
                   .HasColumnName("Name")
                   .HasColumnType("VARCHAR(150)")
                   .HasMaxLength(150);

            builder.Property(x => x.Description)
                   .IsRequired()
                   .HasColumnName("Description")
                   .HasColumnType("VARCHAR(220)")
                   .HasMaxLength(220);

            builder.Property(x => x.Image)
                   .IsRequired(false)
                   .HasColumnName("Image")
                   .HasColumnType("image");

            builder.Property(x => x.PurchasePrice)
                   .HasColumnName("PurchasePrice")
                   .HasColumnType("DECIMAL(10, 2)")
                   .HasMaxLength(120);

            builder.Property(x => x.SalePrice)
                   .IsRequired()
                   .HasColumnName("SalePrice")
                   .HasColumnType("DECIMAL(10, 2)")
                   .HasMaxLength(120);

            builder.Property(x => x.Category)
                   .IsRequired()
                   .HasColumnName("Category")
                   .HasColumnType("SMALLINT")
                   .HasMaxLength(120);

            builder.Property(x => x.UnitOfMeasurement)
                   .IsRequired()
                   .HasColumnName("UnitOfMeasurement")
                   .HasColumnType("SMALLINT")
                   .HasMaxLength(120);

            builder.Property(x => x.ProductDimensionId)
                   .IsRequired(false);

            builder.HasOne(a => a.ProductDimension)
                   .WithOne(b => b.Product)
                   .HasForeignKey<Product>(c => c.ProductDimensionId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}