using Dispo.Commom;
using Dispo.Domain.DTO_s;
using Dispo.Domain.DTOs;
using Dispo.Domain.Entities;
using Dispo.Infrastructure.Context;
using Dispo.Infrastructure.Repositories.Interfaces;

namespace Dispo.Infrastructure.Repositories
{
    public class ProductRepository : BaseRepository<Product>, IProductRepository
    {
        private readonly DispoContext _dispoContext;

        public ProductRepository(DispoContext dispoContext) : base(dispoContext)
        {
            _dispoContext = dispoContext;
        }

        public IEnumerable<ProductNameWithCode> GetAllProductNamesWithCode()
            => _dispoContext.Products
                            .Select(s => new ProductNameWithCode
                            {
                                Id = s.Id,
                                Name = s.Name,
                            })
                            .Distinct()
                            .ToList();

        public long GetProductIdByName(string productName)
            => _dispoContext.Products
                            .Where(x => x.Name == productName)
                            .Select(s => s.Id)
                            .SingleOrDefault()
                            .ToLong();

        public IEnumerable<ProductInfoDto> GetProductInfoDto()
            => _dispoContext.Products
                            .Select(s => new ProductInfoDto()
                            {
                                Name = s.Name,
                                PurchasePrice = s.PurchasePrice,
                                SalePrice = s.SalePrice,
                                Category = s.Category,
                                UnitOfMeasurement = s.UnitOfMeasurement,
                            })
                            .ToList();
    }
}