using Dispo.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dispo.Infrastructure.Mappings
{
    public class ProductProviderMapping : IEntityTypeConfiguration<ProductProvider>
    {
        public void Configure(EntityTypeBuilder<ProductProvider> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasOne(a => a.Provider)
                   .WithMany(b => b.ProductProviders)
                   .HasForeignKey(b => b.ProviderId);

            builder.HasOne(a => a.Product)
                   .WithMany(b => b.ProductProviders)
                   .HasForeignKey(b => b.ProductId);
        }
    }
}