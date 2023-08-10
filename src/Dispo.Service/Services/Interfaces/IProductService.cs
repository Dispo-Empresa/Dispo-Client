using Dispo.Domain.DTOs;
using Dispo.Domain.DTOs.Request;

namespace Dispo.Service.Services.Interfaces
{
    public interface IProductService
    {
        long CreateProduct(ProductRequestDto productModel);

        IEnumerable<ProductNameWithCode> GetProductNamesWithCode();

        string BuildProductSKUCode(string productName, string productType);

        Task<bool> ExistsByIdAsync(long productId);
    }
}