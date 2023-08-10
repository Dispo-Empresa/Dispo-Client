using Dispo.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dispo.Infrastructure.Mappings
{
    public class SupplierMapping : IEntityTypeConfiguration<Supplier>
    {
        public void Configure(EntityTypeBuilder<Supplier> builder)
        {
            builder.ToTable("Suppliers");

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
                   .HasColumnType("VARCHAR(50)")
                   .HasMaxLength(50);

            builder.Property(x => x.ContactName)
                   .IsRequired()
                   .HasColumnName("ContactName")
                   .HasColumnType("VARCHAR(120)")
                   .HasMaxLength(120);

            builder.Property(x => x.ContactTitle)
                   .IsRequired()
                   .HasColumnName("ContactTitle")
                   .HasColumnType("VARCHAR(50)")
                   .HasMaxLength(50);

            builder.Property(x => x.Cnpj)
                   .IsRequired()
                   .HasColumnName("Cnpj")
                   .HasColumnType("VARCHAR(18)")
                   .HasMaxLength(18);

            builder.Property(x => x.Email)
                   .IsRequired()
                   .HasColumnName("Email")
                   .HasColumnType("VARCHAR(220)")
                   .HasMaxLength(220);

            builder.Property(x => x.Phone)
                   .IsRequired()
                   .HasColumnName("Phone")
                   .HasColumnType("VARCHAR(16)")
                   .HasMaxLength(16);

            builder.HasOne(a => a.Address)
                   .WithOne(b => b.Supplier)
                   .HasForeignKey<Supplier>(c => c.AddressId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}