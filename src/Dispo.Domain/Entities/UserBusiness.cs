namespace Dispo.Domain.Entities
{
    public class UserBusiness : Base
    {
        public long PersonId { get; set; }
        public User Person { get; set; }

        public long BusinessId { get; set; }
        public Business Business { get; set; }

        public override void Validate()
        {
            throw new NotImplementedException();
        }
    }
}