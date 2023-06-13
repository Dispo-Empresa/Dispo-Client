namespace Dispo.Domain.Entities
{
    public class Provider : Base
    {
        public string Name { get; set; } = string.Empty;
        public string Cnpj { get; set; } = string.Empty;

        public ICollection<ProductProvider>? ProductProviders { get; set; }

        public override void Validate()
        {
            throw new NotImplementedException();
        }
    }
}