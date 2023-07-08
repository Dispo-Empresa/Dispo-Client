    using Dispo.Domain.Enums;

namespace Dispo.Domain.Entities
{
    public class Product : Base
    {
        public bool Ativo { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public byte[] Image { get; set; }
        public string Code { get; set; }
        public decimal PurchasePrice { get; set; }
        public decimal SalePrice { get; set; }
        public eProductCategory Category { get; set; }
        public eUnitOfMeasurement UnitOfMeasurement { get; set; }
        public long ProductDimensionId { get; set; }


        public ProductDimension ProductDimension { get; set; }
        public Batch Batch { get; set; }
        public IList<ProductManufacturer> ProductManufacturers { get; set; }
        public IList<Order> Orders { get; set; }
    }
}