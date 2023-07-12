using Dispo.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dispo.Infrastructure.Mappings
{
    public class RoleMapping : IEntityTypeConfiguration<Role>
    {
        public void Configure(EntityTypeBuilder<Role> builder)
        {
            builder.ToTable("Roles");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                   .UseIdentityColumn()
                   .HasColumnType("BIGINT")
                   .ValueGeneratedOnAdd();

            builder.Property(x => x.Name)
                   .IsRequired(false)
                   .HasColumnName("Name")
                   .HasColumnType("VARCHAR(50)")
                   .HasMaxLength(50);

            builder.Property(x => x.Type)
                   .IsRequired()
                   .HasColumnName("Type")
                   .HasColumnType("SMALLINT")
                   .HasMaxLength(120);
        }
    }
}
