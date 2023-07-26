using Dispo.Domain;
using System.Security.Claims;

namespace Dispo.APIs
{
    /// <summary>
    /// Dto of main account information logged
    /// </summary>
    public class AccountPrincipal : IAccountPrincipal
    {
        public long AccountId { get; }
        public string UserName { get; }
        public string Role { get; }

        public AccountPrincipal(IEnumerable<Claim> claims)
        {
            foreach (var claim in claims)
            {
                if (claim.Type == CustomClaimTypes.AccountId)
                {
                    AccountId = long.Parse(claim.Value);
                }
                else if (claim.Type == ClaimTypes.Name)
                {
                    UserName = claim.Value;
                }
                else if (claim.Type == ClaimTypes.Role)
                {
                    Role = claim.Value;
                }
            }
        }
    }
}
