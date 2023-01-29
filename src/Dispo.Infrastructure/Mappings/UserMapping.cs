using Dispo.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dispo.Infrastructure.Mappings
{
    public class UserMapping : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");

            builder.HasKey("Id");

            builder.Property(x => x.Id)
                .UseIdentityColumn()
                .HasColumnType("BIGINT")
                .ValueGeneratedOnAdd();

            builder.Property(x => x.FirstName)
                .IsRequired()
                .HasColumnName("FirstName")
                .HasColumnType("VARCHAR(60)")
                .HasMaxLength(60);

            builder.Property(x => x.LastName)
                .IsRequired()
                .HasColumnName("LastName")
                .HasColumnType("VARCHAR(60)")
                .HasMaxLength(60);

            builder.Property(x => x.CpfCnpj)
                .IsRequired()
                .HasColumnName("CpfCnpj")
                .HasColumnType("VARCHAR(18)")
                .HasMaxLength(18);

            builder.Property(x => x.Phone)
                .IsRequired()
                .HasColumnName("Phone")
                .HasColumnType("VARCHAR(16)")
                .HasMaxLength(16);

            builder.Property(x => x.BirthDate)
                .IsRequired()
                .HasColumnName("BirthDate")
                .HasColumnType("datetime2");

            builder.HasOne(a => a.Branch)
                   .WithMany(b => b.Employees)
                   .IsRequired();
        }
    }
}