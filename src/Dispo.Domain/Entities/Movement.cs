using Dispo.Domain.Enums;

namespace Dispo.Domain.Entities
{
    public class Movement : Base
    {
        public DateTime Date { get; set; }
        public eMovementType MovementType { get; set; }
        public int Quantity { get; set; }

        public long ProductId { get; set; }
        public Product Product { get; set; }

        public ICollection<UserMovement> UserMovements { get; set; }

        public override void Validate()
        {
            throw new NotImplementedException();
        }
    }
}