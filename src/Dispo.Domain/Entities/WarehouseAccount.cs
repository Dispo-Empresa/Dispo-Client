namespace Dispo.Domain.Entities
{
    public class WarehouseAccount : Base
    {
        public long AccountId { get; set; }
        public long WarehouseId { get; set; }


        public Account Account { get; set; }
        public Warehouse Warehouse { get; set; }
    }
}
