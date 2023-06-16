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

            builder.HasKey("Id");

            builder.Property(x => x.Id)
                .UseIdentityColumn()
                .HasColumnType("BIGINT")
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Name)
                .IsRequired()
                .HasColumnName("Name")
                .HasColumnType("VARCHAR(220)")
                .HasMaxLength(220);

            builder.Property(x => x.UnitPrice)
                .IsRequired()
                .HasColumnName("UnitPrice")
                .HasColumnType("DECIMAL(10, 2)")
                .HasMaxLength(120);

            builder.Property(x => x.Color)
                .IsRequired()
                .HasColumnName("Color")
                .HasColumnType("SMALLINT")
                .HasMaxLength(120);

            builder.Property(x => x.Code)
                .IsRequired()
                .HasColumnName("Code")
                .HasColumnType("VARCHAR(50)")
                .HasMaxLength(50);

            builder.Property(x => x.Description)
                .IsRequired()
                .HasColumnName("Description")
                .HasColumnType("VARCHAR(500)")
                .HasMaxLength(500);

            builder.Property(x => x.UnitOfMeasurement)
                .IsRequired()
                .HasColumnName("UnitOfMeasurement")
                .HasColumnType("SMALLINT")
                .HasMaxLength(120);

            builder.Property(x => x.Type)
                .IsRequired()
                .HasColumnName("Type")
                .HasColumnType("SMALLINT")
                .HasMaxLength(120);

            builder.HasMany(a => a.Movements)
                   .WithOne(b => b.Product);

            builder.HasMany(a => a.Movements)
                   .WithOne(b => b.Product);
        }
    }
}