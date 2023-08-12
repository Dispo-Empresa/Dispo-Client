using Dispo.Domain.DTOs;
using Dispo.Domain.Entities;

namespace Dispo.Infrastructure.Repositories.Interfaces
{
    public interface IManufacturerRepository : IBaseRepository<Manufacturer>
    {
        IEnumerable<ManufacturerInfoDto> GetManufacturerInfoDto();

        long GetManufacturerIdByName(string manufacturerName);
    }
}