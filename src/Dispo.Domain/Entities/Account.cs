namespace Dispo.Domain.Entities
{
    public class Account : Base
    {
        public string Email { get; set; }
        public string Password { get; set; }

        public User User { get; set; }

        public override void Validate()
        {
            throw new NotImplementedException();
        }
    }
}