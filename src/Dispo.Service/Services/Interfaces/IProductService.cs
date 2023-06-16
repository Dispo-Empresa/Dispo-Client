using Dispo.Domain.DTOs.RequestDTOs;
using Dispo.Infrastructure.Repositories.DTO_s;
using Dispo.Service.DTOs.RequestDTOs;
using Dispo.Service.DTOs.ResponseDTOs;

namespace Dispo.Service.Services.Interfaces
{
    public interface IProductService
    {
        ProductResponseDto CreateProduct(ProductRequestDto productModel);

        IEnumerable<ProductNameWithCode> GetProductNamesWithCode();

        string BuildProductSKUCode(string productName, string productType);

        Task<bool> ExistsByIdAsync(long productId);
    }
}