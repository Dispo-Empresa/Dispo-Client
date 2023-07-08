namespace Dispo.Domain.Entities
{
    public class Company : Base
    {
        public bool Ativo { get; set; }
        public string Name { get; set; }
        public string Cnpj { get; set; }
        public long AdressId { get; set; }
        
        public Address Adress { get; set; }
        public IList<User> Users { get; set; }
        public IList<Warehouse> Warehouses { get; set; }
    }
}
