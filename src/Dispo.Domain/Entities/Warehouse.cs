    namespace Dispo.Domain.Entities
{
    public class Warehouse : Base
    {
        public string Name { get; set; }
        public long CompanyId { get; set; }
        public long AdressId { get; set; }


        public Company Company { get; set; }
        public Adress Adress { get; set; }
        public ProductWarehouseQuantity ProductWarehouseQuantity { get; set; }
        public Movement Movement { get; set; }
        public IList<Movement> Movements { get; set; }
        public IList<PurchaseOrder> PurchaseOrders { get; set; }
    }
}