using Dispo.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dispo.Infrastructure.Mappings
{
    public class AccountMapping : IEntityTypeConfiguration<Account>
    {
        public void Configure(EntityTypeBuilder<Account> builder)
        {
            builder.ToTable("Accounts");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                   .UseIdentityColumn()
                   .HasColumnType("BIGINT")
                   .ValueGeneratedOnAdd();

            builder.Property(x => x.Ativo)
                   .IsRequired()
                   .HasColumnName("Ativo")
                   .HasDefaultValue(true);

            builder.Property(x => x.Email)
                   .IsRequired()
                   .HasColumnName("Email")
                   .HasColumnType("VARCHAR(220)")
                   .HasMaxLength(220);

            builder.Property(x => x.Password)
                   .IsRequired()
                   .HasColumnName("Password")
                   .HasColumnType("VARCHAR(255)")
                   .HasMaxLength(255);

            builder.HasOne(a => a.Role)
                   .WithMany(b => b.Accounts)
                   .HasForeignKey(c => c.RoleId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(a => a.User)
                   .WithOne(b => b.Account)
                   .HasForeignKey<Account>(b => b.UserId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}