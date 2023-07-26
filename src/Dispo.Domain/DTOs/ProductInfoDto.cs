using Dispo.Domain.Enums;

namespace Dispo.Domain.DTO_s
{
    public class ProductInfoDto
    {
        public string Name { get; set; }
        public decimal PurchasePrice { get; set; }
        public decimal SalePrice { get; set; }
        public eUnitOfMeasurement UnitOfMeasurement { get; set; }
        public eProductCategory Category { get; set; }
    }
}
