namespace Dispo.Domain.Entities
{
    public class Provider : Base
    {
        public string Name { get; set; }
        public string Cnpj { get; set; }

        public ICollection<ProductProvider> ProductProviders { get; set; }

        public override void Validate()
        {
            throw new NotImplementedException();
        }
    }
}