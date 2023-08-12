using Dispo.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dispo.Infrastructure.Mappings
{
    public class AddressMapping : IEntityTypeConfiguration<Address>
    {
        public void Configure(EntityTypeBuilder<Address> builder)
        {
            builder.ToTable("Addresses");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                   .UseIdentityColumn()
                   .HasColumnType("BIGINT")
                   .ValueGeneratedOnAdd();

            builder.Property(x => x.Country)
                   .IsRequired()
                   .HasColumnName("Country")
                   .HasColumnType("VARCHAR(200)")
                   .HasMaxLength(200);

            builder.Property(x => x.UF)
                   .IsRequired()
                   .HasColumnName("UF")
                   .HasColumnType("VARCHAR(3)")
                   .HasMaxLength(3);

            builder.Property(x => x.City)
                   .IsRequired()
                   .HasColumnName("City")
                   .HasColumnType("VARCHAR(200)")
                   .HasMaxLength(200);

            builder.Property(x => x.District)
                   .IsRequired(false)
                   .HasColumnName("District")
                   .HasColumnType("VARCHAR(200)")
                   .HasMaxLength(200);

            builder.Property(x => x.CEP)
                   .IsRequired(false)
                   .HasColumnName("CEP")
                   .HasColumnType("VARCHAR(9)")
                   .HasMaxLength(9);

            builder.Property(x => x.AdditionalInfo)
                   .IsRequired(false)
                   .HasColumnName("AdditionalInfo")
                   .HasColumnType("VARCHAR(200)")
                   .HasMaxLength(200);
        }
    }
}