using Dispo.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dispo.Infrastructure.Mappings
{
    public class PurchaseOrderAttachmentMapping : IEntityTypeConfiguration<PurchaseOrderAttachment>
    {
        public void Configure(EntityTypeBuilder<PurchaseOrderAttachment> builder)
        {
            builder.ToTable("PurchaseOrderAttachments");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                   .UseIdentityColumn()
                   .HasColumnType("BIGINT")
                   .ValueGeneratedOnAdd();

            builder.Property(x => x.Attatchment)
                   .IsRequired()
                   .HasColumnName("Attatchment")
                   .HasColumnType("varbinary(max)");

            builder.Property(x => x.CreationDate)
                   .IsRequired()
                   .HasColumnName("CreationDate")
                   .HasColumnType("datetime2");

            builder.Property(x => x.ModifieldDate)
                   .IsRequired()
                   .HasColumnName("ModifieldDate")
                   .HasColumnType("datetime2");

            builder.HasOne(a => a.PurchaseOrder)
                   .WithMany(b => b.PurchaseOrderAttachments)
                   .HasForeignKey(c => c.PurchaseOrderId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}