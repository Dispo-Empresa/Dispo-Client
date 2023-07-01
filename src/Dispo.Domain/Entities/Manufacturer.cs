namespace Dispo.Domain.Entities
{
    public class Manufacturer : Base
    {
        public string Name { get; set; }
        public byte[] Logo { get; set; }


        public IList<ProductManufacturer> ProductManufacturers { get; set; }
    }
}