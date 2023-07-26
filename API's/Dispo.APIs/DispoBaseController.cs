using Microsoft.AspNetCore.Mvc;

namespace Dispo.APIs
{
    public abstract class DispoBaseController : ControllerBase
    {
        private readonly ILogger _logger;
        private IAccountPrincipal accountPrincipal;

        protected DispoBaseController(ILogger logger)
        {
            _logger = logger;
        }

        public IAccountPrincipal AccountPrincipal
        {
            get => accountPrincipal ?? new AccountPrincipal(User.Claims);
            set => accountPrincipal = value;
        }
    }
}
