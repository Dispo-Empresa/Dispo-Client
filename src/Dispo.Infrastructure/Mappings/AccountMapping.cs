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

            builder.HasKey("Id");

            builder.Property(x => x.Id)
                .UseIdentityColumn()
                .HasColumnType("BIGINT")
                .ValueGeneratedOnAdd();

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

            builder.HasOne(a => a.User)
                .WithOne(b => b.Account)
                .HasForeignKey<User>(b => b.AccountId);
        }
    }
}