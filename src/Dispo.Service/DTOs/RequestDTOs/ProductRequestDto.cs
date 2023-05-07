namespace Dispo.Service.DTOs.RequestDTOs
{
    public class ProductRequestDto
    {
        public string Name { get; set; }
        public decimal UnitPrice { get; set; }
        public string Color { get; set; }
        public string Description { get; set; }
        public string UnitOfMeasurement { get; set; }
        public string Type { get; set; }
        public long brandId { get; set; }
    }
}