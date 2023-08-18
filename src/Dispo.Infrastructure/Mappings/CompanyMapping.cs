using Dispo.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dispo.Infrastructure.Mappings
{
    public class CompanyMapping : IEntityTypeConfiguration<Company>
    {
        public void Configure(EntityTypeBuilder<Company> builder)
        {
            builder.ToTable("Companies");

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
                   .HasColumnType("VARCHAR(220)")
                   .HasMaxLength(220);

            builder.Property(x => x.Cnpj)
                   .IsRequired()
                   .HasColumnName("Cnpj")
                   .HasColumnType("VARCHAR(18)")
                   .HasMaxLength(18);

            builder.HasOne(a => a.Address)
                   .WithOne(b => b.Company)
                   .HasForeignKey<Company>(c => c.AddressId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}