using Dispo.Domain.DTOs.RequestDTOs;
using Dispo.Domain.Entities;
using Dispo.Domain.Enums;
using Dispo.Domain.Factories.ProductMovimentation;
using Dispo.Infrastructure.Repositories.Interfaces;
using Dispo.Service.Services.Interfaces;
using Microsoft.Extensions.Logging;

namespace Dispo.Service.Services
{
    public class ProductWarehouseQuantityService : IProductWarehouseQuantityService
    {
        private readonly IProductWarehouseQuantityRepository _productWarehouseQuantityRepository;
        private readonly ILogger<ProductWarehouseQuantityService> _logger;

        public ProductWarehouseQuantityService(IProductWarehouseQuantityRepository productWarehouseQuantityRepository, ILogger<ProductWarehouseQuantityService> logger)
        {
            _productWarehouseQuantityRepository = productWarehouseQuantityRepository;
            _logger = logger;
        }

        public async Task<bool> UpdateProductWarehouseQuantityAsync(ProductMovimentationDto productMovimentationDto)
        {
            var productWarehouseQuantity = await _productWarehouseQuantityRepository.GetByProductMovimentationAsync(productMovimentationDto);
            if (productWarehouseQuantity is null)
            {
                if (productMovimentationDto.MovementType is eMovementType.Output)
                {
                    _logger.LogError("Movimentação não será criada pois foi enviada com operação de saída.");
                    return false;
                }

                return await _productWarehouseQuantityRepository.CreateAsync(new ProductWarehouseQuantity(productMovimentationDto));
            }

            var newProductQuantity = ProductMovimentationFactory.Create(productMovimentationDto.MovementType)
                                                                .MakeMovimentation(productWarehouseQuantity.Quantity, productMovimentationDto.Quantity);

            return await _productWarehouseQuantityRepository.UpdateProductWarehouseQuantityAsync(productMovimentationDto, newProductQuantity);
        }
    }
}
