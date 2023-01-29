namespace Dispo.Domain.Entities
{
    public class UserMovement : Base
    {
        public long? UserId { get; set; }
        public User? User { get; set; }

        public long MovementId { get; set; }
        public Movement Movement { get; set; }

        public override void Validate()
        {
            throw new NotImplementedException();
        }
    }
}