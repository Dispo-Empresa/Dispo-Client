using Dispo.Domain.DTOs;
using Dispo.Domain.Entities;
using Dispo.Infrastructure.Context;
using Dispo.Infrastructure.Repositories.Interfaces;

namespace Dispo.Infrastructure.Repositories
{
    public class RoleRepository : BaseRepository<Role>, IRoleRepository
    {
        private readonly DispoContext _dispoContext;

        public RoleRepository(DispoContext dispoContext) : base(dispoContext)
        {
            _dispoContext = dispoContext;
        }

        public List<RoleInfoDto> GetRoleInfo()
            => _dispoContext.Roles
                            .ToList()
                            .Select(s => new RoleInfoDto()
                            {
                                Id = s.Id,
                                Name = s.Name
                            })
                            .ToList();
    }
}