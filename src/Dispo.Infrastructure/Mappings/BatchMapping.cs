using Dispo.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dispo.Infrastructure.Mappings
{
    public class BatchMapping : IEntityTypeConfiguration<Batch>
    {
        public void Configure(EntityTypeBuilder<Batch> builder)
        {
            builder.ToTable("Batches");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                   .UseIdentityColumn()
                   .HasColumnType("BIGINT")
                   .ValueGeneratedOnAdd();

            builder.Property(x => x.Key)
                   .IsRequired()
                   .HasColumnName("Key")
                   .HasColumnType("VARCHAR(100)")
                   .HasMaxLength(100);

            builder.Property(x => x.ProductQuantity)
                   .IsRequired()
                   .HasColumnName("ProductQuantity")
                   .HasColumnType("INTEGER")
                   .HasMaxLength(9999);

            builder.Property(x => x.QuantityPerBatch)
                   .IsRequired()
                   .HasColumnName("QuantityPerBatch")
                   .HasColumnType("INTEGER")
                   .HasMaxLength(9999);

            builder.Property(x => x.ManufacturingDate)
                   .HasColumnName("ManufacturingDate")
                   .HasColumnType("datetime2");

            builder.Property(x => x.ExpirationDate)
                   .HasColumnName("ExpirationDate")
                   .HasColumnType("datetime2");

            builder.HasOne(a => a.Product)
                   .WithOne(b => b.Batch)
                   .HasForeignKey<Batch>(c => c.ProductId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(a => a.Order)
                   .WithMany(b => b.Batches)
                   .HasForeignKey(c => c.OrderId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}