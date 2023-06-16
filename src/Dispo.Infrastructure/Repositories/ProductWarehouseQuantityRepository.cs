using Dispo.Domain.DTOs.RequestDTOs;
using Dispo.Domain.Entities;
using Dispo.Infrastructure.Context;
using Dispo.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Dispo.Infrastructure.Repositories
{
    public class ProductWarehouseQuantityRepository : IProductWarehouseQuantityRepository
    {
        private readonly DispoContext _context;
        public ProductWarehouseQuantityRepository(DispoContext dispoContext)
        {
            _context = dispoContext;
        }

        private Expression<Func<ProductWarehouseQuantity, bool>> ExpGetByProductAndWarehouse(long productId, long warehousetId)
            => w => w.ProductId == productId && w.WarehouseId == warehousetId;

        public async Task<ProductWarehouseQuantity?> GetByProductMovimentationAsync(ProductMovimentationDto productMovimentationDto)
        {
            return await _context.ProductWarehouseQuantities
                .Where(ExpGetByProductAndWarehouse(productMovimentationDto.ProductId, productMovimentationDto.WarehouseId))
                .FirstOrDefaultAsync();
        }

        public async Task<bool> UpdateProductWarehouseQuantityAsync(ProductMovimentationDto productMovimentationDto, double newProductQuantity)
        {
            return await _context.ProductWarehouseQuantities
                .Where(ExpGetByProductAndWarehouse(productMovimentationDto.ProductId, productMovimentationDto.WarehouseId))
                .UpdateFromQueryAsync(u => new ProductWarehouseQuantity
                {
                    Quantity = newProductQuantity
                }) > 0;
        }

        public async Task<bool> CreateAsync(ProductWarehouseQuantity productWarehouseQuantity)
        {
            await _context.ProductWarehouseQuantities.AddAsync(productWarehouseQuantity);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
