namespace Dispo.Domain.Entities
{
    public class ProductDimension : Base
    {
        public decimal Weight { get; set; }
        public decimal Height { get; set; }
        public decimal Width { get; set; }
        public decimal Depth { get; set; }


        public Product Product { get; set; }
    }
}
