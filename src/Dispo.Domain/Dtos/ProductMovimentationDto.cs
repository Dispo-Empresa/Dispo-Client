using Dispo.Domain.Entities;
using Dispo.Domain.Enums;
using Dispo.Domain.Exceptions;
using Newtonsoft.Json.Linq;
using System;

namespace Dispo.Domain.DTOs.RequestDTOs
{
    public class ProductMovimentationDto
    {
        public ProductMovimentationDto()
        { }

        public ProductMovimentationDto(long productId, long warehouseId, int quantity, eMovementType movementType)
        {
            ProductId = productId;
            WarehouseId = warehouseId;
            Quantity = quantity;
            MovementType = movementType;
        }

        public long ProductId { get; set; }
        public long WarehouseId { get; set; }
        public int Quantity { get; set; }
        public eMovementType MovementType { get; set; }

        public void Validate()
        {
            if (!Enum.IsDefined(typeof(eMovementType), MovementType))
            {
                throw new BusinessException("Tipo de Movimentação inválida.");
            }

            if (ProductId <= 0)
            {
                throw new BusinessException("Produto inválido.");
            }

            if (Quantity <= 0)
            {
                throw new BusinessException("Quantidade inválida.");
            }

            if (WarehouseId <= 0)
            {
                throw new BusinessException("Depósito inválido.");
            }
        }
    }
}
