namespace Dispo.Domain.Entities
{
    public class ProductProvider : Base
    {
        public long ProductId { get; set; }
        public Product Product { get; set; }

        public long ProviderId { get; set; }
        public Provider Provider { get; set; }

        public override void Validate()
        {
            throw new NotImplementedException();
        }
    }
}