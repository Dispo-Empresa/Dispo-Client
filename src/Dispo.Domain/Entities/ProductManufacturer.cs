namespace Dispo.Domain.Entities
{
    public class ProductManufacturer : Base
    {
        public long ProductId { get; set; }
        public long ManufacturerId { get; set; }

        public Product Product { get; set; }
        public Manufacturer Manufacturer { get; set; }
    }
}