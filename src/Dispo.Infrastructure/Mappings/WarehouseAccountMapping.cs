using Dispo.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dispo.Infrastructure.Mappings
{
    public class WarehouseAccountMapping : IEntityTypeConfiguration<WarehouseAccount>
    {
        public void Configure(EntityTypeBuilder<WarehouseAccount> builder)
        {
            builder.ToTable("WarehouseAccounts");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                   .UseIdentityColumn()
                   .HasColumnType("BIGINT")
                   .ValueGeneratedOnAdd();

            builder.HasOne(a => a.Account)
                   .WithMany(b => b.WarehouseAccounts)
                   .HasForeignKey(c => c.AccountId)
                   .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(a => a.Warehouse)
                   .WithMany(b => b.WarehouseAccounts)
                   .HasForeignKey(c => c.WarehouseId)
                   .OnDelete(DeleteBehavior.NoAction);
        }
    }
}