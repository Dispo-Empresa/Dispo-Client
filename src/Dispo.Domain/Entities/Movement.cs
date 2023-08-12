using Dispo.Domain.Enums;

namespace Dispo.Domain.Entities
{
    public class Movement : Base
    {
        public DateTime Date { get; set; }
        public eMovementType Type { get; set; }
        public int Quantity { get; set; }
        public long WarehouseId { get; set; }
        public long AccountId { get; set; }

        public Warehouse Warehouse { get; set; }
        public Account Account { get; set; }
        public IList<BatchMovement> BatchMovements { get; set; }
    }
}