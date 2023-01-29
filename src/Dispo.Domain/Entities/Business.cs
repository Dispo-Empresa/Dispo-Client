namespace Dispo.Domain.Entities
{
    public class Business : Base
    {
        public string Name { get; set; }
        public string Cnpj { get; set; }

        public ICollection<UserBusiness> PersonBusinesses { get; set; }

        public override void Validate()
        {
            throw new NotImplementedException();
        }
    }
}