namespace Dispo.Domain.Entities
{
    public class User : Base
    {
        public bool Ativo { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Cpf { get; set; }
        public string Phone { get; set; }
        public DateTime BirthDate { get; set; }
        public long CompanyId { get; set; }
        public long AddressId { get; set; }

        public Account Account { get; set; }
        public Company Company { get; set; }
        public Address Address { get; set; }
    }
}