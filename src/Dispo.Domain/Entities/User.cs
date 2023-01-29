namespace Dispo.Domain.Entities
{
    public class User : Base
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CpfCnpj { get; set; }
        public string Phone { get; set; }
        public DateTime BirthDate { get; set; }

        public long AccountId { get; set; }
        public Account Account { get; set; }

        public long BranchId { get; set; }
        public Branch Branch { get; set; }

        public ICollection<UserMovement> UserMovements { get; set; }
        public ICollection<UserBusiness> UserBusinesses { get; set; }

        public override void Validate()
        {
            throw new NotImplementedException();
        }
    }
}