using Dispo.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dispo.Infrastructure.Mappings
{
    public class UserMovementMapping : IEntityTypeConfiguration<UserMovement>
    {
        public void Configure(EntityTypeBuilder<UserMovement> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                   .UseIdentityColumn()
                   .HasColumnType("BIGINT")
                   .ValueGeneratedOnAdd();

            builder.HasOne(a => a.User)
                   .WithMany(b => b.UserMovements)
                   .HasForeignKey(b => b.UserId);

            builder.HasOne(a => a.Movement)
                   .WithMany(b => b.UserMovements)
                   .HasForeignKey(b => b.MovementId);
        }
    }
}