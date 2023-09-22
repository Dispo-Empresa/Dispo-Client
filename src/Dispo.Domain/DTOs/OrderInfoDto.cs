namespace Dispo.Domain.DTOs
{
    public class OrderInfoDto
    {
        public string Description { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
        public long ProductId { get; set; }
    }
}
