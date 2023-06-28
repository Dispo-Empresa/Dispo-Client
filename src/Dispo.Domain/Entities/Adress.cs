namespace Dispo.Domain.Entities
{
    public class Adress : Base
    {
        public long Id { get; set; }
        public string Country { get; set; }
        public string UF { get; set; }
        public string City { get; set; }
        public string District { get; set; }
        public string CEP { get; set; }
        public string AdditionalInfo { get; set; }


        public Company Company { get; set; }
        public User User { get; set; }
        public Warehouse Warehouse { get; set; }
        public Supplier Supplier { get; set; }
    }
}