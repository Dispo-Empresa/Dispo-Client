using Dispo.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dispo.Infrastructure.Mappings
{
    public class MovementMapping : IEntityTypeConfiguration<Movement>
    {
        public void Configure(EntityTypeBuilder<Movement> builder)
        {
            builder.ToTable("Movement");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .UseIdentityColumn()
                .HasColumnType("BIGINT")
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Date)
                .IsRequired()
                .HasColumnName("Date")
                .HasColumnType("datetime2");

            builder.Property(x => x.MovementType)
                .IsRequired()
                .HasColumnName("MovementType")
                .HasColumnType("SMALLINT")
                .HasMaxLength(120);

            builder.Property(x => x.Quantity)
                .IsRequired()
                .HasColumnName("Quantity")
                .HasColumnType("DECIMAL(10, 2)")
                .HasMaxLength(120);

            builder.HasOne(a => a.Product)
                   .WithMany(b => b.Movements);
        }
    }
}