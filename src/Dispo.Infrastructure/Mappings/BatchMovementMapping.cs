using Dispo.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dispo.Infrastructure.Mappings
{
    public class BatchMovementMapping : IEntityTypeConfiguration<BatchMovement>
    {
        public void Configure(EntityTypeBuilder<BatchMovement> builder)
        {
            builder.ToTable("BatchMovements");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                   .UseIdentityColumn()
                   .HasColumnType("BIGINT")
                   .ValueGeneratedOnAdd();

            builder.HasOne(a => a.Batch)
                   .WithMany(b => b.BatchMovements)
                   .HasForeignKey(c => c.BatchId)
                   .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(a => a.Movement)
                   .WithMany(b => b.BatchMovements)
                   .HasForeignKey(c => c.MovementId)
                   .OnDelete(DeleteBehavior.NoAction);
        }
    }
}