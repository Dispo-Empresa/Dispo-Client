using Dispo.Domain.Enums;

namespace Dispo.Domain.Entities
{
    public class Product : Base
    {
        public string Name { get; set; }
        public decimal UnitPrice { get; set; }
        public eColor Color { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public eUnitOfMeasurement UnitOfMeasurement { get; set; }
        public eProductType Type { get; set; }

        public long BrandId { get; set; }
        public Brand Brand { get; set; }

        public long InventoryId { get; set; }
        public Inventory Inventory { get; set; }

        public ICollection<ProductProvider> ProductProviders { get; set; }
        public ICollection<Movement> Movements { get; set; }

        public override void Validate()
        {
            throw new NotImplementedException();
        }
    }
}