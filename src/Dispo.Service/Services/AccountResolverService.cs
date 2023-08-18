using Dispo.Domain;
using Dispo.Service.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Dispo.Service.Services
{
    public class AccountResolverService : IAccountResolverService
    {
        private readonly IHttpContextAccessor httpContextAcessor;

        public AccountResolverService(IHttpContextAccessor httpContextAcessor)
        {
            this.httpContextAcessor = httpContextAcessor;
        }

        /// <summary>
        /// Get logged Account Id.
        /// </summary>
        public long? GetLoggedAccountId()
        {
            var claimsIdentity = httpContextAcessor.HttpContext.User.Identity as ClaimsIdentity;
            var accountId = claimsIdentity?.Claims.FirstOrDefault(c => c.Type.Equals(CustomClaimTypes.AccountId));

            return accountId is null ? null : Convert.ToInt64(accountId.Value);
        }

        /// <summary>
        /// Get logged Warehouse Id.
        /// </summary>
        public long? GetLoggedWarehouseId()
        {
            var claimsIdentity = httpContextAcessor.HttpContext.User.Identity as ClaimsIdentity;
            var currentWarehouseId = claimsIdentity?.Claims.FirstOrDefault(c => c.Type.Equals(CustomClaimTypes.CurrentWarehouseId));

            return currentWarehouseId is null ? null : Convert.ToInt64(currentWarehouseId.Value);
        }

        /// <summary>
        /// Get any claim from current logged session.
        /// </summary>
        /// <param name="claim"></param>
        public Claim? GetLoggedAccountDynamicClaim(string claim)
        {
            var claimsIdentity = httpContextAcessor.HttpContext.User.Identity as ClaimsIdentity;
            return claimsIdentity?.Claims.FirstOrDefault(c => c.Type.Equals(claim));
        }
    }
}