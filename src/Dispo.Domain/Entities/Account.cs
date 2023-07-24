namespace Dispo.Domain.Entities
{
    public class Account : Base
    {
        public bool Ativo { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public long RoleId { get; set; }
        public long? UserId { get; set; }


        public Role Role { get; set; }
        public User User { get; set; }
        public IList<Movement> Movements { get; set; }
        public IList<WarehouseAccount> WarehouseAccounts { get; set;}
    }
}