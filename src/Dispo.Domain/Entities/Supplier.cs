namespace Dispo.Domain.Entities
{
    public class Supplier : Base
    {
        public bool Ativo { get; set; }
        public string Name { get; set; }
        public string ContactName { get; set; }
        public string ContactTitle { get; set; }
        public string Cnpj { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public long AdressId { get; set; }


        public Address Adress { get; set; }
        public IList<PurchaseOrder> PurchaseOrders { get; set; }
    }
}
