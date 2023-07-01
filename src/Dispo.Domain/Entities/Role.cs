using Dispo.Domain.Enums;

namespace Dispo.Domain.Entities
{
    public class Role : Base
    {
        public string Name { get; set; }
        public eRoleType Type { get; set; }


        public IList<Account> Accounts { get; set; }
    }
}
