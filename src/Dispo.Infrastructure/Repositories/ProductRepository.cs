using Dispo.Commom;
using Dispo.Domain.Entities;
using Dispo.Infrastructure.Context;
using Dispo.Infrastructure.Repositories.DTO_s;
using Dispo.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

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
                                Code = s.Code
                            })
                            .Distinct()
                            .ToList();

        public long GetProductIdByName(string productName)
            => _dispoContext.Products
                            .Where(x => x.Name == productName)
                            .Select(s => s.Id)
                            .SingleOrDefault()
                            .ToLong();

        public long GetProductIdByCode(string productCode)
            => _dispoContext.Products
                            .Where(x => x.Code == productCode)
                            .Select(s => s.Id)
                            .SingleOrDefault()
                            .ToLong();
    }
}