    namespace Dispo.Domain.Entities
{
    public class Warehouse : Base
    {
        public bool Ativo { get; set; }
        public string Name { get; set; }
        public long CompanyId { get; set; }
        public long AddressId { get; set; }


        public Company Company { get; set; }
        public Address Address { get; set; }
        public Movement Movement { get; set; }
        public IList<Movement> Movements { get; set; }
        public IList<PurchaseOrder> PurchaseOrders { get; set; }
        public IList<WarehouseAccount> WarehouseAccounts { get; set; }
    }
}