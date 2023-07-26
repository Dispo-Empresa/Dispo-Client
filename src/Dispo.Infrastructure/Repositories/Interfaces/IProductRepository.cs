using Dispo.Domain.DTO_s;
using Dispo.Domain.DTOs;
using Dispo.Domain.Entities;

namespace Dispo.Infrastructure.Repositories.Interfaces
{
    public interface IProductRepository : IBaseRepository<Product>
    {
        IEnumerable<ProductNameWithCode> GetAllProductNamesWithCode();
        long GetProductIdByName(string productName);
        IEnumerable<ProductInfoDto> GetProductInfoDto();

    }
}