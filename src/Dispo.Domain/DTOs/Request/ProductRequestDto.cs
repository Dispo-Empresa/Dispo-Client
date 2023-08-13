using Dispo.Domain.Enums;

namespace Dispo.Domain.DTOs.Request
{
    public class ProductRequestDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public byte[]? Image { get; set; }
        public decimal? PurchasePrice { get; set; }
        public decimal SalePrice { get; set; }
        public eProductCategory Category { get; set; }
        public eUnitOfMeasurement UnitOfMeasurement { get; set; }

        public double? Weight { get; set; }
        public double? Height { get; set; }
        public double? Width { get; set; }
        public double? Depth { get; set; }

    }
}