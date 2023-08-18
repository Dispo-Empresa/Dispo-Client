using Dispo.Domain.Entities;
using Dispo.Infrastructure.Context;
using Dispo.Infrastructure.Repositories.Interfaces;

namespace Dispo.Infrastructure.Repositories
{
    public class MovementRepository : BaseRepository<Movement>, IMovementRepository
    {
        public MovementRepository(DispoContext dispoContext)
            : base(dispoContext)
        {
        }
    }
}