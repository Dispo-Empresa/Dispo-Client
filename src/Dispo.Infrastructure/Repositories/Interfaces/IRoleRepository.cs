using Dispo.Domain.DTOs;

namespace Dispo.Infrastructure.Repositories.Interfaces
{
    public interface IRoleRepository
    {
        List<RoleInfoDto> GetRoleInfo();
    }
}
