using Dispo.Domain.DTOs.RequestDTOs;

namespace Dispo.Domain.Entities
{
    public class ProductWarehouseQuantity
    {
        public ProductWarehouseQuantity() 
        { }

        public ProductWarehouseQuantity(ProductMovimentationDto productMovimentationDto)
        {
            ProductId = productMovimentationDto.ProductId;
            WarehouseId = productMovimentationDto.WarehouseId;
            Quantity = productMovimentationDto.Quantity;
        }

        public ProductWarehouseQuantity(long productId, long warehouseId, double quantity)
        {
            ProductId = productId;
            WarehouseId = warehouseId;
            Quantity = quantity;
        }

        public long ProductId { get; set; }
        public long WarehouseId { get; set; }
        public double Quantity { get; set; }


        public Product Product { get; set; }
        public Warehouse Warehouse { get; set; }
    }
}
