using Dispo.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dispo.Infrastructure.Mappings
{
    public class BrandMapping : IEntityTypeConfiguration<Brand>
    {
        public void Configure(EntityTypeBuilder<Brand> builder)
        {
            builder.ToTable("Brands");

            builder.HasKey("Id");

            builder.Property(x => x.Id)
                .UseIdentityColumn()
                .HasColumnType("BIGINT")
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Name)
                .IsRequired()
                .HasColumnName("Name")
                .HasColumnType("VARCHAR(50)")
                .HasMaxLength(50);

            builder.Property(x => x.Logo)
                .IsRequired()
                .HasColumnName("Logo")
                .HasColumnType("image");

            builder.HasMany(a => a.Products)
                .WithOne(b => b.Brand)
                .HasForeignKey(b => b.BrandId);
        }
    }
}