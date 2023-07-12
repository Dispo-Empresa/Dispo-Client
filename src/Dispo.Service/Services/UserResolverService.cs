using Dispo.Domain.Entities;
using Dispo.Service.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Dispo.Service.Services
{
    public class UserResolverService : IUserResolverService
    {
        private readonly IHttpContextAccessor httpContextAcessor;
        private readonly IUserService userService;

        public UserResolverService(IHttpContextAccessor httpContextAcessor, IUserService userService)
        {
            this.httpContextAcessor = httpContextAcessor;
            this.userService = userService;
        }

        /// <summary>
        /// Get the entire logged User entity from database.
        /// </summary>
        public async Task<User?> GetLoggedUser()
        {
            var claimsIdentity = httpContextAcessor.HttpContext.User.Identity as ClaimsIdentity;
            var id = claimsIdentity?.Claims.FirstOrDefault(c => c.Type.Equals(ClaimTypes.NameIdentifier));

            return id is null ? null
                              : await userService.GetByIdAsync(Convert.ToInt64(id.Value));
        }

        /// <summary>
        /// Get logged User Id.
        /// </summary>
        public long? GetLoggedUserId()
        {
            var claimsIdentity = httpContextAcessor.HttpContext.User.Identity as ClaimsIdentity;
            var id = claimsIdentity?.Claims.FirstOrDefault(c => c.Type.Equals(ClaimTypes.NameIdentifier));

            return id is null ? null
                              : Convert.ToInt64(id.Value);
        }

        /// <summary>
        /// Get any claim from current logged session.
        /// </summary>
        /// <param name="claim"></param>
        public Claim? GetLoggedUserDynamicClaim(string claim)
        {
            var claimsIdentity = httpContextAcessor.HttpContext.User.Identity as ClaimsIdentity;
            return claimsIdentity?.Claims.FirstOrDefault(c => c.Type.Equals(claim));
        }
    }
}
