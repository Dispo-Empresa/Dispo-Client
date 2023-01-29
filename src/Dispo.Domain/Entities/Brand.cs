namespace Dispo.Domain.Entities
{
    public class Brand : Base
    {
        public string Name { get; set; }
        public byte[] Logo { get; set; }

        public ICollection<Product> Products { get; set; }

        public override void Validate()
        {
            throw new NotImplementedException();
        }
    }
}