using Dispo.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dispo.Infrastructure.Mappings
{
    public class LocationMapping : IEntityTypeConfiguration<Location>
    {
        public void Configure(EntityTypeBuilder<Location> builder)
        {
            builder.ToTable("Locations");

            builder.HasKey("Id");

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
                .IsRequired()
                .HasColumnName("District")
                .HasColumnType("VARCHAR(200)")
                .HasMaxLength(200);

            builder.HasOne(a => a.Branch)
                   .WithOne(b => b.Location)
                   .HasForeignKey<Branch>(b => b.LocationId);
        }
    }
}