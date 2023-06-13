using Dispo.Domain.DTOs.RequestDTOs;
using Dispo.Domain.Entities;

namespace Dispo.Infrastructure.Repositories.Interfaces
{
    public interface IProductWarehouseQuantityRepository
    {
        Task<bool> CreateAsync(ProductWarehouseQuantity productWarehouseQuantity);
        Task<ProductWarehouseQuantity?> GetByProductMovimentationAsync(ProductMovimentationDto productMovimentationDto);
        Task<bool> UpdateProductWarehouseQuantityAsync(ProductMovimentationDto productMovimentationDto, double newProductQuantity);
    }
}
