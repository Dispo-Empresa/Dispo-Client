namespace Dispo.Domain.Entities
{
    public class Account : Base
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;

        public User User { get; set; }

        public override void Validate()
        {
            throw new NotImplementedException();
        }
    }
}