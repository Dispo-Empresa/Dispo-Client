using Dispo.Domain.Enums;

namespace Dispo.Service.DTOs.ResponseDTOs
{
    public class ProductResponseDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public decimal UnitPrice { get; set; }
        public eColor Color { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public eUnitOfMeasurement UnitOfMeasurement { get; set; }
        public eProductType Type { get; set; }
        public long BrandId { get; set; }
        public long InventoryId { get; set; }
    }
}