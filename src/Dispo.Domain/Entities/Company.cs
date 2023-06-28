namespace Dispo.Domain.Entities
{
    public class Company : Base
    {
        public string Name { get; set; }
        public string Cnpj { get; set; }
        public long AdressId { get; set; }
        
        public Adress Adress { get; set; }
        public IList<User> Users { get; set; }
        public IList<Warehouse> Warehouses { get; set; }
    }
}
