using Dispo.Commom;
using Dispo.Domain.DTOs;
using Dispo.Domain.Entities;
using Dispo.Infrastructure.Context;
using Dispo.Infrastructure.Repositories.Interfaces;

namespace Dispo.Infrastructure.Repositories
{
    public class ManufacturerRepository : BaseRepository<Manufacturer>, IManufacturerRepository
    {
        private readonly DispoContext _dispoContext;

        public ManufacturerRepository(DispoContext dispoContext) : base(dispoContext)
        {
            _dispoContext = dispoContext;
        }

        public IEnumerable<ManufacturerInfoDto> GetManufacturerInfoDto()
            => _dispoContext.Manufacturers
                            .Select(s => new ManufacturerInfoDto()
                            {
                                Id = s.Id,
                                Name = s.Name,
                            })
                            .ToList();

        public long GetManufacturerIdByName(string manufacturerName)
            => _dispoContext.Manufacturers.Where(x => x.Name == manufacturerName)
                                          .Select(s => s.Id)
                                          .FirstOrDefault()
                                          .ToLong();
    }
}