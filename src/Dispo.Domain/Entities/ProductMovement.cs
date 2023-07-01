namespace Dispo.Domain.Entities
{
    public class ProductMovement : Base
    {
        public long MovimentId { get; set; }
        public long ProductId { get; set; }


        public Movement Movement { get; set; }
        public Product Product { get; set; }
    }
}
