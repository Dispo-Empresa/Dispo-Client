namespace Dispo.Domain.Entities
{
    public class BusinessBilling : Base
    {
        public long BusinessId { get; set; }
        public Business Business { get; set; }

        public override void Validate()
        {
            throw new NotImplementedException();
        }
    }
}