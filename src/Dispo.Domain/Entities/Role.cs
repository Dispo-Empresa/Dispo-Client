namespace Dispo.Domain.Entities
{
    public class Role : Base
    {
        public string Name { get; set; }
        public string Key { get; set; }

        public IList<Account> Accounts { get; set; }
    }
}