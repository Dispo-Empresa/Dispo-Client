using Dispo.Domain.Entities;
using Dispo.Infrastructure.Repositories.DTO_s;

namespace Dispo.Infrastructure.Repositories.Interfaces
{
    public interface IProductRepository : IBaseRepository<Product>
    {
        IEnumerable<ProductNameWithCode> GetAllProductNamesWithCode();

        long GetProductIdByName(string productName);

        long GetProductIdByCode(string productCode);
    }
}